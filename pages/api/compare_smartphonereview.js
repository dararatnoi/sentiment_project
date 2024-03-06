import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        let { smartphone } = req.query; // Get the selected smartphone from the request query parameters
        smartphone = "Huawei nova 11i"; // Assigning a new value to the variable

        if (!smartphone) {
            return res.status(400).json({ message: "Smartphone parameter is required" });
        }

        const client = await clientPromise;
        const db = client.db("deployData");

        const keywordSearchList = await db.collection("SmartphoneReview").find({
            is_sentiment_comment: true,
            keyword_search: smartphone // Filter by the selected smartphone
        }).toArray();

        const formattedData = keywordSearchList.map(item => ({
            textDisplay: item.textDisplay,
            smartphoneName: item.keyword_search,
            Sentiment_Label: item.Sentiment_Label,
            // processed: item.processed,
            Aspects: item.Aspects
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
