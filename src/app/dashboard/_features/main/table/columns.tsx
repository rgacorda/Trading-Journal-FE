"use client";

import { Account } from "@/actions/accounts/account";
import { Trade } from "@/actions/trades/trades";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetcher } from "@/lib/fetcher";
import { useAccountUIStore } from "@/stores/account-ui-store";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import useSWR from "swr";

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center justify-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Live Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {

      const balance = parseFloat(row.getValue("balance")) || 0;

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(balance);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Initial Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { data: trades } = useSWR<Trade[]>("/trade/", fetcher);

      const balance = parseFloat(row.getValue("balance")) || 0;

      const totalRealized =
        trades?.reduce((sum, trade) => {
          return sum + (Number(trade.realized) || 0);
        }, 0) || 0;

      const combined = balance + totalRealized;

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(combined);

      const isUp = combined > balance;

      return (
        <div className="flex items-center gap-2 font-medium">
          <span className={isUp ? "text-green-600" : "text-red-600"}>
            {formatted}
          </span>
          {isUp ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
        </div>
      );
    },
  },
];
