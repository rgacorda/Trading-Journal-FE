import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlatformInput } from "./platform_input";
import { useState } from "react";
import { toast } from "sonner";
import { ImportTradesService } from "@/actions/trades/import_trades";
import { getUser } from "@/actions/users/user";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportTrade({ open, onOpenChange }: DialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [platform, setPlatform] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const isValidType =
        selectedFile.type === "text/csv" ||
        selectedFile.name.endsWith(".csv") ||
        selectedFile.name.endsWith(".xls");

      if (!isValidType) {
        toast.error("Only CSV or Excel (.xls) files are allowed.");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    const user = await getUser();

    if (!file) {
      toast.error("No file or platform selected.");
      return;
    }else{
      // console.log(platform, file)
      await ImportTradesService.importTrades({ platform, file, user: user?.id });
      toast.success("File uploaded successfully.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Trades</DialogTitle>
          <DialogDescription>
            Select Platform first before importing trades.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Platform
            </Label>
            <div className="col-span-3">
              <PlatformInput value={platform} setValue={setPlatform} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Upload File
            </Label>
            <Input
              id="picture"
              type="file"
              accept=".csv,.xls"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpload}>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
