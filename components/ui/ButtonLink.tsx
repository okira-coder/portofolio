import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", external }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-[#171512] hover:bg-accent-strong"
      : "border border-line text-text hover:border-muted hover:bg-panel";
  const className = `${base} ${styles}`;
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
