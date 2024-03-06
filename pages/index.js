import Image from "next/image";
import Navbar from "@/components/navbar";
import React, { useEffect, useState, useRef } from 'react';
import { Card, Skeleton } from "@nextui-org/react";
import { Chart } from "chart.js/auto";
import { animals } from "./test";
import { phones, models } from "./smartdata";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import anychart from 'anychart';
import TagCloud from '@/components/TagCloud';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input } from "@nextui-org/react";



export default function Home() {
  const [allReviews, setAllReviews] = useState([]);
  const [statusData, setStatusData] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [myChart, setMyChart] = useState(null);
  const [count_all, setCountAll] = useState(0)
  const [count_pos, setCountPos] = useState(0)
  const [count_neu, setCountNeu] = useState(0)
  const [count_neg, setCountNeg] = useState(0)
  const [selectBrand, setSelectBrand] = React.useState(new Set(["Apple", "Oppo", "Samsung", "Vivo", "Xiaomi", "Huawei"]));
  // const [brandModel, setBrand] = React.useState([{name:"All"}, "Apple", "Samsung", "Oppo", "Vivo", "Xiaomi", "Huawei"]);
  // const [brandModel, setBrand] = React.useState(["All", "Apple", "Samsung", "Oppo", "Vivo", "Xiaomi", "Huawei"]);
  const [brandModel, setBrand] = React.useState(["Apple", "Oppo", "Samsung", "Vivo", "Xiaomi", "Huawei"]);

  const [a, seta] = useState(['a', 'b'])
  const [brandsData, setBrandsData] = useState({})

  const chartRef = useRef(null)
  const donutChartRef = useRef(null)
  const barChartRef = useRef(null)



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
    let a = []
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

  if (donutChartRef.current) {
    if (donutChartRef.current.chart) {
      donutChartRef.current.chart.destroy();
    }
    const donutContext = donutChartRef.current.getContext("2d");
    const newDonutChart = new Chart(donutContext, {
      type: "doughnut",
      plugins: [ChartDataLabels],
      data: {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [{
          data: [20, 10, 15],
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Sentiment Analysis Overview',
            font: {
              size: 18,
              family: 'Kanit',
            },
            position: 'top'
          },
          datalabels: {
            display: true,
            align: 'end',
            anchor: 'end',
            formatter: (value, context) => {
              return context.chart.data.labels[context.dataIndex] + ': ' + value + '%';
            },
            color: '#000',
            font: {
              size: 14,
              family: 'Kanit',
            }
          }
        },
        maintainAspectRatio: false,
        responsive: true
      }

    });
    donutChartRef.current.chart = newDonutChart
  }

  if (barChartRef.current) {
    if (barChartRef.current.chart) {
      barChartRef.current.chart.destroy();
    }
    const totalCountSm1 = 360 + 500 + 400;
    const totalCountSm2 = 300 + 600 + 300;
    const totalCountSm3 = 320 + 550 + 350;
    const totalCountSm4 = 340 + 520 + 370;
    const totalCountSm5 = 350 + 510 + 360;
    const totalCountSm6 = 330 + 530 + 380;

    // Convert counts to percentages
    const positivePercentageSm1 = (360 / totalCountSm1) * 100;
    const neutralPercentageSm1 = (500 / totalCountSm1) * 100;
    const negativePercentageSm1 = (400 / totalCountSm1) * 100;

    const positivePercentageSm2 = (300 / totalCountSm2) * 100;
    const neutralPercentageSm2 = (600 / totalCountSm2) * 100;
    const negativePercentageSm2 = (300 / totalCountSm2) * 100;

    const positivePercentageSm3 = (320 / totalCountSm3) * 100;
    const neutralPercentageSm3 = (550 / totalCountSm3) * 100;
    const negativePercentageSm3 = (350 / totalCountSm3) * 100;

    const positivePercentageSm4 = (340 / totalCountSm4) * 100;
    const neutralPercentageSm4 = (520 / totalCountSm4) * 100;
    const negativePercentageSm4 = (370 / totalCountSm4) * 100;

    const positivePercentageSm5 = (350 / totalCountSm5) * 100;
    const neutralPercentageSm5 = (510 / totalCountSm5) * 100;
    const negativePercentageSm5 = (360 / totalCountSm5) * 100;

    const positivePercentageSm6 = (330 / totalCountSm6) * 100;
    const neutralPercentageSm6 = (530 / totalCountSm6) * 100;
    const negativePercentageSm6 = (380 / totalCountSm6) * 100;


    const barcontext = barChartRef.current.getContext("2d");
    const barChart = new Chart(barcontext, {
      type: "bar",
      data: {
        labels: ['Camera', 'Battery', 'Screen', 'Performance', 'Price', 'Other'],
        datasets: [{
          label: 'Positive',
          data: [positivePercentageSm1, positivePercentageSm2, positivePercentageSm3, positivePercentageSm4, positivePercentageSm5, positivePercentageSm6],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          stack: 'Stack 1'
        }, {
          label: 'Neutral',
          data: [neutralPercentageSm1, neutralPercentageSm2, neutralPercentageSm3, neutralPercentageSm4, neutralPercentageSm5, neutralPercentageSm6],
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
          stack: 'Stack 1'
        }, {
          label: 'Negative',
          data: [negativePercentageSm1, negativePercentageSm2, negativePercentageSm3, negativePercentageSm4, negativePercentageSm5, negativePercentageSm6],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          stack: 'Stack 1'
        }]
      },
      options: {
        indexAxis: 'y', // Change to horizontal orientation
        responsive: true,
        scales: {
          x: {
            stacked: true,
            max: 100, // ให้แกน x เต็ม 100%
            ticks: {
              callback: function (value) {
                return value + '%';
              }
            }
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Customer feelings towards each aspect of smartphones',
            font: {
              size: 18,
              family: 'Kanit',
            },
            position: 'top'
          },
          legend: {
            display: true,
          },
          datalabels: {
            color: '#000000',
            anchor: 'center',
            align: 'center',
            clamp: true,
            formatter: function (value, context) {
              return value.toFixed(0) + '%';
            }
          }
        }
      },
      plugins: [ChartDataLabels] // ใช้ปลั๊กอิน datalabels
    });
    barChartRef.current.chart = barChart;
  }





  const changeCheckBox = (select) => {
    let result = []
    selectBrand.forEach(element => {
      result.push(element)
    });

    // seta(result)
  }

  return (
    <div className="bg-costom-pbg w-full h-full pb-2">
      <Navbar />
      <div className="container mx-auto mt-8 ">
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
          <div className="w-full">
            <Skeleton isLoaded={statusData} className="shadow-md rounded-[20px] h-10%">
              <div className="card border-0  p-4"
                style={{
                  boxShadow: "5px 5px 5px 5px rgba(197, 197, 197, 0.2)",
                  borderRadius: "20px",
                  backgroundColor: "white"
                }}>
                <div className="card-body">
                  <div className="flex justify-end align-items-center"
                    style={{ width: '200px', height: '50px' }}>
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
                    <canvas ref={chartRef} height="120"></canvas>
                  </div>
                </div>
              </div>
            </Skeleton>
          </div>
        </div>

        {/* filter */}
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-5 mb-5 justify-end">
          <Select
            label="Select Brand"
            defaultSelectedKeys={["All"]}
            className="max-w-xs"
            style={{ boxShadow: "2px 2px 2px 2px rgba(197, 197, 197, 0.2)", backgroundColor: "white" }}
          >
            {phones.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Select Model"
            placeholder="Select model"
            className="max-w-xs "
            style={{ boxShadow: "2px 2px 2px 2px rgba(197, 197, 197, 0.2)", backgroundColor: "white" }}
            color="default"
            defaultSelectedKeys={["All"]}

          >
            {models.map((animal) => (
              <SelectItem key={animal.value} value={animal.value} >
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* กราฟด้านล่าง */}
        <div class="grid grid-cols-2 gap-2 mt-5">
          <Skeleton isLoaded={statusData} className="  shadow-md rounded-[20px]" style={{ boxShadow: "5px 5px 5px 5px rgba(197, 197, 197, 0.2)" }}>
            <div className="bg-white p-4"
            >
              <canvas ref={donutChartRef} className="bg-white p-4" ></canvas>
            </div>
          </Skeleton>
          <Skeleton isLoaded={statusData} className="  shadow-md rounded-[20px]" style={{
            boxShadow: "5px 5px 5px 5px rgba(197, 197, 197, 0.2)"
          }}>
            <div className="bg-white py-4 px-5"  >
              <Select
                label="Aspects"
                placeholder="Select an animal"
                selectionMode="multiple"
                className="max-w-xs justify-end flex"
                style={{ width: '200px', height: '50px' }}
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
              <canvas ref={barChartRef} ></canvas>
            </div>
          </Skeleton>

        </div>
        <div class="grid grid-cols-2 gap-2 mt-5 mb-5">
          <Skeleton isLoaded={statusData} style={{ height: '100%' }} className=" shadow-md rounded-[20px]">

            <Table aria-label="Example static collection table" style={{ height: '100%' }} >
              <TableHeader>
                <TableColumn colSpan={3}></TableColumn>
                <TableColumn>Aspect</TableColumn>
                <TableColumn>Sentiment</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell colSpan={3} style={{ wordBreak: 'break-word' }}>TonyReicherccccปแแแแแแแแแccccccccccccccccccccccccccccccct</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell colSpan={3} style={{ wordBreak: 'break-word' }}>Zoey Lang</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell colSpan={3} style={{ wordBreak: 'break-word' }}>Jane Fisher</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="4" style={{ wordBreak: 'break-word' }}>
                  <TableCell colSpan={3}>William Howard</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Vacation</TableCell>
                </TableRow>
                <TableRow key="5" style={{ wordBreak: 'break-word' }}>
                  <TableCell colSpan={3}>William Howard</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Vacation</TableCell>
                </TableRow>
                <TableRow key="5" style={{ wordBreak: 'break-word' }}>
                  <TableCell colSpan={3}>William Howard</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Vacation</TableCell>
                </TableRow>
                <TableRow key="5" style={{ wordBreak: 'break-word' }}>
                  <TableCell colSpan={3}>William Howard</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Vacation</TableCell>
                </TableRow>
                <TableRow key="5" style={{ wordBreak: 'break-word' }}>
                  <TableCell colSpan={3}>William Howard</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Vacation</TableCell>
                </TableRow>
                <TableRow key="5" style={{ wordBreak: 'break-word' }}>
                  <TableCell colSpan={3}>William Howard</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Vacation</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Skeleton>
          <div className="bg-white">
            <TagCloud />
            <div class="grid grid-cols-2 gap-2 mt-5">

            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-5"> 

          </div>
        </div >
      </div >
    </div>
  )

}

