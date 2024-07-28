import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const WritingDoughnutChart = ({ score }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Score', 'Remaining'],
          datasets: [
            {
              data: [score, 10 - score], // Assuming total score is 10
              backgroundColor: ['#36A2EB', '#E7E9ED'],
              borderWidth: 1, // Border width for each segment
            },
          ],
        },
        options: {
          cutout: '80%', // Adjust the cutout percentage to control the size of the center text
          plugins: {
            title: {
              display: true,
              text: `${score}/10`, // Display the score and total score
              color: '#000', // Set the color of the title
              font: {
                size: 20, // Adjust the font size of the title
              },
            },
            legend: {
              display: true,
            },
          },
          animation: true, // Disable animation for a static chart
          responsive: true,
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [score]);

  return <canvas ref={chartContainer} width="100%" height="100%"></canvas>;
};

export default WritingDoughnutChart;
