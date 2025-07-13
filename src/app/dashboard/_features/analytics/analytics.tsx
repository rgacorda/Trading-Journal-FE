import React from "react";
import StatTable from "./components/statTable";
import StatCharts from "./components/statCharts";

export default function AnalyticsDashboard() {
  return <div className="container mx-auto px-6">
    <StatTable />
    {/* <div className="grid grid-cols-2">
        <StatCharts />
        <StatCharts />
        <StatCharts />
        <StatCharts />
    </div> */}
  </div>;
}
