import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// ==========================================
// Base Prompt Templates by Category (5 per category)
// ==========================================
const chatgptTemplates = [
  // Template A: Persona-driven Creator
  "You are a world-class [ROLE] specializing in [TOPIC]. Your goal is to write a comprehensive, publication-ready [DELIVERABLE]. Please structure the response as follows:\n\n1) A gripping introduction with a strong hook,\n2) Core theoretical principles of [TOPIC],\n3) A step-by-step implementation guide for [DELIVERABLE],\n4) 5 actionable best practices, and\n5) A summary checklist.\n\nWrite in an engaging, authoritative tone. Target length: 1500 words.",
  // Template B: Interactive Explainer
  "Act as an elite educator using the Feynman Technique to explain [TOPIC]. Your task is to break down this complex subject into a simple, easy-to-understand explanation that a 10-year-old can grasp. Follow this flow:\n\n1) Simple analogy or story explaining the core concept,\n2) Deconstruct [TOPIC] into 3 basic building blocks,\n3) Identify common misconceptions about [TOPIC] and clarify them, and\n4) Ask me 3 self-reflection questions to test my understanding.\n\nDo not use complex jargon. Keep the tone warm and encouraging.",
  // Template C: Strategic Consultant
  "You are a senior business consultant advising on [TOPIC]. Analyze the current challenges in this field and produce a strategic [DELIVERABLE] to maximize efficiency and ROI. Your advice should cover:\n\n1) Strategic positioning,\n2) Competitor threat mitigation,\n3) Operational checklist for executing [DELIVERABLE], and\n4) 3 critical KPIs to measure success.\n\nBe analytical, data-driven, and highly practical.",
  // Template D: Creative Dialogue Partner
  "You are a master creative writer and dialogue designer. Help me develop a narrative concept or dialogic scenario centered around [TOPIC]. Generate:\n\n1) A compelling hook/logline,\n2) 3 distinct character personas involved in this scenario,\n3) A realistic dialogue script between them illustrating the core conflicts of [TOPIC], and\n4) 3 alternative plot twists.\n\nMake the dialogue feel natural, punchy, and emotionally resonant.",
  // Template E: Technical Optimizer
  "You are a technical analyst and process optimizer. Create a highly structured process map or detailed documentation for [DELIVERABLE] concerning [TOPIC]. Ensure you cover:\n\n1) Input prerequisites,\n2) Sequential step-by-step execution steps,\n3) Common edge cases and failure modes with mitigation rules, and\n4) Performance optimization tips.\n\nUse markdown tables and lists for clean organization."
]

const midjourneyTemplates = [
  // Template A: Cinematic Photorealism
  "A photorealistic, highly detailed cinematic shot of [SUBJECT] set in [ENVIRONMENT]. Style parameters: dramatic [LIGHTING] lighting with volumetric atmosphere, captured on an ARRI ALEXA 65 with a [LENS] lens, color graded in a [COLOR_PALETTE] palette, visible textures, hyperdetailed environmental storytelling elements. --ar 16:9 --v 6 --style raw --s 500",
  // Template B: Fantasy Illustration
  "An ethereal fantasy illustration of [SUBJECT] in a magical [ENVIRONMENT]. Style: intricate digital painting, reminiscent of Magic: The Gathering card art, vibrant [COLOR_PALETTE] color scheme, glowing [LIGHTING] highlights, magical particles floating in the air, highly detailed armor and ancient runes. --ar 4:5 --v 6 --s 600 --style raw",
  // Template C: Sci-Fi Cyberpunk/Futuristic
  "A stunning cyberpunk concept art showcasing [SUBJECT] deep inside [ENVIRONMENT]. Features: towering holographic displays, rain-slicked streets reflecting bright neon [COLOR_PALETTE] lights, high-tech flying vehicles in the background, [LIGHTING] backlighting creating a dramatic silhouette, industrial grit mixed with clean futurism. --ar 21:9 --v 6 --s 750",
  // Template D: Abstract/Surrealist Art
  "A mesmerizing abstract surrealist composition exploring the theme of [SUBJECT]. Composition: fluid organic shapes interweaving with geometric structures in [ENVIRONMENT], bold contrast between matte textures and metallic gold accents, lit by a soft [LIGHTING] glow, color palette dominated by [COLOR_PALETTE]. --ar 1:1 --v 6 --s 800",
  // Template E: Cozy/Charming Diorama
  "A charming 3D isometric diorama of [SUBJECT] tucked away in a cozy [ENVIRONMENT]. Styled like a miniature dollhouse, warm [LIGHTING] lighting coming from windows, delicate papercraft and claymation details, soft [COLOR_PALETTE] pastel tones, highly detailed micro-world floating on a clean white background. --ar 4:3 --v 6 --s 400"
]

const codingTemplates = [
  // Template A: Component/Function Builder
  "You are a senior full-stack developer. Write a clean, highly efficient, and production-ready [LANGUAGE] code block or component implementing [FEATURE]. Ensure it follows best practices for [TECH_STACK]:\n\n1) Proper TypeScript types and prop interfaces,\n2) Robust error handling and input validation,\n3) Performance optimizations such as caching or lazy loading, and\n4) Clear comments explaining complex logic.\n\nInclude 3 common test cases.",
  // Template B: API Endpoint Architect
  "Design a secure, highly scalable REST/GraphQL API endpoint for [FEATURE] using [TECH_STACK] and [LANGUAGE]. The design must include:\n\n1) Route path, HTTP methods, and required headers,\n2) Request body and query param schema validation (using Zod or similar),\n3) Database query logic with transaction handling,\n4) Centralized error handling and proper HTTP response codes, and\n5) Rate limiting and authentication guard middleware.",
  // Template C: Database Schema & Queries
  "You are a lead database architect. Design an optimized database schema for a [FEATURE] application using [TECH_STACK]. Provide:\n\n1) Full entity relationships (described in text),\n2) Highly optimized database schema (DDL or Prisma schema format),\n3) Standard indexes and composite indexes to optimize read/write performance, and\n4) SQL/ORM queries for the 5 most common query patterns (such as pagination, aggregation, and deep joins).",
  // Template D: DevOps & CI/CD Pipeline
  "You are an expert DevOps engineer. Write a complete CI/CD configuration file (GitHub Actions or Dockerfile) to automate building, testing, and deploying a [FEATURE] application built on [TECH_STACK]. The configuration must support:\n\n1) Dependency caching for faster builds,\n2) Unit test and linting check stages,\n3) Containerization or serverless compilation, and\n4) Safe deployment with rollback scripts.",
  // Template E: Debugging & Profiling Guide
  "Act as a world-class systems debugger. Provide a systematic debugging checklist and performance profiling plan to diagnose and fix [FEATURE] issues in [TECH_STACK] running on [LANGUAGE]. Outline:\n\n1) Diagnostic commands and logging patterns to isolate the root cause,\n2) 5 common bugs in this specific area with verified code fixes, and\n3) Memory management and CPU profiling strategies to optimize performance."
]

const youtubeTemplates = [
  // Template A: Video Script Outline & Scriptwriter
  "You are an elite YouTube scriptwriter who has helped channels gain millions of views. Write a detailed video script outline and hook for a video about [TOPIC] targeted at [AUDIENCE]. Structure:\n\n1) Scroll-stopping visual and verbal Hook (0-15 seconds),\n2) Intro transition establishing high stakes,\n3) 5 major content sections with clear talking points and visual/B-roll cues,\n4) Retention triggers to keep viewers engaged, and\n5) A natural call-to-action driving comments and clicks.",
  // Template B: Thumbnail & Title Strategist
  "You are a YouTube thumbnail psychologist and CTR optimizer. Generate 5 unique thumbnail concepts and 10 highly clickable titles for a video about [TOPIC]. For each thumbnail, specify:\n\n1) Exact visual layout and color scheme,\n2) Text overlay (max 3 words),\n3) Emotional trigger (curiosity, fear, surprise), and\n4) An A/B testing plan.\n\nEnsure the titles complement the thumbnails and contain search-friendly keywords.",
  // Template C: Description & Tags SEO Optimizer
  "Act as an expert YouTube SEO consultant. Write a fully optimized video description and generate 30 high-ranking tags for a video about [TOPIC]. The description must include:\n\n1) First 2 sentences with primary keywords for browse,\n2) A 200-word comprehensive summary naturally integrating secondary keywords,\n3) 8-12 timestamped chapters,\n4) Social media and affiliate link formatting, and\n5) 3-5 tags.\n\nOptimize for maximum visibility in search and suggested feeds.",
  // Template D: Shorts/Reels Script Builder
  "Write a viral 60-second YouTube Shorts/TikTok script about [TOPIC] for [AUDIENCE]. The script must include:\n\n1) A pattern-interrupt opening hook in the first 3 seconds,\n2) Rapid-fire value delivery formatted as a list or story,\n3) Visual framing directions, text-on-screen overlays, sound effect notes, and\n4) A seamless loop CTA back to the beginning of the video.",
  // Template E: Sponsorship & Business Manager
  "You are a professional YouTube business manager. Write a cold outreach email pitch to secure a paid brand sponsorship for a video about [TOPIC]. The pitch must include:\n\n1) A compelling subject line that gets opened,\n2) Creative video integration ideas featuring the sponsor's product,\n3) Channel demographics and engagement statistics, and\n4) A highly professional call-to-action requesting a discovery call."
]

const businessTemplates = [
  // Template A: Strategy Planning & Business Plan
  "You are a startup incubator director. Build a comprehensive business plan and pitch strategy for a new startup in the [INDUSTRY] niche, focused on [BUSINESS_MODEL]. The plan must cover:\n\n1) One-sentence Unique Value Proposition,\n2) Target customer segments and CAC/LTV estimation,\n3) 3 main revenue streams,\n4) Go-to-market channels, and\n5) A 12-month operational execution timeline with monthly milestones.",
  // Template B: Financial Modeling & Pricing Strategy
  "Act as a fractional CFO and pricing architect. Design a robust pricing model and 3-year financial forecast for a [BUSINESS_MODEL] business in the [INDUSTRY] sector. Provide:\n\n1) A structured 3-tier pricing layout (Starter, Professional, Enterprise) with feature-gating logic,\n2) Standard fixed vs variable cost structure,\n3) Cash flow projections showing runway and break-even point, and\n4) 3 potential pricing experiments to increase average order value (AOV).",
  // Template C: Hiring, HR & Team Culture
  "You are a modern Chief People Officer. Create a comprehensive job description, interview guide, and onboarding plan for a [ROLE] at a fast-growing company in the [INDUSTRY] space. Include:\n\n1) Job description with clear KPIs,\n2) A 4-stage interview pipeline with scorecards,\n3) 10 behavioral interview questions matching company values, and\n4) A 30-60-90 day onboarding checklist for success.",
  // Template D: Negotiation & Contract Strategy
  "Act as a professional corporate negotiator. Build a comprehensive negotiation playbook and script for a [CONTRACT_TYPE] contract or deal in the [INDUSTRY] space. Outline:\n\n1) Your ideal aspiration point, reservation point, and BATNA,\n2) Opening statement and anchoring strategies,\n3) 5 common objections from the other party with tactical responses, and\n4) Closing techniques to secure a win-win agreement.",
  // Template E: SWOT & Competitive Intelligence
  "You are a lead market research analyst. Conduct a thorough SWOT analysis and competitive positioning study for a business in the [INDUSTRY] sector focusing on [BUSINESS_MODEL]. Deliver:\n\n1) Detailed Strengths, Weaknesses, Opportunities, and Threats,\n2) Strategic cross-quadrant actions (SO, WO, ST, WT),\n3) A 2x2 competitive grid mapping against major players, and\n4) A list of 3 market gaps to exploit."
]

const marketingTemplates = [
  // Template A: Landing Page & Sales Copy
  "You are a legendary direct response copywriter. Write high-converting sales copy for a landing page promoting [PRODUCT] to the target audience of [TARGET_AUDIENCE]. The copy must include:\n\n1) A benefit-first headline and curiosity subheadline,\n2) An empathetic problem section agitating their core pain points,\n3) The solution section introducing [PRODUCT] with 3 primary benefits,\n4) Social proof and testimonial formats, and\n5) Action-oriented Call to Action (CTA) buttons.",
  // Template B: Email Campaign Sequence
  "Act as an email marketing master. Create a highly engaging 5-email nurture sequence for [PRODUCT] targeting [TARGET_AUDIENCE]. For each email, generate:\n\n1) 3 subject lines to A/B test,\n2) Complete body copy in a warm, conversational, benefit-driven tone,\n3) A clear call-to-action button, and\n4) A psychological P.S. trigger to create urgency. The sequence should move from welcome to education, social proof, objection handling, and final urgency.",
  // Template C: Paid Ad Copy & Creative Brief
  "You are a paid acquisition specialist. Generate 3 unique ad copy variations and a creative brief for Facebook/Instagram and Google Ads promoting [PRODUCT] to [TARGET_AUDIENCE]. Deliver:\n\n1) Ad copy variations testing different emotional angles (fear of missing out, aspiration, value),\n2) Complete Google Responsive Search Ad headlines (15) and descriptions (4), and\n3) A detailed visual brief for the ad image/video creative.",
  // Template D: Influencer Brief & Pitch
  "Act as an influencer relations manager. Write a professional cold outreach pitch and design an influencer campaign brief to promote [PRODUCT] through lifestyle creators targeting [TARGET_AUDIENCE]. The package must contain:\n\n1) A personalized pitch email,\n2) A campaign creative brief highlighting key product benefits, do's/dont's, platform posting requirements, and disclosure compliance, and\n3) An ROI tracking framework.",
  // Template E: SEO Strategy & Content Outline
  "You are a senior SEO content strategist. Write a comprehensive SEO content brief and outline to rank for [PRODUCT] keywords targeted at [TARGET_AUDIENCE]. Deliver:\n\n1) Search intent and competitor SERP analysis,\n2) H1, H2, and H3 outline structure naturally incorporating secondary keywords,\n3) A definition paragraph for featured snippet optimization, and\n4) Internal and external linking recommendations."
]

const productivityTemplates = [
  // Template A: Schedule & Energy Optimizer
  "You are a high-performance productivity coach. Build a customized weekly time-blocking schedule and energy optimization plan for a [ROLE] with these priorities: [PRIORITIES]. Ensure the plan incorporates:\n\n1) Energizing morning and evening routines,\n2) 3 deep work blocks per day aligned with circadian rhythms,\n3) Strategic caffeine and nutrition timing, and\n4) Buffer zones for unexpected administrative tasks and rest.",
  // Template B: Project Scope & Execution
  "Act as an agile project manager. Create a comprehensive project scope and execution plan for a project to [PROJECT_GOAL] using [SYSTEM_TYPE] methods. Provide:\n\n1) A detailed Work Breakdown Structure (WBS) with phases and tasks,\n2) A project timeline with milestones,\n3) A RACI matrix for team roles, and\n4) A risk register identifying 5 key risks with mitigation strategies.",
  // Template C: Habit Stacking & Behavior Design
  "You are a behavioral psychologist specializing in habit formation. Design a personalized habit stacking system and behavioral tracker for a user wanting to [PRIORITIES] using a [SYSTEM_TYPE] approach. Deliver:\n\n1) 5 customized habit stacks pairing new actions with established anchors,\n2) Environment design recommendations to reduce friction,\n3) If-then scenarios to anticipate obstacles, and\n4) A 30-day accountability tracking framework.",
  // Template D: Email & Communication Workflow
  "Act as an efficiency expert. Create a comprehensive email inbox zero system and communication workflow for a [ROLE] using [SYSTEM_TYPE] techniques. The system must cover:\n\n1) A 4-category folder/label schema,\n2) 5 customizable email auto-responder templates,\n3) Auto-filter rules to divert non-essential newsletters, and\n4) A batch-processing schedule to limit email checking to 3 times a day.",
  // Template E: Knowledge Management System
  "You are a personal knowledge management (PKM) expert. Design a comprehensive system to organize digital information, notes, and research for a [ROLE] using the [SYSTEM_TYPE] methodology. Structure:\n\n1) Tool stack recommendations (folders, tags, linking),\n2) Capture workflow to easily save ideas,\n3) Note-taking templates for quick processing, and\n4) A weekly review checklist to maintain and link knowledge."
]

const socialMediaTemplates = [
  // Template A: Viral Thread Builder
  "You are a social media growth strategist whose posts consistently go viral. Write a highly engaging 10-tweet Twitter/X thread about [TOPIC] targeted at [AUDIENCE]. The thread must feature:\n\n1) A scroll-stopping hook tweet with strong emotional triggers,\n2) Individual value tweets containing specific data, analogies, or frameworks,\n3) Short, highly readable lines, and\n4) A clear call-to-action tweet requesting retweets and follows.",
  // Template B: Short-Form Script Generator
  "Write 3 viral TikTok/Instagram Reels scripts (max 60 seconds each) about [TOPIC] for [AUDIENCE]. Each script must specify:\n\n1) A visual pattern-interrupt hook in the first 2 seconds,\n2) An engaging story or list format body,\n3) Production cues (zooms, text pop-ups, sound effect suggestions), and\n4) An interactive CTA encouraging shares and comments.",
  // Template C: LinkedIn Thought Leadership
  "You are an executive brand builder. Write a highly professional yet conversational LinkedIn post about [TOPIC] geared towards [AUDIENCE]. Structure the post as follows:\n\n1) A scroll-stopping hook (first 2 lines before 'see more'),\n2) A vulnerable or counterintuitive personal story,\n3) 3 actionable business takeaways, and\n4) An engagement question prompting discussion in the comments section.",
  // Template D: Pinterest Traffic Strategy
  "Act as a Pinterest SEO expert. Build a Pinterest traffic strategy and generate 5 optimized pin descriptions for a business focusing on [TOPIC] targeting [AUDIENCE]. Deliver:\n\n1) High-traffic keyword research,\n2) 5 pin titles and keyword-rich descriptions (max 500 characters each),\n3) 5 board names and board description briefs, and\n4) Visual design specifications for pins.",
  // Template E: UGC Campaign Catalyst
  "You are a community-led marketing manager. Design an interactive User-Generated Content (UGC) campaign and challenge for a brand in the [TOPIC] space, targeting [AUDIENCE]. The campaign plan must include:\n'n1) A catchy campaign name and hashtag,\n2) Low-friction entry rules,\n3) Influencer and community outreach emails, and\n4) A plan to curate and reward submissions."
]

// ==========================================
// 50 Config Objects Per Category
// ==========================================
const chatgptItems = [
  { role: "Senior Python Developer", topic: "Clean Code & Refactoring", deliverable: "refactoring playbook", tags: "python,coding,refactoring,clean-code", difficulty: "intermediate" },
  { role: "Cognitive Scientist", topic: "Identifying Fallacies in Debates", deliverable: "debate analysis checklist", tags: "thinking,critical-thinking,psychology", difficulty: "advanced" },
  { role: "Classical Historian", topic: "Rhetorical Speech Structures", deliverable: "persuasive speaking framework", tags: "history,speaking,rhetoric,writing", difficulty: "intermediate" },
  { role: "Executive Recruiter", topic: "Resume Optimization", deliverable: "resume optimization blueprint", tags: "career,resume,hiring,jobs", difficulty: "beginner" },
  { role: "Sports Nutritionist", topic: "Meal Planning for Athletes", deliverable: "7-day customized nutrition plan", tags: "health,fitness,meal-plan,diet", difficulty: "beginner" },
  { role: "Localization Specialist", topic: "Idiomatic Language Adaptation", deliverable: "marketing localization guide", tags: "translation,languages,marketing,global", difficulty: "advanced" },
  { role: "Philosophy Professor", topic: "Critiquing Modern Business Ethics", deliverable: "philosophical dialogue workbook", tags: "philosophy,ethics,critical-thinking", difficulty: "advanced" },
  { role: "Creative Event Planner", topic: "Experiential Product Launches", deliverable: "interactive event launch roadmap", tags: "events,business,planning,marketing", difficulty: "intermediate" },
  { role: "Financial Coach", topic: "Debt-Free Budgeting", deliverable: "personal finance handbook", tags: "finance,money,budgeting,investing", difficulty: "beginner" },
  { role: "Science Communicator", topic: "Quantum Computing Basics", deliverable: "conceptual explanatory primer", tags: "science,physics,learning,education", difficulty: "intermediate" },
  { role: "Direct Response Copywriter", topic: "High-Conversion Cold Emailing", deliverable: "cold email outreach sequence", tags: "sales,email,copywriting,marketing", difficulty: "intermediate" },
  { role: "Mindfulness Teacher", topic: "Burnout Prevention Protocols", deliverable: "mindfulness-based daily routine", tags: "mindfulness,health,routine,productivity", difficulty: "beginner" },
  { role: "Workplace Mediator", topic: "Resolving Team Friction", deliverable: "conflict resolution conversation script", tags: "hr,management,communication,teams", difficulty: "intermediate" },
  { role: "Bestselling Novelist", topic: "High Fantasy Worldbuilding", deliverable: "novel outline and act breakdown", tags: "writing,fiction,novel,creative", difficulty: "advanced" },
  { role: "Admissions Consultant", topic: "Compelling Personal Statements", deliverable: "college application essay outline", tags: "education,college,writing,essay", difficulty: "beginner" },
  { role: "E-commerce Copywriter", topic: "SaaS Product Listings", deliverable: "product description library", tags: "copywriting,ecommerce,marketing,saas", difficulty: "beginner" },
  { role: "Technical Recruiter", topic: "Answering Behavioral Interview Questions", deliverable: "STAR method interview scorecard", tags: "career,jobs,interview,recruiting", difficulty: "intermediate" },
  { role: "Innovation Strategist", topic: "Disruptive Startup Ideation", deliverable: "rapid brainstorming workshop outline", tags: "startup,ideation,brainstorming,business", difficulty: "intermediate" },
  { role: "TEDx Speaking Coach", topic: "Dynamic Public Keynotes", deliverable: "public speaking narrative structure", tags: "speaking,communication,presentation", difficulty: "advanced" },
  { role: "Luxury Travel Curator", topic: "Immersive Sustainable Tourism", deliverable: "10-day cultural travel itinerary", tags: "travel,tourism,sustainability,culture", difficulty: "beginner" },
  { role: "Decision Scientist", topic: "Risk-Weighted Strategic Planning", deliverable: "crisis decision-making framework", tags: "strategy,decisions,risk-management", difficulty: "advanced" },
  { role: "Technical Writer", topic: "Simplifying REST API Docs", deliverable: "developer-friendly quickstart guide", tags: "coding,api,writing,documentation", difficulty: "intermediate" },
  { role: "Newsletter Growth Expert", topic: "Engaging Biotech Newsletters", deliverable: "30-day email content draft", tags: "newsletter,writing,email,marketing", difficulty: "intermediate" },
  { role: "Hollywood Screenwriter", topic: "Subtext-Rich Dramatic Dialogue", deliverable: "screenplay dialogue polishing sheet", tags: "creative-writing,screenplay,drama", difficulty: "advanced" },
  { role: "Applied Mathematician", topic: "Linear Algebra Visual Concepts", deliverable: "intuitive math study guide", tags: "math,science,learning,education", difficulty: "intermediate" },
  { role: "Patient Advocate", topic: "Demystifying Clinical Diagnostics", deliverable: "patient-friendly medical summary", tags: "health,medicine,advocacy,learning", difficulty: "beginner" },
  { role: "Corporate Attorney", topic: "Simplifying Complex SaaS SLAs", deliverable: "SaaS contract summary cheat-sheet", tags: "law,saas,contracts,business", difficulty: "advanced" },
  { role: "Behavioral Designer", topic: "Positive Habit Loop Mechanics", deliverable: "daily habit loop tracker builder", tags: "habits,behavior,psychology,routine", difficulty: "beginner" },
  { role: "Personal Concierge", topic: "Curating Experiential Anniversary Gifts", deliverable: "thoughtful custom gift ideas list", tags: "lifestyle,gifting,creative,planning", difficulty: "beginner" },
  { role: "Librarian & Bibliophile", topic: "20th-Century Existential Novels", deliverable: "curated book list and reading guide", tags: "books,reading,literature,philosophy", difficulty: "intermediate" },
  { role: "Film Historian", topic: "European Neo-Noir Curation", deliverable: "must-watch film selection analysis", tags: "movies,film,history,curation", difficulty: "intermediate" },
  { role: "Life Strategy Coach", topic: "Accountability Systems for Solopreneurs", deliverable: "personal goals accountability scorecard", tags: "accountability,solopreneur,goals", difficulty: "beginner" },
  { role: "Career Counselor", topic: "Finance to Tech-PM Shift", deliverable: "career transition skills matrix", tags: "career,tech,pm,finance,jobs", difficulty: "intermediate" },
  { role: "Nonprofit Consultant", topic: "Urban Green Space Funding", deliverable: "community grant application template", tags: "grant-writing,nonprofit,funding,green", difficulty: "advanced" },
  { role: "Senior Copy Editor", topic: "Polishing Academic Manuscripts", deliverable: "advanced editing and styling guide", tags: "writing,editing,academic,grammar", difficulty: "intermediate" },
  { role: "Naming Specialist", topic: "Memorable Tech Startup Naming", deliverable: "brand naming ideas catalog", tags: "branding,naming,logos,marketing", difficulty: "beginner" },
  { role: "Customer Success Director", topic: "Empathic Escalation Handling", deliverable: "customer service responses playbook", tags: "support,success,communication,customer", difficulty: "intermediate" },
  { role: "SEO Content Lead", topic: "Optimizing Organic Knowledge Bases", deliverable: "FAQ content library database", tags: "seo,writing,content,search", difficulty: "intermediate" },
  { role: "Market Researcher", topic: "Synthesizing Micro-Mobility Growth", deliverable: "market research summary report", tags: "research,market-analysis,business", difficulty: "advanced" },
  { role: "Product Strategist", topic: "Software Competitor Feature Audits", deliverable: "product feature gap analysis sheet", tags: "product,competitors,strategy,saas", difficulty: "advanced" },
  { role: "Ethics Professor", topic: "Existentialism and Work Culture", deliverable: "existential ethics reading syllabus", tags: "philosophy,ethics,education,work", difficulty: "intermediate" },
  { role: "Executive Ghostwriter", topic: "Thought Leadership Series", deliverable: "10-post executive content blueprint", tags: "writing,linkedin,executive,branding", difficulty: "intermediate" },
  { role: "Instructional Designer", topic: "Microlearning Course Design", deliverable: "6-module online course curriculum", tags: "education,elearning,design,curriculum", difficulty: "intermediate" },
  { role: "Venture Builder", topic: "Refining Business Model Logic", deliverable: "business model canvas draft report", tags: "startup,business,canvas,strategy", difficulty: "intermediate" },
  { role: "UX Researcher", topic: "Mapping B2B SaaS Touchpoints", deliverable: "customer journey roadmap playbook", tags: "ux,research,customer-journey,saas", difficulty: "advanced" },
  { role: "SaaS Pricing Analyst", topic: "Value-Based Subscription Tiering", deliverable: "SaaS monetization & tiering framework", tags: "saas,pricing,monetization,finance", difficulty: "advanced" },
  { role: "Crisis PR Specialist", topic: "Transparent Incident Communications", deliverable: "crisis public relations response guide", tags: "pr,marketing,communications,crisis", difficulty: "advanced" },
  { role: "Business Developer", topic: "Securing Premium Commercial Leases", deliverable: "commercial lease negotiation script", tags: "negotiation,sales,lease,business", difficulty: "advanced" },
  { role: "Conversion Specialist", topic: "High-Converting Visual Email Layouts", deliverable: "direct response email copy blueprint", tags: "marketing,email,copywriting,conversion", difficulty: "intermediate" },
  { role: "AI Prompt Engineer", topic: "Refining Large Language Model Logic", deliverable: "prompt engineering optimization handbook", tags: "ai,prompts,engineering,advanced", difficulty: "advanced" }
]

const midjourneyItems = [
  { subject: "a cybernetic electric racing bike", environment: "a futuristic rain-washed Tokyo alleyway", lighting: "purple and cyan neon", lens: "50mm anamorphic", colorPalette: "neon cyberpunk colors", tags: "midjourney,cyberpunk,vehicle,futuristic", difficulty: "advanced" },
  { subject: "an ancient elven alchemist mixing glowing potions", environment: "a magical treehouse laboratory", lighting: "bioluminescent green", lens: "85mm prime", colorPalette: "forest emerald and gold", tags: "midjourney,fantasy,character,illustration", difficulty: "intermediate" },
  { subject: "a giant rusted steam-powered mechanical robot", environment: "a post-apocalyptic desert oasis", lighting: "dramatic golden hour", lens: "35mm cinematic", colorPalette: "warm amber and rusted brown", tags: "midjourney,sci-fi,mech,photorealistic", difficulty: "advanced" },
  { subject: "a surreal composition of floating glass islands", environment: "a starry cosmic nebula void", lighting: "celestial glowing starlight", lens: "wide-angle planetary", colorPalette: "deep violet, cosmic magenta, and gold", tags: "midjourney,abstract,surreal,cosmic", difficulty: "intermediate" },
  { subject: "a cozy miniature reading nook under a staircase", environment: "a charming rustic wood cabin", lighting: "warm fireplace glow", lens: "120mm macro", colorPalette: "soft pastel beige, brown, and green", tags: "midjourney,cozy,diorama,3d-render", difficulty: "beginner" },
  { subject: "a futuristic cybernetic mechanical dragon", environment: "a volcanic obsidian volcanic crater", lighting: "glowing molten lava backlighting", lens: "85mm telephoto", colorPalette: "fiery orange, crimson, and obsidian black", tags: "midjourney,sci-fi,mythology,creature", difficulty: "advanced" },
  { subject: "a serene zen garden with raked white sand", environment: "a minimalist traditional Japanese temple", lighting: "soft morning diffuse daylight", lens: "50mm prime", colorPalette: "neutral grey, pristine white, and moss green", tags: "midjourney,minimalist,zen,architecture", difficulty: "beginner" },
  { subject: "a mystical phoenix rising from glittering ashes", environment: "an ancient stone runic alter", lighting: "explosive bright fiery glow", lens: "24mm wide-angle", colorPalette: "radiant gold, scarlet, and dark charcoal", tags: "midjourney,fantasy,creature,art", difficulty: "intermediate" },
  { subject: "a retro-futuristic space station control deck", environment: "orbiting a giant blue gas giant planet", lighting: "bright computer console terminal glow", lens: "18mm fisheye", colorPalette: "vintage NASA orange and teal", tags: "midjourney,retro-futurism,sci-fi,space", difficulty: "advanced" },
  { subject: "a Victorian steampunk laboratory with brass gears", environment: "a foggy dark London street cellar", lighting: "flickering gas lamp light", lens: "50mm vintage Cooke", colorPalette: "polished brass, copper, and dark mahogany", tags: "midjourney,steampunk,laboratory,vintage", difficulty: "intermediate" },
  { subject: "an underwater lost city of Atlantis", environment: "deep ocean abyss with coral reefs", lighting: "ethereal sunbeams filtering through water", lens: "16mm underwater macro", colorPalette: "aquamarine, deep sapphire, and coral pink", tags: "midjourney,underwater,atlantis,mythology", difficulty: "advanced" },
  { subject: "a cozy bakery shop window filled with cakes", environment: "a rainy European cobblestone street", lighting: "warm shop window gaslights", lens: "50mm lens", colorPalette: "warm vanilla, strawberry red, and chocolate", tags: "midjourney,cozy,food,photography", difficulty: "beginner" },
  { subject: "a majestic cosmic whale swimming in space", environment: "a ringed planetary atmosphere nebula", lighting: "bioluminescent starlight aura", lens: "panoramic cosmic", colorPalette: "deep space indigo, fuchsia, and silver", tags: "midjourney,surreal,space,whale", difficulty: "intermediate" },
  { subject: "a vintage retro travel poster of Paris", environment: "Eiffel tower with spring blossoms", lighting: "bright flat illustration daylight", lens: "flat graphic render", colorPalette: "creamy yellow, sky blue, and vintage red", tags: "midjourney,poster,illustration,vintage", difficulty: "beginner" },
  { subject: "a Gothic cathedral library filled with books", environment: "shadowy towering stone archways", lighting: "moonlight streaming through stained glass", lens: "24mm architectural", colorPalette: "cobalt blue, gold, and dusty leather brown", tags: "midjourney,gothic,library,architecture", difficulty: "intermediate" },
  { subject: "a futuristic vertical farming greenhouse dome", environment: "a high-tech sustainable green city", lighting: "bright growth LED panels", lens: "35mm wide-angle", colorPalette: "vibrant emerald green, clean white, and silver", tags: "midjourney,solarpunk,architecture,greenhouse", difficulty: "intermediate" },
  { subject: "a papercraft diorama of an alpine village", environment: "snow-capped mountains with pine trees", lighting: "soft studio lighting", lens: "100mm macro", colorPalette: "pristine white, pine green, and wood brown", tags: "midjourney,papercraft,diorama,art", difficulty: "beginner" },
  { subject: "a cybernetic neon panther stealthily hunting", environment: "a rainy neo-noir alleyway city roof", lighting: "emerald green neon sign reflection", lens: "85mm prime", colorPalette: "glossy black, neon green, and electric blue", tags: "midjourney,cyberpunk,animal,creature", difficulty: "advanced" },
  { subject: "an impressionist canvas painting of a lily pond", environment: "a tranquil French estate garden", lighting: "soft dappled sunlight", lens: "oil impasto brushstrokes", colorPalette: "lavender, olive green, and soft pink", tags: "midjourney,impressionism,painting,art", difficulty: "beginner" },
  { subject: "a surreal clock melting over a tree branch", environment: "a vast dry desolate desert salt flat", lighting: "harsh high-noon desert sun", lens: "dramatic perspective", colorPalette: "ochre yellow, sky blue, and bronze metal", tags: "midjourney,surreal,dali,art", difficulty: "intermediate" },
  { subject: "a cute tiny baby griffin asleep in a nest", environment: "a high fantasy mountain cliffside ledge", lighting: "warm morning sunrays", lens: "85mm portrait", colorPalette: "fluffy golden brown, white, and sky blue", tags: "midjourney,fantasy,cute,baby", difficulty: "beginner" },
  { subject: "a retro 80s synthwave sports car racing", environment: "a wireframe grid horizon with digital grid mountains", lighting: "electric laser lines and neon sun glow", lens: "35mm vintage anamorphic", colorPalette: "hot pink, neon purple, and black grid", tags: "midjourney,80s,synthwave,neon", difficulty: "beginner" },
  { subject: "a gorgeous abstract geometric origami sculpture", environment: "a pristine high-end modern art gallery", lighting: "clean museum directional spot lamps", lens: "50mm prime studio", colorPalette: "monochrome white, charcoal, and accent gold", tags: "midjourney,origami,abstract,sculpture", difficulty: "intermediate" },
  { subject: "an astronaut sitting on a park bench", environment: "the desolate grey surface of the moon looking at Earth", lighting: "harsh direct sunlight and pitch-black shadows", lens: "35mm Hasselblad", colorPalette: "stark white, deep space black, and brilliant blue Earth", tags: "midjourney,surreal,astronaut,space", difficulty: "advanced" },
  { subject: "a steampunk airship fleet floating through clouds", environment: "a sunset sky above a Victorian London sky", lighting: "dramatic burning red sunset backlighting", lens: "70mm cinematic wide", colorPalette: "copper, deep crimson, and cloud pink", tags: "midjourney,steampunk,airship,sky", difficulty: "intermediate" },
  { subject: "an organic biomechanical architecture building", environment: "a futuristic alien jungle environment", lighting: "bioluminescent spore glow", lens: "24mm wide angle", colorPalette: "acid green, organic purple, and dark grey bone", tags: "midjourney,hr-giger,architecture,alien", difficulty: "advanced" },
  { subject: "a cozy kitchen with baking ingredients", environment: "warm afternoon sun streaming through a window", lighting: "golden afternoon side lighting", lens: "50mm f/1.4", colorPalette: "flour white, warm wood, and copper bowls", tags: "midjourney,cozy,photography,kitchen", difficulty: "beginner" },
  { subject: "a double exposure portrait of an explorer", environment: "merged with a dense foggy evergreen pine forest", lighting: "soft misty overcast lighting", lens: "85mm double exposure", colorPalette: "forest green, earth brown, and misty white", tags: "midjourney,photography,portrait,art", difficulty: "advanced" },
  { subject: "a watercolor splash sketch of a busy street", environment: "a historic rainy London red bus scene", lighting: "soft diffuse rainy reflection", lens: "splattered watercolor brush", colorPalette: "london red, graphite grey, and paper white", tags: "midjourney,watercolor,sketch,art", difficulty: "beginner" },
  { subject: "an Art Deco skyscraper facade", environment: "a clean luxury metropolis cityscape", lighting: "golden hour architectural illumination", lens: "28mm tilt-shift perspective", colorPalette: "champagne gold, emerald green, and black marble", tags: "midjourney,art-deco,architecture,metropolis", difficulty: "intermediate" },
  { subject: "a magical glowing potion bottle shop stand", environment: "a bustling medieval fantasy market square", lighting: "glowing magical liquid illuminating the wood counter", lens: "50mm prime", colorPalette: "ruby red, sapphire blue, and weathered oak", tags: "midjourney,fantasy,potion,shop", difficulty: "beginner" },
  { subject: "a cybernetic cyber-dog mechanical pet", environment: "a high-tech modern apartment balcony", lighting: "soft city skyline ambient lights", lens: "50mm prime portrait", colorPalette: "brushed titanium, matte carbon, and neon blue eyes", tags: "midjourney,cyberpunk,creature,technology", difficulty: "intermediate" },
  { subject: "a hyperrealistic human portrait of an elder nomad", environment: "a windy sandstorm Sahara desert", lighting: "harsh side sun highlighting deep skin wrinkles", lens: "85mm portrait f/1.8", colorPalette: "sand gold, weathered brown, and bright blue eyes", tags: "midjourney,photorealistic,portrait,human", difficulty: "advanced" },
  { subject: "a mystical ancient runestone monument", environment: "a foggy Scottish highland grassy hill", lighting: "dramatic lightning storm cloud break", lens: "24mm wide angle", colorPalette: "mossy green, stone grey, and magical cyan runes", tags: "midjourney,mystical,scotland,landscape", difficulty: "intermediate" },
  { subject: "a flat vector icon set of coding tools", environment: "a clean studio mockup presentation", lighting: "flat vector graphics design", lens: "illustrator clean layout", colorPalette: "modern tech blue, purple, and clean white", tags: "midjourney,vector,icons,design", difficulty: "beginner" },
  { subject: "a cute chibi-style fantasy paladin knight", environment: "a colorful fairytale meadow", lighting: "bright cheerful morning sunshine", lens: "3d game model asset", colorPalette: "shiny silver armor, blue cape, and green grass", tags: "midjourney,chibi,fantasy,game-art", difficulty: "beginner" },
  { subject: "an explosive abstract splash of liquid paint", environment: "a clean dark photography studio background", lighting: "high-speed strobes freezing motion", lens: "100mm macro studio", colorPalette: "vibrant orange, hot magenta, and electric yellow", tags: "midjourney,abstract,photography,macro", difficulty: "intermediate" },
  { subject: "a futuristic automated robotic chef", environment: "a sleek high-tech pristine restaurant kitchen", lighting: "cool clean fluorescent panels", lens: "35mm cinema prime", colorPalette: "brushed steel, clean glass, and vibrant fresh vegetables", tags: "midjourney,sci-fi,robot,chef", difficulty: "intermediate" },
  { subject: "a post-apocalyptic overgrown greenhouse sanctuary", environment: "a collapsed glass skyscraper interior dome", lighting: "sunbeams cutting through shattered ceiling dusty air", lens: "24mm architectural wide", colorPalette: "overgrown moss green, sky blue, and concrete grey", tags: "midjourney,post-apocalyptic,greenhouse,nature", difficulty: "advanced" },
  { subject: "a gorgeous claymation style fantasy cottage", environment: "a miniature stop-motion set forest", lighting: "soft studio warm spotlights", lens: "60mm macro stop-motion", colorPalette: "earthy clay brown, forest green, and soft red brick", tags: "midjourney,claymation,stop-motion,animation", difficulty: "beginner" },
  { subject: "a majestic glowing ice palace castle", environment: "a deep arctic northern lights landscape", lighting: "shimmering aurora borealis green and violet reflection", lens: "16mm ultra-wide", colorPalette: "glacier blue, emerald green, and glowing aurora purple", tags: "midjourney,castle,ice,aurora", difficulty: "intermediate" },
  { subject: "a high-speed action shot of a running cyber-tiger", environment: "a futuristic neon racing track stadium", lighting: "motion blur streaks of track lighting", lens: "70-200mm zoom sports", colorPalette: "carbon fiber black, bright orange stripes, and neon blue", tags: "midjourney,cyberpunk,animal,action", difficulty: "advanced" },
  { subject: "a low poly styled fantasy wizard tower", environment: "floating voxel clouds on a pastel sky", lighting: "clean voxel game engine render", lens: "game camera perspective", colorPalette: "voxel purple tower, gold roof, and soft blue sky", tags: "midjourney,low-poly,voxel,game-art", difficulty: "beginner" },
  { subject: "a gorgeous oil painting of autumn woods", environment: "a winding river path with orange leaves", lighting: "soft warm low autumn sun", lens: "textured thick paint strokes", colorPalette: "burnt orange, crimson red, and golden yellow", tags: "midjourney,painting,autumn,nature", difficulty: "beginner" },
  { subject: "a luxury futuristic submarine yacht dashboard", environment: "deep ocean trench looking out thick glass viewport", lighting: "soft blue dashboard console LED panels", lens: "16mm cinematic wide", colorPalette: "matte black luxury trim, glowing amber, and deep ocean blue", tags: "midjourney,sci-fi,yacht,submarine", difficulty: "advanced" },
  { subject: "a mysterious glowing crystal portal gateway", environment: "an ancient stone ruin inside a deep dark cavern", lighting: "intense glowing portal energy illuminating the stone", lens: "24mm wide angle", colorPalette: "amethyst purple portal, dark granite stone", tags: "midjourney,portal,fantasy,mystical", difficulty: "intermediate" },
  { subject: "a pop art style retro portrait of a woman", environment: "a bright colorful halftone dot backdrop", lighting: "bold comic book flat fill", lens: "silkscreen graphic style", colorPalette: "bright yellow hair, bold red lips, and royal blue background", tags: "midjourney,pop-art,retro,illustration", difficulty: "beginner" },
  { subject: "a rustic wooden workbench with carving tools", environment: "a traditional carpenter cozy workshop", lighting: "warm dust-filled window sunbeam", lens: "50mm prime macro", colorPalette: "sawdust gold, weathered wood brown, and steel silver", tags: "midjourney,cozy,workshop,craft", difficulty: "beginner" },
  { subject: "a stunning futuristic cybernetic holographic interface", environment: "a high-tech strategic command war-room table", lighting: "electric blue and orange glowing HUD elements", lens: "35mm cinema lens", colorPalette: "holographic neon cyan, security orange, and matte black", tags: "midjourney,sci-fi,hud,hologram", difficulty: "advanced" },
  { subject: "a gorgeous pastel dreamscape floating castle", environment: "clouds tinted in cotton candy colors", lighting: "soft ethereal heavenly glow", lens: "dreamy soft-focus landscape", colorPalette: "cotton candy pink, lavender purple, and mint green", tags: "midjourney,surreal,fantasy,sky", difficulty: "intermediate" }
]

const codingItems = [
  { language: "TypeScript", feature: "virtualized infinite scroll list component", techStack: "React and Tailwind CSS", tags: "typescript,react,frontend,performance", difficulty: "intermediate" },
  { language: "JavaScript/Node.js", feature: "role-based JWT authentication middleware", techStack: "Express and Redis", tags: "javascript,backend,auth,security", difficulty: "advanced" },
  { language: "SQL", feature: "e-commerce order database schema with deep joins", techStack: "PostgreSQL", tags: "sql,database,schema,ecommerce", difficulty: "intermediate" },
  { language: "YAML/Docker", feature: "automated pipeline containerization & push", techStack: "Docker and GitHub Actions", tags: "yaml,docker,devops,cicd", difficulty: "advanced" },
  { language: "Python", feature: "memory-leak troubleshooter and tracer tool", techStack: "Python and psutil", tags: "python,debugging,performance,diagnostics", difficulty: "advanced" },
  { language: "TypeScript", feature: "state management store with middleware logic", techStack: "Zustand and React", tags: "typescript,react,state-management", difficulty: "intermediate" },
  { language: "Go", feature: "concurrent web crawler with worker pool controls", techStack: "Go standard library", tags: "go,concurrency,crawler,networking", difficulty: "advanced" },
  { language: "TypeScript/Next.js", feature: "Next.js App Router API endpoint with Zod", techStack: "Next.js and Prisma", tags: "typescript,nextjs,api,backend", difficulty: "intermediate" },
  { language: "CSS", feature: "fully responsive CSS grid layout builder", techStack: "Vanilla CSS & Grid", tags: "css,frontend,responsive,layout", difficulty: "beginner" },
  { language: "Python/Pandas", feature: "automated CSV data analytics and cleaning script", techStack: "Python, Pandas, and NumPy", tags: "python,data-science,pandas,automation", difficulty: "intermediate" },
  { language: "TypeScript", feature: "secure stripe payment checkout webhook receiver", techStack: "Node.js, Express, and Stripe SDK", tags: "typescript,stripe,payment,backend", difficulty: "advanced" },
  { language: "Shell/Bash", feature: "directory backup and remote uploading automation", techStack: "Linux Bash and AWS CLI", tags: "bash,linux,automation,aws", difficulty: "beginner" },
  { language: "JSON/GraphQL", feature: "optimized GraphQL gateway schema design", techStack: "Apollo Server and GraphQL", tags: "graphql,api,schema,backend", difficulty: "advanced" },
  { language: "JavaScript", feature: "real-time interactive data chart visualizer", techStack: "HTML5 Canvas and D3.js", tags: "javascript,d3,charts,frontend", difficulty: "intermediate" },
  { language: "Python", feature: "automated web scraping engine with parser rules", techStack: "Python, BeautifulSoup, and Requests", tags: "python,web-scraping,crawler", difficulty: "intermediate" },
  { language: "YAML/Kubernetes", feature: "scalable microservices Kubernetes deployment config", techStack: "Kubernetes and Helm", tags: "yaml,kubernetes,devops,microservices", difficulty: "advanced" },
  { language: "Rust", feature: "safe concurrent file writing module", techStack: "Rust and tokio", tags: "rust,concurrency,tokio,advanced", difficulty: "advanced" },
  { language: "HTML/JS", feature: "accessible a11y keyboard navigation menu handler", techStack: "Vanilla JS and ARIA specs", tags: "html,javascript,accessibility,a11y", difficulty: "beginner" },
  { language: "TypeScript", feature: "Next.js Server Actions forms handler", techStack: "Next.js, React-Hook-Form, and Zod", tags: "typescript,nextjs,react,forms", difficulty: "intermediate" },
  { language: "Python/Django", feature: "REST API CRUD endpoints with token auth", techStack: "Django and Django REST Framework", tags: "python,django,api,backend", difficulty: "intermediate" },
  { language: "Java", feature: "Spring Boot OAuth2 social login router", techStack: "Java, Spring Boot, and Spring Security", tags: "java,springboot,auth,security", difficulty: "advanced" },
  { language: "C++", feature: "memory efficient custom vector container", techStack: "C++ standard library", tags: "cpp,memory,performance,data-structures", difficulty: "advanced" },
  { language: "Dart/Flutter", feature: "cross-platform local offline database system", techStack: "Flutter and Hive", tags: "flutter,dart,mobile,database", difficulty: "intermediate" },
  { language: "Swift", feature: "iOS dynamic view layout with API binder", techStack: "Swift, SwiftUI, and Combine", tags: "swift,ios,mobile,frontend", difficulty: "intermediate" },
  { language: "TypeScript", feature: "scalable WebSocket group chat server", techStack: "Node.js, ws library, and TypeScript", tags: "typescript,websocket,realtime,chat", difficulty: "advanced" },
  { language: "SQL/NoSQL", feature: "MongoDB large-scale aggregation pipelines", techStack: "MongoDB", tags: "nosql,mongodb,database,aggregation", difficulty: "intermediate" },
  { language: "JavaScript", feature: "Chrome extension tab manager & utility popup", techStack: "Chrome Extension V3 API", tags: "javascript,chrome-extension,utility", difficulty: "beginner" },
  { language: "TypeScript", feature: "custom Jest unit testing mocking factory", techStack: "Jest and Vitest", tags: "typescript,testing,jest,vitest", difficulty: "intermediate" },
  { language: "YAML", feature: "complete multi-stage GitLab CI runner config", techStack: "GitLab CI", tags: "yaml,devops,gitlab,cicd", difficulty: "advanced" },
  { language: "Python", feature: "serverless AWS Lambda background jobs handler", techStack: "AWS Lambda and serverless framework", tags: "python,aws,serverless,backend", difficulty: "intermediate" },
  { language: "TypeScript", feature: "custom component variance system styling", techStack: "React, Tailwind, and CVA", tags: "typescript,react,tailwind,css", difficulty: "intermediate" },
  { language: "JavaScript", feature: "robust custom event emitter & pub-sub pattern", techStack: "Vanilla JS", tags: "javascript,design-patterns,pubsub", difficulty: "beginner" },
  { language: "TypeScript", feature: "Next.js dynamic sitemap XML generation route", techStack: "Next.js App Router", tags: "typescript,nextjs,seo,sitemap", difficulty: "intermediate" },
  { language: "JSON", feature: "comprehensive OpenAPI v3 API endpoint specs", techStack: "OpenAPI Spec", tags: "json,api,documentation,openapi", difficulty: "beginner" },
  { language: "Python", feature: "fast image processing and watermarking worker", techStack: "Python and Pillow", tags: "python,images,automation,processing", difficulty: "beginner" },
  { language: "SQL", feature: "database vacuum and index health auto-analyzer", techStack: "PostgreSQL / MySQL", tags: "sql,database,maintenance,performance", difficulty: "advanced" },
  { language: "TypeScript", feature: "custom react-query server cache prefetching", techStack: "React Query and Next.js", tags: "typescript,react,nextjs,caching", difficulty: "intermediate" },
  { language: "Rust", feature: "blazing fast JSON parsing custom parser CLI", techStack: "Rust and serde", tags: "rust,serde,json,cli", difficulty: "advanced" },
  { language: "Kotlin", feature: "Android local background synchronization service", techStack: "Android SDK and WorkManager", tags: "kotlin,android,mobile,background", difficulty: "advanced" },
  { language: "JavaScript", feature: "secure CORS proxy express server configuration", techStack: "Node.js, Express, and cors middleware", tags: "javascript,express,cors,proxy", difficulty: "beginner" },
  { language: "TypeScript/NestJS", feature: "NestJS middleware request logger with correlation ID", techStack: "NestJS and Winston Logger", tags: "typescript,nestjs,logging,backend", difficulty: "intermediate" },
  { language: "Python", feature: "Machine Learning model hosting microservice API", techStack: "Python, FastAPI, and Uvicorn", tags: "python,fastapi,ml,api", difficulty: "intermediate" },
  { language: "YAML", feature: "automatic dependabot dependency version updater", techStack: "GitHub Dependabot", tags: "yaml,github,dependencies,security", difficulty: "beginner" },
  { language: "TypeScript", feature: "custom Cypress E2E visual regression testing", techStack: "Cypress and Percy", tags: "typescript,testing,cypress,e2e", difficulty: "intermediate" },
  { language: "SQL", feature: "complex nested recursive CTE hierarchy queries", techStack: "SQL Server / PostgreSQL", tags: "sql,queries,cte,recursive", difficulty: "advanced" },
  { language: "JavaScript", feature: "interactive custom markdown parser and editor", techStack: "React and marked library", tags: "javascript,react,markdown,editor", difficulty: "intermediate" },
  { language: "C#", feature: "ASP.NET Core REST API controller with EntityFramework", techStack: "C# / ASP.NET Core & EF Core", tags: "csharp,dotnet,api,database", difficulty: "intermediate" },
  { language: "TypeScript", feature: "reusable multi-step wizard form container", techStack: "React and Framer Motion", tags: "typescript,react,framer-motion,forms", difficulty: "intermediate" },
  { language: "Python", feature: "PDF report parsing & text extraction pipeline", techStack: "Python and PyPDF2", tags: "python,pdf,parsing,automation", difficulty: "beginner" },
  { language: "TypeScript", feature: "comprehensive custom logger utility", techStack: "Winston, TypeScript, and Node.js", tags: "typescript,logging,utility,backend", difficulty: "intermediate" }
]

const youtubeItems = [
  { topic: "How AI Coding Assistants will replace junior devs in 2026", audience: "junior developers and students", tags: "youtube,script,coding,tech,career", difficulty: "intermediate" },
  { topic: "My 4-Hour Work Day Routine as a Solopreneur", audience: "freelancers and aspiring entrepreneurs", tags: "youtube,script,productivity,routine", difficulty: "beginner" },
  { topic: "I Built a Startup in 24 Hours Using AI Tools", audience: "indie hackers and founders", tags: "youtube,titles,thumbnails,startup,ai", difficulty: "intermediate" },
  { topic: "The Dark Truth Behind Organic Fast Food Marketing", audience: "health-conscious adults", tags: "youtube,script,marketing,health,food", difficulty: "advanced" },
  { topic: "Top 10 Hidden Coding Features You Must Know", audience: "mid-level software engineers", tags: "youtube,seo,keywords,tags,coding", difficulty: "beginner" },
  { topic: "We Tested 5 E-commerce Business Models (Results)", audience: "aspiring store owners", tags: "youtube,titles,thumbnails,ecommerce", difficulty: "intermediate" },
  { topic: "Why You are Addicted to Social Media (Neurology)", audience: "general public and tech users", tags: "youtube,script,psychology,tech", difficulty: "advanced" },
  { topic: "The Complete 2026 Guide to Personal Finance", audience: "young professionals aged 20-30", tags: "youtube,seo,keywords,finance,money", difficulty: "beginner" },
  { topic: "How to Secure Brand Deals Under 5,000 Subscribers", audience: "micro-influencers and creators", tags: "youtube,brand-deal,sponsorship,pitch", difficulty: "intermediate" },
  { topic: "Python Automation for absolute beginners", audience: "non-technical professionals", tags: "youtube,script,shorts,automation,python", difficulty: "beginner" },
  { topic: "5 Red Flags in Your Software Architecture", audience: "senior developers and tech leads", tags: "youtube,titles,thumbnails,coding", difficulty: "intermediate" },
  { topic: "The Art of Slow Living in a Hyper-Fast World", audience: "stressed city professionals", tags: "youtube,script,mindfulness,routine", difficulty: "intermediate" },
  { topic: "Why standard advice about stocks is completely wrong", audience: "retail stock market investors", tags: "youtube,script,finance,investing", difficulty: "advanced" },
  { topic: "Ultimate Setup Tour: Minimalist Home Office 2026", audience: "tech enthusiasts and desk setup lovers", tags: "youtube,seo,keywords,setup,minimalist", difficulty: "beginner" },
  { topic: "Securing $10K B2B Client sponsorships", audience: "B2B SaaS founders & niche creators", tags: "youtube,sponsorship,brand-deal,saas", difficulty: "advanced" },
  { topic: "Unboxing the Future: Cybernetic VR headset", audience: "gamers and early adopters", tags: "youtube,script,tech,unboxing,gaming", difficulty: "beginner" },
  { topic: "The Ultimate Guide to Learning Rust this Year", audience: "aspiring systems programmers", tags: "youtube,script,coding,rust,learning", difficulty: "intermediate" },
  { topic: "Why I Quit My $200k FAANG Job to do nothing", audience: "tech industry workers", tags: "youtube,titles,thumbnails,career", difficulty: "intermediate" },
  { topic: "How to Edit Videos 3x Faster Using AI Tools", audience: "video editors and creators", tags: "youtube,script,shorts,video-editing,ai", difficulty: "beginner" },
  { topic: "Mastering the Art of Cold Outreach", audience: "freelancers and sales representatives", tags: "youtube,sponsorship,brand-deal,sales", difficulty: "intermediate" },
  { topic: "Exposing the biggest scam in online courses", audience: "students and self-learners", tags: "youtube,script,education,scam", difficulty: "advanced" },
  { topic: "A Day in the Life of a Solitary Forest Ranger", audience: "nature lovers and ASMR fans", tags: "youtube,script,vlog,asmr,nature", difficulty: "beginner" },
  { topic: "How to Build a Custom Keypad from Scratch", audience: "hardware hackers and mechanical keyboard fans", tags: "youtube,script,hardware,diy", difficulty: "intermediate" },
  { topic: "Uncovering the Ancient History of Alexandria library", audience: "history buffs and students", tags: "youtube,script,history,alexandria", difficulty: "intermediate" },
  { topic: "10 CSS Tricks that will blow your mind", audience: "front-end developers", tags: "youtube,seo,keywords,css,frontend", difficulty: "beginner" },
  { topic: "How the stock market actually works (Visual Guide)", audience: "complete financial beginners", tags: "youtube,script,finance,stock-market", difficulty: "beginner" },
  { topic: "The Psychology of viral thumbnail designs", audience: "creators and designers", tags: "youtube,titles,thumbnails,psychology", difficulty: "intermediate" },
  { topic: "I tried walking 20,000 steps everyday (Results)", audience: "fitness and health enthusiasts", tags: "youtube,script,fitness,challenge", difficulty: "beginner" },
  { topic: "Coding a mobile game in 48 hours", audience: "indie game developers", tags: "youtube,script,coding,gaming,indie", difficulty: "intermediate" },
  { topic: "Why remote work is actually dying in 2026", audience: "remote workers and corporate managers", tags: "youtube,titles,thumbnails,wfh", difficulty: "intermediate" },
  { topic: "Deep dive into ancient Roman concrete secrets", audience: "science and engineering lovers", tags: "youtube,script,science,engineering", difficulty: "advanced" },
  { topic: "How to build a passive income newsletter in 30 days", audience: "digital marketers and writers", tags: "youtube,seo,keywords,newsletter,marketing", difficulty: "beginner" },
  { topic: "The 10 biggest traps in real estate investing", audience: "aspiring property buyers", tags: "youtube,script,finance,real-estate", difficulty: "advanced" },
  { topic: "Creating a stunning 3D room design in Blender", audience: "3D artists and interior designers", tags: "youtube,script,blender,3d,design", difficulty: "intermediate" },
  { topic: "Is this the most powerful laptop in the world?", audience: "tech buyers and power users", tags: "youtube,titles,thumbnails,hardware", difficulty: "intermediate" },
  { topic: "Why every developer needs a personal brand", audience: "software engineers looking to grow", tags: "youtube,script,branding,career", difficulty: "beginner" },
  { topic: "How to write high-converting SaaS landing pages", audience: "copywriters and B2B founders", tags: "youtube,seo,keywords,copywriting,landing-page", difficulty: "beginner" },
  { topic: "The ultimate 7-day dopamine detox experiment", audience: "productivity and mental health enthusiasts", tags: "youtube,script,productivity,health", difficulty: "intermediate" },
  { topic: "A realistic roadmap to reach $10K/month freelancing", audience: "designers, developers, and writers", tags: "youtube,titles,thumbnails,freelancing", difficulty: "intermediate" },
  { topic: "How ancient Stoicism can solve modern anxiety", audience: "philosophy and self-improvement lovers", tags: "youtube,script,philosophy,anxiety", difficulty: "intermediate" },
  { topic: "We tested the top 5 AI image generators", audience: "designers and artists", tags: "youtube,script,midjourney,ai-art", difficulty: "beginner" },
  { topic: "Why most startups fail in the first 6 months", audience: "aspiring entrepreneurs", tags: "youtube,titles,thumbnails,startup", difficulty: "intermediate" },
  { topic: "An analytical study of the world's greatest chess games", audience: "chess players and strategic thinkers", tags: "youtube,script,chess,strategy", difficulty: "advanced" },
  { topic: "How to study product design from scratch", audience: "aspiring UI/UX designers", tags: "youtube,seo,keywords,design,ux", difficulty: "beginner" },
  { topic: "The complete guide to custom mechanical keyboards", audience: "tech hobbyists", tags: "youtube,titles,thumbnails,diy", difficulty: "beginner" },
  { topic: "Exposing the dark side of fast fashion logistics", audience: "sustainable lifestyle lovers", tags: "youtube,script,logistics,sustainability", difficulty: "advanced" },
  { topic: "How to build a SaaS startup without funding", audience: "bootstrappers and developers", tags: "youtube,sponsorship,brand-deal,bootstrap", difficulty: "advanced" },
  { topic: "The ultimate guide to home coffee brewing gear", audience: "coffee lovers and home baristas", tags: "youtube,script,coffee,setup", difficulty: "beginner" },
  { topic: "Why you are not learning code effectively", audience: "stuck programming students", tags: "youtube,script,coding,learning", difficulty: "intermediate" },
  { topic: "How to secure high paying freelance B2B clients", audience: "freelance writers and agencies", tags: "youtube,sponsorship,brand-deal,freelance", difficulty: "advanced" }
]

const businessItems = [
  { industry: "AI SaaS", businessModel: "B2B SaaS monthly subscription", role: "Lead Product Manager", contractType: "enterprise license agreement", tags: "business,saas,strategy,management", difficulty: "advanced" },
  { industry: "Sustainable Consumer Goods", businessModel: "DTC e-commerce", role: "Growth Marketing Director", contractType: "influencer marketing agreement", tags: "business,ecommerce,marketing", difficulty: "intermediate" },
  { industry: "Micro-Mobility Sharing", businessModel: "Usage-based hardware fleet", role: "Head of Operations", contractType: "city municipality permit", tags: "business,operations,logistics,mobility", difficulty: "advanced" },
  { industry: "EdTech Learning Platform", businessModel: "B2C annual membership", role: "Lead Instructional Designer", contractType: "instructor royalty agreement", tags: "business,edtech,education,curriculum", difficulty: "intermediate" },
  { industry: "Bioluminescent Landscaping", businessModel: "Direct-to-enterprise services", role: "Chief Scientific Officer", contractType: "commercial installation agreement", tags: "business,science,landscaping,enterprise", difficulty: "advanced" },
  { industry: "Digital Healthcare Curation", businessModel: "B2B2C telemedicine marketplace", role: "VP of Medical Relations", contractType: "HIPAA cloud host contract", tags: "business,healthcare,telemedicine,marketplace", difficulty: "advanced" },
  { industry: "Artisan Coffee Roasting", businessModel: "Hybrid retail & wholesale", role: "Master Coffee Roaster", contractType: "green coffee supply contract", tags: "business,coffee,retail,wholesale", difficulty: "beginner" },
  { industry: "Robotic Commercial Cleaning", businessModel: "Robot-as-a-Service (RaaS)", role: "Director of Fleet Sales", contractType: "commercial facilities service SLA", tags: "business,robotics,raas,sales", difficulty: "advanced" },
  { industry: "Cozy Glamping Curation", businessModel: "Eco-tourism resort bookings", role: "Hospitality Experience Director", contractType: "land lease agreement", tags: "business,travel,eco-tourism,hospitality", difficulty: "intermediate" },
  { industry: "Virtual Reality Workspace", businessModel: "Per-seat B2B SaaS", role: "VP of Product Design", contractType: "enterprise pilot contract", tags: "business,vr,saas,product", difficulty: "advanced" },
  { industry: "Organic Skincare DTC", businessModel: "Monthly wellness subscription box", role: "Sourcing & Logistics Director", contractType: "natural ingredient supply SLA", tags: "business,ecommerce,subscription,wellness", difficulty: "beginner" },
  { industry: "Web3 Digital Identity", businessModel: "Freemium developer API access", role: "Lead DevRel Advocate", contractType: "API developer terms of use", tags: "business,web3,api,devrel", difficulty: "intermediate" },
  { industry: "Boutique Fitness Franchising", businessModel: "Franchise royalties & fees", role: "Franchise Operations Director", contractType: "standard franchise agreement", tags: "business,fitness,franchise,operations", difficulty: "intermediate" },
  { industry: "Sustainable Packaging Manufacturing", businessModel: "High-volume B2B manufacturing", role: "Chief Sustainability Officer", contractType: "materials supply contract", tags: "business,manufacturing,packaging,sustainability", difficulty: "advanced" },
  { industry: "Mental Health Support App", businessModel: "B2C monthly membership", role: "Clinical Content Director", contractType: "therapist consultant contract", tags: "business,mental-health,app,wellness", difficulty: "beginner" },
  { industry: "Independent Film Production", businessModel: "Direct-to-streaming distribution", role: "Executive Film Producer", contractType: "streaming platform licensing deal", tags: "business,film,entertainment,streaming", difficulty: "intermediate" },
  { industry: "Vertical Farming Systems", businessModel: "Produce sales & farm setup fees", role: "Lead Agricultural Engineer", contractType: "supermarket produce supply deal", tags: "business,farming,agriculture,agritech", difficulty: "advanced" },
  { industry: "Mechanical Keyboard DTC", businessModel: "Custom builds & parts e-commerce", role: "Community Manager", contractType: "group buy supply contract", tags: "business,ecommerce,diy,keyboard", difficulty: "beginner" },
  { industry: "Space Science Tourism", businessModel: "High-ticket suborbital travel", role: "Director of Astronaut Safety", contractType: "liability waiver & ticket contract", tags: "business,space,tourism,high-ticket", difficulty: "advanced" },
  { industry: "Online Language Academy", businessModel: "1-on-1 tutoring sessions", role: "Academic Director", contractType: "tutor service contract", tags: "business,education,language,tutoring", difficulty: "intermediate" },
  { industry: "B2B SaaS Cybersecurity", businessModel: "Enterprise endpoint subscription", role: "Chief Information Security Officer", contractType: "enterprise master services agreement (MSA)", tags: "business,saas,cybersecurity,enterprise", difficulty: "advanced" },
  { industry: "Eco-Friendly Cleaning Products", businessModel: "DTC retail & wholesale subscription", role: "Brand Director", contractType: "retail distribution contract", tags: "business,marketing,retail,branding", difficulty: "beginner" },
  { industry: "Smart Home Tech Devices", businessModel: "Hardware sales with app SaaS", role: "Hardware Engineering Lead", contractType: "ODM manufacturer agreement", tags: "business,hardware,smarthome,saas", difficulty: "intermediate" },
  { industry: "Indie Game Studio", businessModel: "Digital console store purchases", role: "Lead Game Designer", contractType: "console publisher agreement", tags: "business,gaming,indie,publishing", difficulty: "intermediate" },
  { industry: "Local Courier Logistics", businessModel: "On-demand B2B delivery service", role: "Operations Dispatch Lead", contractType: "corporate delivery SLA", tags: "business,logistics,delivery,courier", difficulty: "beginner" },
  { industry: "Corporate Catering Services", businessModel: "Recurring office meal contracts", role: "Executive Head Chef", contractType: "corporate dining service contract", tags: "business,food,catering,corporate", difficulty: "beginner" },
  { industry: "Peer-to-Peer Car Sharing", businessModel: "Marketplace commission fees", role: "Director of Trust & Safety", contractType: "fleet insurance policy", tags: "business,marketplace,sharing-economy,cars", difficulty: "advanced" },
  { industry: "Renewable Energy Installation", businessModel: "Commercial solar installation lease", role: "Lead Energy Consultant", contractType: "commercial power purchase agreement (PPA)", tags: "business,energy,solar,commercial", difficulty: "advanced" },
  { industry: "Podcast Production Agency", businessModel: "Monthly editing & distribution retainers", role: "Lead Sound Engineer", contractType: "monthly client retainer contract", tags: "business,podcast,agency,retainer", difficulty: "beginner" },
  { industry: "AI Recruiting Software", businessModel: "Per-hire recruitment fee", role: "HR Tech Consultant", contractType: "recruiting platform subscription terms", tags: "business,hr,recruiting,ai", difficulty: "intermediate" },
  { industry: "Boutique Hotel Curation", businessModel: "Premium overnight bookings", role: "General Manager", contractType: "hotel management agreement", tags: "business,hotel,hospitality,tourism", difficulty: "intermediate" },
  { industry: "No-Code SaaS Builder Agency", businessModel: "Fixed-price sprint projects", role: "Lead No-Code Developer", contractType: "fixed-scope project proposal", tags: "business,agency,nocode,development", difficulty: "beginner" },
  { industry: "E-sports Arena Venues", businessModel: "Ticket sales & sponsors", role: "Events Director", contractType: "arena sponsorship contract", tags: "business,gaming,esports,events", difficulty: "intermediate" },
  { industry: "Alternative Milk Manufacturing", businessModel: "Wholesale retail grocery orders", role: "Food Safety Director", contractType: "grocery chain supply contract", tags: "business,food,wholesale,grocery", difficulty: "advanced" },
  { industry: "Cyberpunk Apparel DTC", businessModel: "Limited drop streetwear prints", role: "Lead Fashion Designer", contractType: "apparel contract manufacturer deal", tags: "business,fashion,streetwear,ecommerce", difficulty: "beginner" },
  { industry: "Corporate Wellness Platform", businessModel: "Enterprise per-employee SaaS", role: "Wellness Engagement Director", contractType: "corporate customer contract", tags: "business,wellness,saas,corporate", difficulty: "intermediate" },
  { industry: "Private Jet Bookings", businessModel: "Dynamic jet charter marketplace", role: "Director of Charter Sales", contractType: "private charter booking agreement", tags: "business,travel,high-ticket,aviation", difficulty: "advanced" },
  { industry: "Subscription Coffee Crate", businessModel: "Monthly exotic coffee beans box", role: "Head Coffee Buyer", contractType: "farm direct trade contract", tags: "business,coffee,subscription,ecommerce", difficulty: "beginner" },
  { industry: "Sustainable Construction Firm", businessModel: "Green building architectural builds", role: "Lead Green Architect", contractType: "commercial building contract", tags: "business,construction,green,architecture", difficulty: "advanced" },
  { industry: "Crypto Asset Management", businessModel: "Fund management performance fees", role: "Chief Investment Officer", contractType: "investor fund subscription agreement", tags: "business,crypto,investing,finance", difficulty: "advanced" },
  { industry: "Digital Art Marketplace", businessModel: "Transaction commission fees", role: "Art Curator Director", contractType: "artist licensing terms", tags: "business,art,marketplace,ecommerce", difficulty: "intermediate" },
  { industry: "Corporate Retreats Curation", businessModel: "High-ticket corporate offsites", role: "Chief Operations Officer", contractType: "venue master booking agreement", tags: "business,corporate,events,retreats", difficulty: "intermediate" },
  { industry: "Agritech IoT Devices", businessModel: "Soil monitoring sensor hardware + SaaS", role: "IoT Hardware Engineer", contractType: "OEM sensor supply contract", tags: "business,agritech,iot,hardware", difficulty: "advanced" },
  { industry: "Online Cooking School", businessModel: "Monthly video masterclasses membership", role: "Video Production Lead", contractType: "chef content licensing deal", tags: "business,education,cooking,membership", difficulty: "beginner" },
  { industry: "Micro-SaaS Portfolio Builder", businessModel: "Acquisition of micro-utilities", role: "M&A Investment Associate", contractType: "software asset purchase agreement (APA)", tags: "business,micro-saas,ma,acquisitions", difficulty: "advanced" },
  { industry: "Custom PC Building DTC", businessModel: "High-end bespoke gaming rigs", role: "PC Assembly Director", contractType: "wholesale component supply deal", tags: "business,hardware,ecommerce,gaming", difficulty: "beginner" },
  { industry: "Remote Team Collaboration App", businessModel: "Per-user monthly subscription SaaS", role: "VP of Product Strategy", contractType: "enterprise customer contract", tags: "business,saas,wfh,product", difficulty: "intermediate" },
  { industry: "Ocean Clean-up Tech", businessModel: "Plastic offset credits to corporations", role: "Director of Corporate Sales", contractType: "plastic credit offset contract", tags: "business,sustainability,ocean,credits", difficulty: "advanced" },
  { industry: "Organic Pet Food DTC", businessModel: "Monthly auto-ship pet supply", role: "Supply Chain Manager", contractType: "pet food manufacturing deal", tags: "business,ecommerce,pets,subscription", difficulty: "beginner" },
  { industry: "Low Code Workflow Integration", businessModel: "Enterprise migration consultant fee", role: "Lead Workflow Architect", contractType: "enterprise integration statement of work (SOW)", tags: "business,consulting,workflow,enterprise", difficulty: "advanced" }
]

const marketingItems = [
  { product: "FocusFlow, an AI-powered calendar and daily planner app", targetAudience: "overwhelmed remote workers and freelancers", tags: "marketing,landing-page,saas,productivity", difficulty: "intermediate" },
  { product: "GlowNature, a premium organic skincare bundle", targetAudience: "health-conscious women aged 25-45", tags: "marketing,email,ecommerce,wellness", difficulty: "beginner" },
  { product: "EcoClean, an eco-friendly laundry detergent sheets subscription", targetAudience: "environmentally conscious families", tags: "marketing,ads,facebook,google,subscription", difficulty: "beginner" },
  { product: "CodeQuest, an interactive gamified coding curriculum for kids", targetAudience: "forward-thinking parents and home-school educators", tags: "marketing,influencer,edtech,education", difficulty: "intermediate" },
  { product: "AgileSprint, enterprise workflow consulting services", targetAudience: "corporate CTOs and VPs of Engineering", tags: "marketing,seo,b2b,consulting", difficulty: "advanced" },
  { product: "FitTrack, a hybrid fitness smart ring and tracking app", targetAudience: "biohackers and performance athletes", tags: "marketing,landing-page,hardware,fitness", difficulty: "advanced" },
  { product: "MindRest, a guided meditation and sleep sounds device", targetAudience: "stressed city professionals and insomniacs", tags: "marketing,email,wellness,device", difficulty: "intermediate" },
  { product: "QuickBooks Integration, a micro-SaaS invoicing connector", targetAudience: "small business accountants and freelancers", tags: "marketing,seo,saas,utility", difficulty: "beginner" },
  { product: "ChefBox, a premium meal prep ingredients delivery service", targetAudience: "busy working couples and amateur foodies", tags: "marketing,ads,facebook,food,delivery", difficulty: "intermediate" },
  { product: "CryptoVault, a secure hardware cold storage cryptocurrency wallet", targetAudience: "active crypto investors and web3 developers", tags: "marketing,landing-page,crypto,security", difficulty: "advanced" },
  { product: "TutorLink, a marketplace connecting students with vetted language tutors", targetAudience: "parents of high school students and adult learners", tags: "marketing,influencer,marketplace,language", difficulty: "intermediate" },
  { product: "AgriSensor, an IoT smart sensor for commercial crop farming", targetAudience: "commercial farm owners and agronomists", tags: "marketing,seo,agritech,iot", difficulty: "advanced" },
  { product: "CleanAir, a premium smart home air purifier device", targetAudience: "allergy sufferers and urban apartment dwellers", tags: "marketing,email,hardware,smarthome", difficulty: "beginner" },
  { product: "VaporStyle, limited edition retro-synthwave graphic streetwear", targetAudience: "gaming community and fashion forward Gen Z", tags: "marketing,ads,instagram,fashion", difficulty: "beginner" },
  { product: "DesignPro, a Figma-based collaborative product mockup dashboard", targetAudience: "design agency directors and product managers", tags: "marketing,landing-page,figma,design", difficulty: "intermediate" },
  { product: "PetSnack, custom organic diet meals auto-ship box for dogs", targetAudience: "wealthy pet owners and dog lovers", tags: "marketing,email,pets,subscription", difficulty: "beginner" },
  { product: "GreenBuild, sustainable commercial roofing installation services", targetAudience: "commercial real estate managers and eco-conscious builders", tags: "marketing,seo,construction,green", difficulty: "advanced" },
  { product: "PodcastMic, professional studio broadcast microphone kit", targetAudience: "aspiring podcasters and content creators", tags: "marketing,ads,podcast,creator-tools", difficulty: "intermediate" },
  { product: "LegalAI, an automated SaaS contract reviewer assistant", targetAudience: "in-house corporate lawyers and busy startup founders", tags: "marketing,landing-page,ai,legaltech", difficulty: "advanced" },
  { product: "LearnRust, a premium interactive self-paced coding course", targetAudience: "mid-level software developers wanting to learn systems programming", tags: "marketing,email,coding,rust,education", difficulty: "intermediate" },
  { product: "HotelZen, dynamic occupancy optimization software for boutique hotels", targetAudience: "independent hotel owners and resort managers", tags: "marketing,seo,hotel,saas", difficulty: "advanced" },
  { product: "NoCodeSprints, a custom no-code web development agency sprint", targetAudience: "non-technical entrepreneurs launching MVPs", tags: "marketing,ads,nocode,agency", difficulty: "beginner" },
  { product: "BrewPerfect, a premium temperature-controlled smart coffee brewer", targetAudience: "home baristas and specialty coffee geeks", tags: "marketing,influencer,coffee,hardware", difficulty: "intermediate" },
  { product: "EduQuest, online homeschool curriculum licensing for institutions", targetAudience: "private school administrators and homeschool network leads", tags: "marketing,landing-page,education,b2b", difficulty: "intermediate" },
  { product: "B2BCyber, corporate endpoint network security monitoring", targetAudience: "enterprise CISOs and IT security managers", tags: "marketing,email,cybersecurity,enterprise", difficulty: "advanced" },
  { product: "GlampLux, booking platform for luxury eco-retreats", targetAudience: "millennial weekend travelers looking for digital detoxes", tags: "marketing,seo,travel,luxury", difficulty: "beginner" },
  { product: "SoilMonitor, agritech soil moisture sensor hardware package", targetAudience: "vineyard operators and precision farmers", tags: "marketing,ads,agritech,iot", difficulty: "advanced" },
  { product: "SoundMaster, dynamic cloud-based podcast mastering dashboard", targetAudience: "indie podcast hosts and sound editors", tags: "marketing,landing-page,podcast,audio", difficulty: "intermediate" },
  { product: "RecruitAI, automated matching recruiter matching platform", targetAudience: "HR directors at scaling mid-market companies", tags: "marketing,email,hr,recruiting", difficulty: "intermediate" },
  { product: "KeyArtisan, custom bespoke hand-crafted mechanical keycaps", targetAudience: "mechanical keyboard enthusiasts", tags: "marketing,seo,keyboard,diy", difficulty: "beginner" },
  { product: "StreetHeat, limited run cyberpunk printed windbreakers", targetAudience: "streetwear collectors and cyber-culture enthusiasts", tags: "marketing,influencer,fashion,streetwear", difficulty: "beginner" },
  { product: "WellnessCorporate, recurring employee mental health benefit plan", targetAudience: "people operations managers at tech companies", tags: "marketing,landing-page,corporate,wellness", difficulty: "intermediate" },
  { product: "JetCharter, premium private flight on-demand booking app", targetAudience: "high net worth executives and business travelers", tags: "marketing,email,travel,high-ticket", difficulty: "advanced" },
  { product: "ExoticCrate, monthly curated whole bean direct-trade coffee box", targetAudience: "coffee lovers looking for rare international origins", tags: "marketing,ads,coffee,subscription", difficulty: "beginner" },
  { product: "GreenArchitects, commercial building energy efficiency designs", targetAudience: "real estate developers building eco-friendly complexes", tags: "marketing,seo,architecture,sustainability", difficulty: "advanced" },
  { product: "CryptoPortfolio, algorithmic crypto fund performance manager", targetAudience: "high net worth crypto investors", tags: "marketing,landing-page,crypto,finance", difficulty: "advanced" },
  { product: "ArtGalleryOnline, platform for selling high-end digital paintings", targetAudience: "contemporary art collectors and interior designers", tags: "marketing,email,art,marketplace", difficulty: "intermediate" },
  { product: "RetreatsPlanner, custom high-end corporate leadership offsites", targetAudience: "HR executives and executive assistants", tags: "marketing,seo,corporate,events", difficulty: "intermediate" },
  { product: "AgriSoil, smart farming nitrogen sensor hardware package", targetAudience: "precision organic farm operators", tags: "marketing,ads,agritech,sensor", difficulty: "advanced" },
  { product: "CookMaster, dynamic interactive virtual chef masterclasses", targetAudience: "hobby home cooks looking to learn advanced French techniques", tags: "marketing,influencer,education,cooking", difficulty: "beginner" },
  { product: "MicroSaaSAPA, automated software asset acquisition legal pack", targetAudience: "indie hackers acquiring or selling micro-runtimes", tags: "marketing,landing-page,micro-saas,legal", difficulty: "advanced" },
  { product: "CustomRigs, premium liquid-cooled custom mechanical gaming PCs", targetAudience: "hardcore PC gamers and competitive streamers", tags: "marketing,email,hardware,gaming", difficulty: "beginner" },
  { product: "CollaborateApp, per-seat remote team communication software", targetAudience: "remote startup operations managers and team leads", tags: "marketing,seo,saas,wfh", difficulty: "intermediate" },
  { product: "OceanCredits, corporate plastic waste offset credit subscription", targetAudience: "corporate CSR directors and ESG executives", tags: "marketing,ads,sustainability,ocean", difficulty: "advanced" },
  { product: "PetDailyBox, dynamic customized auto-ship pet supply crate", targetAudience: "dog and cat owners looking for premium nutrition", tags: "marketing,landing-page,pets,subscription", difficulty: "beginner" },
  { product: "LowCodeConsult, enterprise workflow low-code migration consulting", targetAudience: "operations directors at mid-market companies", tags: "marketing,email,consulting,workflow", difficulty: "advanced" },
  { product: "SmartPurifier, connected HEPA home air filtering device", targetAudience: "eco-conscious city parents", tags: "marketing,seo,hardware,smarthome", difficulty: "beginner" },
  { product: "FigmaKit, ready-to-use B2B SaaS landing page Figma design kit", targetAudience: "freelance web designers and early stage founders", tags: "marketing,ads,figma,design", difficulty: "beginner" },
  { product: "AgileCoaching, professional team scrum master training", targetAudience: "agile coaches and project managers", tags: "marketing,influencer,consulting,agile", difficulty: "intermediate" },
  { product: "StripeHook, ready-to-deploy secure microservices stripe connector", targetAudience: "nextjs/react backend developers looking for checkout integration", tags: "marketing,landing-page,stripe,development", difficulty: "advanced" }
]

const productivityItems = [
  { role: "Lead Software Architect", priorities: "shipping a React app, managing a team of 8, and studying system design", projectGoal: "launch a mobile app in 90 days", systemType: "Agile/Scrum", tags: "productivity,coding,scrum,management", difficulty: "advanced" },
  { role: "Full-time Content Creator", priorities: "writing 3 weekly newsletters, recording 2 podcasts, and maintaining physical health", projectGoal: "launch a paid community platform", systemType: "Time-Boxing & Notion", tags: "productivity,creator,notion,time-boxing", difficulty: "intermediate" },
  { role: "Solo Bootstrapped Founder", priorities: "handling customer support, writing code, and running social media ads", projectGoal: "achieve $10k/month MRR", systemType: "Kanban & Pomodoro", tags: "productivity,solopreneur,kanban,pomodoro", difficulty: "intermediate" },
  { role: "Overwhelmed Remote Manager", priorities: "coordinating 15 distributed workers, alignment meetings, and daily reporting", projectGoal: "reduce weekly meetings by 40%", systemType: "Async-First Workflow", tags: "productivity,management,remote,wfh", difficulty: "advanced" },
  { role: "Medical School Student", priorities: "studying 8 hours a day, memorizing anatomy, and clinical rotations", projectGoal: "pass the final board exams with top scores", systemType: "Active Recall & Anki", tags: "productivity,study,learning,medical", difficulty: "beginner" },
  { role: "Freelance Graphic Designer", priorities: "managing 5 active client projects, portfolio updates, and cold pitching", projectGoal: "double average project value", systemType: "Time-Blocking & Client Portals", tags: "productivity,design,freelance,time-blocking", difficulty: "intermediate" },
  { role: "Bestselling Fiction Novelist", priorities: "writing 2,000 words a day, novel editing, and running a newsletter", projectGoal: "finish the first draft in 60 days", systemType: "The Snowflake Method & Scrivener", tags: "productivity,writing,novel,habits", difficulty: "intermediate" },
  { role: "Agile Marketing Director", priorities: "running 3 concurrent ad campaigns, content scheduling, and ROI reporting", projectGoal: "increase lead generation by 50%", systemType: "Agile Marketing Sprints", tags: "productivity,marketing,scrum,sprints", difficulty: "advanced" },
  { role: "High-Ticket Real Estate Agent", priorities: "property viewing tours, client negotiations, and cold calling leads", projectGoal: "close 5 premium listings this quarter", systemType: "Time-Blocking & CRM Pipeline", tags: "productivity,sales,real-estate,crm", difficulty: "intermediate" },
  { role: "Executive Assistant", priorities: "calendar scheduling, inbox triage, flight bookings, and meeting minutes", projectGoal: "achieve absolute inbox zero daily", systemType: "The 4D Method & Inbox Zero", tags: "productivity,admin,inbox-zero,organization", difficulty: "beginner" },
  { role: "Boutique Fitness Founder", priorities: "teaching 10 weekly classes, payroll, marketing campaigns, and site cleanups", projectGoal: "open a second fitness location", systemType: "Standard Operating Procedures (SOPs)", tags: "productivity,fitness,business,sop", difficulty: "intermediate" },
  { role: "Space Science Researcher", priorities: "analyzing planetary telemetry datasets, grant writing, and academic peer review", projectGoal: "publish 3 papers in scientific journals", systemType: "Personal Knowledge Management (PKM)", tags: "productivity,science,research,pkm", difficulty: "advanced" },
  { role: "Online Language Tutor", priorities: "teaching 30 hours of live sessions, lesson planning, and student grading", projectGoal: "maintain a 98% positive student rating", systemType: "Template-Based Lesson Planning", tags: "productivity,teaching,language,templates", difficulty: "beginner" },
  { role: "Corporate CISO", priorities: "overseeing network audits, vulnerability scanning, and employee security training", projectGoal: "achieve ISO 27001 security compliance", systemType: "Security Sprint & Auditing", tags: "productivity,security,compliance,corporate", difficulty: "advanced" },
  { role: "Local Restaurant General Manager", priorities: "staff scheduling, inventory ordering, customer reviews, and kitchen quality checks", projectGoal: "reduce weekly food waste cost by 25%", systemType: "Inventory Batch Checklists", tags: "productivity,food,retail,management", difficulty: "beginner" },
  { role: "E-commerce Operations Manager", priorities: "supplier communication, order fulfillment, shipping logs, and tax prep", projectGoal: "reduce average shipping duration by 2 days", systemType: "Automated ERP Pipelines", tags: "productivity,ecommerce,logistics,operations", difficulty: "intermediate" },
  { role: "Sustainable Architect", priorities: "drawing 3D structural blueprints, site evaluations, and green code filings", projectGoal: "obtain LEED Gold certification on current build", systemType: "BIM Integrated Workflow", tags: "productivity,construction,green,architecture", difficulty: "advanced" },
  { role: "Indie Game Developer", priorities: "coding C# gameplay logic, drawing voxel sprites, and fixing bug trackers", projectGoal: "release a playable game demo on Steam", systemType: "Voxel Asset Sprites Board", tags: "productivity,gaming,indie,development", difficulty: "intermediate" },
  { role: "B2B SaaS Chief Operations Officer", priorities: "resolving inter-department blockers, legal contract reviews, and budget metrics", projectGoal: "transition company to a four-day work week", systemType: "The 4-Day Work Week Protocol", tags: "productivity,saas,operations,corporate", difficulty: "advanced" },
  { role: "Amateur Home Baker", priorities: "flour sourcing, recipe scaling, kneading schedules, and temperature control logs", projectGoal: "bake 10 flawless sourdough loaves weekly", systemType: "Sourdough Fermentation Timers", tags: "productivity,hobbies,baking,cooking", difficulty: "beginner" },
  { role: "Sustainable Fashion Designer", priorities: "fabric sketching, sewing trial runs, supplier coordination, and runway prep", projectGoal: "launch a 12-piece eco-streetwear capsule", systemType: "Fashion Production Line Kanban", tags: "productivity,fashion,design,streetwear", difficulty: "intermediate" },
  { role: "Remote Executive Assistant", priorities: "managing CEO calendars, email inbox triage, and Slack communications", projectGoal: "reduce CEO email response time to under 1 hour", systemType: "The 4D Method & Inbox Zero", tags: "productivity,remote,wfh,assistant", difficulty: "beginner" },
  { role: "Precision Crop Agronomist", priorities: "analyzing soil telemetry charts, drone flight mapping, and pesticide schedules", projectGoal: "increase seasonal farm yield by 15%", systemType: "Agritech telemetry mapping", tags: "productivity,agritech,agriculture,operations", difficulty: "advanced" },
  { role: "Sound Production Engineer", priorities: "editing sound files, leveling tracks, and preparing podcast show notes", projectGoal: "reduce podcast editing cycle by 3 hours", systemType: "Podcast editing chain presets", tags: "productivity,podcast,audio,engineering", difficulty: "beginner" },
  { role: "Venture Capital Partner", priorities: "meeting 5 startup founders daily, investment thesis research, and board updates", projectGoal: "close 3 new seed-stage investments", systemType: "Deal Flow Pipeline CRM", tags: "productivity,investing,finance,vc", difficulty: "advanced" },
  { role: "No-Code Agency Lead Developer", priorities: "building 3 Bubble MVPs, client check-in calls, and scoping new sprints", projectGoal: "reduce project delivery time by 1 week", systemType: "No-code atomic templates system", tags: "productivity,nocode,agency,development", difficulty: "beginner" },
  { role: "Micro-SaaS Solopreneur", priorities: "shipping features, marketing on X/Twitter, and fixing customer bugs", projectGoal: "launch 3 micro-utilities in 90 days", systemType: "Lean micro-features roadmap", tags: "productivity,micro-saas,indie-hackers,startup", difficulty: "intermediate" },
  { role: "Professional Esports Coach", priorities: "reviewing game VODs, team strategy drafts, and player fatigue tracking", projectGoal: "win the regional esports tournament championship", systemType: "Esports VOD review boards", tags: "productivity,gaming,esports,coaching", difficulty: "intermediate" },
  { role: "Specialty Whole Bean Roaster", priorities: "sourcing green beans, roasting log telemetry, and wholesale shipping logs", projectGoal: "roast and ship 500 lbs of whole beans weekly", systemType: "Roasting profile logging sheets", tags: "productivity,coffee,retail,wholesale", difficulty: "beginner" },
  { role: "DTC Streetwear Apparel Designer", priorities: "custom streetwear sketches, factory tech packs, and drop marketing", projectGoal: "launch the spring limited drop streetwear line", systemType: "Tech pack production pipeline", tags: "productivity,fashion,clothing,manufacturing", difficulty: "intermediate" },
  { role: "Lead Deep Work Consultant", priorities: "coaching executives, conducting corporate workflow audits, and writing guides", projectGoal: "help 10 corporations adopt deep work cultures", systemType: "Deep Work audit scorecards", tags: "productivity,deep-work,consulting,corporate", difficulty: "advanced" },
  { role: "Sustainable Commercial Architect", priorities: "drawing LEED blueprints, energy efficiency maps, and structural reports", projectGoal: "achieve complete zero-emission architectural specs", systemType: "BIM building energy mappings", tags: "productivity,architecture,green,construction", difficulty: "advanced" },
  { role: "Independent Filmmaker", priorities: "writing script treatments, casting actors, scouting sites, and editing clips", projectGoal: "finish production on a 15-minute indie short", systemType: "Scenewise production scheduling", tags: "productivity,film,creator,movies", difficulty: "intermediate" },
  { role: "Home Barista Specialist", priorities: "grinder dialing logs, espresso extraction charts, and milk frothing logs", projectGoal: "dial in a flawless espresso pull in under 5 min", systemType: "Espresso extraction dialing log", tags: "productivity,coffee,setup,diy", difficulty: "beginner" },
  { role: "B2B SaaS Security Lead", priorities: "configuring SSO routers, writing pen-test reports, and security audits", projectGoal: "pass the upcoming SOC 2 Type II audit", systemType: "SOC 2 compliance roadmap", tags: "productivity,security,compliance,saas", difficulty: "advanced" },
  { role: "Homeschool Lead Parent", priorities: "curating lesson plans, teaching 3 kids, tracking state grades, and activities", projectGoal: "complete the full grade curriculum by May", systemType: "Homeschooling modular planning", tags: "productivity,education,homeschool,parenting", difficulty: "beginner" },
  { role: "Agile Project Coordinator", priorities: "updating Jira tickets, daily standups, and retrospective reports", projectGoal: "improve sprint velocity metric by 20%", systemType: "Jira Sprint Velocity Board", tags: "productivity,agile,scrum,jira", difficulty: "intermediate" },
  { role: "Organic Pet Food Logistics Director", priorities: "ingredient sourcing, factory audits, and regional delivery routing", projectGoal: "reduce pet supply shipping costs by 15%", systemType: "Supply chain ERP integrations", tags: "productivity,logistics,pets,ecommerce", difficulty: "intermediate" },
  { role: "Low Code Workflow Specialist", priorities: "mapping legacy systems, building Make.com automations, and training staff", projectGoal: "automate 10 hours of weekly manual reporting", systemType: "Low-code integration blueprints", tags: "productivity,nocode,workflow,automation", difficulty: "advanced" },
  { role: "Connected HEPA Purifier Designer", priorities: "drawing hardware CAD models, testing filter air flow, and smart app logs", projectGoal: "finalize the smart HEPA filter hardware prototype", systemType: "Hardware prototyping milestones", tags: "productivity,hardware,engineering,smarthome", difficulty: "advanced" },
  { role: "Figma B2B SaaS Design Creator", priorities: "building Figma UI design systems, template components, and layouts", projectGoal: "ship a 150-component B2B SaaS design system library", systemType: "Figma Design system token specs", tags: "productivity,design,figma,uiux", difficulty: "beginner" },
  { role: "Agile Sprint Coach", priorities: "running corporate workshops, teaching agile frameworks, and team audits", projectGoal: "train 5 engineering teams in advanced scrum", systemType: "Agile training roadmap Sprints", tags: "productivity,agile,consulting,training", difficulty: "intermediate" },
  { role: "Secure Checkout Architect", priorities: "integrating stripe APIs, writing custom webhook code, and payment logs", projectGoal: "achieve zero payment checkout routing errors", systemType: "Stripe payment routing schemas", tags: "productivity,development,stripe,payment", difficulty: "advanced" },
  { role: "Ocean Trash Offset Director", priorities: "auditing trash recovery, corporate sales calls, and credit tracking", projectGoal: "secure 5 corporate plastic offset credit retainers", systemType: "B2B ESG corporate sales pipeline", tags: "productivity,sustainability,ocean,credits", difficulty: "advanced" },
  { role: "DTC Pet Supply Sourcing Lead", priorities: "auditing product suppliers, custom order tracking, and freight logs", projectGoal: "onboard 3 local pet product manufacturers", systemType: "Supplier sourcing audit boards", tags: "productivity,sustainability,pets,sourcing", difficulty: "beginner" },
  { role: "Corporate Wellness Coach", priorities: "creating corporate health routines, host webinars, and client checkins", projectGoal: "achieve a 90% customer wellness program retention", systemType: "Wellness routine trackers", tags: "productivity,wellness,corporate,routines", difficulty: "beginner" },
  { role: "Private Charter Broker", priorities: "handling booking inquiries, tail number matching, and luxury custom requests", projectGoal: "book 10 luxury private flights this month", systemType: "Private charter CRM sales boards", tags: "productivity,travel,sales,high-ticket", difficulty: "advanced" },
  { role: "Specialty Coffee Green Buyer", priorities: "tasting green bean samples, direct trade pricing logs, and custom imports", projectGoal: "secure direct trade contracts with 5 coffee farms", systemType: "Coffee direct trade logs", tags: "productivity,coffee,sourcing,agriculture", difficulty: "beginner" },
  { role: "Zero-Emission Building Architect", priorities: "drafting energy efficiency maps, sustainable building codes, and files", projectGoal: "pass 3 commercial building zero-emission audits", systemType: "Zero-emission architectural guidelines", tags: "productivity,architecture,green,sustainability", difficulty: "advanced" },
  { role: "B2B SaaS SOC 2 Auditor", priorities: "auditing database logs, reviewing employee security logs, and report writing", projectGoal: "publish a clean SOC 2 Type II compliance audit report", systemType: "SOC 2 Type II audit checklist", tags: "productivity,security,compliance,audit", difficulty: "advanced" }
]

const socialMediaItems = [
  { topic: "How AI tools can save remote workers 20 hours a week", audience: "modern remote workers and tech enthusiast freelancers", tags: "social-media,ai,remote,wfh", difficulty: "intermediate" },
  { topic: "Hidden eco-friendly travel destinations for 2026", audience: "budget conscious eco-travelers and adventurers", tags: "social-media,travel,eco-friendly,sustainability", difficulty: "intermediate" },
  { topic: "Why standard financial advice about savings is totally wrong", audience: "young adults looking to build real wealth", tags: "social-media,finance,savings,wealth", difficulty: "intermediate" },
  { topic: "The 4-hour workday experiment (Complete Results)", audience: "overworked corporate employees and freelancers", tags: "social-media,productivity,routine,experiment", difficulty: "beginner" },
  { topic: "I built a profitable micro-SaaS in 24 hours (Here is how)", audience: "indie hackers, coders, and makers", tags: "social-media,startup,saas,indie-hackers", difficulty: "advanced" },
  { topic: "Why your brain is addicted to scrolling (The neurology)", audience: "social media users looking to build better habits", tags: "social-media,psychology,habits,neurology", difficulty: "intermediate" },
  { topic: "Why every programmer needs a personal brand in 2026", audience: "software engineers looking to stand out in the job market", tags: "social-media,coding,branding,career", difficulty: "beginner" },
  { topic: "How to edit professional videos using only free AI tools", audience: "content creators, editors, and marketers", tags: "social-media,video-editing,ai-tools,creators", difficulty: "beginner" },
  { topic: "The dark truth behind fast fashion supply chains", audience: "conscious shoppers and environmental activists", tags: "social-media,fashion,sustainability,logistics", difficulty: "advanced" },
  { topic: "How to launch a paid private newsletter in 30 days", audience: "writers, bloggers, and digital marketers", tags: "social-media,newsletter,writing,marketing", difficulty: "intermediate" },
  { topic: "Why remote work is actually dying this year", audience: "remote workers and corporate managers", tags: "social-media,wfh,career,business", difficulty: "intermediate" },
  { topic: "A realistic roadmap to reach $10k/month freelancing", audience: "freelance designers, writers, and developers", tags: "social-media,freelance,sales,finance", difficulty: "intermediate" },
  { topic: "How ancient Stoicism solved my modern burnout", audience: "stressed professionals looking for mental models", tags: "social-media,stoicism,philosophy,mindfulness", difficulty: "beginner" },
  { topic: "We tested the top 5 AI image generators (Results)", audience: "designers, artists, and creators", tags: "social-media,midjourney,ai-art,design", difficulty: "beginner" },
  { topic: "Why 90% of startups fail in the first 6 months", audience: "aspiring entrepreneurs and founders", tags: "social-media,startup,business,lessons", difficulty: "intermediate" },
  { topic: "An analytical breakdown of the greatest chess games in history", audience: "chess players and strategic thinkers", tags: "social-media,chess,strategy,analysis", difficulty: "advanced" },
  { topic: "How to learn product design from scratch (No degree)", audience: "aspiring UI/UX designers looking to build a portfolio", tags: "social-media,design,uiux,learning", difficulty: "beginner" },
  { topic: "The ultimate guide to building custom mechanical keyboards", audience: "mechanical keyboard fans and tech hobbyists", tags: "social-media,diy,keyboard,setup", difficulty: "beginner" },
  { topic: "How to build a SaaS startup without a single dollar of funding", audience: "bootstrappers, builders, and coders", tags: "social-media,saas,bootstrap,funding", difficulty: "advanced" },
  { topic: "The ultimate guide to brewing professional espresso at home", audience: "coffee lovers and home baristas", tags: "social-media,coffee,diy,setup", difficulty: "beginner" },
  { topic: "Why your current method of learning code is failing you", audience: "stuck programming students and self-learners", tags: "social-media,coding,education,learning", difficulty: "intermediate" },
  { topic: "How to pitch and secure high paying B2B freelance clients", audience: "freelancers, writers, and designers", tags: "social-media,freelance,sales,b2b", difficulty: "advanced" },
  { topic: "The 10 biggest traps in real estate investing (Exposed)", audience: "young professionals looking to buy property", tags: "social-media,finance,real-estate,investing", difficulty: "advanced" },
  { topic: "How to create beautiful 3D isometric room art in Blender", audience: "3D modelers and digital designers", tags: "social-media,blender,3d,art", difficulty: "intermediate" },
  { topic: "Is this the absolute most powerful laptop in the world?", audience: "tech enthusiasts and hardware geeks", tags: "social-media,hardware,tech,reviews", difficulty: "beginner" },
  { topic: "Why modern architecture has lost its soul (And how to fix it)", audience: "design and architecture lovers", tags: "social-media,design,architecture,history", difficulty: "intermediate" },
  { topic: "How to write email subject lines with a 50% open rate", audience: "email marketers, founders, and sales reps", tags: "social-media,email,copywriting,marketing", difficulty: "beginner" },
  { topic: "My complete 7-day digital dopamine detox guide", audience: "unfocused workers looking to reclaim their attention span", tags: "social-media,productivity,focus,health", difficulty: "intermediate" },
  { topic: "Exposing the biggest scams in modern online education", audience: "students and self-directed learners", tags: "social-media,education,scams,critical-thinking", difficulty: "advanced" },
  { topic: "A day in the life of a solitary forest ranger (ASMR)", audience: "nature lovers and quiet seekers", tags: "social-media,asmr,nature,lifestyle", difficulty: "beginner" },
  { topic: "Why most creators fail to hit 100k subscribers on YouTube", audience: "aspiring creators and video editors", tags: "social-media,youtube,creators,growth", difficulty: "intermediate" },
  { topic: "The science of building standard daily routines that stick", audience: "people looking to optimize their daily schedule", tags: "social-media,habits,routine,psychology", difficulty: "beginner" },
  { topic: "How to build a passive income newsletter in 30 days", audience: "writers, creators, and digital marketers", tags: "social-media,newsletter,writing,monetization", difficulty: "beginner" },
  { topic: "The 10 biggest mistakes B2B startups make on social media", audience: "marketing directors at B2B companies", tags: "social-media,b2b,marketing,strategy", difficulty: "intermediate" },
  { topic: "The psychology of highly clickable YouTube thumbnails", audience: "creators, graphic designers, and marketers", tags: "social-media,youtube,design,psychology", difficulty: "intermediate" },
  { topic: "I tried walking 20,000 steps every day for 30 days (Results)", audience: "health, fitness, and lifestyle enthusiasts", tags: "social-media,fitness,health,challenge", difficulty: "beginner" },
  { topic: "Coding a professional 2D mobile game in 48 hours", audience: "indie game developers and coders", tags: "social-media,gaming,indie,development", difficulty: "intermediate" },
  { topic: "Deep dive into the material secrets of ancient Roman concrete", audience: "engineering and history nerds", tags: "social-media,science,engineering,history", difficulty: "advanced" },
  { topic: "How to build a SaaS startup without VC funding", audience: "bootstrappers and indie creators", tags: "social-media,saas,bootstrap,funding", difficulty: "advanced" },
  { topic: "The ultimate guide to starting a successful podcast", audience: "aspiring podcasters and creators", tags: "social-media,podcast,setup,creators", difficulty: "beginner" },
  { topic: "How to write landing page copy that converts like crazy", audience: "copywriters, SaaS founders, and marketers", tags: "social-media,copywriting,landing-page,conversion", difficulty: "beginner" },
  { topic: "The 7-day productivity challenge for remote workers", audience: "remote employees looking to boost output", tags: "social-media,productivity,wfh,challenge", difficulty: "intermediate" },
  { topic: "A realistic roadmap to reach $10k/month freelancing", audience: "aspiring freelancers, designers, and developers", tags: "social-media,freelance,sales,career", difficulty: "intermediate" },
  { topic: "How ancient Stoic mental models can solve modern anxiety", audience: "philosophy, wellness, and self-improvement lovers", tags: "social-media,stoicism,philosophy,anxiety", difficulty: "intermediate" },
  { topic: "We tested the top 5 AI image generators for designers", audience: "designers, illustrators, and agency owners", tags: "social-media,midjourney,ai-art,design", difficulty: "beginner" },
  { topic: "Why 90% of SaaS startups fail in the first year", audience: "founders and bootstrappers", tags: "social-media,startup,saas,business", difficulty: "intermediate" },
  { topic: "An analytical study of the world's most brilliant chess matches", audience: "chess players and strategic thinkers", tags: "social-media,chess,strategy,analysis", difficulty: "advanced" },
  { topic: "How to study product UI/UX design from scratch", audience: "students and career changers", tags: "social-media,design,uiux,learning", difficulty: "beginner" },
  { topic: "The ultimate guide to building custom mechanical keyboard setups", audience: "keyboard hobbyists and desk setup lovers", tags: "social-media,diy,keyboard,desk-setup", difficulty: "beginner" },
  { topic: "Why most creators fail to grow their audience (And the fix)", audience: "content creators looking to scale their channels", tags: "social-media,creators,growth,marketing", difficulty: "intermediate" }
]

// ==========================================
// Seeding Logic
// ==========================================
async function main() {
  console.log('🌱 Starting seed of 50 MORE prompts per category...')

  const allCategories = [
    { slug: 'chatgpt-prompts', items: chatgptItems, templates: chatgptTemplates },
    { slug: 'midjourney-prompts', items: midjourneyItems, templates: midjourneyTemplates },
    { slug: 'coding-prompts', items: codingItems, templates: codingTemplates },
    { slug: 'youtube-prompts', items: youtubeItems, templates: youtubeTemplates },
    { slug: 'business-prompts', items: businessItems, templates: businessTemplates },
    { slug: 'marketing-prompts', items: marketingItems, templates: marketingTemplates },
    { slug: 'productivity-prompts', items: productivityItems, templates: productivityTemplates },
    { slug: 'social-media-prompts', items: socialMediaItems, templates: socialMediaTemplates }
  ]

  let addedTotal = 0
  let skippedTotal = 0

  for (const cat of allCategories) {
    console.log(`\n📂 Processing category: ${cat.slug} (${cat.items.length} prompts)...`)
    let addedCat = 0
    let skippedCat = 0

    for (let i = 0; i < cat.items.length; i++) {
      const item = cat.items[i]
      
      // Determine template to use (rotate through 5 templates)
      const template = cat.templates[i % cat.templates.length]
      
      // Interpolate placeholders
      let content = template
      
      if (cat.slug === 'chatgpt-prompts') {
        const cItem = item as typeof chatgptItems[number]
        content = content
          .replace(/\[ROLE\]/g, cItem.role)
          .replace(/\[TOPIC\]/g, cItem.topic)
          .replace(/\[DELIVERABLE\]/g, cItem.deliverable)
      } else if (cat.slug === 'midjourney-prompts') {
        const mItem = item as typeof midjourneyItems[number]
        content = content
          .replace(/\[SUBJECT\]/g, mItem.subject)
          .replace(/\[ENVIRONMENT\]/g, mItem.environment)
          .replace(/\[LIGHTING\]/g, mItem.lighting)
          .replace(/\[LENS\]/g, mItem.lens)
          .replace(/\[COLOR_PALETTE\]/g, mItem.colorPalette)
      } else if (cat.slug === 'coding-prompts') {
        const cdItem = item as typeof codingItems[number]
        content = content
          .replace(/\[LANGUAGE\]/g, cdItem.language)
          .replace(/\[FEATURE\]/g, cdItem.feature)
          .replace(/\[TECH_STACK\]/g, cdItem.techStack)
      } else if (cat.slug === 'youtube-prompts') {
        const yItem = item as typeof youtubeItems[number]
        content = content
          .replace(/\[TOPIC\]/g, yItem.topic)
          .replace(/\[AUDIENCE\]/g, yItem.audience)
      } else if (cat.slug === 'business-prompts') {
        const bItem = item as typeof businessItems[number]
        content = content
          .replace(/\[INDUSTRY\]/g, bItem.industry)
          .replace(/\[BUSINESS_MODEL\]/g, bItem.businessModel)
          .replace(/\[ROLE\]/g, bItem.role)
          .replace(/\[CONTRACT_TYPE\]/g, bItem.contractType)
      } else if (cat.slug === 'marketing-prompts') {
        const mkItem = item as typeof marketingItems[number]
        content = content
          .replace(/\[PRODUCT\]/g, mkItem.product)
          .replace(/\[TARGET_AUDIENCE\]/g, mkItem.targetAudience)
      } else if (cat.slug === 'productivity-prompts') {
        const pItem = item as typeof productivityItems[number]
        content = content
          .replace(/\[ROLE\]/g, pItem.role)
          .replace(/\[PRIORITIES\]/g, pItem.priorities)
          .replace(/\[PROJECT_GOAL\]/g, pItem.projectGoal)
          .replace(/\[SYSTEM_TYPE\]/g, pItem.systemType)
      } else if (cat.slug === 'social-media-prompts') {
        const sItem = item as typeof socialMediaItems[number]
        content = content
          .replace(/\[TOPIC\]/g, sItem.topic)
          .replace(/\[AUDIENCE\]/g, sItem.audience)
      }

      // Generate a beautiful, specific title and description based on the item
      let title = ""
      let description = ""
      
      if (cat.slug === 'chatgpt-prompts') {
        const cItem = item as typeof chatgptItems[number]
        title = `${cItem.topic} ${cItem.role.split(' ').pop()} Prompt`
        description = `A professional ChatGPT prompt for generating a detailed ${cItem.deliverable} on ${cItem.topic} under the guidance of a ${cItem.role}.`
      } else if (cat.slug === 'midjourney-prompts') {
        const mItem = item as typeof midjourneyItems[number]
        title = `${mItem.subject.replace(/^(a|an)\s+/i, '').split(' ').slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Scene Prompt`
        description = `An artistic Midjourney prompt to render ${mItem.subject} inside ${mItem.environment} with ${mItem.lighting} lighting.`
      } else if (cat.slug === 'coding-prompts') {
        const cdItem = item as typeof codingItems[number]
        title = `${cdItem.language} ${cdItem.feature.split(' ').slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} builder`
        description = `A developer-focused prompt for writing a robust ${cdItem.feature} utilizing the ${cdItem.techStack} ecosystem.`
      } else if (cat.slug === 'youtube-prompts') {
        const yItem = item as typeof youtubeItems[number]
        title = `${yItem.topic.split(' ').slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} YouTube Optimizer`
        description = `An expert scriptwriting and optimization prompt for creators producing YouTube videos about: "${yItem.topic}".`
      } else if (cat.slug === 'business-prompts') {
        const bItem = item as typeof businessItems[number]
        title = `${bItem.industry.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} business strategy planner`
        description = `A professional business planner prompt specializing in the ${bItem.industry} space with a ${bItem.businessModel} model.`
      } else if (cat.slug === 'marketing-prompts') {
        const mkItem = item as typeof marketingItems[number]
        title = `${mkItem.product.split(',')[0].trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Copywriter`
        description = `A conversion copywriting prompt designed to craft high-converting copy and campaigns for ${mkItem.product.split(',')[0].trim()}.`
      } else if (cat.slug === 'productivity-prompts') {
        const pItem = item as typeof productivityItems[number]
        title = `${pItem.role.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} workflow optimizer`
        description = `A peak-performance planning and routine-building prompt designed for a ${pItem.role} to manage priorities efficiently.`
      } else if (cat.slug === 'social-media-prompts') {
        const sItem = item as typeof socialMediaItems[number]
        title = `${sItem.topic.split(' ').slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Viral Architect`
        description = `A high-converting social media prompt built to optimize threads, captions, and short scripts about "${sItem.topic}".`
      }

      // Safeguard: Ensure title starts with uppercase and contains meaningful slug
      title = title.replace(/\b\w/g, c => c.toUpperCase())
      const slug = slugify(title)

      // Randomize stats to look realistic
      const views = Math.floor(Math.random() * 5000) + 1200
      const likes = Math.floor(views * (Math.random() * 0.08 + 0.03))
      const copies = Math.floor(likes * (Math.random() * 4 + 2))
      
      const isFeatured = i === 12 // make 1 featured per category
      const isTrending = i % 8 === 0 // some trending prompts

      try {
        const existing = await prisma.prompt.findUnique({ where: { slug } })
        if (existing) {
          console.log(`⏭️  Skipping existing: ${title}`)
          skippedCat++
          skippedTotal++
          continue
        }

        await prisma.prompt.create({
          data: {
            title,
            slug,
            description,
            content,
            category: cat.slug,
            tags: item.tags,
            difficulty: item.difficulty,
            views,
            likes,
            copies,
            isFeatured,
            isTrending,
            authorName: 'PromptNova Team'
          }
        })
        addedCat++
        addedTotal++
      } catch (err: any) {
        console.error(`❌ Error seeding prompt "${title}":`, err.message)
      }
    }

    console.log(`✅ Category [${cat.slug}] complete: Added ${addedCat}, Skipped ${skippedCat}`)
  }

  // Update category counts
  console.log('\n📊 Updating category promptCounts in Category table...')
  const categories = await prisma.category.findMany()
  for (const cat of categories) {
    const count = await prisma.prompt.count({ where: { category: cat.slug } })
    await prisma.category.update({
      where: { id: cat.id },
      data: { promptCount: count }
    })
    console.log(`  🔹 ${cat.slug}: ${count} prompts`)
  }

  console.log(`\n🎉 Seed finished!`)
  console.log(`   Added: ${addedTotal} new prompts`)
  console.log(`   Skipped: ${skippedTotal} duplicate prompts`)
  console.log(`   Total prompts now in database: ${await prisma.prompt.count()}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
