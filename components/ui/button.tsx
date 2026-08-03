import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { SmartLink } from "./smart-link";

export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        outline:
          "border border-accent-foreground bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
        bordered: "border hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        sm: "h-8 gap-1.5 rounded-sm px-3 text-sm",
        md: "h-11 rounded-lg px-5 text-base",
        lg: "h-14.5 rounded-md px-4 py-2 text-lg has-[>svg]:px-3",
        xl: "h-16 rounded-md px-6 text-lg has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return (
    <button
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Variants & { href: string }) {
  return (
    <SmartLink
      href={href}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
