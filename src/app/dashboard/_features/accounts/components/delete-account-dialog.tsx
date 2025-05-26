import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccountUIStore } from "@/stores/account-ui-store";

// interface DialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }
export default function DeleteAccountDialog() {
  const open = useAccountUIStore((s) => s.deleteOpen);
  const onOpenChange = useAccountUIStore((s) => s.setDeleteOpen);
  const selectedId = useAccountUIStore((s) => s.selectedAccountId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Confirm the deletion of your account. Click delete when you're sure.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Account Name
            </Label>
            <Input
              id="name"
              placeholder="Type Account Name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Delete</Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
