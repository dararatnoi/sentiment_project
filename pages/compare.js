// import React from 'react'
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Select, SelectItem } from "@nextui-org/react";
import anychart from 'anychart';
import axios from 'axios';
// 


export default function compare() {
  // const [allReviews, setAllReviews] = useState([]);
  // const [statusData, setStatusData] = React.useState(false);
  // const [isLoaded, setIsLoaded] = React.useState(false);
  const [brandsSm1, setBrandsSm1] = useState([]);
  const [brandsSm2, setBrandsSm2] = useState([]);
  const [smartphoneModelsSm1, setSmartphoneModelsSm1] = useState([]);
  const [smartphoneModelsSm2, setSmartphoneModelsSm2] = useState([]);

  const [selectedBrandSm1, setSelectedBrandSm1] = useState('Apple');
  const [selectedModelSm1, setSelectedModelSm1] = useState('');
  const [selectedBrandSm2, setSelectedBrandSm2] = useState('Samsung');
  const [selectedModelSm2, setSelectedModelSm2] = useState('');
  const [reviews, setReviews] = useState([]);

  const [selectedSentiments, setSelectedSentiments] = useState([]);
  const sentiment_select = ["Positive", "Neutral", "Negative"];

  const handleSelectionChange = (selectedItems) => {
    setSelectedSentiments(selectedItems);
  };

  // Helper function to determine background color based on sentiment
  const getBackgroundColor = (sentiment) => {
    switch (sentiment) {
      case 'pos':
        return "#EFFAF5";
      case 'neu':
        return "#FFF7E6";
      case 'neg':
        return "#FEF3F3";
      default:
        return ""; // Default color
    }
  };
  // Helper function to determine text color based on sentiment
  const getTextColor = (sentiment) => {
    switch (sentiment) {
      case 'pos':
        return "#1FBB66";
      case 'neu':
        return "#EEA717";
      case 'neg':
        return "#EA4141";
      default:
        return ""; // Default text color
    }
  };
  // Helper function to determine sentiment text
  const getSentimentText = (sentiment) => {
    switch (sentiment) {
      case 'pos':
        return "Positive";
      case 'neu':
        return "Neutral";
      case 'neg':
        return "Negative";
      default:
        return sentiment; // Return original sentiment if not recognized
    }
  };

  const [overviewSm1, setOverviewSm1] = useState({
    pos: 0,
    neu: 0,
    neg: 0
  });

  const [aspectSm1, setAspectSm1] = useState({
    camera: {
      pos: 0,
      neg: 0
    },
    battery: {
      pos: 0,
      neg: 0
    },
    screen: {
      pos: 0,
      neg: 0
    },
    performance: {
      pos: 0,
      neg: 0
    },
    price: {
      pos: 0,
      neg: 0
    }
  });

  const [overviewSm2, setOverviewSm2] = useState({
    pos: 0,
    neu: 0,
    neg: 0
  });

  const [aspectSm2, setAspectSm2] = useState({
    camera: {
      pos: 0,
      neg: 0
    },
    battery: {
      pos: 0,
      neg: 0
    },
    screen: {
      pos: 0,
      neg: 0
    },
    performance: {
      pos: 0,
      neg: 0
    },
    price: {
      pos: 0,
      neg: 0
    }
  });

  // useEffect(() => {
  //   const table = document.getElementById('dataTable');
  //   if (table) {
  //     const tableHeight = table.clientHeight; // Get the height of the table
  //     const halfTableHeight = tableHeight / 2; // Calculate half the height of the table

  //     // Set the height of the charts
  //     const ovaBarChart = document.getElementById('ovaBarChart');
  //     const fullStackBarChart = document.getElementById('fullStackBarChart');
  //     const radarChart = document.getElementById('RadarChart');

  //     if (ovaBarChart && fullStackBarChart && radarChart) {
  //       ovaBarChart.style.height = `${halfTableHeight}px`;
  //       fullStackBarChart.style.height = `${halfTableHeight}px`;
  //       radarChart.style.height = `${halfTableHeight}px`;
  //     }
  //   }
  // }, []);



  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/compare_smartphonename');
        const data = await response.json();
        const brandNames = Object.keys(data);
        setBrandsSm1(brandNames); // Corrected line
        setBrandsSm2(brandNames); // Corrected line
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchSmartphoneModelsSm1 = async (brand) => {
      try {
        const response = await fetch('http://localhost:3000/api/compare_smartphonename/');
        const data = await response.json();
        setSmartphoneModelsSm1(Object.keys(data[brand]));
      } catch (error) {
        console.error(`Error fetching smartphones for ${brand}:`, error);
      }
    };
    if (selectedBrandSm1) {
      fetchSmartphoneModelsSm1(selectedBrandSm1);
    }
  }, [selectedBrandSm1]);

  useEffect(() => {
    const fetchSmartphoneModelsSm2 = async (brand) => {
      try {
        const response = await fetch('http://localhost:3000/api/compare_smartphonename');
        const data = await response.json();
        setSmartphoneModelsSm2(Object.keys(data[brand]))
      } catch (error) {
        console.error(`Error fetching smartphones for ${brand}:`, error);
      }
    };
    if (selectedBrandSm2) {
      fetchSmartphoneModelsSm2(selectedBrandSm2);
    }
  }, [selectedBrandSm2]);

  useEffect(() => {
    if (selectedModelSm1) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/compare_smartphonereview?smartphone=${encodeURIComponent(selectedModelSm1)}`);
          setReviews(response.data); // Update the state with the response data
        } catch (error) {
          console.error('Error fetching smartphone review data:', error);
        }
      };
      fetchData();
    }
  }, [selectedModelSm1]);


  useEffect(() => {
    const rdChartElement = document.getElementById('RadarChart');
    if (rdChartElement) {
      rdChartElement.width = rdChartElement.parentElement.offsetWidth;
      rdChartElement.height = rdChartElement.parentElement.offsetHeight;

      const totalPosScoreSm1 = Object.values(aspectSm1).reduce((total, aspectItem) => {
        return total + aspectItem.pos;
      }, 0);

      const totalPosScoreSm2 = Object.values(aspectSm2).reduce((total, aspectItem) => {
        return total + aspectItem.pos;
      }, 0);

      const rdChartData = {
        labels: ["Camera", "Battery", "Screen", "Performance", "Price"],
        datasets: [{
          label: selectedModelSm1,
          data: [
            (aspectSm1.camera.pos / totalPosScoreSm1) * 10,
            (aspectSm1.battery.pos / totalPosScoreSm1) * 10,
            (aspectSm1.screen.pos / totalPosScoreSm1) * 10,
            (aspectSm1.performance.pos / totalPosScoreSm1) * 10,
            (aspectSm1.price.pos / totalPosScoreSm1) * 10
          ],
          backgroundColor: 'rgb(208, 72, 72, 0.2)',
          borderColor: 'rgb(208, 72, 72)',
        },
        {
          label: selectedModelSm2,
          data: [
            (aspectSm2.camera.pos / totalPosScoreSm2) * 10,
            (aspectSm2.battery.pos / totalPosScoreSm2) * 10,
            (aspectSm2.screen.pos / totalPosScoreSm2) * 10,
            (aspectSm2.performance.pos / totalPosScoreSm2) * 10,
            (aspectSm2.price.pos / totalPosScoreSm2) * 10
          ],
          backgroundColor: 'rgb(104, 149, 210, 0.2)',
          borderColor: 'rgb(104, 149, 210)'
        }
        ]
      };

      const rdChartContext = rdChartElement.getContext('2d');
      // Create the radar chart
      let RadarChart = new Chart(rdChartContext, {
        type: 'radar',
        data: rdChartData,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Score of All Aspect (Positive)",
              font: {
                size: 12
              }
            }
          },
          elements: {
            line: {
              borderWidth: 1
            }
          },
          scales: {
            r: {
              pointLabels: {
                font: {
                  size: 11 // Adjust the font size of the labels
                }
              },
            }
          }
        },

      });

      // Cleanup function to destroy the chart instance
      return () => {
        RadarChart.destroy();
      };
    }
  }, [aspectSm1, selectedModelSm1, aspectSm2, selectedModelSm2]);


  // useEffect(() => {
  //   const fetchSmartphoneDataSm1 = async (brand, smartphoneName) => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/compare_smartphonename');
  //       const data = await response.json();

  //       // Setting overview state for smartphone 1
  //       setOverviewSm1({
  //         pos: data[brand][smartphoneName].OverallSentiment.count_pos,
  //         neu: data[brand][smartphoneName].OverallSentiment.count_neu,
  //         neg: data[brand][smartphoneName].OverallSentiment.count_neg,
  //       });

  //       // Setting aspect state for smartphone 1
  //       setAspectSm1({
  //         camera: {
  //           pos: data[brand][smartphoneName].Aspect.Camera.count_pos,
  //           neg: data[brand][smartphoneName].Aspect.Camera.count_neg
  //         },
  //         battery: {
  //           pos: data[brand][smartphoneName].Aspect.Battery.count_pos,
  //           neg: data[brand][smartphoneName].Aspect.Battery.count_neg
  //         },
  //         screen: {
  //           pos: data[brand][smartphoneName].Aspect.Screen.count_pos,
  //           neg: data[brand][smartphoneName].Aspect.Screen.count_neg
  //         },
  //         performance: {
  //           pos: data[brand][smartphoneName].Aspect.Performance.count_pos,
  //           neg: data[brand][smartphoneName].Aspect.Performance.count_neg
  //         },
  //         price: {
  //           pos: data[brand][smartphoneName].Aspect.Price.count_pos,
  //           neg: data[brand][smartphoneName].Aspect.Price.count_neg
  //         }
  //       });

  //     } catch (error) {
  //       console.error(`Error fetching smartphones for ${brand}:`, error);
  //     }
  //   };
  //   if (selectedModelSm1) {
  //     fetchSmartphoneDataSm1(selectedBrandSm1, selectedModelSm1);
  //   }
  // }, [selectedBrandSm1, selectedModelSm1]);

  // useEffect(() => {
  //   const fetchSmartphoneDataSm2 = async (brand, smartphoneName) => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/compare_smartphonename');
  //       const data = await response.json();

  //       // Setting overview state for smartphone 1
  //       setOverviewSm2({
  //         pos: data[brand][smartphoneName].OverallSentiment.count_pos,
  //         neu: data[brand][smartphoneName].OverallSentiment.count_neu,
  //         neg: data[brand][smartphoneName].OverallSentiment.count_neg,
  //       });

  //       // Setting aspect state for smartphone 1
  //       setAspectSm2({
  //         camera: {
  //           pos: data[brand][smartphoneName].Aspect.Camera.count_pos,
  //           neg: data[brand][smartphoneName].Aspect.Camera.count_neg
  //         },
  //         battery: {
  //           pos: data[brand][smartphoneName].Aspect.Battery.count_pos,
  //           neg: data[brand][smartphoneName].Aspect.Battery.count_neg
  //         },
  //         screen: {
  //           pos: data[brand][smartphoneName].Aspect.Screen.count_pos,
  //           neg: data[brand][smartphoneName].Aspect.Screen.count_neg
  //         },
  //         performance: {
  //           pos: data[brand][smartphoneName].Aspect.Performance.count_pos,
  //           neg: data[brand][smartphoneName].Aspect.Performance.count_neg
  //         },
  //         price: {
  //           pos: data[brand][smartphoneName].Aspect.Price.count_pos,
  //           neg: data[brand][smartphoneName].Aspect.Price.count_neg
  //         }
  //       });

  //     } catch (error) {
  //       console.error(`Error fetching smartphones for ${brand}:`, error);
  //     }
  //   };
  //   if (selectedModelSm2) {
  //     fetchSmartphoneDataSm2(selectedBrandSm2, selectedModelSm2);
  //   }
  // }, [selectedBrandSm2, selectedModelSm2]);

  useEffect(() => {
    const fetchSmartphoneData = async (brand, smartphoneName, setOverview, setAspect) => {
      try {
        const response = await fetch('http://localhost:3000/api/compare_smartphonename');
        const data = await response.json();

        const overviewData = data[brand][smartphoneName].OverallSentiment;

        setOverview({
          pos: overviewData.count_pos || 0,
          neu: overviewData.count_neu || 0,
          neg: overviewData.count_neg || 0,
        });

        const aspectData = data[brand][smartphoneName].Aspect;

        setAspect({
          camera: {
            pos: aspectData.Camera ? aspectData.Camera.count_pos || 0 : 0,
            neg: aspectData.Camera ? aspectData.Camera.count_neg || 0 : 0
          },
          battery: {
            pos: aspectData.Battery ? aspectData.Battery.count_pos || 0 : 0,
            neg: aspectData.Battery ? aspectData.Battery.count_neg || 0 : 0
          },
          screen: {
            pos: aspectData.Screen ? aspectData.Screen.count_pos || 0 : 0,
            neg: aspectData.Screen ? aspectData.Screen.count_neg || 0 : 0
          },
          performance: {
            pos: aspectData.Performance ? aspectData.Performance.count_pos || 0 : 0,
            neg: aspectData.Performance ? aspectData.Performance.count_neg || 0 : 0
          },
          price: {
            pos: aspectData.Price ? aspectData.Price.count_pos || 0 : 0,
            neg: aspectData.Price ? aspectData.Price.count_neg || 0 : 0
          }
        });

      } catch (error) {
        console.error(`Error fetching smartphones for ${brand}:`, error);
      }
    };

    if (selectedModelSm1) {
      fetchSmartphoneData(selectedBrandSm1, selectedModelSm1, setOverviewSm1, setAspectSm1);
    }

    if (selectedModelSm2) {
      fetchSmartphoneData(selectedBrandSm2, selectedModelSm2, setOverviewSm2, setAspectSm2);
    }
  }, [selectedBrandSm1, selectedModelSm1, selectedBrandSm2, selectedModelSm2]);


  useEffect(() => {
    const totalOverviewSm1 = overviewSm1.pos + overviewSm1.neu + overviewSm1.neg
    const totalOverviewSm2 = overviewSm2.pos + overviewSm2.neu + overviewSm2.neg

    // Convert counts to percentages
    const positivePercentageSm1 = (overviewSm1.pos / totalOverviewSm1) * 100;
    const neutralPercentageSm1 = (overviewSm1.neu / totalOverviewSm1) * 100;
    const negativePercentageSm1 = (overviewSm1.neg / totalOverviewSm1) * 100;

    const positivePercentageSm2 = (overviewSm2.pos / totalOverviewSm2) * 100;
    const neutralPercentageSm2 = (overviewSm2.neu / totalOverviewSm2) * 100;
    const negativePercentageSm2 = (overviewSm2.neg / totalOverviewSm2) * 100;

    const stBarChartElement = document.getElementById('fullStackBarChart');
    if (stBarChartElement) {

      stBarChartElement.width = stBarChartElement.parentElement.offsetWidth;
      stBarChartElement.height = stBarChartElement.parentElement.offsetHeight;
      const stBarChartContext = stBarChartElement.getContext('2d');

      let stackBarChart = new Chart(stBarChartContext, {
        type: 'bar',
        plugins: [ChartDataLabels],
        data: {
          labels: [selectedModelSm1, selectedModelSm2], // Labels for the categories
          datasets: [{
            label: 'Positive',
            data: [positivePercentageSm1, positivePercentageSm2], // Adjust your data here (e.g., 300 for Category A, 500 for Category B)
            backgroundColor: 'rgba(75, 192, 192, 0.5)', // Adjust colors as needed
            stack: 'Stack 1' // Stack name for stacking
          }, { // Labels for the categories
            label: 'Neutral',
            data: [neutralPercentageSm1, neutralPercentageSm2], // Adjust your data here (e.g., 300 for Category A, 500 for Category B)
            backgroundColor: 'rgba(255, 205, 86, 0.5)', // Adjust colors as needed
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
              text: 'Percentage of Overall Sentiment',
              fontSize: 12
            },
            legend: {
              display: true,
              labels: {
                font: {
                  size: 12
                }
              }
            },
            datalabels: {
              color: '#000000',
              anchor: 'center',
              align: 'center',
              clamp: true,
              formatter: function (value, context) {
                if (value > 0) {
                  return value.toFixed(0) + '%';
                } else {
                  return ''; // Return empty string if value is 0
                }
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
              beginAtZero: true,
              ticks: {
                font: {
                  size: 11
                }
              }
            }
          }
        }

      });
      return () => {
        stackBarChart.destroy();
      };
    }
  }, [overviewSm1.pos, overviewSm1.neu, overviewSm1.neg, overviewSm2.pos, overviewSm2.neu, overviewSm2.neg]);

  useEffect(() => {
    // const totalOverviewSm1 = overviewSm1.pos + overviewSm1.neu + overviewSm1.neg
    // const totalOverviewSm2 = overviewSm2.pos + overviewSm2.neu + overviewSm2.neg

    // // Convert counts to percentages
    // const positivePercentageSm1 = (overviewSm1.pos / totalOverviewSm1) * 100;
    // const neutralPercentageSm1 = (overviewSm1.neu / totalOverviewSm1) * 100;
    // const negativePercentageSm1 = (overviewSm1.neg / totalOverviewSm1) * 100;

    // const positivePercentageSm2 = (overviewSm2.pos / totalOverviewSm2) * 100;
    // const neutralPercentageSm2 = (overviewSm2.neu / totalOverviewSm2) * 100;
    // const negativePercentageSm2 = (overviewSm2.neg / totalOverviewSm2) * 100;

    const stBarChartAspectElement = document.getElementById('fullStackBarChartAspect');
    if (stBarChartAspectElement) {
      stBarChartAspectElement.width = stBarChartAspectElement.parentElement.offsetWidth;
      stBarChartAspectElement.height = stBarChartAspectElement.parentElement.offsetHeight;
      const stBarChartAspectContext = stBarChartAspectElement.getContext('2d');

      let stackBarChartAspect = new Chart(stBarChartAspectContext, {
        type: 'bar',
        plugins: [ChartDataLabels],
        data: {
          labels: ["Camera", "Battery", "Screen", "Performance", "Price"], // Labels for the categories
          datasets: [{
            label: selectedModelSm1,
            data: [aspectSm1.camera.pos, aspectSm1.battery.pos, aspectSm1.screen.pos, aspectSm1.performance.pos, aspectSm1.price.pos], // Adjust your data here (e.g., 300 for Category A, 500 for Category B)
            backgroundColor: 'rgb(208, 72, 72, 0.5)'
            // stack: 'Stack 1' // Stack name for stacking
          }, { // Labels for the categories
            label: selectedModelSm2,
            data: [aspectSm2.camera.pos, aspectSm2.battery.pos, aspectSm2.screen.pos, aspectSm2.performance.pos, aspectSm2.price.pos], // Adjust your data here (e.g., 300 for Category A, 500 for Category B)
            backgroundColor: 'rgb(104, 149, 210, 0.5)',
            // stack: 'Stack 1' // Stack name for stacking
          }]
        },
        // plugins: ['datalabels'],
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Count of All Aspect (Positive)',
              size: 12
            },
            legend: {
              display: true,
              size: 12
            },
            datalabels: {
              anchor: 'end',
              align: 'end',
              clamp: true,
              font: {
                size: 10
              },
              formatter: (value, context) => {
                return value; // Return the value to display on the chart
              }
            }
          },
          // indexAxis: 'y', // Change to horizontal orientation
          responsive: true,
          scales: {
            x: {
              ticks: {
                font: {
                  size: 11 // Set font size for the x-axis labels
                }
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }

      });
      return () => {
        stackBarChartAspect.destroy();
      };
    }
  }, [aspectSm1, aspectSm2]);

  useEffect(() => {
    const totalOverviewPosSm1 = overviewSm1.pos
    const totalOverviewPosSm2 = overviewSm2.pos
    const totalOverviewNeuSm1 = overviewSm1.neu
    const totalOverviewNeuSm2 = overviewSm2.neu
    const totalOverviewNegSm1 = overviewSm1.neg
    const totalOverviewNegSm2 = overviewSm2.neg

    const ovaBarChartElement = document.getElementById('ovaBarChart');
    if (ovaBarChartElement) {
      ovaBarChartElement.width = ovaBarChartElement.parentElement.offsetWidth;
      ovaBarChartElement.height = ovaBarChartElement.parentElement.offsetHeight;
      const ovaBarChartContext = ovaBarChartElement.getContext('2d');

      let overallBarChart = new Chart(ovaBarChartContext, {
        type: 'bar',
        plugins: [ChartDataLabels],
        data: {
          labels: [selectedModelSm1, selectedModelSm2], // Labels for the categories
          datasets: [{
            label: 'Positive',
            data: [totalOverviewPosSm1, totalOverviewPosSm2], // Adjust your data here (e.g., 300 for Category A, 500 for Category B)
            backgroundColor: 'rgba(75, 192, 192, 0.5)', // Adjust colors as needed
          }, { // Labels for the categories
            label: 'Neutral',
            data: [totalOverviewNeuSm1, totalOverviewNeuSm2], // Adjust your data here (e.g., 300 for Category A, 500 for Category B)
            backgroundColor: 'rgba(255, 205, 86, 0.5)', // Adjust colors as needed
          }, {
            label: 'Negative',
            data: [totalOverviewNegSm1, totalOverviewNegSm2], // Adjust your data here (e.g., 500 for Category A, 200 for Category B)
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Adjust colors as needed
          }]
        },
        // plugins: ['datalabels'],
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Count of Overall Sentiment',
              size: 12
            },
            legend: {
              display: true,
              label: {
                font: {
                  size: 12
                }
              }
            },
            datalabels: {
              anchor: 'end',
              align: 'end',
              clamp: true,
              font: {
                size: 10
              },
              formatter: (value, context) => {
                return value; // Return the value to display on the chart
              }
            }
          },
          responsive: true,
          scales: {
            x: {
              grid: {
                offset: true
              },
              ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 0
              }
            }
          }
        }

      });
      return () => {
        overallBarChart.destroy();
      };
    }

  }, [overviewSm1.pos, overviewSm1.neu, overviewSm1.neg, overviewSm2.pos, overviewSm2.neu, overviewSm2.neg]);

  // useEffect(() => {
  //   anychart.onDocumentReady(function () {
  //     var datacloud = [
  //       { x: 'กล้องดีมาก', value: 80 },
  //       { x: 'แบต', value: 56 },
  //       { x: 'ห่วยแตก', value: 44 },
  //       { x: 'แพงมาก', value: 40 },
  //       { x: 'สวยงาม', value: 36 },
  //       { x: 'ยอดเยี่ยม', value: 32 },
  //       { x: 'ดีมาก', value: 28 },
  //       { x: 'แนะนำ', value: 24 },
  //       { x: 'ใช้งานได้ดี', value: 20 },
  //       { x: 'หน้าจอห่วย', value: 12 },
  //       { x: 'หล้องไม่ชัด', value: 12 }
  //     ];

  //     var chart = anychart.tagCloud();
  //     chart.data(datacloud)
  //     chart.container('wordCloudOverall');
  //     chart.title('TAG CLOUDS-ALL SENTIMENT');
  //     chart.normal().fontFamily('Kanit');
  //     chart.hovered().fontFamily('Kanit');
  //     chart.mode("spiral");

  //     chart.draw();
  //   });
  // }, []);

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
      {selectedModelSm1}
      {/* <>Brand: {selectedBrandSm1}</><br></br>
      <>smartphonename: {selectedModelSm1}</><br></br>
      <>count_pos: {overviewSm1.pos}</><br></br>
      <>aspect: {aspectSm1.camera.pos} -- {aspectSm1.battery.pos} -- {aspectSm1.screen.pos} -- {aspectSm1.performance.pos} -- {aspectSm1.price.pos}</>


      <br></br>---------------------<br></br>
      <>Brand: {selectedBrandSm2}</><br></br>
      <>smartphonename: {selectedModelSm2}</><br></br>
      <>count_pos: {overviewSm2.pos}</><br></br>
      <>aspect: {aspectSm2.camera.pos} -- {aspectSm2.battery.pos} -- {aspectSm2.screen.pos} -- {aspectSm2.performance.pos} -- {aspectSm2.price.pos}</> */}
      <div className="md:container md:mx-auto mt-3">
        <div className="grid grid-cols-3 gap-4">
          {/* Select Brand */}
          <div className="grid grid-cols-5 gap-4">
            <div id="SelectBrandElm1" className="col-span-2 bg-white rounded-[12px]">
              <Autocomplete
                isRequired
                variant="bordered"
                label="Select Brand"
                items={brandsSm1.map(brand => ({ label: brand, value: brand }))}
                selectedKey={selectedBrandSm1}
                onSelectionChange={setSelectedBrandSm1}
                className="max-w-xs"
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            </div>

            {/* Select Smartphones */}
            <div id="SelectSmartphoneElm1" className="col-span-3 bg-white rounded-[12px]">
              <Autocomplete
                isRequired
                variant="bordered"
                label="Select Smartphone"
                items={smartphoneModelsSm1.map(model => ({ label: model, value: model }))}
                selectedKey={selectedModelSm1}
                onSelectionChange={setSelectedModelSm1}
                // disabled={!selectedBrand}
                className="max-w-xs"
                multiple
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div id="SelectBrandElm2" className="col-span-2 bg-white rounded-[12px]">
              <Autocomplete
                isRequired
                variant="bordered"
                label="Select Brand"
                items={brandsSm2.map(brand => ({ label: brand, value: brand }))}
                selectedKey={selectedBrandSm2}
                onSelectionChange={setSelectedBrandSm2}
                className="max-w-xs"
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            </div>

            {/* Select Smartphones */}
            <div id="SelectSmartphoneElm2" className="col-span-3 bg-white rounded-[12px]">
              <Autocomplete
                isRequired
                variant="bordered"
                label="Select Smartphone"
                items={smartphoneModelsSm2.map(model => ({ label: model, value: model }))}
                selectedKey={selectedModelSm2}
                onSelectionChange={setSelectedModelSm2}
                // disabled={!selectedBrand}
                className="max-w-xs"
                multiple
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div id="SelectBrandElm3" className="col-span-2 bg-white rounded-[12px]">
              <Autocomplete
                variant="bordered"
                label="Select Brand"
                items={brandsSm2.map(brand => ({ label: brand, value: brand }))}
                // selectedKey={selectedBrandSm2}
                // onSelectionChange={setSelectedBrandSm2}
                className="max-w-xs"
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            </div>

            {/* Select Smartphones */}
            <div id="SelectSmartphoneElm3" className="col-span-3 bg-white rounded-[12px]">
              <Autocomplete
                variant="bordered"
                label="Select Smartphone"
                items={smartphoneModelsSm2.map(model => ({ label: model, value: model }))}
                // selectedKey={selectedModelSm2}
                // onSelectionChange={setSelectedModelSm2}
                // disabled={!selectedBrand}
                className="max-w-xs"
                multiple
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            </div>
          </div>

        </div>
        <div className="my-2 md:col-start-2 md:col-span-1 flex justify-end">

        </div>
        {/* <div className="my-2 d-flex justify-content-end">
          <div className="w-36">
            <Filter />
          </div>
        </div> */}
      </div>

      <div className="md:container md:mx-auto md:mt-1 m-h-screen">
        <div className="grid grid-cols-11 gap-2">
          <div className="col-span-5 grid grid-col-4">
            <div className="col-span-4 overflow-y-auto shadow-md p-2 my-2 bg-white max-h-screen" style={{ borderRadius: "20px" }}>
              <table id="dataTable" className="m-h-screen md:w-full md:h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 px-5">
                <thead>
                  <tr>
                    <th scope="col" className="pl-5 py-3" style={{ color: "#9AA5B0", width: "10px" }}>
                    </th>
                    <th scope="col" className="px-2 py-3" style={{ color: "#9AA5B0" }}>Review
                    </th>
                    <th scope="col" className="px-2 py-3" style={{ color: "#9AA5B0", width: "120px" }}>
                      Model
                    </th>
                    <th scope="col" className="px-4 py-3" style={{ color: "#9AA5B0", width: "30px" }}>
                      Sentiment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => (
                    <tr key={index}>
                      <th scope="row" className="pl-5 pr-4 py-3 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {index + 1}
                      </th>
                      <td className="px-2 py-2">
                        {review.textDisplay}
                      </td>
                      <td className="px-2 py-2">
                        {review.smartphoneName}
                      </td>
                      <td className="px-4 py-3">
                        <span style={{
                          padding: "3px",
                          border: "1px solid #DCF4E7",
                          borderRadius: "5px",
                          backgroundColor: getBackgroundColor(review.Sentiment_Label),
                          color: getTextColor(review.Sentiment_Label),
                          display: 'inline-block',
                          padding: '4px 4px'
                        }}>
                          {getSentimentText(review.Sentiment_Label)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-6">
            <div className="grid grid-cols-2 gap-2">
              <div>
                {/* <div id="wordCloudOverall" className="bg-white rounded-[20px] md:p-4 md:mx-2 md:my-2">Positive WordCloud</div>
                <div className="bg-white rounded-[20px] md:p-4 md:mx-2 md:my-2">Negative WordCloud</div> */}
                <div className="bg-white shadow-md rounded-[20px] md:p-3 md:my-2 w-full h-full" style={{ maxHeight: "45vh" }}>
                  <canvas id="ovaBarChart">barchart</canvas>
                </div>
                <div className="bg-white shadow-md rounded-[20px] md:p-3 md:mr-4 md:my-2 w-full h-full" style={{ maxHeight: "39vh" }}>
                  <canvas id="fullStackBarChart" src="..."></canvas>
                </div>
              </div>
              <div>
                <div className="bg-white shadow-md rounded-[20px] md:p-3 md:mr-4 md:my-2 w-full h-full" style={{ maxHeight: "39vh" }}>
                  <canvas id="fullStackBarChartAspect" src="..."></canvas>
                </div>
                <div className="bg-white shadow-md rounded-[20px] md:my-2 w-full h-full" style={{ maxHeight: "45vh" }}>
                  <canvas id="RadarChart" className="mx-auto" src="..."></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
