// import clientPromise from "../../lib/mongodb";

// // Define a cache object to store the fetched data
// let cacheData = null;

// export default async function handler(req, res) {
//     try {
//         // Check if there is cached data available
//         if (!cacheData) {
//             const client = await clientPromise;
//             const db = client.db("deployData");
    
//             const keywordSearchList = await db.collection("SmartphoneReview").find({ is_sentiment_comment: true }, { projection: { keyword_search: 1, Brand: 1, Aspects: 1, Sentiment_Label: 1 } }).toArray();
    
//             const brandData = {};
    
//             keywordSearchList.forEach(item => {
//                 const brand = item.Brand;
//                 const smartphone = item.keyword_search;
    
//                 if (!brandData[brand]) {
//                     brandData[brand] = {};
//                 }
    
//                 if (!brandData[brand][smartphone]) {
//                     brandData[brand][smartphone] = {
//                         OverallSentiment: { count_pos: 0, count_neu: 0, count_neg: 0 },
//                         Aspect: {}
//                     };
//                 }
                
//                 // Increment sentiment count
//                 switch (item.Sentiment_Label) {
//                     case "pos":
//                         brandData[brand][smartphone].OverallSentiment.count_pos++;
//                         break;
//                     case "neu":
//                         brandData[brand][smartphone].OverallSentiment.count_neu++;
//                         break;
//                     case "neg":
//                         brandData[brand][smartphone].OverallSentiment.count_neg++;
//                         break;
//                     default:
//                         break;
//                 }
    
//                 if (item.Aspects && Array.isArray(item.Aspects)) {
//                     item.Aspects.forEach(aspect => {
//                         const aspectName = aspect.aspects; // Get the aspect name
    
//                         if (!brandData[brand][smartphone].Aspect[aspectName]) {
//                             brandData[brand][smartphone].Aspect[aspectName] = {
//                                 count_pos: 0,
//                                 count_neu: 0,
//                                 count_neg: 0
//                             };
//                         }
    
//                         // Increment aspect sentiment count
//                         switch (aspect.Aspect_Sentiment_Label) {
//                             case "pos":
//                                 brandData[brand][smartphone].Aspect[aspectName].count_pos++;
//                                 break;
//                             case "neu":
//                                 brandData[brand][smartphone].Aspect[aspectName].count_neu++;
//                                 break;
//                             case "neg":
//                                 brandData[brand][smartphone].Aspect[aspectName].count_neg++;
//                                 break;
//                             default:
//                                 break;
//                         }
//                     });
//                 }
//             });
    
//             // Store data in cache
//             cacheData = brandData;
//         }

//         // Send cached data as response
//         res.status(200).json(cacheData);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }
