// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("deployData");
  switch (req.method) {
   
    case "GET":
      
      // aspect
    //   const countByKeyword = await db.collection("SmartphoneReview").aggregate([
    //     {
    //         $match: {
    //             is_sentiment_comment: true,
    //             Sentiment_Label: "neg",
    //             Brand: "Apple"
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: "$keyword_search",
    //             count: { $sum: 1 }
    //             // documents: { $push: "$$ROOT" }
    //         }
    //     }
    //     // {
    //     //     $sort: { count: -1 }
    //     // }
    // ]).toArray();
    const countover_apple_pos = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "pos" },Brand:{$eq:"Apple"}});
    const countover_apple_neu = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neu" },Brand:{$eq:"Apple"}});
    const countover_apple_neg = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neg" },Brand:{$eq:"Apple"}});
    const countover_oppo_pos = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "pos" },Brand:{$eq:"Oppo"}});
    const countover_oppo_neu = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neu" },Brand:{$eq:"Oppo"}});
    const countover_oppo_neg = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neg" },Brand:{$eq:"Oppo"}});
    const countover_samsung_pos = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "pos" },Brand:{$eq:"Samsung"}});
    const countover_samsung_neu = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neu" },Brand:{$eq:"Samsung"}});
    const countover_samsung_neg = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neg" },Brand:{$eq:"Samsung"}});
    const countover_vivo_pos = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "pos" },Brand:{$eq:"Vivo"}});
    const countover_vivo_neu = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neu" },Brand:{$eq:"Vivo"}});
    const countover_vivo_neg = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neg" },Brand:{$eq:"Vivo"}});
    const countover_xiaomi_pos = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "pos" },Brand:{$eq:"Xiaomi"}});
    const countover_xiaomi_neu = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neu" },Brand:{$eq:"Xiaomi"}});
    const countover_xiaomi_neg = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neg" },Brand:{$eq:"Xiaomi"}});
    const countover_huawei_pos = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "pos" },Brand:{$eq:"Huawei"}});
    const countover_huawei_neu = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neu" },Brand:{$eq:"Huawei"}});
    const countover_huawei_neg = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "neg" },Brand:{$eq:"Huawei"}});  
    const camera = await db.collection("SmartphoneReview").countDocuments({ is_sentiment_comment:true,Sentiment_Label: { $eq: "pos" },Brand:{$eq:"Apple"},"Aspects.aspects": "Camera",
    "Aspects.Aspect_Sentiment_Label": "neg",keyword_search:"Apple iPhone 14"});       
    
    
    await res.json(
        {
          
          Aspect:{
            Apple:{
              Overview:{
                pos: countover_apple_pos ?? 0,
                neu: countover_apple_neu ?? 0,
                neg: countover_apple_neg ?? 0
              },
              Asp:{
               Camera:{
                pos:camera ?? 0
               },
               Battery:{
                // pos:camera ?? 0
               },
               Screen:{
                // pos:camera ?? 0
               },
               Perfomance:{
                // pos:camera ?? 0
               },
               Price:{
                // pos:camera ?? 0
               },
               Other:{
                // pos:camera ?? 0
               }

                
                
               
              }
            },
            Oppo:{
                Overview:{
                  pos: countover_oppo_pos ?? 0,
                  neu: countover_oppo_neu ?? 0,
                  neg: countover_oppo_neg ?? 0
                }
            },
              Samsung:{
                Overview:{
                  pos: countover_samsung_pos ?? 0,
                  neu: countover_samsung_neu ?? 0,
                  neg: countover_samsung_neg ?? 0
                }
            },
            Vivo:{
                Overview:{
                  pos: countover_vivo_pos ?? 0,
                  neu: countover_vivo_neu ?? 0,
                  neg: countover_vivo_neg ?? 0
                }
            },
            Xiaomi:{
                Overview:{
                  pos: countover_xiaomi_pos ?? 0,
                  neu: countover_xiaomi_neu ?? 0,
                  neg: countover_xiaomi_neg ?? 0
                }
            },
            Huawei:{
                Overview:{
                  pos: countover_huawei_pos ?? 0,
                  neu: countover_huawei_neu ?? 0,
                  neg: countover_huawei_neg ?? 0
                }
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
