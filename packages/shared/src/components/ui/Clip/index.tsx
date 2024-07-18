import { cva } from "class-variance-authority";
import { cn } from "shared/lib/utils";

interface ClipProps {
  children: React.ReactNode;
  variant: "합격" | "불합격" | "미정";
}

const clipVariants = cva(cn("py-0.5", "px-1.5", "rounded", "w-fit"), {
  variants: {
    variant: {
      합격: cn("bg-blue-50", "text-blue-500"),
      불합격: cn("bg-rose-50", "text-rose-500"),
      미정: cn("bg-gray-100", "text-gray-500"),
    },
  },
  defaultVariants: {
    variant: "미정",
  },
});

const Clip: React.FC<ClipProps> = ({ variant, children }) => (
  <div className={cn(clipVariants({ variant }))}>{children}</div>
);

export { Clip };
