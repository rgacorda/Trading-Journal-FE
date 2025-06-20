"use client"
import useSWR from "swr";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { fetcher } from "@/lib/fetcher";
import { toast } from "sonner";
import { Trade } from "@/actions/trades/trades";


export default function TradeDashboard() {

  const { data, error, isLoading, mutate } = useSWR<Trade[]>("/trade/", fetcher);
  
  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  if (error) toast.error("failed to load");

  return (
    <>
      <div className="container mx-auto px-4 lg:px-6">
        {/* ADD CHARTS HERE */}
        <DataTable columns={columns} data={data || []} />
      </div>
    </>
  );
}
