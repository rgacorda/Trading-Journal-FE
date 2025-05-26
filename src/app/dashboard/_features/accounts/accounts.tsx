"use client"
import React, { useEffect } from "react";
import { Account, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Account[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      account_value: 100,
      platform: "pending",
      account_name: "m@example.com",
    },
    {
      id: "728ed52g",
      account_value: 200,
      platform: "pending",
      account_name: "m1@example.com",
    },
    {
      id: "728ed52h",
      account_value: 300,
      platform: "pending",
      account_name: "m2@example.com",
    },
    {
      id: "728ed52i",
      account_value: 400,
      platform: "pending",
      account_name: "m3@example.com",
    },
    {
      id: "728ed52j",
      account_value: 500,
      platform: "pending",
      account_name: "m4@example.com",
    },
    {
      id: "728ed52k",
      account_value: 600,
      platform: "pending",
      account_name: "m5@example.com",
    },
    {
      id: "728ed52l",
      account_value: 700,
      platform: "pending",
      account_name: "m6@example.com",
    },
    {
      id: "728ed52m",
      account_value: 800,
      platform: "pending",
      account_name: "m7@example.com",
    },
    {
      id: "728ed52n",
      account_value: 900,
      platform: "pending",
      account_name: "m8@example.com",
    },
    {
      id: "728ed52o",
      account_value: 1000,
      platform: "pending",
      account_name: "m9@example.com",
    },
    {
      id: "728ed52p",
      account_value: 1100,
      platform: "pending",
      account_name: "m10@example.com",
    },
    {
      id: "728ed52q",
      account_value: 1200,
      platform: "pending",
      account_name: "m11@example.com",
    },
    {
      id: "728ed52r",
      account_value: 1300,
      platform: "pending",
      account_name: "m12@example.com",
    },
    {
      id: "728ed52s",
      account_value: 1400,
      platform: "pending",
      account_name: "m13@example.com",
    },
    // ...
  ];
}

export default function AccountDashboard() {
  const [data, setData] = React.useState<Account[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 lg:px-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
