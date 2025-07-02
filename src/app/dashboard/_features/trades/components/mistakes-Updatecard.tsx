"use client";
import * as React from "react";
import { useForm, FormProvider, Form } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { mutate } from "swr";
import { useTradeUIStore } from "@/stores/trade-ui-store";
import { getTradebyId, updateTrade } from "@/actions/trades/trades";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  mistake_input: z
    .string()
    .max(50, { message: "Mistake must be at most 50 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MistakesUpdateCard() {
  const isDesktop = useIsMobile();
  const open = useTradeUIStore((s) => s.editOpen);
  const onOpenChange = useTradeUIStore((s) => s.setEditOpen);
  const selectedId = useTradeUIStore((s) => s.selectedTradeId);

  if (!isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Mistakes</DialogTitle>
            <DialogDescription>
              Add your Mistakes here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <AccountForm onOpenChange={onOpenChange} selectedId={selectedId} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} modal={false}>
      <DrawerContent>
        <div className="mx-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit Mistakes</DrawerTitle>
            <DrawerDescription>
              Add your Mistakes here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <AccountForm
            className="px-4"
            onOpenChange={onOpenChange}
            selectedId={selectedId}
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function AccountForm({
  className,
  selectedId,
  onOpenChange,
}: {
  className?: string;
  selectedId: string | null;
  onOpenChange: (open: boolean) => void;
}) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mistake_input: "",
    },
  });

  const [mistakes, setMistakes] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!selectedId) return;

    (async () => {
      try {
        const trade = await getTradebyId(selectedId);
        if (Array.isArray(trade?.mistakes)) {
          setMistakes(trade.mistakes);
        }
      } catch (err: any) {
        toast.error("Failed to fetch trade data.");
      }
    })();
  }, [selectedId]);

  const onSubmit = async () => {
  if (!selectedId) return;
  try {

    await updateTrade(selectedId, {
      mistakes: mistakes,
    })
    mutate("/trade/"); 
    toast.success("Mistakes updated successfully.");
    onOpenChange(false);
  } catch (err: any) {
    toast.error(err.message);
  }
};



  return (
    <FormProvider {...methods}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {/* <div className="grid gap-2">
          <Label htmlFor="platform">Platform</Label>
          <PlatformInput value={platformValue} setValue={setPlatformValue} />
        </div> */}

        <FormField
          name="mistake_input"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mistakes</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add a mistake"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = field.value.trim();
                      if (value && !mistakes.includes(value)) {
                        setMistakes((prev) => [...prev, value]);
                        field.onChange("");
                      }
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap gap-2">
          {mistakes.map((item, index) => (
            <Badge
              key={index}
              variant={"outline"}
            //   className="bg-muted px-2 py-1 rounded text-sm flex items-center gap-1"
            >
              {item}
              <button
                type="button"
                className="text-red-500"
                onClick={() => {
                  setMistakes((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                ✕
              </button>
            </Badge>
          ))}
        </div>

        <Button type="submit">Save</Button>
      </form>
    </FormProvider>
  );
}
