import { Trade } from "@/actions/trades/trades";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

export const columns: ColumnDef<Trade>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("date") as string;
      const formatted = format(new Date(value), "MMM dd, yyyy"); // e.g., "Jun 19, 2025"
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "ticker",
    header: "Ticker",
  },
  {
    accessorKey: "side",
    header: "Side",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "entry",
    header: "Entry",
  },
  {
    accessorKey: "exit",
    header: "Exit",
  },
  {
    accessorKey: "setup",
    header: "Setup",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },

  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "mistakes",
    header: "Mistakes",
  },

  {
    accessorKey: "realized",
    header: () => <div className="text-right">Realized</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("realized"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Edit Trade
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
