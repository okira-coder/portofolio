import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { impact } from "@/data/site";

export function Impact() {
  return (
    <section aria-labelledby="impact-titre" className="theme-dark">
      <Container>
        <h2 id="impact-titre" className="sr-only">
          Impact
        </h2>
        <Reveal as="dl" stagger={0.1} className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((item, i) => (
            <RevealItem
              key={item.label}
              className={`flex flex-col-reverse gap-3 bg-ink py-10 sm:px-6 lg:py-14 ${
                i === 0 ? "sm:pl-0" : i === 2 ? "sm:pl-0 lg:pl-6" : ""
              }`}
            >
              <dt className="max-w-[16rem] text-sm leading-relaxed text-muted">{item.label}</dt>
              <dd className="text-5xl font-semibold tracking-[-0.03em] sm:text-6xl">
                <Counter to={item.to} suffix={"suffix" in item ? item.suffix : ""} />
              </dd>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
