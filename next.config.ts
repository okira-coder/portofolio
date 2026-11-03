import type { NextConfig } from "next";

// Publication sur GitHub Pages : export statique, servi sous /portofolio.
// Activé uniquement par la variable GITHUB_PAGES (workflow GitHub Actions) ;
// `npm run dev` et `npm run build` en local restent inchangés.
const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Préfixe des visuels de /public (next/image ne l’ajoute pas en mode « unoptimized »).
  env: { NEXT_PUBLIC_BASE_PATH: githubPages ? "/portofolio" : "" },
  ...(githubPages && {
    output: "export" as const,
    basePath: "/portofolio",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  // Cache Components et le prérendu partiel ne sont pas compatibles avec l’export statique.
  cacheComponents: !githubPages,
  partialPrefetching: !githubPages,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
