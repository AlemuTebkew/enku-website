import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";
import clsx from 'clsx';

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
  className, // Accept the custom className prop
  ...props
}) => {
  const buttonClass = clsx(
    "inline-flex items-center justify-center font-semibold rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
    // Variant styles
    {
      "bg-primary text-white hover:bg-primary-dark": variant === "primary",
      "bg-secondary text-primary hover:bg-secondary-dark": variant === "secondary",
      "bg-white border border-primary text-primary hover:bg-primary-light": variant === "outline",
      "bg-red-600 text-white hover:bg-red-700": variant === "danger",
      "bg-gray-200 text-black": variant === "default", // Default style
    },
    // Size styles
    {
      "px-2 py-1 text-sm": size === "sm",
      "px-4 py-2 text-base": size === "md",
      "px-6 py-3 text-lg": size === "lg",
    },
    // Loading and disabled styles
    {
      "opacity-50 cursor-not-allowed": isLoading || disabled,
    },
    className // Merge any additional className passed as a prop
  );

  return (
    <Button className={buttonClass} disabled={disabled || isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default CustomButton;
