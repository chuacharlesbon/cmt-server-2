// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToMongoDB } from "../../../../mongodb";
import clientPromise from "../../../../lib/mongodbclient";
//import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const postBody = req.body;
    try {
        await clientPromise;
        const client = await clientPromise;
        const db = client.db("CaptivePortal");
        //
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands

        //const db = await connectToMongoDB();
        //const data = await db.collection("posts").find({}).toArray();
        //const data = await db.collection("users-test").find({}).toArray();
        const userA = await db.collection('users-test').findOne({ mobile_number: postBody.mobileNumber ?? "" });
        const userB = await db.collection('users-test').findOne({ email: postBody.email ?? "" });
        //await db.createCollection('users-test');
        if(userA && postBody.mobileNumber){
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
        }
    } catch (error) {
      res.status(400).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
