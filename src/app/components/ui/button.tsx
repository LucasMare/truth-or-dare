import React, { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = 
  | "default"
  | "outline"
  | "secondary"
  | "destructive"
  | "ghost";

type ButtonSize = "default" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "default",
  size = "default",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles: Record<ButtonVariant, string> = {
    default: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
    outline: "border border-red-600 text-red-600 hover:bg-red-100 focus:ring-red-600",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300",
    destructive: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-700",
    ghost: "bg-transparent text-red-600 hover:bg-red-100 focus:ring-red-600",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    default: "px-4 py-2 text-sm",
    icon: "p-1 text-sm",
  };

  return (
    <button
      disabled={disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
