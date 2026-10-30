import { Fragment } from "react";
import type { CaseSection } from "@/data/projects";

/** Rendu d’un bloc d’étude de cas selon son type. */
export function CaseSectionView({ section }: { section: CaseSection }) {
  switch (section.kind) {
    case "text":
      return (
        <div className="space-y-4 text-lg leading-relaxed text-pretty">
          {section.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      );

    case "list":
      return (
        <div>
          {section.intro && <p className="mb-4 text-lg leading-relaxed">{section.intro}</p>}
          <ul className="space-y-3 text-lg leading-relaxed">
            {section.items.map((it) => (
              <li key={it} className="flex gap-4">
                <span aria-hidden className="mt-[0.85rem] h-px w-3 shrink-0 bg-faint" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      );

    case "metrics":
      return (
        <div>
          {section.intro && <p className="mb-6 text-muted">{section.intro}</p>}
          <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {section.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse gap-2 bg-ink p-5">
                <dt className="text-sm leading-relaxed text-muted">{m.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">{m.value}</dd>
              </div>
            ))}
          </dl>
          {section.note && <p className="mt-6 leading-relaxed text-muted text-pretty">{section.note}</p>}
        </div>
      );

    case "pipeline":
      return (
        <div>
          {section.intro && <p className="mb-4 text-muted">{section.intro}</p>}
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-3 font-mono text-sm">
            {section.steps.map((s, i) => (
              <Fragment key={s}>
                {i > 0 && (
                  <li aria-hidden className="text-faint">
                    →
                  </li>
                )}
                <li className="rounded-md border border-line bg-panel px-3 py-1.5">{s}</li>
              </Fragment>
            ))}
          </ol>
          {section.note && <p className="mt-5 leading-relaxed text-muted">{section.note}</p>}
        </div>
      );

    case "todo":
      return (
        <p className="rounded-md border border-dashed border-line px-4 py-3 text-sm text-faint">{section.note}</p>
      );
  }
}
