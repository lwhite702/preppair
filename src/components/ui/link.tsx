
import * as React from "react";
import { cn } from "@/lib/utils";
import { Link as RouterLink } from "react-router-dom";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, className, children, ...props }, ref) => {
    const isExternal = href.startsWith("http");
    const isHash = href.startsWith("#");

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn("text-primary hover:underline", className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    if (isHash) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn("text-primary hover:underline", className)}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <RouterLink
        to={href}
        className={cn("text-primary hover:underline", className)}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = "Link";

export { Link };
