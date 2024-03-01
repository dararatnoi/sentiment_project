// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("deployData");
  switch (req.method) {
    // case "POST":
    //   let bodyObject = JSON.parse(req.body);
    //   let myPost = await db.collection("posts").insertOne(bodyObject);
    //   res.json(myPost.ops[0]);
    //   break;
    case "GET":
      const allReview = await db.collection("SmartphoneReviewTrue").find({}).toArray();
      res.json(allReview);
      break;
  }
}
