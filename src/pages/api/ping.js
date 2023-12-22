// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToMongoDB } from "../../../mongodb";

export default async function handler(req, res) {
  try {
    const db = await connectToMongoDB();
    const connectionTest = await db.collection(process.env.COL_NAME2).findOne({ connection: "Connected to EtapReport Server" });
    if (connectionTest) {
      res.status(200).json({ connection: connectionTest.connection });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
}
