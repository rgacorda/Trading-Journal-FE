import { Trade, updateTrade } from "@/actions/trades/trades";
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
import { Input } from "@/components/ui/input";
import useSWR, { mutate } from "swr";
import { Plan } from "../../plans/plans";
import { fetcher } from "@/lib/fetcher";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTradeUIStore } from "@/stores/trade-ui-store";

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
    accessorKey: "planId",
    header: "Setup",
    cell: ({ row }) => {
      const setup = row.getValue("planId") as string;

      const { data: plans } = useSWR<Plan[]>("/plan/", fetcher);
      return (
        <div>
          <Select
            value={row.original?.planId}
            onValueChange={async (value) => {
              try {
                await updateTrade(row.original.id, {
                  ...row.original,
                  planId: value,
                });
                mutate("/trade/");
                toast.success("Trade updated successfully.");
              } catch (error: any) {
                toast.error("Failed to update trade.");
              }
            }}
          >
            <SelectTrigger className="w-[180px] border-none">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Plans</SelectLabel>
                {plans?.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "plan",
  //   header: "Plan",
  //   // cell: ({ row }) => {

  //   // }
  // },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => (
      <>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original?.grade}
          id={`${row.original.id}-target`}
          onBlur={async (e) => {
            const newValue = e.target.value;

            if (newValue !== row.original?.grade) {
              try {
                await updateTrade(row.original.id, {
                  ...row.original,
                  grade: newValue,
                });
                toast.success("Grade updated successfully.");
              } catch (err: any) {
                toast.error(err.message);
              }
            }
          }}
        />
      </>
    ),
  },
  {
    accessorKey: "mistakes",
    header: "Mistakes",
    cell: ({ row }) => {
      const mistakes = row.original?.mistakes as string[];
      const setEditOpen = useTradeUIStore((s) => s.setEditOpen);
      const setSelectedTradeId = useTradeUIStore((s) => s.setSelectedTradeId);

      return (
        <>
          {row.original?.mistakes?.length > 0 ? (
            <>
              <Badge
                variant="outline"
                className="text-xs mr-1"
                onClick={() => {
                  setSelectedTradeId(row.original.id);
                  setEditOpen(true);
                }}
              >
                {row.original.mistakes[0]}
              </Badge>
              {row.original.mistakes.length > 1 && (
                <Badge
                  variant="outline"
                  className="text-xs mr-1"
                  onClick={() => {
                    setSelectedTradeId(row.original.id);
                    setEditOpen(true);
                  }}
                >
                  +{row.original.mistakes.length - 1}
                </Badge>
              )}
            </>
          ) : (
            <Badge
              variant="outline"
              className="text-xs"
              onClick={() => {
                setSelectedTradeId(row.original.id);
                setEditOpen(true);
              }}
            >
              No mistakes
            </Badge>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "fees",
    header: "Fees",
    cell: ({ row }) => {
      return (
        // <div className="text-right font-medium text-red-500">{formatted}</div>
        <>
          <Input
            className="text-red-500 hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
            defaultValue={row.original?.fees}
            id={`${row.original.id}-target`}
            onBlur={async (e) => {
              const newValue = parseFloat(e.target.value);

              if (!isNaN(newValue) && newValue !== row.original?.fees) {
                try {
                  await updateTrade(row.original.id, {
                    ...row.original,
                    fees: newValue,
                  });
                  mutate("/trade/");
                  toast.success("Fees updated successfully.");
                } catch (err: any) {
                  toast.error(err.message);
                }
              }
            }}
          />
        </>
      );
    },
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
