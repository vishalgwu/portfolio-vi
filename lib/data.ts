import raw from "@/data/projects.json";
import type { Accent, Category, CategoryId, Project } from "./types";

export const projects = raw as Project[];

export const categories: Category[] = [
  {
    id: "featured",
    emoji: "🌟",
    title: "Featured Flagship Systems",
    blurb: "The highest-impact builds: governed agents, agentic RAG, research and live products.",
  },
  {
    id: "agentic",
    emoji: "🤖",
    title: "Agentic AI, RAG & LLM Infrastructure",
    blurb: "LangGraph, MCP, Qdrant, Pinecone, LlamaIndex and FastAPI wired into agents that can be audited.",
  },
  {
    id: "bigdata",
    emoji: "⚡",
    title: "Big Data & Distributed Analytics",
    blurb: "Large-scale exploratory and spatial analysis: tracking data, loans, crime, incidents and SQL.",
  },
  {
    id: "deeplearning",
    emoji: "🧠",
    title: "Deep Learning, Computer Vision & NLP",
    blurb: "PyTorch models, vision-language comparisons and interpretability research on transformers.",
  },
  {
    id: "microservices",
    emoji: "📦",
    title: "Production Microservices, Tools & Utilities",
    blurb: "Docker, serverless AWS, MLOps curricula and typed, tested service boundaries.",
  },
];

const featuredOrder = [
  "resident-os",
  "hr-agentic-rag-copilot",
  "fabricops",
  "story-steer-studio",
  "kv-cache-benchmarks",
  "ai-engineering-roadmap-2026",
  "llmops-interview-prep",
  "mlops-interview-prep",
  "maryland-ui-pulse",
  "guardmem",
  "lid",
  "image-caption-generator",
  "willdocs-rag",
  "job-globe",
];

export function projectsFor(id: CategoryId): Project[] {
  const list = projects.filter((p) => p.categories.includes(id));
  if (id !== "featured") return list;
  const rank = (slug: string) => {
    const i = featuredOrder.indexOf(slug);
    return i === -1 ? featuredOrder.length : i;
  };
  return [...list].sort((a, b) => rank(a.slug) - rank(b.slug));
}

export const accentHex: Record<Accent, string> = {
  cyan: "#06b6d4",
  violet: "#8b5cf6",
  emerald: "#10b981",
  rose: "#f43f5e",
};

export interface Role {
  role: string;
  org: string;
  dates: string;
  place: string;
  detail: string;
  highlights: { value: string; label: string }[];
  bullets: string[];
}

export const profile = {
  name: "Vishal Fulsundar",
  headline: "AI Systems & Data Science Engineer",
  currentRole: "Forward Deployed Engineer · CrossCountry Consulting",
  tagline:
    "Forward Deployed & ML Engineer with 3+ years taking AI from CRM predictions to finance-grade, human-approved automation. M.S. Data Science, George Washington University.",
  summary:
    "Forward Deployed & ML Engineer with 3+ years of experience progressing from editorial operations analytics through CRM predictive modeling to customer-facing AI integration. Builds FastAPI services that connect Coupa procurement records with ERP accrual workflows, using LangGraph and policy-grounded retrieval to support traceable, human-reviewed decisions.",
  github: "https://github.com/vishalgwu",
  linkedin: "https://www.linkedin.com/in/vishalfulsundar/",
  email: "vishalfulsundar2025@gmail.com",
  location: "VA, USA",
  repoCount: 58,
  school: "George Washington University",
  degree: "M.S. Data Science, George Washington University, May 2026",
  typewriter: [
    "FastAPI · Coupa-to-ERP · idempotent payloads",
    "LangGraph · tool orchestration · approval gates",
    "pgvector · policy-grounded retrieval",
    "scikit-learn · chronological holdout · PSI drift",
    "Docker · GitHub Actions · AWS EC2",
    "MCP servers & memory governance",
    "pytest · structured logs · audit trails",
  ],
  competencies: [
    "Coupa-to-ERP accrual automation: FastAPI services with idempotent, schema-validated ERP payloads",
    "Policy-grounded agents: LangGraph tool orchestration, source attribution and human-in-the-loop approval gates",
    "Leakage-safe ML: chronological holdout, threshold tuning and PSI drift monitoring",
    "Forward deployment: finance requirements mapping, controller workshops and prototype validation",
    "Evaluation-first engineering: benchmarks, labelled sets, offline test suites",
    "Shipping: Docker, GitHub Actions CI/CD and AWS EC2, with automated API tests and structured logs",
  ],
  skills: [
    { group: "Programming & backend", items: ["Python", "FastAPI", "REST APIs", "Microservices", "HTTP/JSON", "API integration", "Schema validation", "Idempotent ERP payloads"] },
    { group: "Machine learning", items: ["scikit-learn", "Lead conversion classification", "Chronological holdout", "Precision/recall threshold tuning", "Pandas", "NumPy", "Leakage-safe features", "PSI drift checks"] },
    { group: "GenAI & agentic systems", items: ["LangGraph", "Conditional routing", "Controller escalation", "pgvector", "Source-grounded retrieval", "Policy-based prompting", "Tool-result validation", "Deterministic approval guardrails", "Human-in-the-loop", "Audit logging"] },
    { group: "Data engineering", items: ["SQL", "PostgreSQL", "Data reconciliation", "Data cleaning", "Data quality validation", "Timestamp standardization", "Exception analysis"] },
    { group: "Cloud & DevOps", items: ["AWS EC2", "Docker", "GitHub Actions", "CI/CD", "Automated API testing", "Application logging", "Deployment troubleshooting"] },
    { group: "Forward deployment", items: ["Technical discovery", "Finance requirements mapping", "Coupa-to-ERP integration", "Enterprise REST integration", "Accrual workflow automation", "Controller approval design", "Stakeholder workshops", "Prototype validation"] },
  ],
  experience: [
    {
      role: "Forward Deployed Engineer",
      org: "CrossCountry Consulting",
      dates: "Jan 2026 – Present",
      place: "VA, USA",
      detail:
        "Coupa-to-ERP accrual automation with FastAPI and LangGraph: 94% auto-match, reviewer preparation cut from 11 to 5 minutes, and controller approval gates.",
      highlights: [
        { value: "94%", label: "auto-match" },
        { value: "11 → 5 min", label: "reviewer prep (−55%)" },
        { value: "22%", label: "routed to controllers" },
        { value: "9 days", label: "to a working prototype" },
      ],
      bullets: [
        "Scoped Coupa-to-ERP accrual automation through six controller workshops, translating 18 purchase-order exceptions into testable matching, approval, and posting requirements before demonstrating a prototype within nine days.",
        "Developed Python FastAPI microservices to reconcile Coupa purchase orders, receipts, and invoices through REST APIs, generating idempotent, schema-validated ERP journal payloads and achieving 94% auto-match.",
        "Reduced reviewer preparation by 55%, from 11 to 5 minutes, across 80 paired invoice trials, using LangGraph tool calls for record lookup and finance-policy retrieval.",
        "Configured human-in-the-loop approval gates using confidence thresholds, amount limits, and vendor allowlists, routing 22% of accruals to controllers for review before downstream ERP posting decisions.",
        "Deployed Dockerized FastAPI services on AWS EC2 through GitHub Actions, resolving nine pilot integration failures with automated API tests, structured application logs, and approval-handoff validation.",
      ],
    },
    {
      role: "ML Engineer",
      org: "Zoho",
      dates: "Sep 2022 – Jul 2024",
      place: "MH, India",
      detail:
        "Leakage-safe CRM lead scoring: 14 engineered features, precision lifted from 61% to 68% on 1,200 labeled leads while retaining 72% recall.",
      highlights: [
        { value: "61 → 68%", label: "lead-scoring precision" },
        { value: "72%", label: "recall retained" },
        { value: "14", label: "leakage-safe features" },
        { value: "1,200", label: "labeled leads" },
      ],
      bullets: [
        "Engineered 14 leakage-safe CRM features from historical call outcomes, email activity, and contact recency, excluding post-conversion information to preserve realistic inputs for production lead scoring.",
        "Prepared chronological training datasets with SQL, Python, and Pandas, resolving duplicate contacts and missing activity timestamps before training scikit-learn classifiers on historical CRM lead conversion outcomes.",
        "Improved lead-conversion prediction precision from 61% to 68% across 1,200 labeled leads through chronological holdout validation and threshold tuning while retaining 72% recall for sales.",
        "Integrated Python prediction services with internal CRM REST APIs, validating lead-score updates after new calls and emails and documenting regression scenarios for release testing before deployment.",
        "Monitored four weekly lead-scoring cohorts, observing opportunity conversion increase from 18% to 21% without asserting causation, while tracking PSI feature drift and recommending scheduled retraining checks.",
      ],
    },
    {
      role: "Data Analyst",
      org: "Cactus Communications",
      dates: "Jun 2021 – May 2022",
      place: "MH, India",
      detail:
        "SQL and Python reconciliation of editorial workflow data: weekly status discrepancies reduced from 18 to 8.",
      highlights: [
        { value: "18 → 8", label: "weekly status discrepancies" },
        { value: "240", label: "assignment events audited weekly" },
        { value: "11", label: "delivery dates corrected" },
        { value: "17", label: "overdue assignments investigated" },
      ],
      bullets: [
        "Audited 240 manuscript-assignment events weekly against daily editor-acceptance logs, identifying missing workflow transitions and correcting 11 inaccurate delivery dates to improve editorial turnaround reporting consistency.",
        "Standardized manuscript submission and revision timestamps with SQL and Pandas, separating author response delays from editor processing time to improve weekly aging reports for coordinators.",
        "Investigated 17 overdue manuscript assignments by comparing editor availability, missing author files, and revision queues, identifying nine cases awaiting authors instead of editor action for follow-up.",
        "Generated weekly Python reporting extracts covering pending, accepted, and returned manuscripts by editing service, helping coordinators track handoff delays without changing established operational assignment workflows.",
        "Reduced weekly manuscript status discrepancies from 18 to 8 through repeatable SQL reconciliation against assignment histories, aligning dashboard records with underlying verified editorial operations data.",
      ],
    },
  ] as Role[],
  education: [
    { school: "The George Washington University", degree: "Master of Science in Data Science", dates: "Aug 2024 – May 2026", place: "WA, USA" },
    { school: "Savitribai Phule Pune University", degree: "Postgraduate Diploma in Data Science and Artificial Intelligence", dates: "Jun 2022 – May 2023", place: "MH, India" },
    { school: "Swami Ramanand Teerth Marathwada University", degree: "Bachelor of Science", dates: "Jun 2018 – May 2021", place: "MH, India" },
  ],
  research: [
    {
      title: "Token influence and temperature effects in LLM responses",
      detail:
        "Found LLM outputs collapse into 2-cycle attractors at low temperature, mapped to logistic-map period-doubling, and built a framework to measure how RAG shifts cluster stability across GPT, LLaMA and Qwen.",
    },
    {
      title: "Text Summarization in NLP (JETIR, Vol. 10, Oct 2023)",
      detail: "Extractive versus abstractive summarization with transformers on BBC News data.",
    },
  ],
  headlineMetrics: [
    { label: "Coupa-to-ERP auto-match", value: "94%" },
    { label: "Reviewer prep time saved", value: "−55%" },
    { label: "Lead-scoring precision", value: "61 → 68%" },
    { label: "HR agent decisions correct", value: "21 / 21" },
    { label: "Hallucination AUROC (LID)", value: "0.71" },
    { label: "Portfolio projects", value: String(projects.length) },
  ],
};
