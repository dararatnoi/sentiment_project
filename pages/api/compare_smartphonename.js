import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        let { brandName } = req.query; // Get the selected smartphone from the request query parameters
        // brandName = "Apple"; // Assigning a new value to the variable

        if (!brandName) {
            return res.status(400).json({ message: "Brand parameter is required" });
        }

        const client = await clientPromise;
        const db = client.db("deployData");

        const keywordSearchList = await db.collection("Specs").find({
            brand: brandName // Filter by the selected smartphone
        }).toArray();

        // Extract only the model names
        const models = keywordSearchList.map(item => item.model);

        res.status(200).json(models);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
