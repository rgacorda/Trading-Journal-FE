"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import PlansCard from "./components/card";
import { Input } from "@/components/ui/input";
import { IconPlus } from "@tabler/icons-react";
import TiptapEditor from "./components/tiptap";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

type Plan = {
  id: string;
  name: string;
};

export default function PlansDashboard() {
  const [openAddForm, setOpenAddForm] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const { data, error, isLoading, mutate } = useSWR<Plan[]>("/plan/", fetcher);

  // 🔍 Filter plans based on search input
  const filteredPlans = React.useMemo(() => {
    if (!data) return [];
    return data.filter((plan) =>
      plan.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex gap-4">
          <Input
            className="flex-1 mb-4"
            placeholder="Search Plans"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => setOpenAddForm(true)}
          >
            <IconPlus />
            Add Plan
          </Button>
        </div>

        {filteredPlans?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredPlans.map((plan) => (
              <PlansCard
                key={plan.id}
                id={plan.id}
                title={plan.name}
                image={null}
                subtext={null}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex justify-center items-center bg-white p-4 col-span-1 sm:col-span-2 md:col-span-3"
            style={{ minHeight: "150px" }}
          >
            <p className="text-center">No results found.</p>
          </div>
        )}
      </div>

      {/* Add Plan Modal */}
      <TiptapEditor open={openAddForm} onOpenChange={setOpenAddForm} />
    </>
  );
}
