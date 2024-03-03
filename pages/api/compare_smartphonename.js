import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("deployData");

    switch (req.method) {
        case "GET":
            try {
                const keywordSearchList = await db.collection("SmartphoneReview").find({ is_sentiment_comment: true }, { projection: { keyword_search: 1, Brand: 1, Aspects: 1, Sentiment_Label: 1 } }).toArray();

                const brandData = {};

                keywordSearchList.forEach(item => {
                    const brand = item.Brand;
                    const smartphone = item.keyword_search;
                    const aspectData = {};

                    if (!brandData[brand]) {
                        brandData[brand] = {};
                    }

                    if (!brandData[brand][smartphone]) {
                        brandData[brand][smartphone] = {
                            OverallSentiment: { count_pos: 0, count_neu: 0, count_neg: 0 },
                            Aspect: {}
                        };
                    } else {
                        switch (item.Sentiment_Label) {
                            case "pos":
                                brandData[brand][smartphone].OverallSentiment.count_pos++;
                                break;
                            case "neu":
                                brandData[brand][smartphone].OverallSentiment.count_neu++;
                                break;
                            case "neg":
                                brandData[brand][smartphone].OverallSentiment.count_neg++;
                                break;
                            default:
                                break;
                        }
                    }

                    if (item.Aspects && Array.isArray(item.Aspects)) {
                        item.Aspects.forEach(aspect => {
                            const aspectName = aspect.aspects; // Get the aspect name

                            if (!brandData[brand][smartphone].Aspect[aspectName]) {
                                brandData[brand][smartphone].Aspect[aspectName] = {
                                    count_pos: 0,
                                    count_neu: 0,
                                    count_neg: 0
                                };
                            }

                            // Increment the aspect sentiment count based on Sentiment_Label
                            switch (aspect.Aspect_Sentiment_Label) {
                                case "pos":
                                    brandData[brand][smartphone].Aspect[aspectName].count_pos++;
                                    break;
                                case "neu":
                                    brandData[brand][smartphone].Aspect[aspectName].count_neu++;
                                    break;
                                case "neg":
                                    brandData[brand][smartphone].Aspect[aspectName].count_neg++;
                                    break;
                                default:
                                    break;
                            }
                        });
                    }

                });

                res.status(200).json(brandData);
            } catch (error) {
                console.error("Error fetching data:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
            break;
        default:
            res.status(405).end(); // Method Not Allowed
            break;
    }
}
