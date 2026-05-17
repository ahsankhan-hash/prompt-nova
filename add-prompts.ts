import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const newPrompts = [
  // ════════════════════════════════════════════════════════════
  // ChatGPT Prompts (7 new)
  // ════════════════════════════════════════════════════════════
  {
    title: 'SEO Meta Description Writer',
    description: 'Generates optimized meta descriptions that improve click-through rates from search engine results pages.',
    content: 'You are an SEO specialist who writes high-converting meta descriptions. For the given page topic [TOPIC] and primary keyword [KEYWORD], generate 5 unique meta descriptions. Each must: be 150-160 characters, include the primary keyword naturally near the beginning, contain a compelling call-to-action or value proposition, create curiosity or urgency, avoid duplicate content across variations. Also provide: character count for each, which psychological trigger each uses (curiosity, urgency, social proof, benefit-driven, question-based), and A/B testing recommendation for which 2 to test first.',
    category: 'chatgpt-prompts',
    tags: 'seo,meta-description,writing,search,optimization',
    difficulty: 'beginner',
    views: 3890, likes: 278, copies: 1567,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'Product Review Generator',
    description: 'Creates detailed, authentic-sounding product reviews with pros, cons, and verdict sections for affiliate content.',
    content: 'You are a trusted product reviewer known for thorough, honest assessments. Write a comprehensive product review for [PRODUCT NAME]. Include: 1) Quick Verdict: 2-sentence summary with rating out of 10, 2) Key Specs: bulleted list of important specifications, 3) First Impressions: packaging, unboxing experience, initial quality assessment, 4) Detailed Analysis: performance (with specific test scenarios), build quality and materials, ease of use and setup, value for money comparison, 5) Pros and Cons: 5-7 items each with brief explanations, 6) Who Should Buy This: 2-3 specific user personas who would benefit most, 7) Who Should Skip It: 2-3 scenarios where this product is not ideal, 8) Alternatives: 2-3 competing products with brief comparison, 9) Final Verdict: expanded conclusion with overall recommendation. Write in a conversational, trustworthy tone. Include specific use cases and real-world scenarios. Avoid generic filler language.',
    category: 'chatgpt-prompts',
    tags: 'review,product,affiliate,writing,content',
    difficulty: 'intermediate',
    views: 2456, likes: 198, copies: 1123,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Landing Page Copywriter',
    description: 'Writes high-converting landing page copy with hero sections, benefits, social proof, and CTAs optimized for conversion.',
    content: 'You are a conversion copywriter who has written landing pages generating millions in revenue. Write complete landing page copy for [PRODUCT/SERVICE] targeting [AUDIENCE]. Create: 1) Hero Section: headline (under 10 words, benefit-driven), subheadline (expands on the promise, includes specific outcome), CTA button text (action-oriented, specific), supporting line below CTA (reduces risk or adds urgency), 2) Problem Section: articulate the pain point in the customer own words, 3 questions that make them nod in agreement, emotional consequence of not solving the problem, 3) Solution Section: how your product solves it (3 key benefits, not features), each benefit: headline + 2-sentence explanation + specific result, 4) Social Proof: 3 testimonial templates with specific results, trust badges and logos section, case study highlight (1 paragraph), 5) Features Deep-Dive: 4-6 features with icon suggestions, benefit-first description, 6) Objection Handling: top 3 objections with empathetic responses, FAQ section (5 questions), 7) Final CTA Section: urgency element, guarantee statement, last-call headline, 8) Sticky Bar: headline + CTA for scroll-sticky navigation. Use power words, specific numbers, and active voice throughout.',
    category: 'chatgpt-prompts',
    tags: 'copywriting,landing-page,conversion,sales,writing',
    difficulty: 'advanced',
    views: 5678, likes: 445, copies: 2345,
    isFeatured: true, isTrending: true,
  },
  {
    title: 'Course Outline Creator',
    description: 'Builds structured online course outlines with modules, lessons, learning objectives, and assessment strategies.',
    content: 'You are an instructional designer who creates bestselling online courses. Design a complete course outline for [COURSE TOPIC] targeting [SKILL LEVEL] learners. Create: 1) Course Title and Tagline: compelling title with outcome focus, one-line tagline that sells the transformation, 2) Target Learner Profile: who this is for, prerequisites, what they already know, 3) Learning Outcomes: 5-7 specific, measurable outcomes using Bloom taxonomy action verbs, 4) Course Structure: 6-8 modules, each module has: module title, 3-5 lessons with titles and duration estimates, 1 practical exercise or project per module, assessment checkpoint, 5) Capstone Project: comprehensive final project that demonstrates all learning outcomes, detailed requirements and rubric, 6) Bonus Materials: cheat sheets, templates, resource lists, 7) Engagement Strategy: community elements, gamification opportunities, progress celebration milestones, 8) Launch Sequence: pre-sale content, module drip strategy, email sequence outline. Estimate total course duration. Include difficulty progression from module 1 to final module.',
    category: 'chatgpt-prompts',
    tags: 'course,education,learning,instructional-design,content',
    difficulty: 'intermediate',
    views: 3234, likes: 256, copies: 1345,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Podcast Episode Planner',
    description: 'Plans engaging podcast episodes with segment structures, guest questions, talking points, and show notes.',
    content: 'You are a podcast producer who helps shows grow to 100K+ downloads per episode. Plan a complete podcast episode for [PODCAST TOPIC/THEME]. Include: 1) Episode Title: 3 title options (curiosity-driven, benefit-driven, controversy-driven), 2) Episode Hook: 30-second opening script that prevents skip, 3) Segment Breakdown: Intro (2 min): hook + what they will learn + guest intro, Segment 1: Foundation/Context (5-7 min), Segment 2: Deep Dive Part 1 (10-12 min), Segment 3: Deep Dive Part 2 (10-12 min), Segment 4: Practical Application (5-7 min), Segment 5: Lightning Round/Rapid Fire (3-5 min), Outro (2 min): key takeaway + CTA + next episode tease, 4) Interview Questions: 10-12 questions ordered from warm-up to deep, follow-up probes for each, pivot questions if conversation stalls, 5) Talking Points: 8-10 key points to cover, statistics or data to reference, stories or examples to draw out, 6) Show Notes: episode summary (2-3 sentences), timestamped segments, links mentioned, resources referenced, 7) Social Media Clips: 3 short-form content ideas from this episode with suggested clip timestamps, 8) Sponsorship Integration: 2 natural ad-read placement points, transition scripts. Target total duration: [LENGTH] minutes.',
    category: 'chatgpt-prompts',
    tags: 'podcast,content,audio,planning,interview',
    difficulty: 'intermediate',
    views: 2123, likes: 167, copies: 890,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Sales Email Sequence Writer',
    description: 'Creates high-converting cold email sequences with personalization, follow-ups, and objection handling for B2B sales.',
    content: 'You are a B2B sales email expert with a 35%+ response rate track record. Create a complete cold email sequence for [PRODUCT/SERVICE] targeting [ICP - Ideal Customer Profile]. Generate: 1) Research Framework: 5 things to research about each prospect before writing, personalization tokens beyond {first_name}, trigger events that signal buying intent, 2) Email 1 - Pattern Interrupt: subject line that gets opened (not salesy), 2-3 sentence body with specific observation about their company, soft CTA asking for interest not a meeting, 3) Email 2 - Value Add (Day 4): new subject line, share one specific insight relevant to their business, relevant case study result (1 sentence), same soft CTA, 4) Email 3 - Social Proof (Day 9): subject line with curiosity element, specific result from similar company, 1-sentence testimonial, slightly more direct CTA, 5) Email 4 - Breakup Email (Day 15): subject line that creates urgency, acknowledge they might not be the right time, leave the door open, 6) For each email include: exact subject line, full body copy, CTA text, send day and time recommendation, A/B variant subject line. Also include: follow-up cadence if they open but do not respond, response templates for common objections, and rules for when to escalate to a different channel.',
    category: 'chatgpt-prompts',
    tags: 'sales,email,cold-outreach,b2b,sequence',
    difficulty: 'advanced',
    views: 4123, likes: 334, copies: 1789,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'Content Repurposing Engine',
    description: 'Transforms one piece of content into multiple formats for different platforms maximizing reach with minimal effort.',
    content: 'You are a content strategist who specializes in getting 10x output from 1x input. Take the following content [PASTE CONTENT] and repurpose it into: 1) Twitter/X Thread: 8-12 tweet thread, first tweet is the hook (must stop the scroll), each tweet delivers one key insight, final tweet is CTA with summary, 2) LinkedIn Post: professional tone, personal story angle, 3 key takeaways in bullet format, question CTA for engagement, 3) Instagram Carousel: 8-10 slides, slide 1 is headline hook, slides 2-9 are key points with visual descriptions, slide 10 is CTA, include caption with hashtags, 4) TikTok Script: 60-second script, hook in first 3 seconds, 3 key points delivered fast, CTA in last 5 seconds, visual direction notes, 5) Email Newsletter: subject line + preview text, 2-paragraph summary, link CTA to full content, 6) YouTube Shorts Script: 30-45 second version, pattern interrupt opening, one key insight amplified, subscribe CTA, 7) Quote Graphics: 5 pull quotes formatted as image text, 8) Podcast Talking Points: 5 discussion questions derived from the content. For each format include specific character/word counts and platform best practices.',
    category: 'chatgpt-prompts',
    tags: 'content,repurposing,social-media,multi-platform,strategy',
    difficulty: 'intermediate',
    views: 4567, likes: 378, copies: 2100,
    isFeatured: false, isTrending: true,
  },

  // ════════════════════════════════════════════════════════════
  // Midjourney Prompts (7 new)
  // ════════════════════════════════════════════════════════════
  {
    title: 'Futuristic Cityscape Builder',
    description: 'Generates stunning sci-fi city scenes with cyberpunk aesthetics, neon lighting, and architectural detail for concept art.',
    content: 'Create a breathtaking futuristic cityscape set in [TIME PERIOD/SETTING]. Architecture: towering megastructures with organic curves and brutalist foundations, skybridges connecting buildings at multiple levels, vertical gardens cascading down facades, holographic advertisements and signage in [LANGUAGE/SCRIPT], landing pads and flying vehicle lanes at various altitudes. Atmosphere: dense atmospheric haze creating depth layers, volumetric neon light from below casting colored shadows, rain-slicked surfaces reflecting city lights, steam rising from street-level vents. Color palette: deep navy shadows, electric cyan and magenta highlights, warm amber from windows, acid green from bioluminescent elements. Style: cyberpunk meets solarpunk fusion, Syd Mead influence with modern detail, photorealistic rendering quality. Camera: aerial perspective looking down at 30-degree angle, tilt-shift focus on midground detail, anamorphic lens flare from light sources. --ar 21:9 --v 6 --style raw --s 750 --q 2',
    category: 'midjourney-prompts',
    tags: 'midjourney,cyberpunk,cityscape,futuristic,concept-art',
    difficulty: 'advanced',
    views: 4321, likes: 389, copies: 1678,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'Fantasy Portrait Studio',
    description: 'Creates detailed fantasy character portraits with rich costume design, magical effects, and dramatic lighting for RPG and game art.',
    content: 'Create a stunning fantasy character portrait: [CHARACTER DESCRIPTION]. Portrait composition: upper body portrait at 3/4 angle, direct eye contact with viewer creating intensity, hands visible performing a magical gesture or holding a significant object. Costume details: intricate armor or robes with cultural engravings and symbols, layered fabrics with visible wear and storytelling elements (battle scars, repaired tears, earned medals), signature accessory that defines the character (amulet, crown, weapon). Magical effects: subtle aura emanating from the character in [COLOR] tones, floating magical particles or runes around hands, eyes glowing with inner power or reflecting their element. Lighting: dramatic chiaroscuro with strong key light from one side, rim light creating a glowing edge, reflected colored light from magical effects onto skin and costume. Background: blurred environment hinting at their origin (throne room, ancient forest, volcanic forge, celestial library). Style: oil painting quality with digital precision, reminiscent of Magic: The Gathering card art, high fantasy illustration. --ar 3:4 --v 6 --s 600 --q 2',
    category: 'midjourney-prompts',
    tags: 'midjourney,fantasy,portrait,character,rpg',
    difficulty: 'intermediate',
    views: 3890, likes: 312, copies: 1456,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Product Photography Studio',
    description: 'Generates professional product photography prompts with studio lighting, composition, and lifestyle settings for e-commerce.',
    content: 'Create a professional product photograph for [PRODUCT]. Shot specifications: Studio setting with [BACKGROUND - clean white / gradient / lifestyle setting], product positioned at [ANGLE - 45-degree hero / flat lay / lifestyle action shot], Camera: Phase One IQ4 150MP, 120mm macro lens, f/8 for sharp focus throughout, Lighting: main key light at 45 degrees (softbox, daylight balanced 5500K), fill light opposite side at 1:3 ratio, accent/hair light from behind creating subtle rim, optional colored gels for mood (specify: none / subtle / dramatic), Surface: [MATERIAL - marble / concrete / silk / wood / floating], Props: minimal complementary items that tell a story without competing, Styling details: any visible water droplets, steam, fabric movement, or dynamic elements, Post-production: ultra-sharp focus, true-to-life color accuracy, subtle shadow recovery, clean background with soft gradient, Post-processing style: clean and commercial / moody editorial / lifestyle warmth. Color palette: [DESCRIBE]. Ensure product is the undeniable hero of the frame. --ar 4:5 --v 6 --s 250 --style raw --q 2',
    category: 'midjourney-prompts',
    tags: 'midjourney,product,photography,ecommerce,commercial',
    difficulty: 'beginner',
    views: 5678, likes: 456, copies: 2345,
    isFeatured: true, isTrending: true,
  },
  {
    title: 'Isometric World Builder',
    description: 'Creates detailed isometric illustrations of miniature worlds, rooms, and environments perfect for game assets and infographics.',
    content: 'Create a detailed isometric illustration of [SCENE/WORLD]. Composition: isometric perspective at 30-degree angle, self-contained miniature world floating in space or on a platform, multiple layers of detail from foreground to background. Content elements: tiny characters going about daily activities, miniature structures with visible interiors (cutaway sections), vegetation and terrain features at micro scale, small vehicles, animals, and environmental details, hidden Easter eggs and storytelling moments. Color palette: [COLOR SCHEME] with warm highlights and cool shadows, consistent lighting direction from upper-left, soft ambient occlusion in crevices and under overhangs. Style: cozy and inviting like a dollhouse or terrarium, Studio Ghibli warmth with modern clean rendering, slight tilt-shift blur on edges to enhance miniature feel, handcrafted quality with precise detail. Technical: crisp vector-like edges with painterly textures, no visible grid or construction lines, seamless integration of all elements. --ar 1:1 --v 6 --s 700 --q 2',
    category: 'midjourney-prompts',
    tags: 'midjourney,isometric,illustration,world-building,game-art',
    difficulty: 'intermediate',
    views: 2890, likes: 234, copies: 1098,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Logo Design Concept Generator',
    description: 'Produces creative logo design prompts with multiple concept directions, style variations, and brand-appropriate aesthetics.',
    content: 'Create a professional logo design concept for [BRAND NAME], a [INDUSTRY/BUSINESS TYPE]. Design Direction: modern and minimal / bold and iconic / elegant and refined / playful and approachable (select based on brand personality). Concept elements: primary mark that works at any size from favicon to billboard, clever visual metaphor or negative space usage connecting to the brand name or mission, balanced composition that feels stable and confident, distinctive silhouette recognizable even as a solid shape. Typography: custom letterform modification or paired with [FONT STYLE - geometric sans / humanist / serif / script], letter spacing and weight optimized for logo context, wordmark that can stand alone without the icon. Color: 2-3 color palette maximum, primary color that evokes [EMOTION/QUALITY], ensure it works in single color, reversed out, and on dark/light backgrounds. Variations: horizontal layout, stacked layout, icon-only, wordmark-only. Style references: Paul Rand simplicity, Chermayeff geometric boldness, or modern tech minimalism. Clean vector aesthetic, no gradients or 3D effects, timeless not trendy. --ar 1:1 --v 6 --s 100 --style raw',
    category: 'midjourney-prompts',
    tags: 'midjourney,logo,design,branding,identity',
    difficulty: 'intermediate',
    views: 6234, likes: 512, copies: 2789,
    isFeatured: true, isTrending: true,
  },
  {
    title: 'Food Photography Stylist',
    description: 'Generates mouth-watering food photography prompts with plating, lighting, and styling for restaurants and food brands.',
    content: 'Create an appetizing food photograph for [DISH/FOOD ITEM]. Plating and Styling: dish presented on [PLATE/SURFACE - rustic ceramic / slate / marble / dark wood], garnished with [SPECIFIC GARNISH] placed at 2 and 10 o clock positions, sauce drizzled in artistic pattern (not poured), key ingredients visible in final form not hidden, steam or sizzle visible to imply temperature and freshness, crumbs, drips, or slight imperfections for authenticity (not messy, artisan). Lighting: natural window light from the left side, soft fill from right using white reflector, warm color temperature (3500-4000K) to enhance appetite appeal, no harsh shadows on the food itself. Composition: 45-degree angle (most appetizing for most dishes), rule of thirds with dish at power point, leading lines created by utensils or garnish pointing to hero element, shallow depth of field (f/2.8-4.0) with focus on the most textured/appealing element, some elements slightly out of focus for depth. Props: complementary utensils, ingredient scatter, fabric napkin with texture, glass of paired beverage partially visible. Background: out-of-focus kitchen or dining environment with warm tones. --ar 4:5 --v 6 --s 300 --style raw --q 2',
    category: 'midjourney-prompts',
    tags: 'midjourney,food,photography,styling,restaurant',
    difficulty: 'beginner',
    views: 3456, likes: 289, copies: 1567,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Anime Scene Creator',
    description: 'Generates stunning anime-style scene prompts with dynamic compositions, effects, and cinematic framing for illustration.',
    content: 'Create a dynamic anime scene: [SCENE DESCRIPTION]. Art style: modern anime aesthetic with high production value, studio quality similar to [REFERENCE - Makoto Shinkai / Studio Ghibli / Ufotable / Kyoto Animation], cel-shaded characters with painted background environments, vibrant color palette with careful attention to ambient lighting. Character: dynamic pose showing [EMOTION/ACTION], detailed costume with wind and movement, expressive eyes with light reflections, speed lines or motion blur suggesting movement. Environment: detailed background with perspective depth, atmospheric particles (dust motes, cherry petals, rain, sparkles), dramatic sky with cloud formations, lens flare from light sources. Cinematic Effects: depth of field with bokeh in background, rim lighting from dramatic light source, color grading establishing mood (warm golden hour / cool moonlight / dramatic sunset), screen tones and halftone patterns in shadow areas. Composition: rule of thirds with character at power point, leading lines from environment directing eye to focal point, negative space for text placement if needed. Framing: medium shot transitioning to close-up emotional moment. --ar 16:9 --v 6 --s 500 --niji 6',
    category: 'midjourney-prompts',
    tags: 'midjourney,anime,illustration,japanese,cinematic',
    difficulty: 'intermediate',
    views: 4890, likes: 412, copies: 2012,
    isFeatured: false, isTrending: true,
  },

  // ════════════════════════════════════════════════════════════
  // Coding Prompts (7 new)
  // ════════════════════════════════════════════════════════════
  {
    title: 'React Component Generator',
    description: 'Generates production-ready React components with TypeScript types, props interfaces, and accessibility features.',
    content: 'You are a senior React developer who writes clean, maintainable, and accessible components. Create a React component for [COMPONENT DESCRIPTION]. Requirements: 1) TypeScript with explicit props interface extending React.HTMLAttributes, 2) Use forwardRef for DOM access when appropriate, 3) Implement proper ARIA attributes for accessibility, 4) Support className prop for Tailwind styling, 5) Include a variants system using cva (class-variance-authority) if multiple visual variants exist, 6) Write JSDoc comments for the component and all props, 7) Include usage examples in comments, 8) Handle loading, error, and empty states, 9) Implement proper keyboard navigation, 10) Add data-testid attributes for testing. Also provide: a basic test file using React Testing Library, a Storybook story file, and the component exported from an index.ts barrel file. Use functional components with hooks only. No class components. Follow the single responsibility principle.',
    category: 'coding-prompts',
    tags: 'react,typescript,component,frontend,accessibility',
    difficulty: 'intermediate',
    views: 7234, likes: 567, copies: 3456,
    isFeatured: true, isTrending: true,
  },
  {
    title: 'Database Schema Designer',
    description: 'Designs optimized database schemas with relationships, indexes, and migration strategies for scalable applications.',
    content: 'You are a database architect specializing in scalable schema design. Design a complete database schema for [APPLICATION DESCRIPTION]. Provide: 1) Entity Relationship Diagram described in text with all tables, columns, types, and constraints, 2) For each table: primary key strategy (UUID vs auto-increment with justification), columns with data types and nullability, foreign keys with on-delete and on-update actions, check constraints for data integrity, 3) Indexes: primary indexes, composite indexes for common query patterns, partial indexes where appropriate, explain the query pattern each index optimizes, 4) Relationships: one-to-one, one-to-many, many-to-many with junction tables, polymorphic relationships if needed, 5) Prisma schema as the deliverable format, 6) Migration strategy: initial migration, seed data script structure, rollback plan, 7) Performance considerations: table partitioning recommendations, materialized views for complex queries, read replica strategy, 8) Security: row-level security policies, encrypted columns for sensitive data, audit log table structure, 9) Sample queries for the 5 most common operations. Target: support 1M+ records in the primary table with sub-100ms query times.',
    category: 'coding-prompts',
    tags: 'database,schema,prisma,architecture,sql',
    difficulty: 'advanced',
    views: 4567, likes: 378, copies: 1890,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'Unit Test Writer',
    description: 'Generates comprehensive unit tests with edge cases, mocking strategies, and coverage optimization for any codebase.',
    content: 'You are a testing engineer who achieves 95%+ code coverage without writing brittle tests. Write comprehensive tests for the following code [PASTE CODE]. Generate: 1) Test Suite Structure: describe block organization, beforeAll/afterAll setup, beforeEach/afterEach for clean state, 2) Test Cases for each function/method: happy path test with expected inputs and outputs, boundary value tests (empty, single, maximum, overflow), null/undefined/invalid input tests, type mismatch tests, error condition tests verifying correct error type and message, race condition tests for async code, 3) Mocking Strategy: which dependencies to mock and why, mock implementation vs spy, mock return values that test different code paths, 4) Test Data: factory functions for creating test fixtures, realistic test data that covers production scenarios, edge case data (empty strings, special characters, extreme numbers), 5) Assertions: specific assertions over generic ones, testing behavior not implementation, verify side effects and state changes, 6) Coverage Analysis: identify untested branches, suggest tests for each uncovered path, note which tests would be better as integration tests. Use Jest/Vitest syntax. Include comments explaining the purpose of non-obvious test cases.',
    category: 'coding-prompts',
    tags: 'testing,unit-test,jest,quality,coverage',
    difficulty: 'intermediate',
    views: 3890, likes: 312, copies: 1678,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Python Script Builder',
    description: 'Creates Python scripts with proper structure, error handling, CLI interfaces, and documentation for automation tasks.',
    content: 'You are a Python developer who writes production-quality scripts. Create a Python script for [TASK DESCRIPTION]. Include: 1) Script Structure: proper shebang line and encoding declaration, module docstring with description, usage examples, and author, imports organized (stdlib, third-party, local), type hints on all function signatures, 2) Main Logic: decomposed into small, testable functions (max 20 lines each), input validation with clear error messages, proper exception handling (specific exceptions, not bare except), logging instead of print statements (with configurable levels), 3) CLI Interface: argparse or click with helpful descriptions, required vs optional arguments clearly defined, default values with justification, version flag, 4) Configuration: environment variables for secrets, config file support if appropriate, sensible defaults that work out of the box, 5) Output: structured output (JSON/CSV) when appropriate, progress indicators for long operations, clean exit codes (0 for success, 1 for error), 6) Error Handling: graceful degradation when possible, cleanup in finally blocks, signal handling for interruption, 7) Documentation: README section with installation and usage, inline comments for complex logic only, docstrings following Google or NumPy style, 8) Requirements: requirements.txt with pinned versions, Python version compatibility note.',
    category: 'coding-prompts',
    tags: 'python,script,automation,cli,development',
    difficulty: 'beginner',
    views: 5678, likes: 445, copies: 2345,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'CI/CD Pipeline Architect',
    description: 'Designs automated CI/CD pipelines with testing stages, deployment strategies, and rollback mechanisms.',
    content: 'You are a DevOps engineer specializing in CI/CD pipeline design. Design a complete CI/CD pipeline for [PROJECT DESCRIPTION]. Create: 1) Pipeline Stages: Build stage (dependency install, compilation, artifact generation), Test stage (unit tests, integration tests, e2e tests, security scans), Review stage (code quality, linting, type checking, bundle size check), Deploy stage (staging, canary, production), 2) GitHub Actions Workflow: complete YAML workflow file, matrix builds for multiple environments, caching strategy for dependencies, artifact management, 3) Branch Strategy: trunk-based development flow, feature branch workflow, release branch handling, hotfix pipeline, 4) Deployment Strategy: blue-green deployment configuration, canary release with percentage rollout, automatic rollback triggers, database migration handling during deployments, 5) Environment Management: development, staging, production configs, secret management approach, environment variable injection, 6) Monitoring Integration: deployment notification (Slack/Discord), health check endpoints, smoke test automation post-deploy, deployment metrics tracking, 7) Security: SAST and DAST integration, dependency vulnerability scanning, container image scanning, secrets rotation, 8) Optimization: parallel job execution, incremental builds, smart test selection, artifact reuse. Include the complete GitHub Actions YAML workflow file.',
    category: 'coding-prompts',
    tags: 'devops,cicd,pipeline,github-actions,deployment',
    difficulty: 'advanced',
    views: 3234, likes: 267, copies: 1345,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'SQL Query Optimizer',
    description: 'Analyzes and optimizes slow SQL queries with execution plan analysis, indexing recommendations, and rewriting strategies.',
    content: 'You are a database performance expert. Analyze and optimize the following SQL query [PASTE QUERY]. Provide: 1) Current Query Analysis: what the query does step by step, estimated execution plan explanation, identify the bottlenecks (full table scans, nested loops, sorting operations, functions preventing index usage), current estimated cost and execution time, 2) Optimization Recommendations: Index suggestions: exact CREATE INDEX statements with justification, which columns and why (equality, range, sort, join), composite index column order reasoning, covering index possibilities, Query Rewrites: rewritten query with optimizations, CTE vs subquery decisions, JOIN order optimization, elimination of unnecessary DISTINCT/GROUP BY, pagination optimization (cursor vs offset), 3) Execution Plan Comparison: before and after estimated cost, key differences in the execution plan, 4) Edge Cases: parameter sniffing issues, statistics staleness impact, plan cache considerations, 5) Monitoring: query performance metrics to track, alert thresholds, periodic review recommendations, 6) Alternative Approaches: materialized view if query runs frequently, denormalization opportunities, application-level caching strategy. Format SQL with proper indentation and add comments explaining each optimization.',
    category: 'coding-prompts',
    tags: 'sql,database,optimization,performance,query',
    difficulty: 'advanced',
    views: 2890, likes: 234, copies: 1123,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'REST API Endpoint Builder',
    description: 'Generates complete REST API endpoints with validation, authentication, error handling, and documentation for Express/Next.js.',
    content: 'You are a backend developer who builds robust, secure APIs. Create a REST API endpoint for [ENDPOINT DESCRIPTION]. Implement: 1) Route Definition: HTTP method and path following REST conventions, route parameters and query string specifications, 2) Authentication and Authorization: auth middleware integration, role-based access control, token validation, 3) Input Validation: request body schema with Zod or Joi, path parameter validation, query parameter validation with type coercion, file upload validation if applicable, sanitization of user inputs, 4) Business Logic: service layer separation from route handler, transaction handling for multi-step operations, idempotency for PUT/DELETE operations, rate limiting considerations, 5) Response Format: consistent response envelope { success, data, error, meta }, proper HTTP status codes (200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500), pagination metadata for list endpoints, 6) Error Handling: custom error classes, centralized error middleware, error response never exposing stack traces in production, logging errors with context, 7) Documentation: OpenAPI/Swagger specification, request/response examples, authentication requirements, 8) Testing: integration test examples for happy path and error cases. Use Next.js API Routes or Express with TypeScript.',
    category: 'coding-prompts',
    tags: 'api,rest,backend,express,nextjs,typescript',
    difficulty: 'intermediate',
    views: 4890, likes: 398, copies: 2012,
    isFeatured: false, isTrending: true,
  },

  // ════════════════════════════════════════════════════════════
  // YouTube Prompts (7 new)
  // ════════════════════════════════════════════════════════════
  {
    title: 'YouTube Channel Strategy Planner',
    description: 'Develops comprehensive YouTube channel strategies with content pillars, upload schedules, and growth tactics.',
    content: 'You are a YouTube growth strategist who has helped channels go from 0 to 100K subscribers. Create a complete channel strategy for [NICHE/TOPIC]. Include: 1) Channel Positioning: unique value proposition (what makes this channel different), target audience persona (age, interests, pain points), channel tagline and description optimized for search, 2) Content Pillars: 4-5 content pillars that balance searchability and shareability, for each pillar: content type, target search volume, example video titles (3 per pillar), upload frequency per pillar, 3) Video Categories: Hero videos (1/month, high production, broad appeal), Hub videos (2/week, series content, subscriber retention), Help videos (1/week, search-optimized tutorials), 4) Upload Schedule: optimal days and times for this niche, consistency commitment, batch production workflow, 5) Growth Tactics: collaboration strategy (channels to approach and how), community tab strategy, playlist organization for session time, end screen and card strategy, 6) Monetization Roadmap: AdSense milestones, sponsorship approach at each sub count, merchandise timing, digital product opportunities, 7) 90-Day Launch Plan: first 30 days (setup + 8 videos), 30-60 days (optimization + collabs), 60-90 days (scaling + monetization). Include specific video title ideas for the first 12 uploads.',
    category: 'youtube-prompts',
    tags: 'youtube,strategy,channel,growth,planning',
    difficulty: 'advanced',
    views: 5890, likes: 478, copies: 2567,
    isFeatured: true, isTrending: true,
  },
  {
    title: 'YouTube Shorts Script Writer',
    description: 'Creates viral YouTube Shorts scripts with hook patterns, retention techniques, and engagement triggers for maximum views.',
    content: 'You are a YouTube Shorts expert who consistently creates viral content. Write a complete YouTube Shorts script for [TOPIC]. Script structure (max 60 seconds): 1) Hook (0-3 seconds): pattern interrupt opening that stops the scroll, use one of these: shocking statement, provocative question, visual reveal, or bold claim, write the exact first line, 2) Setup (3-10 seconds): quick context that makes the hook make sense, establish why the viewer should keep watching, introduce the value proposition, 3) Delivery (10-45 seconds): rapid-fire value delivery, each sentence must earn the next second of attention, use numbered lists or countdowns for structure, include specific, surprising facts or tips, every 5-7 seconds add a mini-pattern interrupt (text pop, zoom, sound effect note), 4) Payoff (45-55 seconds): deliver the promised value from the hook, the best tip or most surprising fact goes here, 5) CTA (55-60 seconds): specific comment prompt ("Comment [WORD] for..."), subscribe reminder with reason, or tease the next Short. Additional: B-roll/visual direction notes for each section, text overlay suggestions, trending audio recommendations, hashtag strategy (3-5 tags), and 3 alternative hooks for A/B testing.',
    category: 'youtube-prompts',
    tags: 'youtube,shorts,script,viral,short-form',
    difficulty: 'beginner',
    views: 6789, likes: 534, copies: 3234,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'Collaboration Pitch Writer',
    description: 'Creates professional collaboration pitch emails for YouTubers to secure brand deals and creator partnerships.',
    content: 'You are a YouTube business manager who secures high-value collaborations. Write a collaboration pitch for [TYPE: brand deal / creator collab / sponsor integration]. If brand deal: 1) Subject Line: 5 options that get opened (not generic), 2) Opening: personal hook showing you researched their brand, specific reference to their recent campaign or product, 3) Channel Value: subscriber count and growth rate, average views (30-day), audience demographics that match their target, engagement rate with proof points, 4) Collaboration Ideas: 3 specific video concepts featuring their product, each with: working title, brief description, integration style (dedicated / integrated / mention), estimated views, 5) Deliverables and Pricing: package options (basic, standard, premium), each with: video deliverables, social cross-promotion, timeline, usage rights, price, 6) Social Proof: 2-3 previous successful brand partnerships with results, audience testimonials about purchase decisions, 7) Professional Details: payment terms, revision policy, content approval process, exclusivity options. If creator collab: focus on mutual audience benefit, cross-promotion value, and specific video concepts. Tone: professional, confident, not desperate. Show you bring value, not just ask for it.',
    category: 'youtube-prompts',
    tags: 'youtube,collaboration,brand-deal,sponsorship,pitch',
    difficulty: 'intermediate',
    views: 3234, likes: 267, copies: 1345,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'YouTube SEO Optimizer',
    description: 'Optimizes YouTube videos for search with keyword strategies, tag recommendations, and algorithm-friendly formatting.',
    content: 'You are a YouTube SEO expert who consistently ranks videos in search and suggested feeds. Optimize a YouTube video for [VIDEO TOPIC]. Provide: 1) Keyword Research: primary keyword (highest volume, most relevant), 5 secondary keywords, 3 long-tail keywords, search intent analysis for each, 2) Title Optimization: 5 title options following these formulas: number + keyword + benefit, keyword + how to + outcome, keyword + year + specificity, provocative + keyword, curiosity gap + keyword. Each title: 50-60 characters, primary keyword in first half, emotionally compelling, 3) Description SEO: first 25 words must include primary keyword, 300-word keyword-rich description, related video links section, social links, 3-5 hashtags, timestamped chapters (each chapter title includes a keyword where natural), 4) Tags: 30-40 tags organized by: primary keyword variations (5), related long-tail phrases (10), niche-specific terms (10), competitor channel names (3-5), common misspellings (2-3), trending terms (3-5), 5) Thumbnail SEO: file name should include primary keyword, alt text recommendation, visual elements that match search intent, 6) Engagement Signals: pinned comment with keyword-rich question, community post to drive initial traffic, end screen video recommendations for session time, 7) Publishing Strategy: optimal publish time for this niche, first 24-hour push strategy, cross-promotion checklist. Include competitor analysis of the top 3 ranking videos.',
    category: 'youtube-prompts',
    tags: 'youtube,seo,optimization,keywords,algorithm',
    difficulty: 'intermediate',
    views: 4890, likes: 398, copies: 2100,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'Video Hook Formula Creator',
    description: 'Creates proven hook formulas for YouTube videos that maximize audience retention in the crucial first 30 seconds.',
    content: 'You are a YouTube retention specialist. Create 10 powerful video hooks for a video about [VIDEO TOPIC]. For each hook provide: 1) Hook Type: one of - Contrarian (challenge common belief), Promise (specific outcome), Mystery (withhold key info), Story (narrative opening), Shock (surprising data), Question (thought-provoking), Demonstration (visual proof), Problem-Pain (agitate the pain), 2) Exact Script: word-for-word opening 15-30 seconds, delivery notes (tone, pace, emphasis points), visual direction (what the viewer sees), B-roll suggestion, 3) Psychology: why this hook works (cognitive bias or principle at play), which audience segment it resonates with most, expected retention impact, 4) Transition: how to smoothly move from hook into main content, bridge sentence that maintains curiosity, 5) A/B Testing Notes: which 2 hooks to test first and why, what metrics to compare, minimum sample size recommendation. Also include: the 3 biggest hook mistakes creators make, retention graph analysis for ideal hook shape, and when to use a cold open versus a branded intro.',
    category: 'youtube-prompts',
    tags: 'youtube,hook,retention,engagement,script',
    difficulty: 'beginner',
    views: 4123, likes: 334, copies: 1789,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Community Post Planner',
    description: 'Creates engaging YouTube Community tab posts with polls, updates, and engagement strategies to maintain audience connection.',
    content: 'You are a YouTube community manager who drives high engagement through the Community tab. Create a 2-week Community Post plan for a [NICHE] channel with [SUBSCRIBER COUNT]. Include: 1) Post Schedule: 1 post every 2-3 days (7-8 posts total), optimal posting times for engagement, 2) Post Types Mix: 2 Polls (highest engagement format), 2 Behind-the-scenes/updates, 1 Audience question/request for input, 1 Value post (quick tip or resource), 1 Entertainment/fun post, 3) For Each Post: exact text copy (optimized for mobile reading), image/graphic description, post type and purpose, expected engagement rate, best time to post, 4) Poll Strategies: this or that questions (binary choice drives voting), knowledge quizzes (test your audience), content direction votes (involve them in decisions), controversial takes (respectful debate), 5) Engagement Tactics: pinned comment with follow-up question, response strategy for first 30 comments, how to handle negative comments, 6) Growth Integration: channel milestone celebrations, upcoming video teases, subscriber-only content hints, call-to-subscribe in value posts, 7) Cross-Promotion: how each community post supports your latest video, notification optimization for post visibility, linking videos in posts. Include specific copy for each of the 7-8 posts.',
    category: 'youtube-prompts',
    tags: 'youtube,community,engagement,poll,social',
    difficulty: 'beginner',
    views: 2345, likes: 189, copies: 890,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'YouTube Analytics Interpreter',
    description: 'Analyzes YouTube analytics data to provide actionable insights, content strategy adjustments, and growth recommendations.',
    content: 'You are a YouTube analytics expert who turns data into actionable strategy. Analyze the following channel data [PASTE ANALYTICS DATA or DESCRIBE METRICS]. Provide: 1) Channel Health Dashboard: overall health score (1-10) based on key metrics, subscriber velocity (growth rate trend), view velocity comparison to previous period, revenue per mille (RPM) assessment, 2) Content Performance Analysis: top 5 performing videos with why they worked, bottom 5 underperformers with why they failed, content type comparison (tutorials vs vlogs vs reviews vs lists), optimal video length analysis based on audience retention data, 3) Audience Insights: viewer demographics breakdown, traffic source analysis (search, suggested, browse, external), audience retention curve patterns, returning vs new viewer ratio, 4) Algorithm Signals: click-through rate assessment and improvement targets, average view duration analysis, session start vs session end ratio, engagement rate (likes+comments per view), 5) Strategic Recommendations: content strategy adjustments based on data, upload schedule optimization, title and thumbnail A/B test priorities, collaboration opportunities based on audience overlap, 6) Growth Projections: 30/60/90 day subscriber and view projections, milestone timelines, monetization timeline updates, 7) Action Items: top 5 things to do this week based on the data, quick wins vs long-term plays, what to stop doing immediately. Format as a clear executive summary with supporting data.',
    category: 'youtube-prompts',
    tags: 'youtube,analytics,data,strategy,growth',
    difficulty: 'advanced',
    views: 2890, likes: 234, copies: 1098,
    isFeatured: false, isTrending: false,
  },

  // ════════════════════════════════════════════════════════════
  // Business Prompts (7 new)
  // ════════════════════════════════════════════════════════════
  {
    title: 'Startup Idea Validator',
    description: 'Validates startup ideas with market analysis, competitive assessment, and go/no-go recommendations before investing time and money.',
    content: 'You are a startup advisor who has evaluated thousands of ideas and knows what separates winners from losers. Validate this startup idea: [IDEA DESCRIPTION]. Assess: 1) Problem Validation: Is this a real problem or a nice-to-have? How painful is it (1-10)? How frequently do people experience it? What workarounds exist currently? Interview question suggestions to validate the problem, 2) Market Sizing: TAM (Total Addressable Market) with calculation, SAM (Serviceable Addressable Market), SOM (Serviceable Obtainable Market) in year 1-3, is this a growing, stable, or declining market?, 3) Competitive Landscape: direct competitors with their strengths/weaknesses, indirect competitors and alternatives, is this a winner-take-all or fragmented market?, what moat can you build?, 4) Business Model Viability: revenue model options with pros/cons, unit economics estimation (CAC, LTV, payback period), gross margin estimate, time to first revenue, 5) Technical Feasibility: MVP complexity assessment, required technical skills, build vs buy decisions, 6) Go/No-Go Recommendation: overall score (1-10), top 3 reasons to proceed, top 3 risks that could kill it, what would need to be true for this to succeed, recommended next steps if proceeding, kill criteria (what metrics would make you stop). Be brutally honest. Better to kill a bad idea early than waste months on it.',
    category: 'business-prompts',
    tags: 'business,startup,validation,idea,assessment',
    difficulty: 'intermediate',
    views: 6234, likes: 498, copies: 2678,
    isFeatured: true, isTrending: true,
  },
  {
    title: 'Financial Model Builder',
    description: 'Creates detailed financial models with revenue projections, expense forecasts, and cash flow analysis for business planning.',
    content: 'You are a financial analyst who builds models that investors trust. Create a financial model for [BUSINESS TYPE/IDEA]. Build: 1) Revenue Model: pricing tiers or per-unit economics, monthly/annual revenue formula, growth rate assumptions with justification, churn rate assumptions (if subscription), upsell and expansion revenue, seasonality adjustments, 2) Cost Structure: fixed costs (rent, salaries, software, insurance), variable costs (COGS, payment processing, customer support), semi-variable costs and their triggers, hiring plan and associated costs (salary + benefits + overhead at 1.3x salary), 3) Monthly P&L Projection (24 months): revenue by stream, COGS and gross margin, operating expenses by category, EBITDA, net income, key margin percentages, 4) Cash Flow Statement: operating cash flow, investing activities, financing activities, cash balance each month, runway calculation, funding requirement timing, 5) Unit Economics: customer acquisition cost (CAC) by channel, lifetime value (LTV) with calculation assumptions, LTV:CAC ratio, payback period, 6) Break-Even Analysis: break-even month and revenue level, contribution margin per unit, sensitivity analysis (what if CAC increases 50%? what if churn doubles?), 7) Key Assumptions: list all assumptions with confidence level (high/medium/low), what to validate first, 8) Scenario Planning: best case, base case, worst case with probability weighting. Present in spreadsheet-ready format with clear cell references.',
    category: 'business-prompts',
    tags: 'business,financial,model,projection,cash-flow',
    difficulty: 'advanced',
    views: 4567, likes: 378, copies: 1890,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'Hiring Manager Assistant',
    description: 'Creates job descriptions, interview questions, and evaluation frameworks for hiring top talent across any role.',
    content: 'You are a hiring expert who has built world-class teams. Help hire for [ROLE] at [COMPANY TYPE/STAGE]. Create: 1) Job Description: compelling title and company intro that sells the opportunity, key responsibilities (5-7, specific and measurable), requirements (must-have vs nice-to-have clearly separated), salary range with market justification, benefits and perks highlight, growth and impact narrative, inclusive language audit, 2) Sourcing Strategy: where to find these candidates, outreach message template, referral incentive program, diversity sourcing channels, 3) Screening: resume red flags and green flags, portfolio/cover letter evaluation criteria, phone screen script (15 minutes), knockout questions, 4) Interview Process: round 1 - skills assessment (take-home or live), round 2 - technical/role-specific deep dive, round 3 - culture and collaboration, round 4 - leadership/stakeholder (if senior), scorecard for each round with 1-5 rating criteria, 5) Top 10 Interview Questions: behavioral questions using STAR format, role-specific scenario questions, culture fit questions (values-based not vibe-based), what great answers look like, what concerning answers look like, 6) Evaluation Framework: weighted scoring rubric, calibration discussion guide, reference check questions, decision matrix. Include: time-to-hire benchmark, offer negotiation strategy, and onboarding 30-60-90 day plan outline.',
    category: 'business-prompts',
    tags: 'business,hiring,recruiting,hr,management',
    difficulty: 'intermediate',
    views: 3456, likes: 289, copies: 1456,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Pricing Strategy Architect',
    description: 'Develops data-driven pricing strategies with psychological pricing, competitive analysis, and revenue optimization models.',
    content: 'You are a pricing strategist who has optimized pricing for companies across SaaS, e-commerce, and services. Develop a pricing strategy for [PRODUCT/SERVICE]. Analyze: 1) Value-Based Pricing Foundation: quantify the value your product delivers (time saved, revenue generated, cost avoided), calculate ROI for the customer, establish willingness-to-pay thresholds, 2) Competitive Pricing Analysis: map competitor pricing on a 2x2 (price vs features), identify pricing gaps in the market, analyze pricing page messaging and positioning, 3) Pricing Model Selection: one-time vs subscription vs usage-based vs freemium vs hybrid, pros/cons for your specific market, recommended model with justification, 4) Tiered Pricing Architecture: Free tier: what to include and exclude (acquisition vs cannibalization balance), Starter tier: entry price with core value, Professional tier: sweet spot for most users, Enterprise tier: premium for power users, anchor pricing psychology placement, feature gating strategy per tier, 5) Psychological Pricing Tactics: charm pricing ($99 vs $100) when to use and when not to, decoy pricing to drive upgrades, bundling and unbundling strategies, annual vs monthly discount strategy, 6) Launch Pricing: introductory pricing strategy, early adopter incentives, price increase communication plan, 7) Testing Framework: A/B test design for pricing, Van Westendorp Price Sensitivity Meter methodology, how to read results and make decisions. Include specific price point recommendations with rationale.',
    category: 'business-prompts',
    tags: 'business,pricing,strategy,revenue,optimization',
    difficulty: 'advanced',
    views: 3890, likes: 312, copies: 1567,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Negotiation Script Builder',
    description: 'Creates negotiation scripts and frameworks for salary, contracts, partnerships, and vendor deals with tactical responses.',
    content: 'You are a negotiation expert trained in the Harvard Negotiation Project method. Create a negotiation playbook for [NEGOTIATION SCENARIO: salary / contract / vendor / partnership]. Build: 1) Preparation Framework: your BATNA (Best Alternative to Negotiated Agreement) with specifics, their likely BATNA, ZOPA (Zone of Possible Agreement) range, your reservation point (walk-away number), your aspiration point (stretch goal), 2) Opening Strategy: who should make the first offer and why, anchoring technique with specific number, framing the conversation to control the narrative, 3) Conversation Scripts: opening statement that sets the tone, how to respond to their first offer (never accept immediately), specific language for counter-proposals, how to create value before claiming value, bridging phrases when stuck, 4) Tactical Responses: if they say "take it or leave it" → script, if they use silence → script, if they split the difference → script, if they compare to competitor → script, if they play good cop/bad cop → script, if they rush the timeline → script, 5) Concession Strategy: planned concession sequence (what you give up and in what order), never concede without getting something in return, diminishing concession pattern (largest first, smallest last), 6) Closing Techniques: how to summarize agreement, getting commitment in writing, preventing buyers remorse, 7) Post-Negotiation: relationship maintenance, following through on commitments, setting up the next negotiation positively. Include specific word-for-word scripts for each scenario.',
    category: 'business-prompts',
    tags: 'business,negotiation,salary,contract,deal',
    difficulty: 'advanced',
    views: 2890, likes: 234, copies: 1123,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'SWOT Analysis Generator',
    description: 'Creates comprehensive SWOT analyses with strategic implications, competitive positioning, and action-oriented recommendations.',
    content: 'You are a strategic business analyst. Conduct a thorough SWOT analysis for [BUSINESS/PRODUCT/PROJECT]. Generate: 1) Strengths (Internal, Positive): 8-10 specific, honest strengths with evidence, each rated by competitive advantage level (sustainable vs temporary), which strengths are distinctive (competitors cannot easily copy), which strengths can be leveraged across multiple opportunities, 2) Weaknesses (Internal, Negative): 8-10 honest weaknesses with specific examples, each rated by severity (critical vs manageable), which weaknesses are fixable and which are structural, the weakness most likely to be exploited by competitors, 3) Opportunities (External, Positive): 8-10 market opportunities with estimated impact, each rated by: probability of occurring, alignment with current capabilities, time sensitivity (act now vs later), which opportunities are the most undervalued by the market, 4) Threats (External, Negative): 8-10 threats with likelihood assessment, each rated by: probability, potential impact, early warning indicators, which threats are existential vs manageable, 5) Strategic Implications: SO strategies (use strengths to capture opportunities), WO strategies (overcome weaknesses to pursue opportunities), ST strategies (use strengths to counter threats), WT strategies (minimize weaknesses and avoid threats), 6) Priority Matrix: top 3 strategic actions from the intersection analysis, resource allocation recommendations, 90-day action plan, 7) Competitive Context: how competitors SWOT profiles compare, your relative advantages and vulnerabilities. Be brutally honest and specific, not generic.',
    category: 'business-prompts',
    tags: 'business,swot,analysis,strategy,competitive',
    difficulty: 'intermediate',
    views: 3234, likes: 256, copies: 1345,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Customer Persona Builder',
    description: 'Creates detailed customer personas with demographics, psychographics, buying behavior, and messaging guidance for marketing.',
    content: 'You are a market research expert who creates personas that teams actually use. Develop 3 detailed customer personas for [PRODUCT/SERVICE]. For each persona include: 1) Identity: name, age, location, occupation, income level, family status, photo description, 2) Psychographics: core values and beliefs, lifestyle description, media consumption habits, aspirational identity (who they want to be), fear and anxieties that drive decisions, 3) Relationship with Your Category: awareness level (unaware, problem-aware, solution-aware, product-aware), current solution or workaround, past experiences (good and bad), trust factors and skepticism, 4) Buying Behavior: research process (where they look, who they trust), decision criteria ranked by importance, typical objection, purchase timeline (impulse vs considered), budget sensitivity, 5) Messaging Guidance: key pain point to address, desired outcome to promise, tone that resonates (professional, casual, authoritative, empathetic), words and phrases they use (speak their language), words and phrases to avoid, 6) Content Preferences: preferred content formats, preferred channels, content length tolerance, best time to reach them, 7) Objection Handling: primary objection with counter-messaging, secondary objection with social proof, tertiary objection with risk reversal, 8) Customer Journey Touchpoints: awareness stage touchpoints, consideration stage touchpoints, decision stage touchpoints, post-purchase engagement. Make each persona distinct enough that a team member can immediately recognize which persona a prospect fits.',
    category: 'business-prompts',
    tags: 'business,persona,customer,research,marketing',
    difficulty: 'intermediate',
    views: 4123, likes: 334, copies: 1789,
    isFeatured: false, isTrending: true,
  },

  // ════════════════════════════════════════════════════════════
  // Marketing Prompts (7 new)
  // ════════════════════════════════════════════════════════════
  {
    title: 'Content Calendar Creator',
    description: 'Builds strategic 30-day content calendars with platform-specific content, posting schedules, and theme alignment.',
    content: 'You are a content strategist who creates calendars that drive real business results. Build a 30-day content calendar for [BRAND/BUSINESS] in [INDUSTRY]. Include: 1) Content Strategy: 4-5 content pillars with percentage allocation, content mission statement, primary objective for this month (awareness, engagement, conversion, retention), 2) Monthly Theme: overarching theme that ties content together, 3 sub-themes per week, key dates and events to leverage, 3) Daily Content Plan: for each day include: date, platform, content type (carousel, reel, story, thread, article, video), content pillar alignment, topic/angle, working headline or hook, caption direction (not full caption, but key points), visual direction (photo style, graphic type, video concept), hashtag set (5-10 per post), CTA type (engagement, traffic, conversion, brand), 4) Platform Mix: Instagram (feed + reels + stories), TikTok, Twitter/X, LinkedIn, YouTube (if applicable), email newsletter, blog, 5) Content Production Batch: group similar content types for efficient production, designate production days vs posting days, 6) Repurposing Map: which content gets repurposed where, how one piece becomes 5+, 7) Performance Targets: engagement rate targets per platform, reach targets, conversion targets, weekly check-in KPIs. Format as a clear day-by-day table with all details visible at a glance.',
    category: 'marketing-prompts',
    tags: 'marketing,content,calendar,strategy,social-media',
    difficulty: 'intermediate',
    views: 5678, likes: 456, copies: 2345,
    isFeatured: true, isTrending: true,
  },
  {
    title: 'Email Subject Line Scientist',
    description: 'Generates and analyzes email subject lines using proven psychological triggers, A/B testing frameworks, and open rate optimization.',
    content: 'You are an email marketing scientist who has tested over 10,000 subject lines. Generate high-performing subject lines for [EMAIL PURPOSE] targeting [AUDIENCE]. Create 20 subject lines across these categories: 1) Curiosity (5): create an information gap that demands opening, hint at something the reader needs to know, never be clickbait (deliver on the promise), 2) Urgency/Scarcity (5): time-sensitive language, limited availability, deadline-driven, must feel genuine not manufactured, 3) Personalization (5): use name, location, or behavior-based triggers, reference their specific situation, make it feel one-to-one, 4) Benefit-Driven (5): lead with the outcome, specific and measurable, connect to their deepest desire, 5) Social Proof (5): reference others like them, popularity indicators, authority endorsements. For EACH subject line include: the subject line text (under 50 characters), preview text that complements it (under 90 characters), psychological trigger used, predicted open rate category (high/medium/low), which segment it works best for. Also include: A/B test plan (which 2 to test first), send time recommendation, segment recommendations, and 5 subject lines to AVOID with explanations of why they fail.',
    category: 'marketing-prompts',
    tags: 'marketing,email,subject-line,optimization,conversion',
    difficulty: 'beginner',
    views: 4321, likes: 356, copies: 1876,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'SEO Content Brief Writer',
    description: 'Creates detailed SEO content briefs with keyword strategy, competitor analysis, and content structure for ranking articles.',
    content: 'You are an SEO content strategist who writes briefs that consistently produce ranking content. Create an SEO content brief for [TARGET KEYWORD]. Include: 1) Keyword Analysis: primary keyword with search volume and difficulty, 5 secondary keywords with search intent, 3 related questions from People Also Ask, 2) SERP Analysis: top 10 ranking pages analysis (word count, content type, domain authority), common subheadings across competitors, featured snippet opportunity and type, SERP features present (images, videos, knowledge panel), 3) Content Structure: recommended word count (based on competitor average + 20%), H1 title with keyword placement, 6-8 H2 headings (each targeting a secondary keyword), H3 subheadings where needed, 4) Content Requirements: introduction must include keyword in first 100 words, definition paragraph for featured snippet targeting, minimum 3 original insights or data points, expert quote placeholders, image/infographic placement suggestions with alt text, internal linking opportunities (5 minimum), external linking to authority sources (3 minimum), 5) Competitive Differentiation: what competitors are missing, unique angle to take, depth or freshness advantage, 6) On-Page SEO Checklist: title tag (60 chars), meta description (155 chars), URL slug recommendation, schema markup type, image optimization notes, 7) Writing Guidelines: tone and reading level, E-E-A-T signals to include, author bio requirements. Format as a clear, actionable document a writer can execute without questions.',
    category: 'marketing-prompts',
    tags: 'marketing,seo,content,brief,keyword',
    difficulty: 'advanced',
    views: 3890, likes: 312, copies: 1567,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Influencer Campaign Designer',
    description: 'Designs influencer marketing campaigns with creator selection, briefing templates, and ROI measurement frameworks.',
    content: 'You are an influencer marketing strategist who has managed seven-figure campaigns. Design an influencer campaign for [BRAND/PRODUCT] targeting [AUDIENCE]. Create: 1) Campaign Strategy: campaign objective with specific KPIs, budget range and allocation model, campaign duration and key dates, messaging pillars (2-3 key messages), 2) Influencer Tier Strategy: Nano (1K-10K): number of creators, budget allocation, use case, Micro (10K-100K): number of creators, budget allocation, use case, Macro (100K-1M): number of creators, budget allocation, use case, Mega (1M+): if applicable, justification, 3) Creator Selection Criteria: audience demographics match, engagement rate minimums (by platform), content quality assessment, brand safety checklist, competitor overlap analysis, 4) Outreach and Briefing: outreach message template, creative brief template including: campaign overview, deliverables, key messages, do not say list, content guidelines, timeline, usage rights, payment terms, 5) Content Strategy: content formats per platform, storytelling framework (not product pitch), hashtag and mention requirements, disclosure compliance, 6) Compensation Framework: flat fee ranges by tier, performance bonus structure, affiliate commission model, gifting-only approach for nano, 7) Measurement Framework: awareness metrics (reach, impressions), engagement metrics (rate, saves, shares), conversion metrics (clicks, sales, promo code uses), brand lift study methodology, ROI calculation formula, 8) Risk Mitigation: contract essentials, crisis communication plan, content approval workflow. Include specific creator archetype examples for each tier.',
    category: 'marketing-prompts',
    tags: 'marketing,influencer,campaign,social-media,brand',
    difficulty: 'advanced',
    views: 3234, likes: 267, copies: 1345,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Conversion Rate Optimizer',
    description: 'Analyzes and optimizes conversion funnels with A/B testing strategies, UX improvements, and data-driven recommendations.',
    content: 'You are a CRO specialist who has increased conversion rates by an average of 40% across clients. Analyze and optimize the conversion funnel for [WEBSITE/LANDING PAGE]. Provide: 1) Funnel Analysis: map the current conversion funnel step by step, identify the biggest drop-off points with probable causes, calculate the revenue impact of each percentage point improvement, 2) Heuristic Evaluation: assess against the MECLABS conversion hierarchy: motivation, value proposition, incentive, friction, anxiety, score each element 1-10, prioritize improvements by impact, 3) Quick Wins (implement this week): headline improvements, CTA button changes (text, color, size, placement), form field reduction, social proof additions, trust signal improvements, urgency elements, 4) A/B Testing Roadmap: test 1: headline (biggest potential impact), test 2: hero section layout, test 3: CTA copy and design, test 4: social proof format, test 5: pricing presentation, for each test: hypothesis, expected impact, minimum sample size, test duration, primary metric, 5) Landing Page Optimization: above-the-fold assessment, scroll-depth engagement analysis, mobile-specific optimization, page speed impact on conversion, 6) Psychological Triggers: implement scarcity ethically, authority and expertise signals, commitment and consistency patterns, loss aversion framing, 7) Measurement Framework: conversion tracking setup, micro-conversion milestones, attribution model, statistical significance calculator. Include before/after projection with conservative, moderate, and optimistic scenarios.',
    category: 'marketing-prompts',
    tags: 'marketing,cro,conversion,optimization,ab-testing',
    difficulty: 'advanced',
    views: 3456, likes: 289, copies: 1456,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Press Release Writer',
    description: 'Creates professional press releases with newsworthy angles, media-friendly formatting, and distribution strategies.',
    content: 'You are a PR professional who knows what journalists actually want to receive. Write a press release for [ANNOUNCEMENT]. Create: 1) Headline: compelling, factual, under 100 characters, includes the most newsworthy element, no hype or exclamation marks, 2) Dateline: CITY, State – Month Day, Year –, 3) Lead Paragraph (who, what, when, where, why): the entire story in 25-35 words, most important information first, factual and specific, 4) Body Paragraphs: paragraph 2: expand on the announcement with specifics, paragraph 3: why this matters (market context, impact), paragraph 4: supporting quote from key executive (write a realistic quote with name and title), paragraph 5: additional details or statistics, 5) Boilerplate: company description in 3-4 sentences, factual and consistent across all releases, 6) Media Contact: name, email, phone, website, 7) End Mark: ### to signal the end, 8) Distribution Strategy: wire service recommendation, targeted journalist list building approach, social media announcement timing, follow-up protocol (when and how to follow up), embargo strategy if applicable. Also include: 3 alternative headlines, suggested social media posts for the announcement, and internal communication draft for team/stakeholders.',
    category: 'marketing-prompts',
    tags: 'marketing,pr,press-release,media,announcement',
    difficulty: 'intermediate',
    views: 2345, likes: 198, copies: 987,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Competitive Battlecard Creator',
    description: 'Creates sales battlecards with competitive positioning, objection handling, and win strategies for each competitor.',
    content: 'You are a competitive intelligence expert who creates battlecards that sales teams actually use in live deals. Create a competitive battlecard for [YOUR PRODUCT] vs [COMPETITOR]. Include: 1) Executive Summary: who they are and their market position, their typical customer profile, where you overlap and where you do not, overall competitive posture (leader, challenger, niche), 2) Quick Reference: at-a-glance comparison table covering: pricing, key features, integrations, support, deployment, target market, 3) When You Win: scenarios where your product is clearly superior, specific customer needs that favor you, industries or use cases where you dominate, 4) When They Win: be honest about where they are stronger, customer profiles that are better suited to them, acknowledge their real advantages, 5) Common Objections and Responses: objection: "They are cheaper" → response with value calculus, objection: "They have feature X" → response with workaround or alternative, objection: "They are the safe choice" → response with risk reframing, objection: "We are already using them" → response with switching cost analysis, 6) Trap-Setting Questions: questions to ask prospects that expose competitor weaknesses, questions that highlight your strengths, questions that reframe the buying criteria, 7) Talk Track: opening competitive conversation, mid-deal competitive defense, closing against competition, 8) Win/Loss Intelligence: common win reasons, common loss reasons, recent competitive moves to watch. Make it scannable with bold headers and bullet points, not paragraphs.',
    category: 'marketing-prompts',
    tags: 'marketing,competitive,battlecard,sales,positioning',
    difficulty: 'advanced',
    views: 2890, likes: 234, copies: 1123,
    isFeatured: false, isTrending: false,
  },

  // ════════════════════════════════════════════════════════════
  // Productivity Prompts (7 new)
  // ════════════════════════════════════════════════════════════
  {
    title: 'Daily Routine Optimizer',
    description: 'Designs personalized daily routines based on chronotype, priorities, and energy patterns for maximum productivity and wellbeing.',
    content: 'You are a productivity coach who combines behavioral science with practical routines. Design an optimal daily routine for someone who is [CHRONOTYPE: early bird / night owl / in between] with these priorities: [LIST PRIORITIES]. Create: 1) Morning Startup Routine (60 min): wake-up protocol (no phone for first 30 min), hydration and movement (specific 10-min routine), intention setting (5-min practice), deep work preparation (15 min), 2) Deep Work Blocks: schedule 2-3 deep work blocks at peak energy hours, each block is 90 minutes, pre-block ritual (5 min setup), during-block rules (no notifications, no meetings), post-block review (5 min reflection), 3) Energy Management: map tasks to energy levels (creative work at peak, admin during trough), strategic caffeine timing (not first thing, delayed 90 min after waking), movement breaks every 90 minutes (specific 5-min exercises), nutrition timing for sustained energy, 4) Meeting Protocol: meeting-free morning (protect peak hours), standing meeting norms (max 30 min default), between-meeting buffer (10 min), meeting prep and follow-up blocks, 5) Afternoon Structure: post-lunch low-energy tasks, collaborative work during social hours, creative second-wind utilization, 6) Evening Wind-Down: work shutdown ritual (specific 15-min checklist), next-day preparation (lay out clothes, prep meals, top 3 priorities), screen-off time, sleep preparation routine, 7) Flexibility Protocol: how to handle disruptions, make-up block strategy, when to abandon the schedule, emergency day template. Include a printable one-page summary and a habit-tracking approach.',
    category: 'productivity-prompts',
    tags: 'productivity,routine,daily,schedule,habits',
    difficulty: 'beginner',
    views: 4890, likes: 398, copies: 2100,
    isFeatured: true, isTrending: true,
  },
  {
    title: 'Project Scope Definer',
    description: 'Creates clear project scope documents with deliverables, timelines, resources, and risk management for successful execution.',
    content: 'You are a project management expert who prevents scope creep and delivers on time. Create a comprehensive project scope document for [PROJECT DESCRIPTION]. Define: 1) Project Overview: project name and one-line description, business justification (why now, what value), success criteria (3-5 measurable outcomes), project sponsor and key stakeholders, 2) Scope Statement: In Scope: specific deliverables with acceptance criteria, Out of Scope: explicitly excluded items with rationale, Assumptions: what you are assuming to be true, Constraints: time, budget, resource limitations, 3) Deliverables: each deliverable with: description, acceptance criteria, owner, due date, dependencies, 4) Work Breakdown Structure: Phase 1 through Phase N, tasks within each phase, effort estimates (hours), task dependencies, critical path identification, 5) Timeline: milestone dates, key decision points, review gates, buffer allocation, 6) Resource Plan: team roles and responsibilities (RACI matrix), budget breakdown by category, tool and infrastructure requirements, 7) Risk Register: top 5 risks with probability and impact, mitigation strategy for each, contingency plan for each, risk owner assignment, 8) Communication Plan: who needs what information when, meeting cadence and purpose, reporting format and frequency, escalation path, 9) Change Control: how scope changes are requested, evaluation criteria, approval process, impact assessment template. Include a one-page executive summary suitable for stakeholder sign-off.',
    category: 'productivity-prompts',
    tags: 'productivity,project-management,scope,planning,execution',
    difficulty: 'intermediate',
    views: 3234, likes: 267, copies: 1345,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Decision Making Framework',
    description: 'Creates structured decision-making frameworks with criteria weighting, scenario analysis, and confidence scoring.',
    content: 'You are a decision scientist who helps leaders make better choices. Create a decision framework for [DECISION DESCRIPTION]. Build: 1) Decision Statement: clear, specific question being decided, decision scope (what is and is not on the table), decision urgency (how much time do you have), reversibility (is this a one-way or two-way door), 2) Options Generation: 3-5 distinct options with clear differentiation, status quo as a baseline option, creative alternatives that break either-or thinking, 3) Criteria Definition: 5-7 decision criteria derived from goals and values, weight each criterion (1-5 based on importance), must-have vs nice-to-have distinction, 4) Evaluation Matrix: score each option against each criterion (1-10), calculate weighted scores, identify the mathematical winner, note where intuition disagrees with the matrix, 5) Scenario Analysis: best case for each option, worst case for each option, most likely case, regret minimization (which option would you regret NOT taking), 6) Risk Assessment: for the top 2 options, identify: what could go wrong, how likely is it, how bad would it be, can you mitigate it, 7) Confidence Check: how much information is enough (avoid analysis paralysis), what would change your mind, what do you know now that you did not before, 8) Decision and Communication: recommended option with rationale, how to communicate the decision to stakeholders, how to handle disagreement, 9) Review Protocol: when to revisit this decision, what metrics indicate success, what triggers a pivot. Include a decision journal template for future learning.',
    category: 'productivity-prompts',
    tags: 'productivity,decision-making,framework,analysis,strategy',
    difficulty: 'intermediate',
    views: 2890, likes: 234, copies: 1123,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Habit Stack Builder',
    description: 'Designs habit stacking routines using behavioral science principles for lasting behavior change and personal development.',
    content: 'You are a behavioral scientist who applies James Clear Atomic Habits methodology with additional evidence-based techniques. Design a habit stack for someone who wants to [DESIRED OUTCOME/GOAL]. Create: 1) Current Habit Audit: list 5-10 current daily habits (things you already do without thinking), identify anchor habits (morning coffee, brushing teeth, lunch break, etc.), rate each anchor by consistency (how often do you actually do it), 2) Desired Habits: identify 3-5 new habits that would drive the desired outcome, make each habit: obvious (specific time and place), attractive (pair with something you enjoy), easy (start with 2-minute version), satisfying (immediate reward), 3) Habit Stacking Formulas: "After I [CURRENT HABIT], I will [NEW HABIT]" for each new habit, ensure the new habit fits naturally after the anchor, start with just one stack per anchor, 4) Implementation Intentions: for each habit stack: when (specific time), where (specific location), what (exact behavior), how long (start with 2 minutes), 5) Environment Design: make good habits easier (reduce friction to 20 seconds or less), make bad habits harder (increase friction to 20 seconds or more), visual cues and reminders, digital environment setup, 6) Tracking System: simple habit tracker (paper or app recommendation), don not break the chain strategy, missed habit protocol (never miss twice rule), weekly review questions, 7) Scaling Plan: week 1-2: just show up (2-minute minimum), week 3-4: increase duration gradually, week 5-8: add complexity, week 9+: habit should feel automatic, 8) Troubleshooting: if you forget: redesign the cue, if you skip: reduce the habit size, if you resist: examine the identity conflict, if you plateau: add challenge or variety. Include a 30-day tracking template.',
    category: 'productivity-prompts',
    tags: 'productivity,habits,behavior,atomic-habits,self-improvement',
    difficulty: 'beginner',
    views: 3456, likes: 289, copies: 1567,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'Email Inbox Zero System',
    description: 'Creates a systematic approach to email management with templates, rules, and workflows for achieving and maintaining inbox zero.',
    content: 'You are an email productivity expert who has helped thousands of professionals achieve inbox zero. Create a complete email management system for [ROLE/SITUATION]. Design: 1) Email Processing Protocol: the 4D method: Delete (spam, noise, FYIs you do not need), Delegate (if someone else should handle it), Defer (schedule for later response), Do (if it takes under 2 minutes), touch each email only once, 2) Folder/Label Structure: Action Required (emails needing your response), Waiting On (sent items awaiting reply), Reference (important info to keep), Project-specific folders (only for active projects), Archive (everything else), 3) Email Templates: 10 reusable templates for: meeting request, follow-up, decline politely, request more info, introduction, thank you, status update, escalation, delegation, out of office, each template with placeholders and customization notes, 4) Automation Rules: auto-filters for newsletters, notifications, and routine emails, auto-labeling by sender or keyword, auto-archiving for low-priority categories, scheduled sending for optimal timing, 5) Batch Processing Schedule: check email 3 times per day (morning, midday, end of day), each session: 15-30 minutes max, turn off notifications between sessions, 6) Writing Efficiency: BLUF method (Bottom Line Up Front), one-email-one-topic rule, clear subject lines that indicate action needed, specific deadline language, 7) Unsubscribe Protocol: weekly unsubscribe session (10 min), rules for deciding: keep, digest, or unsubscribe, 8) Maintenance Plan: daily: process to zero, weekly: review waiting-on folder, monthly: clean up templates and rules, quarterly: audit subscriptions. Include a first-day setup checklist to migrate from current chaos.',
    category: 'productivity-prompts',
    tags: 'productivity,email,inbox-zero,organization,workflow',
    difficulty: 'beginner',
    views: 2890, likes: 234, copies: 1234,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Remote Work Productivity Guide',
    description: 'Creates personalized remote work productivity systems with workspace optimization, communication norms, and work-life boundaries.',
    content: 'You are a remote work consultant who helps distributed teams thrive. Create a remote work productivity guide for [ROLE/SITUATION]. Design: 1) Workspace Optimization: dedicated work zone (even in small spaces), ergonomic setup checklist (chair height, monitor position, lighting), technology stack recommendations, background and lighting for video calls, noise management strategy, 2) Daily Structure: start-of-day ritual (signals work mode), time-blocked schedule with clear boundaries, lunch break away from desk (non-negotiable), end-of-day shutdown ritual (signals personal time), 3) Communication Norms: async-first philosophy (when to use chat vs email vs call), response time expectations (by channel and urgency), status indicator usage (available, focused, away, DND), meeting etiquette (camera, audio, screen sharing), 4) Focus Strategies: Pomodoro technique adaptation for remote, deep work blocks in calendar (visible to team), notification management across devices, focus music/ambient sound recommendations, 5) Collaboration Without Proximity: daily standup format (async or sync), project update template, virtual watercooler ideas, pair programming or co-working sessions, documentation-first culture, 6) Work-Life Boundaries: physical boundary (close the laptop, leave the room), digital boundary (separate profiles or browsers), temporal boundary (firm start and end times), social boundary (not always available), 7) Mental Health: isolation prevention strategies, movement and exercise schedule, social connection rituals, burnout warning signs and early intervention, 8) Manager Specific: how to lead remotely, 1-on-1 best practices, team health monitoring, outcome-based management vs activity monitoring. Include a 7-day onboarding plan for new remote workers.',
    category: 'productivity-prompts',
    tags: 'productivity,remote-work,wfh,boundaries,workspace',
    difficulty: 'intermediate',
    views: 4123, likes: 334, copies: 1789,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Knowledge Management System',
    description: 'Designs personal knowledge management systems with note-taking frameworks, linking strategies, and retrieval methods.',
    content: 'You are a knowledge management expert who builds systems that enhance thinking and creativity. Design a personal knowledge management (PKM) system for [USE CASE: researcher / content creator / developer / entrepreneur]. Create: 1) System Architecture: capture tool (where ideas go first), processing tool (where ideas get refined), storage tool (permanent knowledge base), output tool (where knowledge becomes creation), recommended tool stack with free alternatives, 2) Capture Workflow: inbox zero for ideas (capture everything, organize later), capture triggers (what deserves capturing), mobile capture strategy, web clipping workflow, voice note processing, 3) Note-Taking Framework: atomic notes (one idea per note), note template with: title, source, context, content, connections, permanent vs fleeting vs literature notes, progressive summarization technique (highlight, bold, summary), 4) Organization System: PARA method adaptation (Projects, Areas, Resources, Archive), folder/label structure, naming conventions, tag taxonomy (broad vs specific), 5) Linking Strategy: how to create meaningful connections between notes, MOCs (Maps of Content) for key topics, index note as entry point, bidirectional linking best practices, 6) Retrieval System: search-first mentality, how to find anything in under 30 seconds, weekly review of unprocessed notes, resurfacing mechanism for forgotten knowledge, 7) Output Workflow: how to turn notes into content/decisions, drafting from linked notes, citing and referencing system, 8) Maintenance Protocol: daily: capture and process (15 min), weekly: organize and link (30 min), monthly: review and prune (1 hour), quarterly: archive and reset. Include starter templates for 5 common note types.',
    category: 'productivity-prompts',
    tags: 'productivity,knowledge,notes,pkm,organization',
    difficulty: 'advanced',
    views: 2345, likes: 198, copies: 987,
    isFeatured: false, isTrending: false,
  },

  // ════════════════════════════════════════════════════════════
  // Social Media Prompts (7 new)
  // ════════════════════════════════════════════════════════════
  {
    title: 'Viral Twitter Thread Writer',
    description: 'Creates viral Twitter/X threads with hook tweets, engagement patterns, and shareable insights for maximum reach and followers.',
    content: 'You are a Twitter/X growth expert whose threads consistently get 1M+ impressions. Write a viral thread for [TOPIC]. Create: 1) Hook Tweet (first tweet): must stop the scroll and force a click, use one of these: contrarian take, shocking data, insider secret, or bold promise, under 280 characters, ends with a thread indicator (number or 🧵), 2) Thread Body (8-12 tweets): each tweet is one key insight (not multiple), open loop technique (each tweet hints at what comes next), specific examples and data in every tweet, write at 6th grade reading level, use short sentences and line breaks, include 1-2 relevant emoji per tweet (not excessive), every 3rd tweet should be especially shareable (bookmark-worthy), 3) Engagement Triggers: tweet 3: ask a question to get replies, tweet 6: controversial or hot take to spark debate, tweet 9: vulnerable or personal moment for connection, 4) CTA Tweet (last tweet): summarize the thread in one powerful line, specific follow request with reason ("Follow me @handle for more [SPECIFIC VALUE]"), retweet the first tweet request, optional: free resource or link, 5) Quote Tweet Version: condensed version for quote-tweeting the thread, 6) Reply Strategy: first 3 reply templates for common responses, how to handle critics, engagement boosting technique for the first 30 minutes. Also include: optimal posting time, how to boost with your own replies, and 3 alternative hook tweets for testing.',
    category: 'social-media-prompts',
    tags: 'twitter,thread,viral,social-media,growth',
    difficulty: 'intermediate',
    views: 5678, likes: 456, copies: 2345,
    isFeatured: true, isTrending: true,
  },
  {
    title: 'TikTok Script Generator',
    description: 'Creates short-form TikTok video scripts with trending formats, hook patterns, and engagement triggers for viral potential.',
    content: 'You are a TikTok content strategist who creates videos that consistently hit 1M+ views. Create 3 TikTok scripts for [TOPIC]. For each script: 1) Format: choose from: storytelling, listicle, tutorial, reaction, or skit, duration: 30-60 seconds, vertical video (9:16), 2) Hook (0-3 seconds): visual hook (what they see) + audio hook (what they hear), must create a pattern interrupt, specific action the viewer should take (keep watching), write the exact first line, 3) Body (3-45 seconds): fast-paced delivery (150-180 words per minute), one idea per sentence, visual changes every 3-5 seconds, text overlays for key points, transition suggestions (snap, cover camera, point), 4) Payoff (45-55 seconds): deliver the promised value, the most shareable moment goes here, 5) CTA (55-60 seconds): specific engagement prompt ("save this for later", "follow for part 2", "comment [word] for..."), 6) Production Notes: trending audio suggestion, filter/effect recommendation, filming tips, editing pace notes, 7) Caption: caption text (under 150 characters), 3-5 hashtags (mix of trending and niche), 8) Posting Strategy: best time to post, duet/stitch opportunity, series potential. Also include: which of the 3 scripts has the highest viral potential and why, and how to adapt each script for Instagram Reels and YouTube Shorts.',
    category: 'social-media-prompts',
    tags: 'tiktok,script,short-form,viral,video',
    difficulty: 'beginner',
    views: 6234, likes: 498, copies: 2678,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'LinkedIn Post Optimizer',
    description: 'Creates viral LinkedIn posts with professional storytelling, engagement hooks, and network-growth strategies.',
    content: 'You are a LinkedIn growth expert who has built multiple 100K+ follower profiles. Write a LinkedIn post for [TOPIC/PURPOSE]. Create: 1) Hook (first 2 lines, visible before "see more"): use one of these formats: contrarian statement, specific result with numbers, relatable frustration, industry secret, or personal story opening, must create a "I need to read this" feeling, under 210 characters, 2) Story/Insight Body: use the ABA story structure (A = expectation, B = twist, A = new understanding), short paragraphs (1-2 sentences max), specific details and numbers (not vague claims), line breaks between every thought (no walls of text), personal experience woven with professional insight, 3) Value Delivery: the aha moment that makes the post shareable, counterintuitive insight, actionable framework or list, something the reader can immediately apply, 4) Engagement Hook (near the end): ask a specific question (not "what do you think?"), create a debate (two valid perspectives), prompt a story ("Have you experienced this?"), 5) CTA (optional): if selling, sell the next step not the product, if growing, invite to follow with specific value promise, if networking, invite to connect with a reason, 6) Hashtags: 3-5 relevant hashtags (LinkedIn shows max 5), mix of broad and niche, 7) Comment Strategy: first comment should add extra value or ask the opening question, how to respond to first 10 comments, when to engage with other posts for reciprocity. Also include: best posting time for this audience, and 3 alternative hooks for A/B testing.',
    category: 'social-media-prompts',
    tags: 'linkedin,post,professional,networking,growth',
    difficulty: 'intermediate',
    views: 4567, likes: 378, copies: 1989,
    isFeatured: false, isTrending: true,
  },
  {
    title: 'Pinterest Pin Optimizer',
    description: 'Creates Pinterest-optimized pin descriptions, board strategies, and keyword-rich content for maximum traffic and saves.',
    content: 'You are a Pinterest marketing expert who drives millions of monthly impressions. Create a Pinterest strategy for [BUSINESS/NICHE]. Include: 1) Pin Optimization (5 pin descriptions): for each pin: keyword-rich title (under 100 characters), description with: hook line, value proposition, call to action, relevant keywords naturally integrated (500 characters), destination URL strategy, 2) Board Strategy: 10-15 board names optimized for search (not cute, keyword-rich), board descriptions with keywords, pin count targets per board, board cover aesthetic plan, 3) Keyword Strategy: 50 keywords organized by: broad terms (high volume, high competition), long-tail phrases (lower volume, higher intent), trending terms (seasonal and current), 4) Pin Design Brief: ideal pin dimensions (1000x1500 or 1000x1800), text overlay guidelines (readable at mobile size), brand consistency requirements, color psychology for clicks, 5) Content Strategy: how many pins per day, ratio of original to repins, idea pins vs standard pins, seasonal content calendar, 6) SEO Optimization: how Pinterest search works, keyword placement priorities (title > description > board name > profile), rich pin setup, 7) Traffic Driving: how to convert impressions to clicks, landing page optimization for Pinterest traffic, email capture strategy from Pinterest visitors, 8) Analytics: which metrics actually matter, monthly reporting template, growth benchmarks by month. Include a 30-day launch plan with specific daily actions.',
    category: 'social-media-prompts',
    tags: 'pinterest,social-media,seo,traffic,pins',
    difficulty: 'intermediate',
    views: 2345, likes: 189, copies: 890,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Social Media Audit Template',
    description: 'Creates comprehensive social media audit frameworks with KPI benchmarks, content analysis, and strategic recommendations.',
    content: 'You are a social media auditor who identifies growth opportunities others miss. Conduct a social media audit for [BRAND/ACCOUNT]. Analyze: 1) Profile Optimization: profile photo and cover image assessment, bio clarity and keyword optimization, link strategy (linktree vs direct vs custom), pinned content effectiveness, 2) Content Analysis: content type breakdown (video, image, carousel, text, story), posting frequency by platform, best performing content types with engagement rates, worst performing content types with analysis, content themes and their relative performance, 3) Engagement Metrics: average engagement rate by platform and content type, comment quality assessment (genuine vs spam), response time and rate, share and save rates (key growth indicators), 4) Audience Analysis: follower growth trend (growing, stagnant, declining), audience demographics match with target, follower quality indicators, audience activity patterns, 5) Competitive Benchmarking: 3 competitor profiles comparison, content gaps you can exploit, strategies worth adapting, areas where you lead, 6) Platform-Specific Assessment: Instagram: reel vs feed vs story performance, TikTok: view-through rate and completion rate, Twitter/X: impression and engagement rate, LinkedIn: engagement rate and follower growth, YouTube: CTR and retention, 7) SWOT for Social: strengths, weaknesses, opportunities, threats specific to social presence, 8) 90-Day Action Plan: quick wins (this week), medium-term optimizations (this month), strategic initiatives (this quarter), specific content recommendations, resource requirements, 9) KPI Targets: monthly follower growth target, engagement rate benchmarks, traffic and conversion goals. Include a one-page scorecard summary.',
    category: 'social-media-prompts',
    tags: 'social-media,audit,analytics,strategy,benchmark',
    difficulty: 'advanced',
    views: 2890, likes: 234, copies: 1123,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'User-Generated Content Catalyst',
    description: 'Creates campaigns and prompts that encourage user-generated content with participation frameworks and curation strategies.',
    content: 'You are a community marketing expert who generates massive UGC campaigns. Design a UGC campaign for [BRAND/PRODUCT]. Create: 1) Campaign Concept: campaign name and hashtag (memorable, short, unique), core participation mechanic (what do people actually do?), emotional hook (why would someone want to participate?), campaign duration and milestones, 2) Entry Framework: low barrier to entry (anyone can participate in under 2 minutes), clear instructions (3 steps max), example submissions (what great looks like), content guidelines (dos and donts), 3) Motivation Strategy: intrinsic rewards (recognition, belonging, self-expression), extrinsic rewards (prizes, features, discounts), social proof (see others participating), FOMO (limited time, exclusive results), 4) Launch Plan: seeding strategy (first 20 submissions before public launch), influencer kickstart (5-10 creators to seed content), email announcement, social announcement sequence, 5) Amplification: brand repost strategy (how and when to share UGC), creator notification when featured, community voting or judging mechanics, weekly highlight reels, 6) Legal and Rights: terms of participation, content usage rights, model release approach, privacy considerations, 7) Curation and Moderation: quality filters, moderation workflow, brand safety checks, how to handle off-brand or negative submissions, 8) Measurement: participation rate, content quality score, reach and impressions, conversion from UGC, brand sentiment shift. Include 5 specific post prompts people can respond to and 3 contest structures with prize recommendations.',
    category: 'social-media-prompts',
    tags: 'social-media,ugc,campaign,community,content',
    difficulty: 'intermediate',
    views: 3234, likes: 267, copies: 1345,
    isFeatured: false, isTrending: false,
  },
  {
    title: 'Cross-Platform Content Adapter',
    description: 'Adapts content for different social platforms with format optimization, tone adjustments, and platform-specific best practices.',
    content: 'You are a multi-platform content strategist. Adapt the following content for each major platform [PASTE ORIGINAL CONTENT]. Transform for: 1) Instagram: format: carousel (10 slides) with hook on slide 1, each slide has one key point with visual direction, caption: personal story angle, line breaks, 20-25 hashtags, CTA: "Save this post" or "Tag someone who needs this", story: 3-5 story frames with poll or question sticker, 2) TikTok: format: 60-second talking head or voiceover, hook in first 2 seconds, fast cuts every 3-5 seconds, trending sound or original audio, text overlays for key points, CTA: "Follow for part 2" or "Comment [word]", 3) Twitter/X: format: thread (8-12 tweets), first tweet is the hook with number or bold claim, each tweet one insight, final tweet CTA with retweet ask, quote tweet summary version, 4) LinkedIn: format: long-form post with personal story, professional tone, paragraph breaks every 1-2 sentences, industry insight angle, question CTA for comments, 5) YouTube: format: 8-12 minute video script, longer explanations and examples, chapter markers, end screen CTA, description with timestamps, 6) Email: format: newsletter section, subject line, 2-3 paragraph summary, link to full content, For each platform include: exact character count, posting time recommendation, engagement tactic specific to that platform, and how to repurpose comments/responses into new content. Also note: which platform should get the content first and why, and a 48-hour distribution schedule.',
    category: 'social-media-prompts',
    tags: 'social-media,cross-platform,content,adaptation,multi-channel',
    difficulty: 'intermediate',
    views: 3890, likes: 312, copies: 1567,
    isFeatured: false, isTrending: true,
  },
]

async function main() {
  console.log('🔄 Adding new prompts to database...')
  
  let added = 0
  let skipped = 0
  
  for (const prompt of newPrompts) {
    const slug = slugify(prompt.title)
    try {
      const existing = await prisma.prompt.findUnique({ where: { slug } })
      if (existing) {
        console.log(`⏭️  Skipping (exists): ${prompt.title}`)
        skipped++
        continue
      }
      
      await prisma.prompt.create({
        data: {
          ...prompt,
          slug,
        },
      })
      added++
      console.log(`✅ Added: ${prompt.title}`)
    } catch (error: any) {
      console.error(`❌ Error adding ${prompt.title}: ${error.message}`)
    }
  }
  
  // Update category promptCounts
  const categories = await prisma.category.findMany()
  for (const cat of categories) {
    const count = await prisma.prompt.count({ where: { category: cat.slug } })
    await prisma.category.update({ where: { id: cat.id }, data: { promptCount: count } })
    console.log(`📊 Updated ${cat.slug}: ${count} prompts`)
  }
  
  const total = await prisma.prompt.count()
  console.log(`\n🎉 Done! Added: ${added}, Skipped: ${skipped}, Total prompts: ${total}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
