// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("deployData");
  switch (req.method) {

    case "GET":
      // const brand = req.query.brand ?? "Apple"
      // const model = req.query.brand ?? "iphone 12"
      
      const reviews_pos = await db.collection('SmartphoneReview').aggregate([
        { $match: { is_sentiment_comment: true, Sentiment_Label: { $eq: "pos" }, Brand: "Apple", keyword_search: "iPhone 12 " } },
        { $group: { _id: null, reviews_pos: { $addToSet: "$textDisplay" } } },
        { $project: { _id: 0, reviews_pos: 1 } }
      ]).toArray();
      const reviews_neu = await db.collection('SmartphoneReview').aggregate([
        { $match: { is_sentiment_comment: true, Sentiment_Label: { $eq: "neu" }, Brand: "Apple", keyword_search: "iPhone 12 " } },
        { $group: { _id: null, reviews_neu: { $addToSet: "$textDisplay" } } },
        { $project: { _id: 0, reviews_neu: 1 } }
      ]).toArray();
      const reviews_neg = await db.collection('SmartphoneReview').aggregate([
        { $match: { is_sentiment_comment: true, Sentiment_Label: { $eq: "neg" }, Brand: "Apple", keyword_search: "iPhone 12 " } },
        { $group: { _id: null, reviews_neg: { $addToSet: "$textDisplay" } } },
        { $project: { _id: 0, reviews_neg: 1 } }
      ]).toArray();
      const word_pos = await db.collection('SmartphoneReview').aggregate([
        { $match: { is_sentiment_comment: true, Sentiment_Label: { $eq: "pos" }, Brand: "Apple", keyword_search: "iPhone 12 " } },
        { $group: { _id: null, reviews_pos: { $addToSet: "$processed" } } },
        { $project: { _id: 0, reviews_pos: 1 } }
      ]).toArray();
      const word_neu = await db.collection('SmartphoneReview').aggregate([
        { $match: { is_sentiment_comment: true, Sentiment_Label: { $eq: "neu" }, Brand: "Apple", keyword_search: "iPhone 12 " } },
        { $group: { _id: null, reviews_neu: { $addToSet: "$processed" } } },
        { $project: { _id: 0, reviews_neu: 1 } }
      ]).toArray();
      const word_neg = await db.collection('SmartphoneReview').aggregate([
        { $match: { is_sentiment_comment: true, Sentiment_Label: { $eq: "neg" }, Brand: "Apple", keyword_search: "iPhone 12 " } },
        { $group: { _id: null, reviews_neg: { $addToSet: "$processed" } } },
        { $project: { _id: 0, reviews_neg: 1 } }
      ]).toArray();


      await res.json(
        
        
        
          reviews_pos,
          reviews_neu,
          reviews_neg,
          word_pos,
          word_neu,
          word_neg
        
      );
      break;
    default:
      res.status(405).end();
  }
}

