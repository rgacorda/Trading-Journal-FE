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
import { useAccountUIStore } from "@/stores/account-ui-store";

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

// interface ProfileFormProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

export default function EditAccountForm() {
  const isDesktop = useIsMobile();

  const open = useAccountUIStore((s) => s.editOpen);
  const onOpenChange = useAccountUIStore((s) => s.setEditOpen);
  const selectedId = useAccountUIStore((s) => s.selectedAccountId);


  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>
              Edit your trading account here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <AccountForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} modal={false}>
      <DrawerContent>
        <div className="mx-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit Account</DrawerTitle>
            <DrawerDescription>
              Edit your trading account here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <AccountForm className="px-4" />
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

function AccountForm({ className }: React.ComponentProps<"form">) {
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
      <Button type="submit">Save Changes</Button>
    </form>
  );
}
