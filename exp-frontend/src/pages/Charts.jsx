import { useEffect, useState } from "react";

import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Charts() {

  const [chartData, setChartData] =
    useState([]);

  const COLORS = [
    "#f6c90e",
    "#ff8c42",
    "#4caf50",
    "#2196f3",
    "#9c27b0",
    "#ff5252"
  ];

  useEffect(() => {

    fetchChartData();

  }, []);

  const fetchChartData = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "https://expense-tracker-fullstack-6p2s.onrender.com/api/expenses/summary",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setChartData(res.data);

    } catch (error) {

      console.log(
        "Error fetching chart data"
      );
    }
  };

  return (

    <div className="container py-5">

      <div
        className="card border-0 shadow-lg p-5"
        style={{
          borderRadius: "30px"
        }}
      >

        <h1 className="text-center fw-bold mb-5">
          Expense Analytics
        </h1>

        <div
          style={{
            width: "100%",
            height: "500px"
          }}
        >

          {chartData.length > 0 ? (

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="total"
                  nameKey="_id"
                  outerRadius={170}
                  label
                >

                  {chartData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          ) : (

            <h4 className="text-center text-muted mt-5">
              No chart data available
            </h4>

          )}

        </div>

      </div>

    </div>
  );
}

export default Charts;