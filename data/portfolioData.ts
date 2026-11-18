export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: "Full-Stack" | "Enterprise" | "AI & Health" | "Civic Tech";
  achievement?: string;
  githubUrl?: string;
  liveUrl?: string;
  architectureHighlights: {
    title: string;
    description: string;
  }[];
  metrics?: { label: string; value: string }[];
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    role: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: "Work" | "Education" | "Certification";
  description: string;
  details: string[];
  technologies?: string[];
  badge?: string;
}

export const PERSONAL_INFO = {
  name: "Efa Tariku",
  title: "Software Engineer | Full-Stack Developer",
  location: "Addis Ababa, Ethiopia",
  timezone: "UTC+3",
  bio: "I am a software engineer focused on designing and building scalable, reliable, and user-centered software applications. I enjoy solving complex engineering problems, designing backend architectures, building intuitive frontend experiences, and turning ideas into production-ready software.",
  availability: "Open to select opportunities",
  availabilityDetails: "Full-time roles, high-impact backend & full-stack engineering",
  socials: {
    github: "https://github.com/efa07",
    email: "efatariku07@gmail.com",
    linkedin: "https://www.linkedin.com/in/efa-tariku-7489bb3ab",
  },
  interests: [
    "Backend Engineering",
    "Distributed Systems",
    "Full-Stack Development",
    "AI-Powered Applications",
    "Enterprise Architecture",
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "onecitizen",
    number: "01",
    title: "OneCitizen",
    tagline: "National Digital Identity Integration Platform",
    description:
      "A digital identity integration platform developed for the Fayda hackathon, enabling secure single-sign-on and citizen credential verification using OpenID Connect.",
    longDescription:
      "OneCitizen was engineered to bridge Ethiopia's national digital ID infrastructure (Fayda) with public and private digital services. The platform streamlines citizen authentication, manages cryptographic claim verification, and provides fine-grained consent controls while guaranteeing strict data protection and minimal disclosure.",
    technologies: [
      "Next.js App Router",
      "TypeScript",
      "Express.js",
      "Prisma ORM",
      "PostgreSQL",
      "Docker Compose",
      "Fayda OIDC",
    ],
    category: "Civic Tech",
    achievement: "Final phase finalist — 5th place in national Fayda Hackathon",
    githubUrl: "https://github.com/efa07/OneCitizen",
    architectureHighlights: [
      {
        title: "Fayda OpenID Connect Integration",
        description:
          "End-to-end authorization code grant flow with cryptographic token validation and citizen attribute verification.",
      },
      {
        title: "Relational Persistence & Auditing",
        description:
          "PostgreSQL orchestrated with Prisma ORM ensuring immutable access logs and ACID transactions for citizen consent.",
      },
      {
        title: "Containerized Orchestration",
        description:
          "Multi-service Docker Compose environment orchestrating Next.js frontend, Express API gateway, and PostgreSQL.",
      },
    ],
    metrics: [
      { label: "Hackathon Result", value: "Top 5 Finalist" },
      { label: "Auth Protocol", value: "OIDC / PKCE" },
      { label: "Deployment", value: "Dockerized" },
    ],
    featured: true,
  },
  {
    id: "canaan-pharmacy",
    number: "02",
    title: "Canaan Pharmacy",
    tagline: "Modern Healthcare & Pharmacy Commerce Web Platform",
    description:
      "A modern pharmacy web application engineered to deliver a clean, accessible, and high-performance digital healthcare experience.",
    longDescription:
      "Canaan Pharmacy provides real-time catalog discovery, prescription consultation pathways, and an accessible user experience optimized for both mobile and desktop users. Built with an emphasis on crisp typography, smooth interactive transitions, and responsive accessibility.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "Lucide Icons",
      "Sonner",
    ],
    category: "Full-Stack",
    githubUrl: "https://github.com/efa07/canann-pharmacy-v1/",
    liveUrl: "https://canaanpharmacy.com.et",
    architectureHighlights: [
      {
        title: "Fluid Component Architecture",
        description:
          "Component primitives built atop shadcn/ui and Radix UI with custom animations for seamless catalog browsing.",
      },
      {
        title: "Accessible Toast & State Feedback",
        description:
          "Integrated Sonner notification queue for real-time status updates and order confirmations with screen reader support.",
      },
      {
        title: "Responsive Edge Delivery",
        description:
          "Server-side rendering combined with aggressive static caching for sub-second load times across mobile networks.",
      },
    ],
    metrics: [
      { label: "Status", value: "Production Live" },
      { label: "Domain", value: "canaanpharmacy.com.et" },
      { label: "UX Polish", value: "Framer Motion" },
    ],
    featured: true,
  },
  {
    id: "iddir-system",
    number: "03",
    title: "Iddir System",
    tagline: "Community-Based Mutual Aid Digital Management Platform",
    description:
      "A specialized software platform designed to support the digital management and financial transparency of traditional Ethiopian community-based Iddir operations.",
    longDescription:
      "Iddirs are ubiquitous community-based mutual aid and social insurance institutions in Ethiopia. The Iddir System digitizes traditional paper ledgers into a robust software platform: automating monthly member contributions, family dependent registrations, penalty assessments, and bereavement benefit disbursements.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    category: "Enterprise",
    githubUrl: "https://github.com/efa07/Iddir-system",
    architectureHighlights: [
      {
        title: "Financial Ledger & Audit Trail",
        description:
          "Strict double-entry bookkeeping logic to prevent reconciliation discrepancies across community treasuries.",
      },
      {
        title: "Tiered Role Permissions",
        description:
          "Granular role-based access control distinguishing committee elders, auditors, treasurers, and community members.",
      },
      {
        title: "Localized Workflow Modeling",
        description:
          "Software architecture designed to reflect real-world bylaws, customary bereavement periods, and contribution cycles.",
      },
    ],
    metrics: [
      { label: "Target Domain", value: "Community Mutual Aid" },
      { label: "Data Integrity", value: "ACID Ledger" },
      { label: "Codebase", value: "Open Source" },
    ],
    featured: true,
  },
  {
    id: "diagnoai",
    number: "04",
    title: "DiagnoAI",
    tagline: "Intelligent Diagnostic Assistance & Clinical Triage Application",
    description:
      "An AI-powered healthcare application built with modern web technologies, providing diagnostic triage suggestions, medical report parsing, and patient consultation workflows.",
    longDescription:
      "DiagnoAI combines cutting-edge AI reasoning models with reactive web architecture. Utilizing Convex for reactive real-time state synchronization, Better Auth for secure session management, and PostgreSQL Neon for reliable relational data storage, the application assists healthcare professionals with initial patient intake analysis.",
    technologies: [
      "Next.js",
      "Express.js",
      "Convex",
      "Better Auth",
      "Prisma",
      "PostgreSQL (Neon)",
    ],
    category: "AI & Health",
    architectureHighlights: [
      {
        title: "Reactive State Synchronization",
        description:
          "Convex backend powering zero-latency real-time updates for diagnostic queries and active consultation sessions.",
      },
      {
        title: "Modern Session & Identity Layer",
        description:
          "Better Auth multi-factor authentication with strict HIPAA/data isolation standards for medical records.",
      },
      {
        title: "Serverless PostgreSQL Scaling",
        description:
          "Neon serverless database branching for isolated staging migrations and automated instant rollbacks.",
      },
    ],
    metrics: [
      { label: "State Sync", value: "Convex Reactive" },
      { label: "Security", value: "Better Auth" },
      { label: "Database", value: "Neon Serverless" },
    ],
    featured: true,
  },
  {
    id: "ethiopian-ai-tutor",
    number: "05",
    title: "Ethiopian AI Tutor",
    tagline: "Adaptive Educational Intelligence for Grades 8–12",
    description:
      "An AI-powered educational platform focused on supporting Ethiopian students in grades 8–12 with curriculum-aligned STEM tutoring and exam readiness.",
    longDescription:
      "Addressing the educational accessibility challenge, this platform provides an intelligent tutoring system tailored to the Ethiopian national secondary school curriculum. It incorporates adaptive question generation, step-by-step problem deconstruction in mathematics and physics, and localized educational context.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Python / FastAPI",
      "PostgreSQL",
      "Tailwind CSS",
      "LLM Context Pipeline",
    ],
    category: "AI & Health",
    architectureHighlights: [
      {
        title: "National Curriculum Alignment",
        description:
          "Curriculum-grounded retrieval-augmented generation to ensure explanations match Ministry of Education syllabi.",
      },
      {
        title: "Low-Bandwidth Optimization",
        description:
          "Aggressive payload compression and text-first token streaming to perform smoothly on variable mobile networks.",
      },
      {
        title: "Adaptive Mastery Evaluation",
        description:
          "Continuous student modeling tracking misconception patterns and automatically calibrating drill difficulty.",
      },
    ],
    metrics: [
      { label: "Target Audience", value: "Grades 8–12" },
      { label: "Curriculum", value: "Ethiopian MOE" },
      { label: "AI Backend", value: "FastAPI + Next.js" },
    ],
    featured: true,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Backend Engineering",
    description:
      "Designing robust service architectures, resilient APIs, and transactional business logic.",
    skills: [
      { name: "Java", role: "Enterprise scale systems & object modeling", highlight: true },
      { name: "Spring Boot", role: "Production microservices & enterprise APIs", highlight: true },
      { name: "Node.js", role: "Event-driven asynchronous runtimes" },
      { name: "Express.js", role: "Lightweight REST API microservices" },
      { name: "NestJS", role: "Structured TypeScript enterprise architecture" },
      { name: "Python", role: "Data workflows & AI service backends" },
      { name: "FastAPI", role: "High-throughput asynchronous APIs" },
      { name: "Django", role: "Batteries-included web frameworks" },
    ],
  },
  {
    title: "Frontend Development",
    description:
      "Crafting high-precision, accessible, and performant user interfaces with modern toolchains.",
    skills: [
      { name: "JavaScript", role: "Core language, ESNext, browser primitives" },
      { name: "TypeScript", role: "Strict compile-time type safety across stacks", highlight: true },
      { name: "React", role: "Declarative UI, concurrent hooks, state modeling", highlight: true },
      { name: "Next.js", role: "App Router, Server Components, SSR & ISR", highlight: true },
      { name: "Tailwind CSS", role: "Design token architecture & responsive styling" },
    ],
  },
  {
    title: "Databases & Storage",
    description:
      "Relational integrity, high-performance indexing, and document data modeling.",
    skills: [
      { name: "PostgreSQL", role: "ACID transactions, indexing, JSONB storage", highlight: true },
      { name: "MySQL", role: "Relational data stores and replication" },
      { name: "MongoDB", role: "Flexible document-based operational data" },
    ],
  },
  {
    title: "Infrastructure & Systems",
    description:
      "Distributed systems primitives, message brokers, containerization, and security.",
    skills: [
      { name: "Docker", role: "Multi-stage container builds & composition", highlight: true },
      { name: "RabbitMQ", role: "Event-driven queues & asynchronous decoupling", highlight: true },
      { name: "Redis", role: "Distributed caching & fast in-memory key-value" },
      { name: "Git", role: "Distributed version control & collaborative workflows" },
      { name: "Linux", role: "Production server administration & shell automation" },
      { name: "Keycloak", role: "Enterprise IAM, OAuth2, and OpenID Connect", highlight: true },
      { name: "Microservices", role: "Domain-driven decomposition & independent deploys" },
      { name: "Event-Driven Arch", role: "Pub/sub event streams & loose coupling" },
      { name: "REST API Design", role: "Idempotent, versioned, OpenAPI compliant specs" },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "insa-fullstack",
    role: "Full-Stack Developer",
    organization: "Information Network Security Administration (INSA)",
    period: "Present",
    type: "Work",
    badge: "Current Role",
    description:
      "Engineering large-scale enterprise software and national platforms with stringent requirements for security, reliability, and scale.",
    details: [
      "Architect and develop modern frontend applications and backend services for national enterprise systems.",
      "Work extensively with Java, Spring Boot, Next.js, React, PostgreSQL, and distributed application architectures.",
      "Collaborate in cross-functional engineering squads and actively mentor junior developers and incoming engineering interns.",
      "Spearhead engineering practices centered on maintainability, scalable codebases, and fault-tolerant architecture.",
    ],
    technologies: ["Java", "Spring Boot", "Next.js", "React", "PostgreSQL", "Docker", "Keycloak"],
  },
  {
    id: "insa-cyber-talent",
    role: "Cyber Talent Program Graduate & Intern",
    organization: "Information Network Security Administration (INSA)",
    period: "Graduate",
    type: "Work",
    description:
      "Intensive advanced engineering and technical program cultivating top national talent in systems engineering, software design, and digital infrastructure.",
    details: [
      "Rigorous hands-on training in systems-level engineering, network protocols, and secure software development lifecycle.",
      "Graduated with distinction and transitioned into full-stack enterprise development within INSA.",
    ],
    technologies: ["Linux", "Distributed Systems", "Network Architecture", "Secure Coding"],
  },
  {
    id: "alx-se",
    role: "Software Engineering Graduate",
    organization: "ALX Software Engineering Program",
    period: "Graduate",
    type: "Education",
    badge: "Rigorous Intensive",
    description:
      "Holistic 12-month software engineering curriculum covering low-level programming, data structures, algorithms, systems design, and full-stack web engineering.",
    details: [
      "Deep grounding in C programming, memory management, UNIX system calls, and algorithmic complexity.",
      "Mastered backend engineering with Python, Node.js, relational databases, and modern web application development.",
      "Built production-ready group and capstone projects under strict peer-review and continuous deployment criteria.",
    ],
    technologies: ["C", "Python", "Data Structures", "Algorithms", "UNIX", "Web Architecture"],
  },
  {
    id: "stanford-data-science",
    role: "Fundamentals of Data Science in Precision Medicine",
    organization: "Stanford University",
    period: "Certified",
    type: "Certification",
    badge: "Stanford Credential",
    description:
      "Executive credential exploring computational methods, clinical data modeling, and predictive analytics in healthcare contexts.",
    details: [
      "Study of statistical models, biostatistical analysis, and machine learning principles applied to precision health.",
    ],
  },
  {
    id: "stanford-cloud",
    role: "Cloud Computing",
    organization: "Stanford University",
    period: "Certified",
    type: "Certification",
    badge: "Stanford Credential",
    description:
      "Advanced credential covering distributed cloud systems, virtualization, high-availability architecture, and elastic compute scaling.",
    details: [
      "In-depth analysis of cloud design patterns, multi-region fault tolerance, and serverless compute primitives.",
    ],
  },
  {
    id: "freecodecamp-certs",
    role: "Web & Algorithmic Certifications",
    organization: "freeCodeCamp",
    period: "Certified",
    type: "Certification",
    description:
      "Completed comprehensive curricula spanning JavaScript algorithms, data structures, responsive web design, and API development.",
    details: [
      "Verified hands-on coursework and algorithmic challenges covering modern frontend and backend development.",
    ],
  },
];

