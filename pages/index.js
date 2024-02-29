import Image from "next/image";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from 'react';
import { Card, Skeleton } from "@nextui-org/react";


export default function Home() {
  const [allReviews, setAllReviews] = useState([]);
  const [statusData, setStatusData] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  let count_pos = 0;
  let count_neu = 0;
  let count_neg = 0;

  useEffect(() => {
    setStatusData(false)
    setIsLoaded(false); // Set loading state before fetching data
    const fetchData = async () => {
      let res = await fetch("http://localhost:3000/api/smartphonereview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      // Do something with allPosts, like setting state
      setAllReviews(data);

      setStatusData(true);
      setIsLoaded(true); // Set loading state after fetching data
    };

    fetchData();
  //   for (let i = 0; i <= allReviews.data.length; i++) {
  //     console.log(allReviews.data[i].Sentiment_Label);
  // }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap -m-3 mb-5">
          <div className="w-full sm:w-1/2 md:w-1/4 p-3">
            <Skeleton isLoaded={statusData}>
              <div className="bg-custom-blue text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{statusData ? allReviews.length : ""}</h3>

                  <h6 className="text-lg font-normal text-gray-600">Reviews</h6>
                </div>
                <span className="material-icons text-3xl">mode_comment</span>
              </div>
            </Skeleton>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-3">
            <div className="bg-custom-green text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                  {
                    statusData ? (
                      allReviews.map((pos => {
                       if(pos.Sentiment_Label == 'pos'){
                        count_pos = count_pos + 1
                       }
                      })),
                      count_pos
                    ) : ""
                  }
                </h3>
                <h6 className="text-lg font-normal text-gray-600">Positive Reviews</h6>
              </div>
              <span className="material-icons text-3xl">sentiment_satisfied_alt</span>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-3">
            <div className="bg-custom-yellow text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                {
                    statusData ? (
                      allReviews.map((pos => {
                       if(pos.Sentiment_Label == 'neu'){
                        count_neu = count_neu + 1
                       }
                      })),
                      count_neu
                    ) : ""
                  }
                </h3>
                <h6 className="text-lg font-normal text-gray-600">Neutral Reviews</h6>
              </div>
              <span className="material-icons text-3xl">sentiment_neutral</span>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-3">
            <div className="bg-custom-red text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                {
                    statusData ? (
                      allReviews.map((pos => {
                       if(pos.Sentiment_Label == 'neg'){
                        count_neg = count_neg + 1
                       }
                      })),
                      count_neg
                    ) : ""
                  }
                </h3>
                <h6 className="text-lg font-normal text-gray-600">Negative Reviews</h6>
              </div>
              <span className="material-icons text-3xl">sentiment_very_dissatisfied</span>
            </div>
          </div>

        </div>

      </div>
    </>

  )

}
