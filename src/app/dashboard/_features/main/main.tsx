"use client";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "./chart-area";
import { DataTable } from "@/components/data-table";
import React from "react";
import useSWR from "swr";
import { Trade } from "@/actions/trades/trades";
import { fetcher } from "@/lib/fetcher";
import { Account } from "@/actions/accounts/account";
import { MonthCalendar } from "./components/PnLmonth";

export default function MainDashboard() {
  const { data: trades } = useSWR<Trade[]>("/trade/", fetcher);
  const { data: accounts } = useSWR<Account[]>("/account/", fetcher);

  // 1. Revenue (past 30 days)
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const totalRevenue = trades
    ?.filter((trade) => new Date(trade.date) > oneMonthAgo)
    .reduce((acc, trade) => acc + Number(trade.realized), 0);

  // 2. Total Trades
  const totalTrades = trades?.length ?? 0;

  // 3. Winners & Win Rate
  const winningTrades = trades?.filter((t) => t.realized > 0) ?? [];
  const losingTrades = trades?.filter((t) => t.realized < 0) ?? [];

  const totalWinners = winningTrades.length;
  const winRate = totalTrades > 0 ? totalWinners / totalTrades : 0;

  // 4. Average Win & Loss
  const averageWin =
    winningTrades.reduce((acc, t) => acc + Number(t.realized), 0) /
    (winningTrades.length || 1);

  const averageLoss =
    losingTrades.reduce((acc, t) => acc + Math.abs(t.realized), 0) /
    (losingTrades.length || 1);

  // 5. Expectancy Formula
  const expectancy =
    (winRate * averageWin) - ((1 - winRate) * averageLoss);

    console.log(winningTrades)

  return (
    <div>
      <SectionCards
        data={{
          totalRevenue,
          totalWinRate: (winRate * 100),
          totalTrades,
          expectancy,
        }}
      />
      <div className="py-4 px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="py-4 px-4 lg:px-6">
        <MonthCalendar events={[]} />
      </div>
      <DataTable data={[]} />
    </div>
  );
}
