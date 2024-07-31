import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";

// Define the button variants and sizes
type Variant = "default" | "primary" | "secondary" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const CustomButton: FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  isLoading = false,
  disabled = false,
  ...props
}) => {
  return (
    <Button
      className={`
        ${variant === "primary" && "bg-primary text-white hover:bg-primary-dark"}
        ${variant === "secondary" && "bg-secondary text-primary hover:bg-secondary-dark"}
        ${variant === "outline" && "border border-primary text-primary hover:bg-primary-light"}
        ${variant === "danger" && "bg-red-600 text-white hover:bg-red-700"}
        ${size === "sm" && "px-2 py-1 text-sm"}
        ${size === "md" && "px-4 py-2 text-base"}
        ${size === "lg" && "px-6 py-3 text-lg"}
        inline-flex items-center justify-center font-semibold rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isLoading && "opacity-50 cursor-not-allowed"}
        ${disabled && "opacity-50 cursor-not-allowed"}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default CustomButton;
