// import React from 'react'
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { animals } from "./testdata";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import anychart from 'anychart';


export default function compare() {
  // const [allReviews, setAllReviews] = useState([]);
  // const [statusData, setStatusData] = React.useState(false);
  // const [isLoaded, setIsLoaded] = React.useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [smartphoneModels, setSmartphoneModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');


  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/compare_smartphonename');
        const data = await response.json();
        const brandNames = Object.keys(data);
        setBrands(brandNames); // Corrected line
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);


  // const fetchSmartphoneModels = async (brand) => {
  //   try {
  //     const response = await fetch('http://localhost:3000/api/smartphonename');
  //     const data = await response.json();
  //     const modelsSmp = data[brand];
  //     setSmartphoneModels(modelsSmp);
  //   } catch (error) {
  //     console.error(`Error fetching smartphones for ${brand}:`, error);
  //   }
  // };

  const SelectedSmartphone = (select) => {
    let result = []
    selectedBrand.forEach(element => {
      result.push(element)
    });
  }

  // const handleBrandChange = (selectedBrand) => {
  //   setSelectedBrand(selectedBrand);
  //   fetchSmartphoneModels(selectedBrand);
  // };

  const handleModelChange = (selectedModel) => {
    setSelectedModel(selectedModel);
  };
  // {

  useEffect(() => {
    const rdChartElement = document.getElementById('RadarChart');
    if (rdChartElement) {
      var rdChartData = {
        labels: ["Camera", "Battery", "Screen", "Performance", "Price"],
        datasets: [{
          label: 'iPhone 14',
          data: [6.5, 7.1, 5.4, 9.8, 8.4],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Samsung Galaxy S23',
          data: [2.8, 4.8, 4.0, 1.9, 9.6],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)'
        }]
      };

      const rdChartContext = rdChartElement.getContext('2d');
      // Create the radar chart
      let RadarChart = new Chart(rdChartContext, {
        type: 'radar',
        data: rdChartData,
        options: {
          elements: {
            line: {
              borderWidth: 3
            }
          }
        }
      });

      // Cleanup function to destroy the chart instance
      return () => {
        RadarChart.destroy();
      };
    }
  }, []);

  // }
  // Ensure the DOM element exists before initializing the chart
  // const rdChartElement = document.getElementById('RadarChart');
  // if (rdChartElement) {
  //   var rdChartData = {
  //     labels: ["Camera", "Battery", "Screen", "Performance", "Price"],
  //     datasets: [{
  //       label: 'iPhone 14',
  //       data: [6.5, 7.1, 5.4, 9.8, 8.4],
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgb(255, 99, 132)',
  //     },
  //     {
  //       label: 'Samsung Galaxy S23',
  //       data: [2.8, 4.8, 4.0, 1.9, 9.6],
  //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //       borderColor: 'rgb(54, 162, 235)'
  //     }]
  //   };

  //   const rdChartContext = rdChartElement.getContext('2d');
  //   // Create the radar chart
  //   let RadarChart = new Chart(rdChartContext, {
  //     type: 'radar',
  //     data: rdChartData,
  //     options: {
  //       elements: {
  //         line: {
  //           borderWidth: 3
  //         }
  //       }
  //     }
  //   });

  //   // Cleanup function to destroy the chart instance
  //   return () => {
  //     RadarChart.destroy();
  //   };
  // }


  useEffect(() => {
    const totalCountSm1 = 300 + 100 + 500;
    const totalCountSm2 = 400 + 300 + 700;

    // Convert counts to percentages
    const positivePercentageSm1 = (300 / totalCountSm1) * 100;
    const neutralPercentageSm1 = (100 / totalCountSm1) * 100;
    const negativePercentageSm1 = (500 / totalCountSm1) * 100;

    const positivePercentageSm2 = (400 / totalCountSm2) * 100;
    const neutralPercentageSm2 = (300 / totalCountSm2) * 100;
    const negativePercentageSm2 = (700 / totalCountSm2) * 100;

    const stBarChartElement = document.getElementById('fullStackBarChart');
    // Chart.register(ChartDataLabels);
    // Chart.defaults.set('plugins.datalabels', {
    //   color: '#FE777B'
    // });
    if (stBarChartElement) {
      const stBarChartContext = stBarChartElement.getContext('2d');

      let stackBarChart = new Chart(stBarChartContext, {
        type: 'bar',
        plugins: [ChartDataLabels],
        data: {
          labels: ['Category A', 'Category B'], // Labels for the categories
          datasets: [{
            label: 'Positive',
            data: [positivePercentageSm1, positivePercentageSm2], // Adjust your data here (e.g., 300 for Category A, 500 for Category B)
            backgroundColor: 'rgba(75, 192, 192, 0.5)', // Adjust colors as needed
            stack: 'Stack 1' // Stack name for stacking
          }, {
            label: 'Neutral',
            data: [neutralPercentageSm1, neutralPercentageSm2], // Adjust your data here (e.g., 100 for Category A, 300 for Category B)
            backgroundColor: 'rgba(255, 206, 86, 0.5)', // Adjust colors as needed
            stack: 'Stack 1' // Stack name for stacking
          }, {
            label: 'Negative',
            data: [negativePercentageSm1, negativePercentageSm2], // Adjust your data here (e.g., 500 for Category A, 200 for Category B)
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Adjust colors as needed
            stack: 'Stack 1' // Stack name for stacking
          }]
        },
        // plugins: ['datalabels'],
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Horizontal Stacked Bar Chart'
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
          },
          indexAxis: 'y', // Change to horizontal orientation
          responsive: true,
          scales: {
            x: {
              stacked: true,
              ticks: {
                callback: function (value) {
                  return value + '%';
                }
              }
            },
            y: {
              stacked: true,
              max: 100,
              beginAtZero: true
            }
          }
        }

      });
      return () => {
        stackBarChart.destroy();
      };
    }
  }, []);

  useEffect(() => {
    anychart.onDocumentReady(function () {
      // Create data
      var data = [
        { x: 'กล้องดีมาก', value: 80 },
        { x: 'แบต', value: 56 },
        { x: 'ห่วยแตก', value: 44 },
        { x: 'แพงมาก', value: 40 },
        { x: 'สวยงาม', value: 36 },
        { x: 'ยอดเยี่ยม', value: 32 },
        { x: 'ดีมาก', value: 28 },
        { x: 'แนะนำ', value: 24 },
        { x: 'ใช้งานได้ดี', value: 20 },
        { x: 'หน้าจอห่วย', value: 12 },
        { x: 'หล้องไม่ชัด', value: 12 }
      ];

      var chart = anychart.tagCloud(data);
      chart.container('wordCloudOverall');
      chart.title('TAG CLOUDS-ALL SENTIMENT');
      chart.normal().fontFamily('Kanit'); // กำหนดแบบอักษรทั่วไป
      chart.hovered().fontFamily('Kanit'); // กำหนดแบบอักษรเมื่อโฮเวอร์

      chart.draw();
    });
  }, []);



  // useEffect(() => {
  //   setStatusData(false)
  //   setIsLoaded(false); // Set loading state before fetching data
  //   const fetchData = async () => {
  //     let res = await fetch("http://localhost:3000/api/smartphonereview", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     let data = await res.json();
  //     // Do something with allPosts, like setting state
  //     setAllReviews(data);

  //     setStatusData(true);
  //     setIsLoaded(true); // Set loading state after fetching data
  //   };

  //   fetchData();

  //   const sentimentPosPercentage = 70;
  //   const sentimentNeuPercentage = 20;
  //   const sentimentNegPercentage = 10;
  //   const allPercentage = sentimentPosPercentage + sentimentNeuPercentage + sentimentNegPercentage;

  //   // Sample data for positive sentiment
  //   var PositiveData = {
  //     labels: ["Positive Sentiment"],
  //     datasets: [{
  //       data: [sentimentPosPercentage, allPercentage - sentimentPosPercentage],
  //       backgroundColor: [
  //         'rgba(34, 139, 34, 0.9)', // Positive
  //         'rgba(34, 139, 34, 0.3)' // Negative
  //       ],
  //       borderColor: [
  //         'rgba(34, 139, 34, 1)',
  //         'rgba(34, 139, 34, 0.3)' // Negative
  //       ],
  //       borderWidth: 1
  //     }]
  //   };

  //   var NeutralData = {
  //     labels: ["Neutral Sentiment"],
  //     datasets: [{
  //       data: [sentimentNeuPercentage, allPercentage - sentimentNeuPercentage], // Example data for positive sentiment, you should replace it with your own
  //       backgroundColor: [
  //         'rgba(244, 187, 68, 9)', // Positive
  //         'rgba(244, 187, 68, 0.3)' // Negative
  //       ],
  //       borderColor: [
  //         'rgba(244, 187, 68, 1)',
  //         'rgba(244, 187, 68, 0.3)' // Negative
  //       ],
  //       borderWidth: 1
  //     }]
  //   };

  //   var NegativeData = {
  //     labels: ["Negative Sentiment"],
  //     datasets: [{
  //       data: [sentimentNegPercentage, allPercentage - sentimentNegPercentage], // Example data for positive sentiment, you should replace it with your own
  //       backgroundColor: [
  //         'rgba(210, 43, 43, 9)', // Positive
  //         'rgba(210, 43, 43, 0.3)' // Negative
  //       ],
  //       borderColor: [
  //         'rgba(210, 43, 43, 1)',
  //         'rgba(210, 43, 43, 0.3)' // Negative
  //       ],
  //       borderWidth: 1
  //     }]
  //   };



  //   const doughnutLabelNeg = {
  //     id: 'doughnutLabelNeg',
  //     beforeDraw(chart) {
  //       const {
  //         ctx,
  //         chartArea,
  //         config
  //       } = chart;
  //       const {
  //         datasets
  //       } = config.data;
  //       const total = datasets.reduce((acc, dataset) => acc + dataset.data.reduce((a, b) => a + b, 0), 0);
  //       const negativePercentage = ((datasets[0].data[0] / total) * 100) + '%';
  //       const centerX = (chartArea.left + chartArea.right) / 2;
  //       const centerY = (chartArea.top + chartArea.bottom) / 2;

  //       ctx.font = 'bold 20px san-serif';
  //       ctx.fillStyle = 'rgba(210, 43, 43, 1)';
  //       ctx.textAlign = 'center';
  //       ctx.textBaseline = 'middle';
  //       ctx.fillText(negativePercentage, centerX, centerY);
  //     }
  //   };

  //   const doughnutLabelPos = {
  //     id: 'doughnutLabelPos',
  //     beforeDraw(chart) {
  //       const {
  //         ctx,
  //         chartArea,
  //         config
  //       } = chart;
  //       const {
  //         datasets
  //       } = config.data;
  //       const total = datasets.reduce((acc, dataset) => acc + dataset.data.reduce((a, b) => a + b, 0), 0);
  //       const positivePercentage = ((datasets[0].data[0] / total) * 100) + '%';
  //       const centerX = (chartArea.left + chartArea.right) / 2;
  //       const centerY = (chartArea.top + chartArea.bottom) / 2;

  //       ctx.font = 'bold 20px san-serif';
  //       ctx.fillStyle = 'rgba(34, 139, 34, 1)';
  //       ctx.textAlign = 'center';
  //       ctx.textBaseline = 'middle';
  //       ctx.fillText(positivePercentage, centerX, centerY);
  //     }
  //   };

  //   const doughnutLabelNeu = {
  //     id: 'doughnutLabelNeu',
  //     beforeDraw(chart) {
  //       const {
  //         ctx,
  //         chartArea,
  //         config
  //       } = chart;
  //       const {
  //         datasets
  //       } = config.data;
  //       const total = datasets.reduce((acc, dataset) => acc + dataset.data.reduce((a, b) => a + b, 0), 0);
  //       const neutralPercentage = ((datasets[0].data[0] / total) * 100) + '%';
  //       const centerX = (chartArea.left + chartArea.right) / 2;
  //       const centerY = (chartArea.top + chartArea.bottom) / 2;

  //       ctx.font = 'bold 20px san-serif';
  //       ctx.fillStyle = 'rgba(244, 187, 68, 1)';
  //       ctx.textAlign = 'center';
  //       ctx.textBaseline = 'middle';
  //       ctx.fillText(neutralPercentage, centerX, centerY);
  //     }
  //   };

  //   const dnPos = document.getElementById('doughnutChartPosP1').getContext('2d');
  //   // Create the doughnut chart for positive sentiment
  //   let doughnutChartPosP1 = new Chart(dnPos, {
  //     type: 'doughnut',
  //     data: PositiveData,
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: false
  //       },
  //       layout: {
  //         padding: {
  //           left: 15,
  //           right: 15,
  //           top: 0,
  //           bottom: 0
  //         }
  //       }
  //     },
  //     plugins: [doughnutLabelPos]
  //   });

  //   const dnNeu = document.getElementById('doughnutChartNeuP1').getContext('2d');
  //   let doughnutChartNeuP1 = new Chart(dnNeu, {
  //     type: 'doughnut',
  //     data: NeutralData,
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: false
  //       },
  //       layout: {
  //         padding: {
  //           left: 15,
  //           right: 15,
  //           top: 0,
  //           bottom: 0
  //         }
  //       }
  //     },
  //     plugins: [doughnutLabelNeu]
  //   });

  //   const dnNeg = document.getElementById('doughnutChartNegP1').getContext('2d');
  //   let doughnutChartNegP1 = new Chart(dnNeg, {
  //     type: 'doughnut',
  //     data: NegativeData,
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: false
  //       },
  //       layout: {
  //         padding: {
  //           left: 15,
  //           right: 15,
  //           top: 0,
  //           bottom: 0
  //         }
  //       }
  //     },
  //     plugins: [doughnutLabelNeg]
  //   });

  //   return () => {
  //     doughnutChartPosP1.destroy();
  //     doughnutChartNeuP1.destroy();
  //     doughnutChartNegP1.destroy();
  //   };

  // }, []);

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #f0f0f0;
        }
      `}</style>

      <Navbar />
      <div className="md:container md:mx-auto mt-3">
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-white rounded-[12px]">
            <Autocomplete
              isRequired
              variant="bordered"
              label="Select Brand"
              items={brands.map(brand => ({ label: brand, value: brand }))}
              selectedKey={selectedBrand}
              // onSelectionChange={setSelectedBrand}
              // onChange={handleBrandChange}
              className="max-w-xs"
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>

          </div>

          <div className="bg-white rounded-[12px]">
            <Autocomplete
              isRequired
              variant="bordered"
              label="Select Smartphone"
              items={smartphoneModels.map(model => ({ label: model, value: model }))}

              // onChange={handleModelChange}
              onChange={SelectedSmartphone}
              className="max-w-xs"
              disabled={!selectedBrand}
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>
          </div>











          {/* <-------------------------------------------> */}
          <div className="bg-white rounded-[12px]">
            <Autocomplete
              isRequired
              variant="bordered"
              label="Select Brand"
              defaultItems={animals}
              defaultSelectedKey="cat"
              className="max-w-xs"
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>
          </div>
          <div className="bg-white rounded-[12px]">
            <Autocomplete
              isRequired
              variant="bordered"
              label="Select Smartphone"
              defaultItems={animals}
              defaultSelectedKey="cat"
              className="max-w-xs"
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>
          </div>
          <div className="bg-white rounded-[12px]">
            <Autocomplete
              isDisabled
              variant="bordered"
              label="Select Brand"
              defaultItems={animals}
              className="max-w-xs"
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>
          </div>
          <div className="bg-white rounded-[12px]">
            <Autocomplete
              isDisabled
              variant="bordered"
              label="Select Smartphone"
              defaultItems={animals}
              className="max-w-xs"
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>
          </div>
          {/* <div className="columns-3 hover:columns-3 text-center">

          <div className="bg-white">Search1</div>
          <div className="bg-white">Search2</div>
          <div className="bg-white">Search3</div>
        </div> */}
        </div>
      </div>

      {/* <div className="container mx-auto mt-8" style={{ marginTop: '3em' }}>

        <div className="row bg-light rounded-5 justify-content-md-center">
          <div className="col-md-6 bg-danger text-center">
            <h2 className="my-3">Apple iPhone 11</h2>
          </div>
          <div className="col-md-2 px-3 text-center">
            <h5>Positive Feeling</h5>
            <div>
              <canvas id="doughnutChartPosP1" height="200px"></canvas>
            </div>
          </div>
          <div className="col-md-2 px-3 text-center">
            <h5>Neutral Feeling</h5>
            <div>
              <canvas id="doughnutChartNeuP1" height="200px"></canvas>
            </div>
          </div>
          <div className="col-md-2 px-3 text-center">
            <h5>Negative Feeling</h5>
            <div>
              <canvas id="doughnutChartNegP1" height="200px"></canvas>
            </div>
          </div>
        </div>
      </div> */}

      <div className="md:container md:mx-auto md:mt-3 bg-danger">
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-4">
            <img className="w-full aspect-square ..." src="..." />
          </div>
          <div className="col-span-6">
            <div className="grid grid-cols-7">
              <div className="col-span-3">
                <div className="bg-white rounded-[20px] md:p-4 md:my-4">aaa</div>
                <div className="bg-white rounded-[20px] md:p-4">aaa</div>
              </div>
              <div className="col-span-4 gap-2">
                <canvas id="fullStackBarChart" src="..." className="bg-white rounded-[20px] md:p-4 md:m-4"></canvas>
                <canvas id="RadarChart" src="..." className="bg-white rounded-[20px] md:p-4 md:m-4"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}
