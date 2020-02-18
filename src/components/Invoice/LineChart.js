import React from "react";
import { Line } from "react-chartjs-2";
import { amountPerMonth, months } from "./selector";
import styled from "styled-components";
import moment from "moment";

const Wrapper = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
`;

const LineChart = ({ invoices }) => {
  const data = {
    labels: months(),
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
        data: amountPerMonth(invoices)
      }
    ]
  };
  return (
    <Wrapper>
      <b>
        {`Facturación interanual (${moment()
          .subtract(11, "months")
          .format("MMM YYYY")}
            - ${moment().format("MMM YYYY")}): `}
      </b>
      <Line data={data} />
    </Wrapper>
  );
};

export default LineChart;
