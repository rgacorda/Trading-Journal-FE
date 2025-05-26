import * as React from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconCirclePlusFilled, IconPlus } from "@tabler/icons-react";
import { PlatformInput } from "../../import/platform_input";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

interface ProfileFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddAccountForm({
  open,
  onOpenChange,
}: ProfileFormProps) {
  const isDesktop = useIsMobile();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mx-2">
            <IconPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new Account</DialogTitle>
            <DialogDescription>
              Add your new trading account here. Click add when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="mx-2">
          <IconPlus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>Add new Account</DrawerTitle>
            <DrawerDescription>
              Add your new trading account here. Click add when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <ProfileForm className="px-4" />
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

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="platform">Platform</Label>
        <PlatformInput value="" setValue={() => {}} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">Account Name</Label>
        <Input type="email" id="account_name" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="capital">Capital (USD)</Label>
        <Input
          type="number"
          id="account_capital"
          defaultValue="1000"
        />
      </div>
      <Button type="submit">Add Account</Button>
    </form>
  );
}
