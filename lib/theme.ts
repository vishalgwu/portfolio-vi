import type { Accent, CategoryId } from "./types";

/** Vice-City-sunset gradients per project accent (violet to pink to orange to gold). */
export const poster: Record<Accent, { from: string; mid: string; to: string; glow: string }> = {
  cyan: { from: "#1b3fd6", mid: "#7a4bff", to: "#19e3d1", glow: "#19e3d1" },
  violet: { from: "#3a1c8f", mid: "#a43cff", to: "#ff2e93", glow: "#c06bff" },
  emerald: { from: "#0b6b5c", mid: "#19c9a8", to: "#ffc15e", glow: "#19e3d1" },
  rose: { from: "#8f1b5c", mid: "#ff2e93", to: "#ff7a45", glow: "#ff2e93" },
};

export interface District {
  id: CategoryId;
  name: string;
  tagline: string;
  x: number;
  y: number;
}

/** The five "districts" on the map, one per project category. Positions are percent of the map. */
export const districts: District[] = [
  { id: "featured", name: "Downtown Spotlight", tagline: "Flagship systems", x: 52, y: 26 },
  { id: "agentic", name: "Ocean Drive", tagline: "Agents, RAG and LLM infrastructure", x: 22, y: 50 },
  { id: "bigdata", name: "Port District", tagline: "Data and analytics", x: 74, y: 56 },
  { id: "deeplearning", name: "Lab Island", tagline: "Deep learning and research", x: 42, y: 82 },
  { id: "microservices", name: "The Docks", tagline: "MLOps, services and tools", x: 84, y: 16 },
];

export const sections = [
  { id: "home", label: "Welcome", mission: "Welcome to the city" },
  { id: "protagonist", label: "Protagonist", mission: "Meet the protagonist" },
  { id: "missions", label: "Missions", mission: "Pick a mission" },
  { id: "map", label: "Districts", mission: "Explore the districts" },
  { id: "story", label: "Story", mission: "Review the story so far" },
  { id: "newswire", label: "Newswire", mission: "Check the newswire" },
  { id: "crew", label: "Crew", mission: "Join the crew" },
] as const;

import type { Project } from "./types";

/** The most quotable number for a poster: "94% auto-match" beats a bare "4". */
export function headline(p: Project): string {
  const m = p.metrics.find((x) => x.value.length <= 14) ?? p.metrics[0];
  return m ? `${m.value} ${m.label.toLowerCase()}` : p.language;
}
