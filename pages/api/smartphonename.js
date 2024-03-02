import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("deployData");

    switch (req.method) {
        case "GET":
            try {
                const keywordSearchList = await db.collection("SmartphoneReview").find({}, { projection: { keyword_search: 1, Brand: 1, _id: 0 } }).toArray();

                const brandMap = new Map();

                keywordSearchList.forEach(item => {
                    const brand = item.Brand;
                    const smartphone = item.keyword_search;

                    if (!brandMap.has(brand)) {
                        brandMap.set(brand, new Set([smartphone]));
                    } else {
                        const smartphones = brandMap.get(brand);
                        smartphones.add(smartphone);
                        brandMap.set(brand, smartphones);
                    }
                });

                // Convert map to object
                const brandData = {};
                brandMap.forEach((value, key) => {
                    brandData[key] = Array.from(value);
                });

                res.status(200).json({
                    brand_smartphone_list: brandData
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
