import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { toneClass, type Tone } from "@/components/ui/Section";
import { IotFeature } from "./featured/IotFeature";
import { McpFeature } from "./featured/McpFeature";
import { PredictiveFeature } from "./featured/PredictiveFeature";
import { WodFeature } from "./featured/WodFeature";

/** Bande pleine largeur : chaque projet a son ton de fond. */
function Band({ tone, children, divider = false }: { tone: Tone; children: ReactNode; divider?: boolean }) {
  return (
    <div className={`${toneClass[tone]} ${divider ? "border-t border-line" : ""}`}>
      <Container>{children}</Container>
    </div>
  );
}

/** Les quatre projets principaux, chacun avec sa propre mise en scène. */
export function Projects() {
  return (
    <section id="projets" aria-labelledby="projets-titre" className="overflow-x-clip">
      <Container className="pb-6 pt-24 sm:pt-32">
        <Reveal className="max-w-3xl">
          <h2
            id="projets-titre"
            className="text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance"
          >
            Des projets qui dépassent le POC.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            Du Machine Learning industriel aux produits SaaS : des systèmes que j’ai conçus, développés ou pilotés
            jusqu’à leur utilisation réelle.
          </p>
        </Reveal>
      </Container>

      <Band tone="dark">
        <PredictiveFeature />
      </Band>
      <Band tone="beige">
        <IotFeature />
      </Band>
      <Band tone="beige" divider>
        <McpFeature />
      </Band>
      <Band tone="paper">
        <WodFeature />
      </Band>
    </section>
  );
}
