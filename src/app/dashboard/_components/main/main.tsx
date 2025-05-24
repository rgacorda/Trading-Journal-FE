import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "./chart-area";
import { DataTable } from "@/components/data-table";
import data from "./data.json";

export default function MainDashboard() {
  return (
    <div>
      <SectionCards />
      <div className="py-4 px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
}
