import { Section } from "@/components/ui/Section";
import { skillGroups, training } from "@/data/skills";

export function Skills() {
  return (
    <Section id="competences" title="Compétences" intro="Ce que je peux défendre en entretien, en quatre familles.">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g) => (
          <div key={g.name}>
            <h3 className="font-semibold">{g.name}</h3>
            {"note" in g && <p className="mt-1 text-sm text-faint">{g.note}</p>}
            <ul className="mt-4 space-y-1.5 text-muted">
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-8 rounded-xl border border-line bg-panel/50 p-6 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h3 className="text-xl font-semibold tracking-tight">Formation & transmission</h3>
          <p className="mt-3 leading-relaxed text-muted">
            Chez Castalie, j’ai organisé {training.workshops} ateliers IA, d’environ {training.perWorkshop} collaborateurs
            chacun, pour des profils {training.audiences.join(", ").toLowerCase()}.
          </p>
        </div>
        <div className="lg:col-span-7">
          <p className="text-sm text-faint">Thèmes abordés</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {training.topics.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
