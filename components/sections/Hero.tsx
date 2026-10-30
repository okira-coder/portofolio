import { ParallaxLayer, ParallaxScene } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { hero, predictive } from "@/data/home";

export function Hero() {
  return (
    <section aria-labelledby="hero-titre" className="overflow-x-clip pb-20 pt-12 sm:pb-28 sm:pt-20">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{hero.eyebrow}</p>
          <h1
            id="hero-titre"
            className="mt-7 text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance"
          >
            {hero.title}
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted text-pretty">{hero.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/#projets">Voir mes réalisations</ButtonLink>
            <ButtonLink href="/#contact" variant="secondary">
              Me contacter
            </ButtonLink>
          </div>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6">
          <HeroComposition />
        </Reveal>
      </Container>
    </section>
  );
}

/** Franck au centre de son écosystème produit. Calques en parallaxe au curseur. */
function HeroComposition() {
  return (
    <ParallaxScene className="relative mx-auto aspect-[5/6] w-full max-w-[34rem] [container-type:inline-size] lg:-mr-8 lg:max-w-none">
      {/* Portrait : cadre vertical asymétrique, légèrement désaturé. */}
      <ParallaxLayer depth={8} className="absolute right-0 top-0 w-[60%]">
        <Media
          slot={hero.portrait}
          rounded="rounded-[1.25rem] rounded-tl-[5rem]"
          imageClassName="grayscale-[30%]"
          sizes="(min-width: 1024px) 30vw, 60vw"
          priority
        />
      </ParallaxLayer>

      <ParallaxLayer depth={22} className="absolute left-0 top-[20%] w-[56%]">
        <Media slot={hero.iotPreview} frame="browser" label="iot.castalie.com" compact sizes="30vw" />
      </ParallaxLayer>

      <ParallaxLayer depth={30} className="absolute left-0 top-[1%] w-[54%]">
        <div className="rounded-xl border border-line bg-raised/95 px-[3.4cqw] py-[2.6cqw] shadow-2xl shadow-shade backdrop-blur">
          <p className="text-[2.3cqw] text-muted">Pipeline quotidien</p>
          <ol className="mt-[1.4cqw] flex flex-wrap items-center gap-x-[1.4cqw] gap-y-[1cqw] font-mono text-[2.3cqw]">
            {["IoT", "PostgreSQL", "OCSVM", "Slack"].map((s, i) => (
              <li key={s} className="flex items-center gap-[1.2cqw]">
                {i > 0 && (
                  <span aria-hidden className="text-faint">
                    →
                  </span>
                )}
                <span className={i === 3 ? "text-accent-ink" : ""}>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </ParallaxLayer>

      <ParallaxLayer depth={40} className="absolute bottom-[3%] left-0 w-[46%]">
        <div className="rounded-xl border border-line bg-panel/95 p-[4cqw] shadow-2xl shadow-shade backdrop-blur">
          <p className="flex items-center gap-[1.6cqw] text-[2.6cqw] text-muted">
            <span aria-hidden className="size-[1.4cqw] rounded-full bg-preprod" />
            {predictive.name}
          </p>
          <p className="mt-[2cqw] text-[10cqw] font-semibold leading-none tracking-tight tabular-nums">8 / 8</p>
          <p className="mt-[1.6cqw] text-[2.8cqw] leading-snug text-muted">
            dernières pannes détectées, jusqu’à J-16
          </p>
        </div>
      </ParallaxLayer>

      <ParallaxLayer depth={52} className="absolute bottom-0 right-[6%] w-[22%]">
        <Media slot={hero.mobilePreview} frame="phone" compact sizes="12vw" />
      </ParallaxLayer>
    </ParallaxScene>
  );
}
