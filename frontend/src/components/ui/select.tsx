import * as React from "react";
import { cn } from "@/lib/utils";

type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);

Select.displayName = "Select";

const SelectTrigger = Select;
const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectValue = () => null;
const SelectLabel = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectItem = ({ children, value }: { children: React.ReactNode; value: string }) => (
  <option value={value}>{children}</option>
);
const SelectSeparator = () => null;
const SelectScrollDownButton = () => null;
const SelectScrollUpButton = () => null;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
