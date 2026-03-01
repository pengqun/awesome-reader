/**
 * Registry of awesome-lists to include in the reader.
 * Each entry maps a slug to repository info.
 */

export interface AwesomeListMeta {
  slug: string;
  name: string;
  repo: string;
  description: string;
  branch?: string;
  path?: string;
}

export const awesomeLists: AwesomeListMeta[] = [
  {
    slug: "python",
    name: "Awesome Python",
    repo: "vinta/awesome-python",
    description:
      "A curated list of awesome Python frameworks, libraries, software and resources.",
  },
  {
    slug: "go",
    name: "Awesome Go",
    repo: "avelino/awesome-go",
    description:
      "A curated list of awesome Go frameworks, libraries and software.",
  },
  {
    slug: "javascript",
    name: "Awesome JavaScript",
    repo: "sorrycc/awesome-javascript",
    description:
      "A collection of awesome browser-side JavaScript libraries, resources and shiny things.",
  },
  {
    slug: "react",
    name: "Awesome React",
    repo: "enaqx/awesome-react",
    description:
      "A collection of awesome things regarding the React ecosystem.",
  },
  {
    slug: "vue",
    name: "Awesome Vue",
    repo: "vuejs/awesome-vue",
    description:
      "A curated list of awesome things related to Vue.js.",
  },
  {
    slug: "rust",
    name: "Awesome Rust",
    repo: "rust-unofficial/awesome-rust",
    description:
      "A curated list of Rust code and resources.",
  },
  {
    slug: "java",
    name: "Awesome Java",
    repo: "akullpp/awesome-java",
    description:
      "A curated list of awesome frameworks, libraries and software for the Java programming language.",
  },
  {
    slug: "typescript",
    name: "Awesome TypeScript",
    repo: "dzharii/awesome-typescript",
    description:
      "A collection of awesome TypeScript resources for client-side and server-side development.",
  },
  {
    slug: "nodejs",
    name: "Awesome Node.js",
    repo: "sindresorhus/awesome-nodejs",
    description:
      "Delightful Node.js packages and resources.",
  },
  {
    slug: "swift",
    name: "Awesome Swift",
    repo: "matteocrippa/awesome-swift",
    description:
      "A collaborative list of awesome Swift libraries and resources.",
  },
];

export function getListMeta(slug: string): AwesomeListMeta | undefined {
  return awesomeLists.find((l) => l.slug === slug);
}
