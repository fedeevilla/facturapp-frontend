import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ title, invoices, labels }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Facturación",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: invoices,
      },
    ],
  };

  return (
    <div style={{ marginTop: 30 }}>
      <b>{title}</b>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
