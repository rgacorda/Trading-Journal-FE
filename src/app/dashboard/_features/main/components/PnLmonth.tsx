"use client";
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
  date: string; // ISO string e.g., "2025-07-14"
};

type Props = {
  events?: Event[] | null; // Nullable
};

export const MonthCalendar: React.FC<Props> = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const dayEvents = events?.filter((event) =>
        isSameDay(new Date(event.date), day)
      );

      days.push(
        <div
          key={day.toString()}
          className={`border p-2 h-32 overflow-hidden relative transition-all text-sm ${
            isSameMonth(day, monthStart)
              ? "bg-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <div className="text-xs font-semibold">{format(day, "d")}</div>
          <div className="mt-1 space-y-1 overflow-y-auto max-h-24 scrollbar-thin scrollbar-thumb-gray-300 pr-1">
            {dayEvents?.map((event) => (
              <div
                key={event.id}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
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
      <div key={day.toString()} className="grid grid-cols-7">
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
            <CardDescription>Monthly Profit and Loss</CardDescription>
          </div>
          <div className="flex justify-between items-center mb-4 lg:w-1/3">
            <Button onClick={prevMonth} variant={"outline"}  className="px-2 py-1 text-sm mx-1">
              ← Prev
            </Button>
            <h2 className="text-xl font-bold mx-2 px-5">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <Button onClick={nextMonth} variant={"outline"} className="px-2 py-1 rounded text-sm mx-1">
              Next →
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full max-w-6xl mx-auto">
          {/* Weekdays */}
          <div className="grid grid-cols-7 bg-gray-200 text-center text-xs font-semibold">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="border py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="divide-y">{rows}</div>
        </div>
      </CardContent>
    </Card>
  );
};
