"use client"
import useSWR from "swr";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { fetcher } from "@/lib/fetcher";
import { toast } from "sonner";
import { Trade } from "@/actions/trades/trades";
import React, { useEffect } from "react";
import { SectionCards } from "./components/section-cards";
import { useTradeUIStore } from "@/stores/trade-ui-store";


export default function TradeDashboard() {

  const { data: trades, error, isLoading, mutate } = useSWR<Trade[]>("/trade/", fetcher);
  const filter = useTradeUIStore((s) => s.filter);
  const setFilter = useTradeUIStore((s) => s.setFilter);
  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  if (error) toast.error("failed to load");

  useEffect(() => {
    setFilter(undefined);
  }, []);

  const filteredTrades = React.useMemo(() => {
    if (!trades) return [];

    if (!filter) return trades;

    return trades.filter((trade) =>
      trade.side === filter ||
      trade.planId === filter ||
      trade.account_id === filter
    );
  }, [filter]);

  return (
    <>
       <SectionCards />
      <div className="container mx-auto px-4 lg:px-6">
        <DataTable columns={columns} data={filteredTrades || []} />
      </div>
    </>
  );
}
