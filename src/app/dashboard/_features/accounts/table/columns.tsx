"use client";

import { Account } from "@/actions/accounts/account";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccountUIStore } from "@/stores/account-ui-store";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import React from "react";

// ✅ Correct type: row is Row<Account>
const ActionsCell: React.FC<{ row: Row<Account> }> = ({ row }) => {
  const account = row.original; // Extract actual account data

  const setEditOpen = useAccountUIStore((s) => s.setEditOpen);
  const setDeleteOpen = useAccountUIStore((s) => s.setDeleteOpen);
  const setSelectedAccountId = useAccountUIStore((s) => s.setSelectedAccountId);

  const handleEdit = () => {
    setEditOpen(true);
    setSelectedAccountId(account.id);
  };

  const handleDelete = () => {
    setDeleteOpen(true);
    setSelectedAccountId(account.id);
  };

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
        <DropdownMenuItem onClick={handleEdit}>Edit Account</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
          Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Account Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Initial Value
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balance"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />, // ✅ `row` is of type Row<Account>
  },
];
