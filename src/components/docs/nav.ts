/**
 * Shared outline for the docs document. This is the single source of truth for
 * both the side-nav tree and the scrollspy: every leaf `id` matches an anchor
 * rendered in the reading column.
 */

export type DocsAccent = "brand" | "college" | "standard";

export interface DocsLeaf {
  id: string;
  label: string;
}

export interface DocsBranch {
  id: string;
  label: string;
  children: DocsLeaf[];
}

export interface DocsWorldNode {
  id: string;
  label: string;
  /** Short line under the world name in the nav. */
  note: string;
  accent: DocsAccent;
  branches: DocsBranch[];
}

export const DOCS_OUTLINE: DocsWorldNode[] = [
  {
    id: "my-thoughts",
    label: "My Thoughts",
    note: "Personal notes",
    accent: "brand",
    branches: [
      {
        id: "my-thoughts-branch",
        label: "Notes",
        children: [{ id: "my-thoughts-notes", label: "Working notes" }],
      },
    ],
  },
  {
    id: "college",
    label: "College",
    note: "Campus & students",
    accent: "college",
    branches: [
      {
        id: "treehacks",
        label: "TreeHacks",
        children: [
          { id: "why-treehacks", label: "Why TreeHacks" },
          { id: "how-the-demo-works", label: "How the demo works" },
          { id: "sponsorship-prizes", label: "Possible sponsorship prizes" },
          { id: "why-sponsor", label: "Why we should sponsor" },
          { id: "measurement-signals", label: "Measurement signals" },
        ],
      },
    ],
  },
  {
    id: "standard",
    label: "Standard",
    note: "Potential partners",
    accent: "standard",
    branches: [
      {
        id: "standard-branch",
        label: "Potential partners",
        children: [{ id: "standard-partners", label: "In exploration" }],
      },
    ],
  },
];

/** Every leaf id, in document order. Used to build the scrollspy list. */
export const DOCS_SECTION_IDS: string[] = DOCS_OUTLINE.flatMap((world) =>
  world.branches.flatMap((branch) => branch.children.map((leaf) => leaf.id))
);

/** Map a leaf id to the world accent that owns it (for active styling). */
export const DOCS_ACCENT_BY_ID: Record<string, DocsAccent> = Object.fromEntries(
  DOCS_OUTLINE.flatMap((world) =>
    world.branches.flatMap((branch) =>
      branch.children.map((leaf) => [leaf.id, world.accent] as const)
    )
  )
);
