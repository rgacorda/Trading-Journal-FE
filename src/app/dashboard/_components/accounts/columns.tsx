"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  account_name: string;
  account_value: number;
  platform: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "platform",
    header: "Platform",
  },
  {
    accessorKey: "account_name",
    header: "Account Name",
  },
  {
    accessorKey: "account_value",
    header: "Account Value",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("account_value"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>
    },
  },
];
