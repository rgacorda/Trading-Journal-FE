import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ResetSuccessForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Password Reset Link Sent Successfully</CardTitle>
          <CardDescription>
            Please check your email for a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Optionally, you can add an icon or illustration here */}
        </CardContent>
      </Card>
    </div>
  );
}
