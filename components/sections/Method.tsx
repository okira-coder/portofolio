import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { methodQuote, methodSteps, projectManagement } from "@/data/skills";
import { MethodTimeline } from "./MethodTimeline";

export function Method() {
  return (
    <Section id="methode" tone="dark" title="De l’idée à la production">
      <MethodTimeline steps={methodSteps} />

      <Reveal>
        <blockquote className="mt-20 max-w-4xl text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.02em] text-balance">
          {methodQuote}
        </blockquote>
      </Reveal>

      <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">Gestion de projet</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{projectManagement.practices.join(", ")}.</p>
        </div>
        <div>
          <h3 className="font-semibold">Interlocuteurs coordonnés chez Castalie</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{projectManagement.stakeholders.join(", ")}.</p>
        </div>
      </div>
    </Section>
  );
}
