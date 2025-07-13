"use client";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "./chart-area";
import { DataTable } from "@/components/data-table";
import data from "./data.json";
import React from "react";
import useSWR from "swr";
import { Trade } from "@/actions/trades/trades";
import { fetcher } from "@/lib/fetcher";
import { Account } from "@/actions/accounts/account";

export default function MainDashboard() {
  const { data: trades } = useSWR<Trade[]>("/trade/", fetcher);
  const { data: accounts } = useSWR<Account[]>("/account/", fetcher);

  //REVENUE
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const totalRevenue = trades
    ?.filter((trade) => new Date(trade.date) > oneMonthAgo)
    .reduce((acc, trade) => {
      return acc + Number(trade.realized);
    }, 0);

  //TOTAL TRADES
  const totalTrades = trades?.length ?? 0;

  //WIN RATE
  const totalWinners =
    trades?.reduce((acc, trade) => {
      return acc + (trade.realized > 0 ? 1 : 0);
    }, 0) ?? 0;
  const winRate = totalTrades > 0 ? (totalWinners / totalTrades) * 100 : 0;


  return (
    <div>
      <SectionCards
        data={{
          totalRevenue: totalRevenue,
          totalWinRate: winRate,
          totalTrades: totalTrades
        }}
      />
      <div className="py-4 px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      {/* <DataTable data={accounts||[]} /> */}
    </div>
  );
}
