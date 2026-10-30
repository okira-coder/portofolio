"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { site } from "@/data/site";

function Monogram() {
  return (
    <span
      aria-hidden
      className="relative grid size-8 place-items-center rounded-md bg-text text-[0.7rem] font-bold tracking-tight text-ink"
    >
      FA
      <span className="absolute bottom-1 h-[2px] w-3 rounded-full bg-accent" />
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparente en haut de page, floutée avec une bordure fine une fois qu’on a défilé.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-line bg-ink/80 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight" onClick={() => setOpen(false)}>
          <Monogram />
          {site.name}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-7 text-sm font-medium text-text/80">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-accent-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-ink"
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </li>
          </ul>
          <Link
            href="/#contact"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#171512] transition-colors hover:bg-accent-strong"
          >
            Me contacter
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div id="menu-mobile" className="border-t border-line md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-4 sm:px-6">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-3 text-lg" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.links.github} target="_blank" rel="noreferrer" className="block py-3 text-lg">
                GitHub
              </a>
            </li>
            <li className="pt-3">
              <Link
                href="/#contact"
                className="block rounded-md bg-accent px-4 py-3 text-center font-medium text-[#171512]"
                onClick={() => setOpen(false)}
              >
                Me contacter
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
