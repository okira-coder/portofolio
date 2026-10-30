import type { Status } from "@/data/projects";

const dot: Record<Status, string> = {
  Production: "bg-prod",
  "Pré-production": "bg-preprod",
  Prototype: "bg-proto",
  MVP: "bg-proto",
  "R&D": "bg-rnd",
};

/** Statut d’un projet. La couleur indique la maturité, le texte reste explicite. */
export function StatusBadge({ status, label }: { status: Status; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted">
      <span aria-hidden className={`size-2 shrink-0 rounded-full ${dot[status]}`} />
      {label ?? status}
    </span>
  );
}
