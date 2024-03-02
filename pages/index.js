import Image from "next/image";
import Navbar from "@/components/navbar";
import React, { useEffect, useState, useRef } from 'react';
import { Card, Skeleton } from "@nextui-org/react";
import { Chart } from "chart.js/auto";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button
} from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";


export default function Home() {
  const [allReviews, setAllReviews] = useState([]);
  const [statusData, setStatusData] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [myChart, setMyChart] = useState(null);
  const [count_all, setCountAll] = useState(0)
  const [count_pos, setCountPos] = useState(0)
  const [count_neu, setCountNeu] = useState(0)
  const [count_neg, setCountNeg] = useState(0)
  const [selectBrand, setSelectBrand] = React.useState(new Set(["Apple","Oppo","Samsung","Vivo","Xiaomi","Huawei"]));
  // const [brandModel, setBrand] = React.useState([{name:"All"}, "Apple", "Samsung", "Oppo", "Vivo", "Xiaomi", "Huawei"]);
  // const [brandModel, setBrand] = React.useState(["All", "Apple", "Samsung", "Oppo", "Vivo", "Xiaomi", "Huawei"]);
  const [brandModel, setBrand] = React.useState(["Apple","Oppo","Samsung","Vivo","Xiaomi","Huawei"]);

  const [a,seta] = useState(['a','b'])
  const [brandsData, setBrandsData] = useState({})

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
      // setAllReviews(data);
      await setCountAll(data.overviews.count_all)
      await setCountPos(data.overviews.count_pos)
      await setCountNeu(data.overviews.count_neu)
      await setCountNeg(data.overviews.count_neg)
      await setBrandsData(data.brands)
      setStatusData(true);
      // setIsLoaded(true); // Set loading state after fetching data
    };

    fetchData();
  }, []);

  if (chartRef.current) {
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy()
    }
    const context = chartRef.current.getContext("2d")
    let a= []
    let array_pos = []
    let array_neu = []
    let array_neg = []
    selectBrand.forEach(element => {
      a.push(element)
      let total = brandsData[element]['count_pos'] + brandsData[element]['count_neu'] + brandsData[element]['count_neg']
      array_pos.push(brandsData[element]['count_pos'] / total * 100)
      array_neu.push(brandsData[element]['count_neu'] / total * 100)
      array_neg.push(brandsData[element]['count_neg'] / total * 100)
    });
    const newChart = new Chart(context, {
      type: "bar",
      data: {
        labels: a,
        datasets: [{
          label: 'Positive',
          data: array_pos,
          borderWidth: 1,
          backgroundColor: '#70c1b3'
        }, {
          label: 'Neutral',
          data: array_neu,
          borderWidth: 1,
          backgroundColor: '#EFBF38'
        }, {
          label: 'Negative',
          data: array_neg,
          borderWidth: 1,
          backgroundColor: '#dd7373'
        }]
      },
      options: {
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

  const changeCheckBox = (select) => {
    let result = []
    selectBrand.forEach(element => {
      result.push(element)
    });

    // seta(result)
  }



  return (
    <div className="bg-costom-pbg">
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap -m-3 mb-5">
          <div className="w-full sm:w-1/2 md:w-1/4 p-3">
            <Skeleton isLoaded={statusData} className="  shadow-md rounded-[20px]">
              <div className="bg-custom-blue text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{count_all}</h3>

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
                      count_pos
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

                      count_neu
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
                      count_neg
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


                  <Select
                    label="Brand"
                    selectionMode="multiple"
                    placeholder="Select Brand"
                    selectedKeys={selectBrand}
                    onSelectionChange={setSelectBrand}
                  >
                    {brandModel.map((item) => (
                      <SelectItem key={item} value={item} onChange={changeCheckBox(item)}>
                       {item}
                      </SelectItem>
                    ))}
                  </Select>


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
