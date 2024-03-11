import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        let {smartphone} = req.query;
        // smartphone = "iPhone 14 Pro"; // Assigning a new value to the variable
        // selectedAspect = "Camera";

        if (!smartphone) {
            return res.status(400).json({ message: "Smartphone parameter is required" });
        }

        const client = await clientPromise;
        const db = client.db("deployData");

        const keywordSearchList = await db.collection("SmartphoneReview").find({
            keyword_search: smartphone,
            is_sentiment_comment: true,
            // "Aspects.aspects": selectedAspect
        }).toArray();

        // console.log("Keyword Search List:", keywordSearchList); // Log the retrieved data

        // Extract the necessary information and format the data
        const formattedData = keywordSearchList.flatMap(item => {
            if (Array.isArray(item.Aspects)) {
                return item.Aspects.map(aspect => ({
                    aspects: aspect.aspects,
                    textDisplay_aspect: aspect.textDisplay_aspect,
                    smartphoneName: item.keyword_search,
                    Aspect_Sentiment_Label: aspect.Aspect_Sentiment_Label
                }));
            } else {
                return [];
            }
        });

        // console.log("Formatted Data:", formattedData); // Log the formatted data

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
