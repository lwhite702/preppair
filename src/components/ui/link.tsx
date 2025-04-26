
import * as React from "react";
import { cn } from "@/lib/utils";
import { Link as RouterLink, useNavigate } from "react-router-dom";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, className, children, onClick, ...props }, ref) => {
    const isExternal = href.startsWith("http");
    const isHash = href.startsWith("#");
    const navigate = useNavigate();
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e);
      }
      
      // Don't interfere with external links or hash links
      if (isExternal || isHash) {
        return;
      }
      
      // For internal links
      e.preventDefault();
      navigate(href);
      
      // Always scroll to the top of the page for regular navigation
      window.scrollTo(0, 0);
    };

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn("text-primary hover:underline", className)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
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
          onClick={onClick}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cn("text-primary hover:underline", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

export { Link };
