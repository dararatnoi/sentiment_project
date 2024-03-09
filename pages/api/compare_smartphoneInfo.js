import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        let { smartphone } = req.query; // Get the selected smartphone from the request query parameters
        // smartphone = "Huawei nova 11i"; // Assigning a new value to the variable

        if (!smartphone) {
            return res.status(400).json({ message: "Smartphone parameter is required" });
        }

        const client = await clientPromise;
        const db = client.db("deployData");

        const specData = await db.collection("Specs").find({
            model: smartphone
        }).toArray();

        if (!specData) {
            return res.status(404).json({ message: "Specs not found for the provided brand and model" });
        }

        res.status(200).json(specData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
