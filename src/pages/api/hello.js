// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientSP from "../../../mongodb";

export default async function handler(req, res) {

  //res.status(200).json({ name: 'John Doe' })

  if (req.method === "GET") {
    try {
      await clientSP.connect();
      const db = clientSP.db(); // or specify your database name: client.db("mydatabase");
      const data = await db.collection("chats").find({}).toArray();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch data" });
    } finally {
      await clientSP.close();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
