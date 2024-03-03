// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("deployData");
  switch (req.method) {
   
    case "GET":
    const { model } = req.body; 
    // const result = await db.collection('SmartphoneReview').find({ keyword_search: model, is_sentiment_comment: true }).toArray();
    const result = await db.collection("SmartphoneReview").countDocuments({ keyword_search: model,is_sentiment_comment:true});   

    await res.json(
        
        {
          Aspect:{
            Apple:{
                result
            }
        }

    })
      break;
  }
}


// {
//   overviews: {
//     all:0,
//     pos:0,
//     neg:0,
//     neu:0
//   },
//   brands: {
//     iphone: {
//       pos:0,
//       neg
//     }
//   },
//     Asp : {
//       Apple: {
//         Overview: {
//           pos:0,
//           neu:0,
//           neg:0
//         },
//         Asp: {
//           Camera: {
//             pos,
//             neu,
//             neg
//           }
//           Battery: {
//             pos,
//             neu,
//             neg
//           }
//           Price: {
//             pos,
//             neu,
//             neg
//           }
//           Perfomance: {
//             pos,
//             neu,
//             neg
//           }
//         },
//         Comment: [
//           ....
//         ]
        
//       }
//     }
// }
