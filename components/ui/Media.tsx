import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ImageSlot } from "@/data/projects";

type Frame = "none" | "browser" | "phone" | "window";

type Props = {
  slot: ImageSlot;
  frame?: Frame;
  /** Texte de la barre d’adresse (browser) ou du titre (window). */
  label?: string;
  /** Placeholder réduit, pour les petits emplacements. */
  compact?: boolean;
  sizes?: string;
  priority?: boolean;
  /** Classes de l’image, pour le zoom au survol par exemple. */
  imageClassName?: string;
  className?: string;
  /** Arrondi du cadre « none ». */
  rounded?: string;
};

export const imageExists = (src: string) => existsSync(path.join(process.cwd(), "public", src));

/**
 * Affiche un visuel dans son cadre. Si le fichier n’existe pas encore dans /public,
 * affiche un placeholder avec le nom, les dimensions et le chemin attendus.
 * Aucune fausse capture n’est générée.
 */
export function Media({
  slot,
  frame = "none",
  label,
  compact = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  imageClassName = "",
  className = "",
  rounded = "rounded-xl",
}: Props) {
  const exists = imageExists(slot.src);

  const surface = (
    <div className="relative w-full overflow-hidden bg-panel" style={{ aspectRatio: `${slot.width} / ${slot.height}` }}>
      {exists ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover object-top transition-transform duration-700 ease-out ${imageClassName}`}
        />
      ) : (
        <Placeholder slot={slot} compact={compact} className={imageClassName} />
      )}
    </div>
  );

  if (frame === "phone") {
    return (
      <div className={`rounded-[2rem] border border-line bg-raised p-1.5 shadow-2xl shadow-shade ${className}`}>
        <div className="relative overflow-hidden rounded-[1.6rem]">
          <span aria-hidden className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-ink/80" />
          {surface}
        </div>
      </div>
    );
  }

  if (frame === "browser" || frame === "window") {
    return (
      <div className={`overflow-hidden rounded-xl border border-line bg-raised shadow-2xl shadow-shade ${className}`}>
        <div className="flex h-9 items-center gap-3 border-b border-line px-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
          </span>
          {label && (
            <span
              className={`truncate text-xs text-muted ${
                frame === "browser" ? "mx-auto rounded bg-ink/60 px-3 py-0.5 font-mono" : "font-medium"
              }`}
            >
              {label}
            </span>
          )}
        </div>
        {surface}
      </div>
    );
  }

  return <div className={`overflow-hidden border border-line ${rounded} ${className}`}>{surface}</div>;
}

function Placeholder({ slot, compact, className }: { slot: ImageSlot; compact: boolean; className: string }) {
  return (
    <div
      role="img"
      aria-label={`Visuel à venir : ${slot.alt}`}
      className={`absolute inset-0 flex items-center justify-center p-4 text-center transition-transform duration-700 ease-out ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        backgroundPosition: "-1px -1px",
      }}
    >
      {compact ? (
        <span className="flex flex-col items-center gap-2 rounded-md bg-panel/90 px-3 py-2">
          <ImageIcon aria-hidden className="size-4 text-faint" />
          <span className="font-mono text-[10px] leading-tight text-faint">{path.basename(slot.src)}</span>
        </span>
      ) : (
        <span className="flex max-w-full flex-col items-center gap-2 rounded-lg bg-panel/90 px-5 py-4">
          <ImageIcon aria-hidden className="size-5 text-faint" />
          <span className="text-sm text-muted">{slot.alt}</span>
          <span className="font-mono text-xs text-faint tabular-nums">
            {slot.width} × {slot.height}
          </span>
          <code className="break-all font-mono text-xs text-faint">public{slot.src}</code>
        </span>
      )}
    </div>
  );
}
