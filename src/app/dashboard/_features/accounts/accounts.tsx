"use client"
import useSWR from "swr";
import { Account, columns } from "./columns";
import { DataTable } from "./data-table";
import { fetcher } from "@/lib/fetcher";
import { toast } from "sonner";


export default function AccountDashboard() {

  const { data, error, isLoading, mutate } = useSWR<Account[]>("/account/", fetcher);
  
  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  if (error) toast.error("failed to load");

  return (
    <>
      <div className="container mx-auto px-4 lg:px-6">
        <DataTable columns={columns} data={data || []} />
      </div>
    </>
  );
}
