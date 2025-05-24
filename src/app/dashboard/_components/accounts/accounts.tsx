import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      account_value: 100,
      platform: "pending",
      account_name: "m@example.com",
    },
    // ...
  ]
}

export default async function AccountDashboard() {
  const data = await getData()

  return (
    <div className="container mx-auto px-4 lg:px-6">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
