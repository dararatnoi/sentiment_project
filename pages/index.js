import Image from "next/image";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from 'react';
import { Card, Skeleton } from "@nextui-org/react";


export default function Home() {
  const [allReviews, setAllReviews] = useState([]);
  const [statusData, setStatusData] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

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
      console.log("test")
      setStatusData(true);
      setIsLoaded(true); // Set loading state after fetching data
    };

    fetchData();
  }, []);

  // if(statusData){
  //   return (
  //     <>
  //     <Navbar/>
  //       <div className="container" style={{ marginTop: '6%' }}>
  //   <div className="row col-12 row-gap-3 mb-5">
  //     <div className="col-3">
  //       <div
  //         className="card hov-primary border-0"
  //         style={{
  //           backgroundColor: '#8d9ec6',
  //           color: 'aliceblue',
  //           boxShadow: '8px 8px 10px rgba(0, 0, 0, 0.2)',
  //           borderRadius: '20px',
  //         }}
  //       >
  //         <div className="card-body d-flex justify-content-between mb-2">
  //           <div>
  //           <h3 className="card-title">{allReviews.data.length}</h3>
  //             <h6 className="card-subtitle mb-2 text-body-secondary">Reviews</h6>
  //           </div>
  //           <span className="material-icons" style={{ fontSize: '30px' }}>
  //             mode_comment
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="col-3">
  //       <div
  //         className="card border-0 hov-primary"
  //         style={{
  //           backgroundColor: '#70c1b3',
  //           color: 'aliceblue',
  //           boxShadow: '8px 8px 10px rgba(0, 0, 0, 0.2)',
  //           borderRadius: '20px',
  //         }}
  //       >
  //         <div className="card-body d-flex justify-content-between mb-2">
  //           <div>
  //             <h3 className="card-title">42,000</h3>
  //             <h6 className="card-subtitle mb-2 text-body-secondary">Positive Reviews</h6>
  //           </div>
  //           <span className="material-icons" style={{ fontSize: '30px' }}>
  //             sentiment_satisfied_alt
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="col-3">
  //       <div
  //         className="card border-0 hov-primary"
  //         style={{
  //           backgroundColor: '#EFBF38',
  //           color: 'aliceblue',
  //           boxShadow: '8px 8px 10px rgba(0, 0, 0, 0.2)',
  //           borderRadius: '20px',
  //         }}
  //       >
  //         <div className="card-body d-flex justify-content-between mb-2">
  //           <div>
  //             <h3 className="card-title">10,000</h3>
  //             <h6 className="card-subtitle mb-2 text-body-secondary">Neutral Reviews</h6>
  //           </div>
  //           <span className="material-icons" style={{ fontSize: '30px' }}>
  //             sentiment_neutral
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="col-3">
  //       <div
  //         className="card border-0 hov-primary"
  //         style={{
  //           backgroundColor: '#dd7373',
  //           color: 'aliceblue',
  //           boxShadow: '8px 8px 10px rgba(0, 0, 0, 0.2)',
  //           borderRadius: '20px',
  //         }}
  //       >
  //         <div className="card-body d-flex justify-content-between mb-2">
  //           <div>
  //             <h3 className="card-title">5,000</h3>
  //             <h6 className="card-subtitle mb-2 text-body-secondary">Negative Reviews</h6>
  //           </div>
  //           <span className="material-icons" style={{ fontSize: '30px' }}>
  //             sentiment_very_dissatisfied
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>

  //     </>
  //   );
  //       }
  //       else{
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap -m-3 mb-5">
          <div className="w-full sm:w-1/2 md:w-1/4 p-3">
            <Skeleton isLoaded={statusData}>
              <div className="bg-custom-blue text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{statusData ? allReviews.data.length : ""}</h3>

                  <h6 className="text-lg font-normal text-gray-600">Reviews</h6>
                </div>
                <span className="material-icons text-3xl">mode_comment</span>
              </div>
            </Skeleton>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-3">
            <div className="bg-custom-green text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
              <div>
                <h3 className="text-2xl font-bold">42,000</h3>
                <h6 className="text-lg font-normal text-gray-600">Positive Reviews</h6>
              </div>
              <span className="material-icons text-3xl">sentiment_satisfied_alt</span>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-3">
            <div className="bg-custom-yellow text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
              <div>
                <h3 className="text-2xl font-bold">10,000</h3>
                <h6 className="text-lg font-normal text-gray-600">Neutral Reviews</h6>
              </div>
              <span className="material-icons text-3xl">sentiment_neutral</span>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 p-3">
            <div className="bg-custom-red text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
              <div>
                <h3 className="text-2xl font-bold">5,000</h3>
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
