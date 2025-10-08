"use client";
import { SectionCards } from "@/components/section-cards";
import React from "react";
import useSWR from "swr";
import { Trade } from "@/actions/trades/trades";
import { fetcher } from "@/lib/fetcher";
import { Account } from "@/actions/accounts/account";
import { MonthCalendar } from "./components/PnLmonth";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { Card, CardContent } from "@/components/ui/card";

export default function MainDashboard() {
  const { data: trades } = useSWR<Trade[]>("/trade/", fetcher);
  const { data: accounts } = useSWR<Account[]>("/account/", fetcher);

  // Helper function to get adjusted realized value
  const getAdjustedRealized = React.useCallback((trade: Trade) => {
    if (!accounts) return Number(trade.realized);

    const account = accounts.find(acc => acc.id === trade.accountId);
    const isCommissionsIncluded = account?.isCommissionsIncluded || false;
    const realized = Number(trade.realized);
    const fees = Number(trade.fees) || 0;

    return isCommissionsIncluded ? realized - fees : realized;
  }, [accounts]);

  const now = new Date();

  // Last month (June)
  const firstDayOfLastMonth = new Date(now.getFullYear(), 5, 1);
  const lastDayOfLastMonth = new Date(now.getFullYear(), 6, 0);

  // Current month (July)
  const firstDayOfCurrentMonth = new Date(now.getFullYear(), 6, 1);
  const lastDayOfCurrentMonth = new Date(now.getFullYear(), 7, 0);

  // Revenue current month
  const totalRevenueCurrentMonth = trades
    ?.filter(
      (trade) =>
        new Date(trade.date) >= firstDayOfCurrentMonth &&
        new Date(trade.date) <= lastDayOfCurrentMonth
    )
    .reduce((acc, trade) => acc + getAdjustedRealized(trade), 0) ?? 0;

  // Revenue last month
  const totalRevenueLastMonth = trades
    ?.filter(
      (trade) =>
        new Date(trade.date) >= firstDayOfLastMonth &&
        new Date(trade.date) <= lastDayOfLastMonth
    )
    .reduce((acc, trade) => acc + getAdjustedRealized(trade), 0) ?? 0;

  const totalTrades = trades?.length ?? 0;
  const winningTrades = trades?.filter((t) => getAdjustedRealized(t) > 0) ?? [];
  const losingTrades = trades?.filter((t) => getAdjustedRealized(t) < 0) ?? [];

  const totalWinners = winningTrades.length;
  const winRate = totalTrades > 0 ? totalWinners / totalTrades : 0;

  const averageWin =
    winningTrades.reduce((acc, t) => acc + getAdjustedRealized(t), 0) /
    (winningTrades.length || 1);
  const averageLoss =
    losingTrades.reduce((acc, t) => acc + Math.abs(getAdjustedRealized(t)), 0) /
    (losingTrades.length || 1);

  // const expectancy =
  //   winRate * averageWin - (1 - winRate) * averageLoss;

  const pnlratio = averageWin / (averageLoss || 1);

  // Expectancy this month (July)
  const winningTradesCurrentMonth =
    trades?.filter(
      (t) =>
        new Date(t.date) >= firstDayOfCurrentMonth &&
        new Date(t.date) <= lastDayOfCurrentMonth &&
        getAdjustedRealized(t) > 0
    ) ?? [];

  const losingTradesCurrentMonth =
    trades?.filter(
      (t) =>
        new Date(t.date) >= firstDayOfCurrentMonth &&
        new Date(t.date) <= lastDayOfCurrentMonth &&
        getAdjustedRealized(t) < 0
    ) ?? [];

  const totalTradesCurrentMonth =
    winningTradesCurrentMonth.length + losingTradesCurrentMonth.length;
  const winRateCurrentMonth =
    totalTradesCurrentMonth > 0
      ? winningTradesCurrentMonth.length / totalTradesCurrentMonth
      : 0;

  const avgWinCurrentMonth =
    winningTradesCurrentMonth.reduce((acc, t) => acc + getAdjustedRealized(t), 0) /
    (winningTradesCurrentMonth.length || 1);
  const avgLossCurrentMonth =
    losingTradesCurrentMonth.reduce(
      (acc, t) => acc + Math.abs(getAdjustedRealized(t)),
      0
    ) / (losingTradesCurrentMonth.length || 1);

  const expectancyCurrentMonth =
    winRateCurrentMonth * avgWinCurrentMonth -
    (1 - winRateCurrentMonth) * avgLossCurrentMonth;

  // Expectancy last month (June)
  const winningTradesLastMonth =
    trades?.filter(
      (t) =>
        new Date(t.date) >= firstDayOfLastMonth &&
        new Date(t.date) <= lastDayOfLastMonth &&
        getAdjustedRealized(t) > 0
    ) ?? [];

  const losingTradesLastMonth =
    trades?.filter(
      (t) =>
        new Date(t.date) >= firstDayOfLastMonth &&
        new Date(t.date) <= lastDayOfLastMonth &&
        getAdjustedRealized(t) < 0
    ) ?? [];

  const totalTradesLastMonth =
    winningTradesLastMonth.length + losingTradesLastMonth.length;
  const winRateLastMonth =
    totalTradesLastMonth > 0
      ? winningTradesLastMonth.length / totalTradesLastMonth
      : 0;

  const avgWinLastMonth =
    winningTradesLastMonth.reduce((acc, t) => acc + getAdjustedRealized(t), 0) /
    (winningTradesLastMonth.length || 1);
  const avgLossLastMonth =
    losingTradesLastMonth.reduce(
      (acc, t) => acc + Math.abs(getAdjustedRealized(t)),
      0
    ) / (losingTradesLastMonth.length || 1);

  const expectancyLastMonth =
    winRateLastMonth * avgWinLastMonth -
    (1 - winRateLastMonth) * avgLossLastMonth;

  // Expectancy Change %
  const expectancyChangePercent =
    expectancyLastMonth === 0
      ? 0
      : ((expectancyCurrentMonth - expectancyLastMonth) /
          Math.abs(expectancyLastMonth)) *
        100;

  return (
    <div>
      <SectionCards
        data={{
          totalRevenue: totalRevenueCurrentMonth,
          totalWinRate: winRate * 100,
          totalTrades,
          expectancy: expectancyCurrentMonth,
          pnlratio,
          totalRevenueLastMonth,
          expectancyChangePercentage: expectancyChangePercent,
        }}
      />
      <div className="py-4 px-4 lg:px-6">
        <MonthCalendar trades={trades} />
      </div>
      <div className="py-4 px-4 lg:px-6">
        <Card>
          <CardContent>
            <DataTable columns={columns} data={accounts || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
