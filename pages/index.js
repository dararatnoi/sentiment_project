import Image from "next/image";
import Navbar from "@/components/navbar";
import React, { useEffect, useState, useRef } from 'react';
import { Card, Skeleton } from "@nextui-org/react";
import { Chart } from "chart.js/auto";
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
  const [selectBrand, setSelectBrand] = React.useState(new Set(["Apple", "OPPO", "Samsung", "vivo", "Xiaomi", "Huawei"]));
  // const [brandModel, setBrand] = React.useState([{name:"All"}, "Apple", "Samsung", "Oppo", "Vivo", "Xiaomi", "Huawei"]);
  // const [brandModel, setBrand] = React.useState(["All", "Apple", "Samsung", "Oppo", "Vivo", "Xiaomi", "Huawei"]);
  const [brandModel, setBrand] = React.useState(["Apple", "OPPO", "Samsung", "vivo", "Xiaomi", "Huawei"]);

  const [a, seta] = useState(['a', 'b'])
  const [brandsData, setBrandsData] = React.useState({})
  //2ปุ่ม
  const [brandList, setBrandList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('Apple'); //เอามาจากนี้

  const [models, setModels] = useState([]);  //เอาไว้ทำ key
  const [showModel, setShowModel] = useState([]) //เอาไว้แสดงผล
  const [defaultSelectModel, setDefaultSelectModel] = useState('iPhone 12')
  const [selectedModel, setSelectedModel] = useState(defaultSelectModel); //user selected


  const chartRef = useRef(null)
  const donutChartRef = useRef(null)
  const barChartRef = useRef(null)

  const [selectAspect, setSelectAspect] = React.useState(new Set(["Camera", "Battery", "Screen", "Performance", "Price"]));
  const [Modelasp, setAspect] = React.useState(["Camera", "Battery", "Screen", "Performance", "Price"]);
  const [aspectsData, setAspectsData] = useState({})
  const [review, setReview] = useState({})




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
    }
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
      if (brandsData[element] && brandsData[element]['count_pos'] !== undefined && brandsData[element]['count_neu'] !== undefined && brandsData[element]['count_neg'] !== undefined) {
        a.push(element);
        let total = brandsData[element]['count_pos'] + brandsData[element]['count_neu'] + brandsData[element]['count_neg'];
        array_pos.push(brandsData[element]['count_pos'] / total * 100);
        array_neu.push(brandsData[element]['count_neu'] / total * 100);
        array_neg.push(brandsData[element]['count_neg'] / total * 100);
      }
    })
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
  //donut
  const [model_pos, setModelCountpos] = useState(0)
  const [model_nue, setModelCountneu] = useState(0)
  const [model_neg, setModelCountneg] = useState(0)


  useEffect(() => {
    const fetchData2 = async () => {
      let res2 = await fetch(`http://localhost:3000/api/brandmodel?brand=${selectedBrand}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data2 = await res2.json();
      console.log(data2);


      const result = data2[0].keyword_search;
      // const result = data2
      const resultSet = new Set(result);
      await setModels(resultSet);
      await setDefaultSelectModel(result[0]);
      await setSelectedModel(result[0]);
      await setShowModel(result)
      // console.log("gggg", result[0]);
      // console.log("model", selectedModel)
      console.log("kkkk", result)
      console.log('====================================');
      console.log(showModel);
      console.log('====================================');
      console.log('====================================');
      console.log(selectedModel);
      console.log('====================================');

    };

    fetchData2();
    fetchDataBrand();

  }, [defaultSelectModel, setDefaultSelectModel, selectedBrand]);



  const fetchDataModel = (e) => {
    setSelectedModel(e.target.value);
    fetchDataBrand();
  }


  const fetchDataBrand = async () => {
    console.log("Test fetch data => ", selectedModel)
    if (selectedModel === "iPhone 12") {
      let brandres = await fetch(`http://localhost:3000/api/countsentiment`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let countmodel = await brandres.json();
      console.log("yshs", countmodel)
      await setModelCountpos(countmodel.overviews.model_pos)
      await setModelCountneu(countmodel.overviews.model_neu)
      await setModelCountneg(countmodel.overviews.model_neg)
      await setAspectsData(countmodel.Aspect)
      await setReview(countmodel.Aspect)
    } else {
      let brandres = await fetch(`http://localhost:3000/api/countsentiment?brand=${selectedBrand}&model=${selectedModel}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let countmodel = await brandres.json();
      console.log("yshs", countmodel)
      await setModelCountpos(countmodel.overviews.model_pos)
      await setModelCountneu(countmodel.overviews.model_neu)
      await setModelCountneg(countmodel.overviews.model_neg)
      await setAspectsData(countmodel.Aspect)
      // await setReview(countmodel.Review.reviews_pos[0].reviews_pos)
      // console.log("jjnk",review)
    }
  };


  if (donutChartRef.current) {
    if (donutChartRef.current.chart) {
      donutChartRef.current.chart.destroy();
    }
    const donutContext = donutChartRef.current.getContext("2d");
    const total = model_pos + model_nue + model_neg;
    const newDonutChart = new Chart(donutContext, {
      type: "doughnut",
      plugins: [ChartDataLabels],
      data: {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [{
          data: [
            (model_pos / total) * 100,
            (model_nue / total) * 100,
            (model_neg / total) * 100
          ],
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
            align: 'center',
            anchor: 'center',
            formatter: (value, context) => {
              return value.toFixed(2) + '%';
              //return context.chart.data.labels[context.dataIndex] + ': ' + value.toFixed(2) + '%';
            },
            color: '#000',
            font: {
              size: 14,
              family: 'Kanit',
            }
          }
        },
        maintainAspectRatio: false,
        // responsive: true
      }
    });
    donutChartRef.current.chart = newDonutChart;
  }


  useEffect(() => {
    if (barChartRef.current) {
      if (barChartRef.current.chart) {
        barChartRef.current.chart.destroy();
      }

      const barcontext = barChartRef.current.getContext("2d");
      let a = [];
      let array_pos = [];
      let array_neu = [];
      let array_neg = [];

      selectAspect.forEach(element => {
        if (
          aspectsData[element] &&
          aspectsData[element]["aspect_pos"] !== undefined &&
          aspectsData[element]["aspect_neu"] !== undefined &&
          aspectsData[element]["aspect_neg"] !== undefined
        ) {
          a.push(element);
          let total =
            aspectsData[element]["aspect_pos"] +
            aspectsData[element]["aspect_neu"] +
            aspectsData[element]["aspect_neg"];
          array_pos.push((aspectsData[element]["aspect_pos"] / total) * 100);
          array_neu.push((aspectsData[element]["aspect_neu"] / total) * 100);
          array_neg.push((aspectsData[element]["aspect_neg"] / total) * 100);
        }
      });
      console.log("tas", array_neu)
      const barChart = new Chart(barcontext, {
        type: "bar",
        data: {
          labels: a,
          datasets: [
            {
              label: "Positive",
              data: array_pos,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              stack: "Stack 1",
            },
            {
              label: "Neutral",
              data: array_neu,
              backgroundColor: "rgba(255, 206, 86, 0.5)",
              stack: "Stack 1",
            },
            {
              label: "Negative",
              data: array_neg,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              stack: "Stack 1",
            },
          ],
        },
        options: {
          indexAxis: "y", // Change to horizontal orientation
          responsive: true,
          scales: {
            x: {
              stacked: true,
              max: 100, // ให้แกน x เต็ม 100%
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
              },
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Customer feelings towards each aspect of smartphones",
              font: {
                size: 18,
                family: "Kanit",
              },
              position: "top",
            },
            legend: {
              display: true,
            },
            datalabels: {
              color: "#000000",
              anchor: "center",
              align: "center",
              clamp: true,
              formatter: function (value, context) {
                return value.toFixed(0) + "%";
              },
            },
          },
        },
        plugins: [ChartDataLabels], // ใช้ปลั๊กอิน datalabels
      });

      barChartRef.current.chart = barChart;
    }
  }, [selectAspect, aspectsData]);

  // useEffect(() => {
  //   // Ensure defaultSelectModel is set before updating selectedModel
  //   if (defaultSelectModel !== '') {
  //     setSelectedModel(defaultSelectModel);
  //   }
  // }, [defaultSelectModel]);


  // const changeCheckBox = (select) => {
  //   let result = []
  //   selectBrand.forEach(element => {
  //     result.push(element)
  //   });

  //   // seta(result)
  // }

  return (
    <div className="bg-costom-pbg w-full h-full pb-2">
      <Navbar />
      <div className="container mx-auto mt-8 ">
        <div className="flex flex-wrap -m-3 mb-5">
          <div className="w-full sm:w-1/2 md:w-1/4 p-3">
            <Skeleton isLoaded={statusData} className="  shadow-md rounded-[20px]">
              <div className="bg-custom-blue text-white shadow-md rounded-[20px] p-4 py-6 pb-8 flex justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{count_all.toLocaleString()}</h3>

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
                      count_pos.toLocaleString()
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

                      count_neu.toLocaleString()
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
                      count_neg.toLocaleString()
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
                        <SelectItem key={item} value={item} >
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
        <Skeleton isLoaded={statusData && selectedModel !== ''}>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-5 mb-5 justify-end">
            <Select
              label="Select Brand"
              // value={selectedBrand} 
              selectedKeys={[selectedBrand]}
              onChange={(e) => setSelectedBrand(e.target.value)}
              defaultSelectedKeys={[selectedBrand]}
              className="max-w-xs"
              style={{ boxShadow: "2px 2px 2px 2px rgba(197, 197, 197, 0.2)", backgroundColor: "white" }}
            // onChange={(value) => setSelectedBrand(value)}
            >
              {brandModel.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </Select>
            {/* <Select
              label="Select Model"
              className="max-w-xs "
              style={{ boxShadow: "2px 2px 2px 2px rgba(197, 197, 197, 0.2)", backgroundColor: "white" }}
              color="default"
              defaultValue={selectedModel}
              onSelectionChange={setSelectedModel}
              // value={selectedModel}
            >
              {showModel.map((model) => 
                <SelectItem  key={model} value={model}>
                  {model}
                </SelectItem>
              )}
            </Select> */}
            <Select
              label="Select Model"
              className="max-w-xs "
              style={{ boxShadow: "2px 2px 2px 2px rgba(197, 197, 197, 0.2)", backgroundColor: "white" }}
              color="default"
              selectedKeys={[selectedModel]}
              onChange={fetchDataModel}

              defaultSelectedKeys={[selectedModel]}
            >
              {showModel.map((model) =>
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              )}
            </Select>
          </div>
        </Skeleton>

        {/* กราฟด้านล่าง */}
        <div className="grid grid-cols-2 gap-2 mt-5">

          <div className="bg-white p-4 shadow-md rounded-[20px]" style={{ boxShadow: "5px 5px 5px 5px rgba(197, 197, 197, 0.2)" }}
          >
            <canvas ref={donutChartRef} className="bg-white p-4 " ></canvas>
          </div>

          <div className="bg-white py-4 px-5 shadow-md rounded-[20px]" style={{
            boxShadow: "5px 5px 5px 5px rgba(197, 197, 197, 0.2)"
          }} >
            <Select
              label="Aspects"
              placeholder="Select Aspect"
              selectionMode="multiple"
              selectedKeys={[...selectAspect]}
              onSelectionChange={(selected) => setSelectAspect(new Set(selected))}
              className="max-w-xs justify-end flex"
              style={{ width: '200px', height: '50px' }}
            >
              {Modelasp.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>

            <canvas ref={barChartRef} ></canvas>
          </div>

        </div>
        <div className="grid grid-cols-2 gap-2 mt-5 mb-5">

          <Table aria-label="Example static collection table" style={{ height: '100%' }} >
            <TableHeader>
              <TableColumn ></TableColumn>
              <TableColumn colSpan={3}>Review</TableColumn>
              <TableColumn>Sentiment</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Price</TableCell>
                <TableCell colSpan={3} style={{ wordBreak: 'break-word' }}>TonyReicherccccปแแแแแแแแแccccccccccccccccccccccccccccccct</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Price</TableCell>
                <TableCell colSpan={3} style={{ wordBreak: 'break-word' }}>Zoey Lang</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Price</TableCell>
                <TableCell colSpan={3} style={{ wordBreak: 'break-word' }}>Jane Fisher</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4" style={{ wordBreak: 'break-word' }}>
                <TableCell>Price</TableCell>
                <TableCell colSpan={3}>William Howard</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
              <TableRow key="5" style={{ wordBreak: 'break-word' }}>
                <TableCell>Price</TableCell>
                <TableCell colSpan={3}>William Howard</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
              <TableRow key="6" style={{ wordBreak: 'break-word' }}>
                <TableCell>Price</TableCell>
                <TableCell colSpan={3}>William Howard</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>

            </TableBody>
          </Table>

          <div className="bg-white">
            <TagCloud />
            <div className="grid grid-cols-2 gap-2 mt-5">

            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">

          </div>
        </div >
      </div >
    </div>
  )

}

