import { useEffect, useState } from "react";
import { Chart } from 'chart.js/auto';
import { LinearScale } from 'chart.js';

Chart.register(LinearScale);

function Example() {
  const [myChart, setMyChart] = useState(null);
  const dataList = {
    // ...
  };

  useEffect(() => {
    const ctx = document.getElementById('barChartTch').getContext('2d');

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['ชั้นม.4/1', 'ชั้นม.4/2', 'ชั้นม.4/3', 'ชั้นม.4/4', 'ชั้นม.4/5'],
        datasets: [
          {
            label: 'บทที่1',
            data: [2, 8, 2, 9, 7],
            backgroundColor: 'rgba(255, 26, 104, 0.2)',
            borderColor: 'rgba(255, 26, 104, 1)',
            borderWidth: 2,
          },
          {
            label: "บทที่2",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            data: [4,3,7,7,8],
          },
          {
            label: "บทที่3",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 2,
            data: [3,6,2,5,4],
          },
          {
            label: "บทที่4",
            backgroundColor: "rgba(118, 215, 196, 0.2)",
            borderColor: "rgba(118, 215, 196, 1)",
            borderWidth: 2,
            data: [9,7,10,5,10],
          },
          {
            label: "บทที่5",
            backgroundColor: "rgba(93, 109, 126 , 0.2)",
            borderColor: "rgba(93, 109, 126 , 1)",
            borderWidth: 2,
            data: [8,6,1,4,10],
          },
          {
            label: "บทที่6",
            backgroundColor: "rgba(175, 122, 197, 0.2)",
            borderColor: "rgba(175, 122, 197 , 1)",
            borderWidth: 2,
            data: [1,3,8,6,5],
          },
          {
            label: "บทที่7",
            backgroundColor: "rgba(19, 141, 117  , 0.2)",
            borderColor: "rgba(19, 141, 117  , 1)",
            borderWidth: 2,
            data: [9,2,9,4,8],
          },
          {
            label: "บทที่8",
            backgroundColor: "rgba(186, 74, 0, 0.2)",
            borderColor: "rgba(186, 74, 0 , 1)",
            borderWidth: 2,
            data: [5,2,5,8,1],
          },
          {
            label: "บทที่9",
            backgroundColor: "rgba(63, 81, 181 , 0.2)",
            borderColor: "rgba(63, 81, 181 , 1)",
            borderWidth: 2,
            data: [3,4,2,4,1],
          },
          {
            label: "บทที่10",
            backgroundColor: "rgba(205, 220, 57 , 0.2)",
            borderColor: "rgba(205, 220, 57 , 1)",
            borderWidth: 2,
            data: [6,9,3,5,6],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            type: 'linear',
            ticks: {
              beginAtZero: true,
            },
          },
          x: {
            type: 'category',
          },
        },
      },
    });

    setMyChart(chart);
  }, []);

  function changeGradeClass() {
    const gradeClass = document.getElementById('gradeClass').value;

    if (chart) {
      const newData = chart.data.datasets.map((dataset) => {
        let updatedData = [];

        updatedData = dataList[gradeClass][dataset.label];

        return {
          ...dataset,
          data: updatedData,
        };
      });

      chart.data.datasets = newData;
      chart.update();
    }
  }

  return (
    <>
    {/* Bar chart */}
      <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center justify-between ">
            <div className="relative ">
              <h2 className="text-back lg:text-xl md:text-xl sm:text-base font-semibold ">คะแนนเฉลี่ยแบบทดสอบ จำแนกตามชั้นปี</h2>
            </div>
            <div className="relative h-350-px flex items-center">
              <div className="ml-2">
                <select id="gradeClass" onChange={changeGradeClass}>
                  <option value="m4">มัธยมศึกษาชั้นปีที่ 4</option>
                  <option value="m5">มัธยมศึกษาชั้นปีที่ 5</option>
                  <option value="m6">มัธยมศึกษาชั้นปีที่ 6</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative h-350-px">
            <canvas width="" height="60vh" id="barChartTch"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default Example;
