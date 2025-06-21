import { Trade } from "@/actions/trades/trades";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const columns: ColumnDef<Trade>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      const formatted = format(new Date(value), "MMM dd, yyyy");
      return <div>{formatted}</div>;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId) as string).getTime();
      const dateB = new Date(rowB.getValue(columnId) as string).getTime();
      return dateA - dateB;
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      const value = row.getValue("time") as string;
      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "ticker",
    header: "Ticker",
  },
  {
    accessorKey: "side",
    header: "Side",
    cell: ({ row }) => {
      const side = row.getValue("side") as string;
      const color =
        side.toLowerCase() === "long" ? "text-green-500" : "text-red-500";
      const capitalizedSide = side.charAt(0).toUpperCase() + side.slice(1);
      return <div className={color}>{capitalizedSide}</div>;
    },
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
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            // loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          Target
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          // defaultValue={row.original.target}
          id={`${row.original.id}-target`}
        />
      </form>
    ),
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

      const color = amount >= 0 ? "text-green-500" : "text-red-500";

      return (
        <div className={`${color} text-right font-medium`}>{formatted}</div>
      );
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
