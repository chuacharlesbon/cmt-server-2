// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToMongoDB } from "../../../mongodb";
import clientPromise from "../../../lib/mongodbclient";

export default async function handler(req, res) {
  const postBody = req.body;
    try {
        await clientPromise;
        const client = await clientPromise;
        const db = client.db("CaptivePortal");
        //const db = await connectToMongoDB();
        const data = await db.collection("posts").find({}).toArray();
        res.status(200).json({
          message: "TQ - Captive Portal",
          value: data.length != 0
            ? data[0].test
            : "- -  - -"
        });
        //const data = await db.collection("users-test").find({}).toArray();
        //const userA = await db.collection('users-test').findOne({ mobile_number: postBody.mobileNumber ?? "" });
        //const userB = await db.collection('users-test').findOne({ email: postBody.email ?? "" });
        //await db.createCollection('users-test');
        /* if(userA && postBody.mobileNumber){
          res.status(400).json({error: "Mobile number already exist!"});
        }else if(userB && postBody.email){
          res.status(400).json({error: "Email already exist!"});
        }else{
          await db.collection('users-test').insertOne({
            fullname: postBody.fullName,
            mobile_number: postBody.mobileNumber ?? "",
            email: postBody.email ?? "",
          });
          res.status(200).json({
            fullname: postBody.fullName,
            mobile_number: postBody.mobileNumber ?? "",
            email: postBody.email ?? "",
          });
        } */
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
}
