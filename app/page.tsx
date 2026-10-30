import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Labs } from "@/components/sections/Labs";
import { Method } from "@/components/sections/Method";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <Impact />
      <Projects />
      <Labs />
      <Experience />
      <Method />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
