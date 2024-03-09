// import React from 'react'
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Select, SelectItem } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { BsEmojiNeutral } from "react-icons/bs";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import axios from 'axios';


export default function compare() {
  // const [statusData, setStatusData] = React.useState(false);
  // const [isLoaded, setIsLoaded] = React.useState(false);

  const [smartphoneModelsSm1, setSmartphoneModelsSm1] = useState([]);
  const [smartphoneModelsSm2, setSmartphoneModelsSm2] = useState([]);
  const [smartphoneModelsSm3, setSmartphoneModelsSm3] = useState([]);

  const [selectedBrandSm1, setSelectedBrandSm1] = useState('');
  const [selectedModelSm1, setSelectedModelSm1] = useState('');
  const [selectedBrandSm2, setSelectedBrandSm2] = useState('');
  const [selectedModelSm2, setSelectedModelSm2] = useState('');
  const [selectedBrandSm3, setSelectedBrandSm3] = useState('');
  const [selectedModelSm3, setSelectedModelSm3] = useState('');

  const [smartphoneInfoSm1, setsmartphoneInfoSm1] = useState({});
  const [smartphoneInfoSm2, setsmartphoneInfoSm2] = useState({});
  const [smartphoneInfoSm3, setsmartphoneInfoSm3] = useState({});

  const [reviews, setReviews] = useState([]);

  const [showNeutralData, setShowNeutralData] = useState(true);

  const [selectedSentiments, setSelectedSentiments] = useState(''); // Initial value set to "Positive"
  // const [filteredReviews, setFilteredReviews] = useState('');

  // const optionsSentiment = [
  //   { value: 'pos', label: 'Positive' },
  //   { value: 'neg', label: 'Negative' },
  //   { value: 'neu', label: 'Neutral' }
  // ];

  const brandName = ["Apple", "Samsung", "OPPO", "vivo", "Huawei", "Xiaomi"]

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

  const [overviewSm3, setOverviewSm3] = useState({
    pos: 0,
    neu: 0,
    neg: 0
  });

  const [aspectSm3, setAspectSm3] = useState({
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

  const columnsInfoData = [
    {
      key: "info",
      label: "Information",
    },
    {
      key: "Sm1",
      label: selectedModelSm1,
    },
    {
      key: "Sm2",
      label: selectedModelSm2,
    },
    {
      key: "Sm3",
      label: selectedModelSm3,
    },
  ];

  const rowsInfoData = [
    {
      info: "Display",
      Sm1: smartphoneInfoSm1.display,
      Sm2: smartphoneInfoSm2.display,
      Sm3: smartphoneInfoSm3.display,
    },
    {
      info: "Camera",
      Sm1: smartphoneInfoSm1.camera,
      Sm2: smartphoneInfoSm2.camera,
      Sm3: smartphoneInfoSm3.camera,
    },
    {
      info: "CPU",
      Sm1: smartphoneInfoSm1.cpu,
      Sm2: smartphoneInfoSm2.cpu,
      Sm3: smartphoneInfoSm3.cpu,
    },
    {
      info: "Operating System",
      Sm1: smartphoneInfoSm1.os,
      Sm2: smartphoneInfoSm2.os,
      Sm3: smartphoneInfoSm3.os,
    },
    {
      info: "Memory",
      Sm1: smartphoneInfoSm1.memory,
      Sm2: smartphoneInfoSm2.memory,
      Sm3: smartphoneInfoSm3.memory,
    },
    {
      info: "Battery",
      Sm1: smartphoneInfoSm1.battery,
      Sm2: smartphoneInfoSm2.battery,
      Sm3: smartphoneInfoSm3.battery,
    },
  ];

  const handleCheckboxChangeNeutralData = () => {
    setShowNeutralData(!showNeutralData); // Toggle the state
  };

  const filterReviewsBySentiment = () => {
    if (!showNeutralData && selectedSentiments !== '') {
      return reviews.filter(review => review.Sentiment_Label !== 'neu' && review.Sentiment_Label === selectedSentiments);
    } else if (selectedSentiments !== '') {
      return reviews.filter(review => review.Sentiment_Label === selectedSentiments);
    } else if (!showNeutralData) {
      return reviews.filter(review => review.Sentiment_Label !== "neu");
    } else {
      return reviews;
    }
  };

  useEffect(() => {
    const fetchSmartphoneName = async (selectedBrand, setSmartphoneModels) => {
      if (selectedBrand) {
        try {
          const response = await axios.get(`/api/compare_smartphoneName?brandName=${encodeURIComponent(selectedBrand)}`);
          console.log('Fetched data for', selectedBrand, response.data); // Check fetched data
          setSmartphoneModels(response.data); // Update the state variable with fetched data
          console.log('State updated for', selectedBrand, response.data); // Check state variable update
        } catch (error) {
          console.error('Error fetching smartphone review data:', error);
        }
      }
    };

    if (selectedBrandSm1) {
      fetchSmartphoneName(selectedBrandSm1, setSmartphoneModelsSm1)
    }

    if (selectedBrandSm2) {
      fetchSmartphoneName(selectedBrandSm2, setSmartphoneModelsSm2)
    }

    if (selectedBrandSm3) {
      fetchSmartphoneName(selectedBrandSm3, setSmartphoneModelsSm3)
    }
  }, [selectedBrandSm1, selectedBrandSm2, selectedBrandSm3]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const selectedSmartphones = [selectedModelSm1, selectedModelSm2, selectedModelSm3];
        const promises = selectedSmartphones
          .filter(model => model) // Filter out any undefined or empty models
          .map(model => axios.get(`/api/compare_smartphoneReview?smartphone=${encodeURIComponent(model)}`));

        const responses = await Promise.all(promises);
        const reviewData = responses.map(response => response.data);

        // Combine review data from all responses
        const combinedReviews = reviewData.flat();

        // Update state with combined reviews
        setReviews(combinedReviews);
      } catch (error) {
        console.error('Error fetching smartphone review data:', error);
      }
    };

    fetchReviews();
  }, [selectedModelSm1, selectedModelSm2, selectedModelSm3]);

  useEffect(() => {
    const fetchSmartphoneSentimentData = async (smartphoneName, setOverview, setAspect) => {
      try {
        const response = await axios.get(`/api/compare_smartphoneSentiment?smartphone=${encodeURIComponent(smartphoneName)}`);
        console.log("Response:", response); // Logging the response for debugging

        const data = response.data; // Assuming the response is already in JSON format

        const overviewData = data[smartphoneName].OverallSentiment;

        setOverview({
          pos: overviewData.count_pos || 0,
          neu: overviewData.count_neu || 0,
          neg: overviewData.count_neg || 0,
        });

        const aspectData = data[smartphoneName].Aspect;

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
        console.error(`Error fetching smartphones for ${smartphoneName}:`, error);
      }
    };

    if (selectedModelSm1) {
      fetchSmartphoneSentimentData(selectedModelSm1, setOverviewSm1, setAspectSm1);
    }

    if (selectedModelSm2) {
      fetchSmartphoneSentimentData(selectedModelSm2, setOverviewSm2, setAspectSm2);
    }

    if (selectedModelSm3) {
      fetchSmartphoneSentimentData(selectedModelSm3, setOverviewSm3, setAspectSm3);
    }
  }, [selectedModelSm1, selectedModelSm2, selectedModelSm3]);

  useEffect(() => {
    const fetchSmartphoneInfo = async (smartphoneName, setSmartphoneInfo) => {
      if (smartphoneName) {
        try {
          const response = await axios.get(`/api/compare_smartphoneInfo?smartphone=${encodeURIComponent(smartphoneName)}`);
          console.log('Fetched data for', smartphoneName, response.data); // Check fetched data
          if (response.data.length > 0) {
            setSmartphoneInfo(response.data[0].spec); // Update the state variable with fetched data
          } else {
            console.error('No data found for smartphone:', smartphoneName);
          }
        } catch (error) {
          console.error('Error fetching smartphone review data:', error);
        }
      }
    };

    if (selectedModelSm1) {
      fetchSmartphoneInfo(selectedModelSm1, setsmartphoneInfoSm1)
    }

    if (selectedModelSm2) {
      fetchSmartphoneInfo(selectedModelSm2, setsmartphoneInfoSm2)
    }

    if (selectedModelSm3) {
      fetchSmartphoneInfo(selectedModelSm3, setsmartphoneInfoSm3)
    }
  }, [selectedModelSm1, selectedModelSm2, selectedModelSm3]);


  ////////////////////////// Chart ////////////////////////

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

      let rdChartData = {
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
        }]
      };

      // Check if selectedModelSm3 is selected
      if (selectedModelSm3) {
        const totalPosScoreSm3 = Object.values(aspectSm3).reduce((total, aspectItem) => {
          return total + aspectItem.pos;
        }, 0);

        rdChartData.datasets.push({
          label: selectedModelSm3,
          data: [
            (aspectSm3.camera.pos / totalPosScoreSm3) * 10,
            (aspectSm3.battery.pos / totalPosScoreSm3) * 10,
            (aspectSm3.screen.pos / totalPosScoreSm3) * 10,
            (aspectSm3.performance.pos / totalPosScoreSm3) * 10,
            (aspectSm3.price.pos / totalPosScoreSm3) * 10
          ],
          backgroundColor: 'rgb(104, 149, 210, 0.2)',
          borderColor: 'rgb(104, 149, 210)'
        });
      }

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
  }, [aspectSm1, selectedModelSm1, aspectSm2, selectedModelSm2, aspectSm3, selectedModelSm3]);


  useEffect(() => {
    let totalOverviewSm1, totalOverviewSm2, totalOverviewSm3;

    if (showNeutralData) {
      totalOverviewSm1 = overviewSm1.pos + overviewSm1.neu + overviewSm1.neg;
      totalOverviewSm2 = overviewSm2.pos + overviewSm2.neu + overviewSm2.neg;
      totalOverviewSm3 = overviewSm3.pos + overviewSm3.neu + overviewSm3.neg;
    } else {
      totalOverviewSm1 = overviewSm1.pos + overviewSm1.neg;
      totalOverviewSm2 = overviewSm2.pos + overviewSm2.neg;
      totalOverviewSm3 = overviewSm3.pos + overviewSm3.neg;
    }

    // Convert counts to percentages
    const positivePercentageSm1 = (overviewSm1.pos / totalOverviewSm1) * 100;
    const neutralPercentageSm1 = (overviewSm1.neu / totalOverviewSm1) * 100;
    const negativePercentageSm1 = (overviewSm1.neg / totalOverviewSm1) * 100;

    const positivePercentageSm2 = (overviewSm2.pos / totalOverviewSm2) * 100;
    const neutralPercentageSm2 = (overviewSm2.neu / totalOverviewSm2) * 100;
    const negativePercentageSm2 = (overviewSm2.neg / totalOverviewSm2) * 100;

    let labels = [selectedModelSm1, selectedModelSm2];
    let positiveData = [positivePercentageSm1, positivePercentageSm2];
    let neutralData = [neutralPercentageSm1, neutralPercentageSm2];
    let negativeData = [negativePercentageSm1, negativePercentageSm2];

    if (selectedModelSm3) {
      labels.push(selectedModelSm3);
      const positivePercentageSm3 = (overviewSm3.pos / totalOverviewSm3) * 100;
      const neutralPercentageSm3 = (overviewSm3.neu / totalOverviewSm3) * 100;
      const negativePercentageSm3 = (overviewSm3.neg / totalOverviewSm3) * 100;

      positiveData.push(positivePercentageSm3);
      neutralData.push(neutralPercentageSm3);
      negativeData.push(negativePercentageSm3);
    }

    let datasets = [{
      label: 'Positive',
      data: positiveData,
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      stack: 'Stack 1'
    }, {
      label: 'Negative',
      data: negativeData,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      stack: 'Stack 1'
    }];

    if (showNeutralData) {
      datasets.splice(1, 0, { // Insert Neutral data as the second dataset
        label: 'Neutral',
        data: neutralData,
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        stack: 'Stack 1'
      });
    }

    const stBarChartElement = document.getElementById('fullStackBarChart');
    if (stBarChartElement) {
      stBarChartElement.width = stBarChartElement.parentElement.offsetWidth;
      stBarChartElement.height = stBarChartElement.parentElement.offsetHeight;
      const stBarChartContext = stBarChartElement.getContext('2d');

      let stackBarChart = new Chart(stBarChartContext, {
        type: 'bar',
        plugins: [ChartDataLabels],
        data: {
          labels: labels,
          datasets: datasets
        },
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
                  return '';
                }
              }
            }
          },
          indexAxis: 'y',
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
  }, [overviewSm1, overviewSm2, overviewSm3, selectedModelSm1, selectedModelSm2, selectedModelSm3, showNeutralData]);


  useEffect(() => {
    const stBarChartAspectElement = document.getElementById('fullStackBarChartAspect');
    if (stBarChartAspectElement) {
      stBarChartAspectElement.width = stBarChartAspectElement.parentElement.offsetWidth;
      stBarChartAspectElement.height = stBarChartAspectElement.parentElement.offsetHeight;
      const stBarChartAspectContext = stBarChartAspectElement.getContext('2d');

      let datasets = [{
        label: selectedModelSm1,
        data: [aspectSm1.camera.pos, aspectSm1.battery.pos, aspectSm1.screen.pos, aspectSm1.performance.pos, aspectSm1.price.pos],
        backgroundColor: 'rgb(208, 72, 72, 0.5)'
      }, {
        label: selectedModelSm2,
        data: [aspectSm2.camera.pos, aspectSm2.battery.pos, aspectSm2.screen.pos, aspectSm2.performance.pos, aspectSm2.price.pos],
        backgroundColor: 'rgb(104, 149, 210, 0.5)'
      }];

      // Add dataset for selectedModelSm3 if it is selected
      if (selectedModelSm3) {
        datasets.push({
          label: selectedModelSm3,
          data: [aspectSm3.camera.pos, aspectSm3.battery.pos, aspectSm3.screen.pos, aspectSm3.performance.pos, aspectSm3.price.pos],
          backgroundColor: 'rgb(104, 149, 210, 0.5)'
        });
      }

      let stackBarChartAspect = new Chart(stBarChartAspectContext, {
        type: 'bar',
        plugins: [ChartDataLabels],
        data: {
          labels: ["Camera", "Battery", "Screen", "Performance", "Price"],
          datasets: datasets
        },
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
                return value;
              }
            }
          },
          responsive: true,
          scales: {
            x: {
              ticks: {
                font: {
                  size: 11
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
  }, [aspectSm1, aspectSm2, aspectSm3, selectedModelSm1, selectedModelSm2, selectedModelSm3]);


  useEffect(() => {
    const ovaBarChartElement = document.getElementById('ovaBarChart');
    if (ovaBarChartElement) {
      ovaBarChartElement.width = ovaBarChartElement.parentElement.offsetWidth;
      ovaBarChartElement.height = ovaBarChartElement.parentElement.offsetHeight;
      const ovaBarChartContext = ovaBarChartElement.getContext('2d');

      let labels = [selectedModelSm1, selectedModelSm2];

      let datasets = [{
        label: 'Positive',
        data: [overviewSm1.pos, overviewSm2.pos],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }, {
        label: 'Negative',
        data: [overviewSm1.neg, overviewSm2.neg],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }];

      if (showNeutralData) {
        datasets.splice(1, 0, { // Insert Neutral data as the second dataset
          label: 'Neutral',
          data: [overviewSm1.neu, overviewSm2.neu],
          backgroundColor: 'rgba(255, 205, 86, 0.5)',
        });
      }

      if (selectedModelSm3) {
        labels.push(selectedModelSm3);
        datasets[0].data.push(overviewSm3.pos);
        datasets[1].data.push(overviewSm3.neg);

        if (showNeutralData) {
          datasets[1].data.push(overviewSm3.neu);
        }
      }

      let overallBarChart = new Chart(ovaBarChartContext, {
        type: 'bar',
        plugins: [ChartDataLabels],
        data: {
          labels: labels,
          datasets: datasets
        },
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
  }, [overviewSm1, overviewSm2, overviewSm3, selectedModelSm3, showNeutralData]);

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #f0f0f0;
        }
      `}</style>
      <Navbar />
      <>{showNeutralData}</>
      <div className="md:container md:mx-auto mt-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="grid grid-cols-5 gap-2">
            <div id="SelectBrandElm1" className="col-span-2 bg-white rounded-[12px]">
              <Autocomplete
                isRequired
                variant="bordered"
                label="Select Brand"
                items={brandName.map(brand => ({ label: brand, value: brand }))}
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

          <div className="grid grid-cols-5 gap-2">
            <div id="SelectBrandElm2" className="col-span-2 bg-white rounded-[12px]">
              <Autocomplete
                isRequired
                variant="bordered"
                label="Select Brand"
                items={brandName.map(brand => ({ label: brand, value: brand }))}
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

          <div className="grid grid-cols-5 gap-2">
            <div id="SelectBrandElm3" className="col-span-2 bg-white rounded-[12px]">
              <Autocomplete
                variant="bordered"
                label="Select Brand"
                items={brandName.map(brand => ({ label: brand, value: brand }))}
                selectedKey={selectedBrandSm3}
                onSelectionChange={setSelectedBrandSm3}
                className="max-w-xs"
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            </div>

            <div id="SelectSmartphoneElm3" className="col-span-3 bg-white rounded-[12px]">
              <Autocomplete
                variant="bordered"
                label="Select Smartphone"
                items={smartphoneModelsSm3.map(model => ({ label: model, value: model }))}
                selectedKey={selectedModelSm3}
                onSelectionChange={setSelectedModelSm3}
                // disabled={!selectedBrand}
                className="max-w-xs"
                multiple
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            </div>
          </div>

        </div>
      </div>
      <div className="md:container md:mx-auto md:mt-1 md:mb-5 md:w-full md:h-full m-h-screen">
        <div className="flex justify-center items-center">
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 my-2 flex justify-end bg-white rounded-[12px]">
            <Autocomplete
              classNames="w-full"
              variant="bordered"
              label="Select Sentiment"
              items={!showNeutralData ?
                [
                  { value: 'pos', label: 'Positive' },
                  { value: 'neg', label: 'Negative' }
                ] :
                [
                  { value: 'pos', label: 'Positive' },
                  { value: 'neg', label: 'Negative' },
                  { value: 'neu', label: 'Neutral' }
                ]}
              selectedKey={selectedSentiments}
              onSelectionChange={setSelectedSentiments}
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>
          </div>
          <div>
            <Checkbox defaultSelected={!showNeutralData} radius="sm"
              checked={showNeutralData}
              onChange={handleCheckboxChangeNeutralData}>
              Show Positive and Negative
            </Checkbox>
          </div>
        </div>
        {selectedModelSm1 && selectedModelSm2 && (
          <div className="grid grid-cols-11 gap-3">
            <div className="col-span-5 grid grid-cols-5">
              <div className="col-span-5 overflow-y-auto shadow-md p-2 my-2 bg-white max-h-screen" style={{ borderRadius: "20px", maxHeight: "81vh" }}>
                <table id="dataTable" className="md:w-full md:h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 px-5">
                  <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "60%" }} />
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "10%" }} />
                  </colgroup>
                  <thead className="text-base">
                    <tr>
                      <th scope="col" className="pl-5 pr-1 py-2">
                      </th>
                      <th scope="col" className="px-2 py-2">Overall Review
                      </th>
                      <th scope="col" className="px-3 py-2">
                        Model
                      </th>
                      <th scope="col" className="px-2 py-2">
                        Sentiment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterReviewsBySentiment().map((review, index) => (
                      <tr key={index}>
                        <th scope="row" className="pl-5 pr-1 py-3 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          {index + 1}
                        </th>
                        <td className="px-2 py-2">
                          {review.textDisplay}
                        </td>
                        <td className="px-3 py-2">
                          {review.smartphoneName}
                        </td>
                        <td className="px-2 py-2 text-center">
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="bg-white shadow-md rounded-[20px] md:p-3 md:my-2 w-full h-full" style={{ maxHeight: "40vh" }}>
                    <canvas id="ovaBarChart">barchart</canvas>
                  </div>
                  <div className="bg-white shadow-md rounded-[20px] md:p-3 md:mr-4 md:my-2 w-full h-full" style={{ maxHeight: "40vh" }}>
                    <canvas id="fullStackBarChart" src="..."></canvas>
                  </div>
                </div>
                <div>
                  <div className="bg-white shadow-md rounded-[20px] md:p-3 md:mr-4 md:my-2 w-full h-full" style={{ maxHeight: "36vh" }}>
                    <canvas id="fullStackBarChartAspect" src="..."></canvas>
                  </div>
                  <div className="bg-white shadow-md rounded-[20px] md:my-2 w-full h-full" style={{ maxHeight: "44vh" }}>
                    <canvas id="RadarChart" className="mx-auto" src="..."></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>


      {selectedModelSm1 && selectedModelSm2 && (
        <div>
          <div className="text-center md:my-5">
            <span className="text-3xl font-semibold font-mono md:font-mono">Smartphone Information</span>
          </div>
          <div className="md:mx-auto w-full max-w-4xl">
            <Table aria-label="Example table with dynamic content">
              <TableHeader columns={columnsInfoData}>
                {(column, index) => (
                  <TableColumn key={column.key} className="text-base"
                    style={{ width: index === 0 ? "5%" : "25%" }}>
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={rowsInfoData}>
                {(item) => (
                  <TableRow key={item.info}>
                    {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );

}
