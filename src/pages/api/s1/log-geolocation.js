// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToMongoDB } from "../../../../mongodb";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const postBody = req.body;
    try {
        const tempId = new Date().getTime().toString();
        const db = await connectToMongoDB();
        const userA = await db.collection(process.env.COL_NAME).findOne({ device_id: postBody.deviceId ?? `EMPTY-${tempId}` });

        if (userA === null) {
            await db.collection(process.env.COL_NAME).insertOne({
                device_id: postBody.deviceId,
                location_list: [postBody.currentLocation],
                updated_at: new Date().toISOString()
            });
        } else {
            const tempGeoLocation = [...userA.location_list];
            tempGeoLocation.push(postBody.currentLocation);
            userA['location_list'] = tempGeoLocation;
            userA['updated_at'] = new Date().toISOString();
            await db.collection(process.env.COL_NAME).updateOne(
                { device_id: postBody.deviceId },
                {
                    $set: {
                        device_id: postBody.deviceId,
                        location_list: tempGeoLocation,
                        updated_at: new Date().toISOString()
                    }
                }
            );
        }

        res.status(200).json({
            message: "Log successful.",
            data: userA ? userA : { msg: "New user has been created." }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
    }
}
