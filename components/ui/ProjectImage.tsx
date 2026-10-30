import type { ImageSlot } from "@/data/projects";
import { Media } from "./Media";

/** Visuel d’étude de cas, avec légende. */
export function ProjectImage({ slot, priority = false }: { slot: ImageSlot; priority?: boolean }) {
  return (
    <figure className="m-0">
      <Media slot={slot} priority={priority} sizes="(min-width: 1024px) 60vw, 100vw" />
      {slot.caption && <figcaption className="mt-3 text-sm text-muted">{slot.caption}</figcaption>}
    </figure>
  );
}
