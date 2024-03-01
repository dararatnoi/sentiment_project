import Image from "next/image";
import Navbar from "@/components/navbar";
import React, { useEffect, useState, useRef } from 'react';
import { Card, Skeleton } from "@nextui-org/react";
import { Chart } from "chart.js/auto";


export default function Home() {
  const [allReviews, setAllReviews] = useState([]);
  const [statusData, setStatusData] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [myChart, setMyChart] = useState(null);
  let count_pos = 0;
  let count_neu = 0;
  let count_neg = 0;
  const chartRef = useRef(null)


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

    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }

      const context = chartRef.current.getContext("2d")
      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: ['Apple', 'Samsung', 'Oppo', 'Vivo', 'Xiaomi', 'Huawei'],
          datasets: [{
            label: 'Positive',
            data: [6000, 5000, 4000, 4300, 1200, 3200],
            borderWidth: 1,
            backgroundColor: '#70c1b3'
          }, {
            label: 'Neutral',
            data: [2000, 3030, 1000, 1500, 1200, 1200],
            borderWidth: 1,
            backgroundColor: '#EFBF38'
          }, {
            label: 'Negative',
            data: [4500, 1234, 1000, 1300, 1400, 2000],
            borderWidth: 1,
            backgroundColor: '#dd7373'
          }]
        },
        options:{
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Customer Feelings for Smartphone',
              font: {
                size: 18,
                family: 'Kanit',
              },
              position: 'top'
            }
          }
        }
      })

      chartRef.current.chart = newChart
    }

  }, []);



return (
  <div className="bg-costom-pbg">
    <Navbar />
    <div className="container mx-auto mt-8">
      <div className="flex flex-wrap -m-3 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/4 p-3">
          <Skeleton isLoaded={statusData} className="  shadow-md rounded-[20px]">
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
          <Skeleton isLoaded={statusData} className="  shadow-md rounded-[20px]">
            <div className="bg-custom-green text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                  {
                    statusData ? (
                      allReviews.map((pos => {
                        if (pos.Sentiment_Label == 'pos') {
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
          </Skeleton>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4 p-3">
          <Skeleton isLoaded={statusData} className="  shadow-md rounded-[20px]">
            <div className="bg-custom-yellow text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                  {
                    statusData ? (
                      allReviews.map((pos => {
                        if (pos.Sentiment_Label == 'neu') {
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
          </Skeleton>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4 p-3">
          <Skeleton isLoaded={statusData} className="  shadow-md rounded-[20px]">
            <div className="bg-custom-red text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                  {
                    statusData ? (
                      allReviews.map((pos => {
                        if (pos.Sentiment_Label == 'neg') {
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
          </Skeleton>
        </div>

      </div>


      <div className="row col-12  mb-5">
        <div className="card border-0 hov-primary"
          style={{
            boxShadow: "5px 5px 5px 5px rgba(197, 197, 197, 0.2)",
            borderRadius: "20px",
          }}>
          <div className="card-body">
            <div className="d-flex justify-content-end align-items-center ">

              <div className="relative inline-block text-left">
                <button className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center" type="button" id="dropdownMenuButton">
                  Select Brands
                </button>
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                  <li>
                    <input type="checkbox" id="allBrandsCheckbox" className="form-checkbox h-5 w-5 text-gray-600" value="all" defaultChecked />
                    <label htmlFor="allBrandsCheckbox" className="ml-2 text-sm text-gray-700">All</label>
                  </li>
                  <li>
                    <input type="checkbox" id="appleCheckbox" className="form-checkbox h-5 w-5 text-gray-600" value="apple" defaultChecked />
                    <label htmlFor="appleCheckbox" className="ml-2 text-sm text-gray-700">Apple</label>
                  </li>
                  <li>
                    <input type="checkbox" id="samsungCheckbox" className="form-checkbox h-5 w-5 text-gray-600" value="samsung" defaultChecked />
                    <label htmlFor="samsungCheckbox" className="ml-2 text-sm text-gray-700">Samsung</label>
                  </li>
                  <li>
                    <input type="checkbox" id="huaweiCheckbox" className="form-checkbox h-5 w-5 text-gray-600" value="huawei" defaultChecked />
                    <label htmlFor="huaweiCheckbox" className="ml-2 text-sm text-gray-700">Huawei</label>
                  </li>
                  <li>
                    <input type="checkbox" id="vivoCheckbox" className="form-checkbox h-5 w-5 text-gray-600" value="vivo" defaultChecked />
                    <label htmlFor="vivoCheckbox" className="ml-2 text-sm text-gray-700">Vivo</label>
                  </li>
                  <li>
                    <input type="checkbox" id="xiaomiCheckbox" className="form-checkbox h-5 w-5 text-gray-600" value="xiaomi" defaultChecked />
                    <label htmlFor="xiaomiCheckbox" className="ml-2 text-sm text-gray-700">Xiaomi</label>
                  </li>
                  <li>
                    <input type="checkbox" id="oppoCheckbox" className="form-checkbox h-5 w-5 text-gray-600" value="oppo" defaultChecked />
                    <label htmlFor="oppoCheckbox" className="ml-2 text-sm text-gray-700">Oppo</label>
                  </li>
                </ul>
              </div>

            </div>
            <div>
              <canvas ref={chartRef} width="50" height="18"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

)

}
