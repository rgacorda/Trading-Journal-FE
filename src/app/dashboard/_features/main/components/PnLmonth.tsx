"use client";

import { Trade } from "@/actions/trades/trades";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  addDays,
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from "date-fns";
import React, { useState } from "react";

export type Event = {
  id: string;
  title: string;
  date: string; // ISO string
};

type Props = {
  trades: Trade[] | undefined;
};

export const MonthCalendar: React.FC<Props> = ({ trades }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Group trades by date and summarize
  const events = React.useMemo(() => {
    if (!trades) return [];

    const map = new Map<string, { count: number; realized: number }>();

    for (const trade of trades) {
      const dateKey = new Date(trade.date).toISOString().split("T")[0];
      const current = map.get(dateKey) || { count: 0, realized: 0 };
      map.set(dateKey, {
        count: current.count + 1,
        realized: current.realized + Number(trade.realized),
      });
    }

    return Array.from(map.entries()).map(([date, value]) => ({
      id: date,
      date,
      title: `${value.count} trade${value.count > 1 ? "s" : ""} | $${value.realized.toFixed(2)}`,
    }));
  }, [trades]);

  // Calendar rendering
  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isToday = isSameDay(day, new Date());
      const dayEvents = events.filter((event) =>
        isSameDay(new Date(event.date), day)
      );
      const daySummary = dayEvents[0];
      const realizedAmount = daySummary
        ? parseFloat(daySummary.title.split("|")[1].replace("$", ""))
        : null;

      const cellBg = realizedAmount !== null
        ? realizedAmount >= 0
          ? "bg-green-50 text-green-900"
          : "bg-red-50 text-red-900"
        : isCurrentMonth
          ? "bg-white"
          : "bg-gray-100 text-gray-400";

      days.push(
        <div
          key={day.toString()}
          className={`
            h-32 p-2 border rounded-lg flex flex-col justify-between transition-all
            ${cellBg} ${isToday ? "ring-2 ring-primary" : ""}
          `}
        >
          {/* Top: Day number */}
          <div className="text-[11px] font-bold text-gray-700">
            {format(day, "d")}
          </div>

          {/* Bottom: Trade badge */}
          <div className="mt-auto">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className={`
                  text-[11px] font-medium text-center px-2 py-[2px] rounded-md 
                  ${realizedAmount! >= 0
                    ? "bg-green-200 text-green-900"
                    : "bg-red-200 text-red-900"
                  }
                `}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-1">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between space-y-1.5">
          <div>
            <CardTitle>Month Calendar</CardTitle>
            <CardDescription>Daily Trades and PnL View</CardDescription>
          </div>
          <div className="flex justify-between items-center mb-4 lg:w-1/3">
            <Button onClick={prevMonth} variant="outline" className="px-2 py-1 text-sm mx-1">
              ← Prev
            </Button>
            <h2 className="text-xl font-bold mx-2 px-5">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <Button onClick={nextMonth} variant="outline" className="px-2 py-1 rounded text-sm mx-1">
              Next →
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full max-w-6xl mx-auto">
          {/* Weekdays */}
          <div className="grid grid-cols-7 bg-gray-200 text-center text-xs font-semibold rounded-t-md overflow-hidden">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-2 border">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="divide-y space-y-1">{rows}</div>
        </div>
      </CardContent>
    </Card>
  );
};
