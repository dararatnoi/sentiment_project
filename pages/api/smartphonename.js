import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("deployData");

    switch (req.method) {
        case "GET":
            try {
                const keywordSearchList = await db.collection("SmartphoneReview").find({}, { projection: { keyword_search: 1, _id: 0 } }).toArray();

                const keywordSet = new Set();

                keywordSearchList.forEach(item => {
                    keywordSet.add(item.keyword_search);
                });

                const BrandSearchArray = Array.from(keywordSet);

                res.status(200).json({
                    keyword_search_list: BrandSearchArray
                });
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
