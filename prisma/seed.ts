import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.prompt.deleteMany()
  await prisma.tool.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.category.deleteMany()

  // ─── Categories ───────────────────────────────────────────
  const categories = [
    {
      name: 'ChatGPT Prompts',
      slug: 'chatgpt-prompts',
      description: 'Powerful prompts optimized for ChatGPT to supercharge your conversations and content creation.',
      icon: 'MessageSquare',
      promptCount: 3,
    },
    {
      name: 'Midjourney Prompts',
      slug: 'midjourney-prompts',
      description: 'Stunning visual art prompts crafted for Midjourney to create breathtaking imagery.',
      icon: 'Image',
      promptCount: 3,
    },
    {
      name: 'Coding Prompts',
      slug: 'coding-prompts',
      description: 'Developer-focused prompts for code generation, debugging, and architecture design.',
      icon: 'Code',
      promptCount: 3,
    },
    {
      name: 'YouTube Prompts',
      slug: 'youtube-prompts',
      description: 'Prompts designed for YouTube creators to boost engagement and grow their channels.',
      icon: 'Youtube',
      promptCount: 3,
    },
    {
      name: 'Business Prompts',
      slug: 'business-prompts',
      description: 'Strategic business prompts for planning, analysis, and professional communication.',
      icon: 'Briefcase',
      promptCount: 3,
    },
    {
      name: 'Marketing Prompts',
      slug: 'marketing-prompts',
      description: 'High-converting marketing prompts for campaigns, ad copy, and brand strategy.',
      icon: 'Megaphone',
      promptCount: 3,
    },
    {
      name: 'Productivity Prompts',
      slug: 'productivity-prompts',
      description: 'Efficiency-boosting prompts for planning, organization, and time management.',
      icon: 'Zap',
      promptCount: 3,
    },
    {
      name: 'Social Media Prompts',
      slug: 'social-media-prompts',
      description: 'Viral-ready prompts for Instagram, Twitter, TikTok, and more social platforms.',
      icon: 'Share2',
      promptCount: 3,
    },
  ]

  const categoryRecords = await Promise.all(
    categories.map((cat) => prisma.category.create({ data: cat }))
  )
  console.log(`✅ Created ${categoryRecords.length} categories`)

  // ─── Prompts ──────────────────────────────────────────────
  const prompts = [
    // ChatGPT Prompts (3)
    {
      title: 'Ultimate Blog Post Writer',
      slug: 'ultimate-blog-post-writer',
      description: 'A comprehensive prompt for generating full blog posts with SEO optimization, proper heading structure, and engaging content that ranks on search engines.',
      content: 'You are an expert blog post writer and SEO specialist. Write a comprehensive, engaging blog post about [TOPIC]. The post must include: 1) A compelling headline that includes the primary keyword, 2) An attention-grabbing introduction with a hook in the first 2 sentences, 3) At least 5 H2 subheadings with relevant H3 sections, 4) Actionable tips and real-world examples in each section, 5) A powerful conclusion with a clear call-to-action, 6) Meta description (155 characters max), 7) 5 suggested internal linking anchor texts, 8) FAQ section with 5 common questions and concise answers. Write in a conversational yet authoritative tone. Use short paragraphs (2-3 sentences max), bullet points, and numbered lists for scannability. Target word count: 2000-2500 words. Optimize for featured snippets by including a clear definition or answer in the first paragraph.',
      category: 'chatgpt-prompts',
      tags: 'blog,writing,seo,content,chatgpt',
      difficulty: 'intermediate',
      views: 4823,
      likes: 312,
      copies: 1567,
      isFeatured: true,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Email Campaign Generator',
      slug: 'email-campaign-generator',
      description: 'Creates compelling email sequences for marketing campaigns with high open rates and conversion-focused messaging.',
      content: 'You are an expert email marketing copywriter with a track record of creating campaigns that achieve 40%+ open rates. Create a complete email sequence for [PRODUCT/SERVICE] targeting [AUDIENCE]. Generate: 1) A 5-email nurture sequence with subject lines and preview text for each, 2) Each email should have: a hook subject line (under 50 chars), preview text that complements the subject, opening that creates urgency or curiosity, body copy with social proof and benefits, clear CTA button text, and P.S. line for additional incentive, 3) Email 1: Welcome/awareness, 4) Email 2: Education/value, 5) Email 3: Social proof/case study, 6) Email 4: Objection handling, 7) Email 5: Urgency/close, 8) A/B test variants for subject lines of emails 1 and 5, 9) Optimal send timing recommendations. Tone: professional yet warm, conversational, benefit-driven.',
      category: 'chatgpt-prompts',
      tags: 'email,marketing,campaign,copywriting,chatgpt',
      difficulty: 'advanced',
      views: 3215,
      likes: 245,
      copies: 987,
      isFeatured: false,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Story Outline Architect',
      slug: 'story-outline-architect',
      description: 'Builds detailed story outlines with character arcs, plot structures, and narrative tension points for fiction writers.',
      content: 'You are a master storyteller and narrative architect. Create a comprehensive story outline for [GENRE] about [PREMISE]. Include: 1) A one-paragraph logline that captures the core conflict, 2) Three-act structure breakdown with 8-12 key plot points, 3) Character profiles for the protagonist, antagonist, and 2 supporting characters (include: name, age, motivation, fatal flaw, character arc description), 4) The Lie the Character Believes → The Truth They Discover transformation, 5) World-building notes (setting, rules, unique elements), 6) Subplot outline that reinforces the main theme, 7) Key emotional beats and reversal points, 8) Foreshadowing placement map, 9) Thematic statement, 10) Suggested chapter-by-chapter breakdown (25-30 chapters). Ensure every scene advances plot or character development. Include internal and external conflict at every turning point.',
      category: 'chatgpt-prompts',
      tags: 'writing,story,fiction,creative,narrative,chatgpt',
      difficulty: 'advanced',
      views: 2789,
      likes: 198,
      copies: 834,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },

    // Midjourney Prompts (3)
    {
      title: 'Cinematic Landscape Generator',
      slug: 'cinematic-landscape-generator',
      description: 'Creates stunning landscape art prompts for Midjourney with perfect lighting, composition, and atmospheric effects.',
      content: 'Generate a breathtaking cinematic landscape scene: [SCENE DESCRIPTION]. Style parameters: dramatic golden hour lighting with volumetric god rays piercing through clouds, hyperdetailed terrain with visible texture on rocks and foliage, atmospheric perspective with layered depth (foreground detail → midground focus → background haze), wide-angle cinematic composition following rule of thirds, ultra-realistic environmental storytelling elements (weathered paths, ancient trees, distant water features). Technical specs: 8K resolution quality, photorealistic rendering, film grain texture, shot on ARRI ALEXA 65 with Cooke S7/i Full Frame Plus lenses, color grading reminiscent of Roger Deakins cinematography. Add subtle magical realism elements: bioluminescent flora, ethereal mist particles, or aurora-like sky phenomena. --ar 21:9 --v 6 --style raw --s 750 --q 2',
      category: 'midjourney-prompts',
      tags: 'midjourney,landscape,cinematic,art,photorealistic',
      difficulty: 'intermediate',
      views: 5634,
      likes: 478,
      copies: 2341,
      isFeatured: true,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Character Design Wizard',
      slug: 'character-design-wizard',
      description: 'Generates detailed character design prompts with rich visual descriptions for concept art and illustration.',
      content: 'Design a compelling character: [CHARACTER CONCEPT]. Visual specifications: full-body character design sheet showing front view, 3/4 view, and back view, expressive pose conveying personality and backstory through body language. Detailed features: intricate costume design with cultural influences and symbolic motifs, weapons or accessories that tell a story, distinctive silhouette recognizable at any scale, color palette of [COLOR SCHEME] with accent colors for visual interest, fabric and material textures (worn leather, polished metal, flowing silk). Art style: blend of semi-realistic anime with Western concept art influences, rendered with painterly digital technique, dramatic rim lighting from behind, subtle environmental interaction (wind in hair, magic particles, dust). Background: neutral gradient that complements character colors. Technical: highly detailed, concept art quality, ArtStation trending, smooth rendering --ar 2:3 --v 6 --s 500',
      category: 'midjourney-prompts',
      tags: 'midjourney,character,design,concept-art,illustration',
      difficulty: 'advanced',
      views: 4123,
      likes: 356,
      copies: 1823,
      isFeatured: false,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Abstract Art Creator',
      slug: 'abstract-art-creator',
      description: 'Produces unique abstract art compositions with striking color harmonies and dynamic visual flow for gallery-quality output.',
      content: 'Create a mesmerizing abstract art composition exploring [THEME/EMOTION]. Design approach: organic flowing forms interweaving with geometric precision, creating a visual dialogue between chaos and order. Color theory: primary palette of deep violet, electric cyan, and warm amber with metallic gold accents, utilize color temperature contrasts to create depth and movement, subtle color transitions through gradient meshes. Composition: dynamic diagonal flow from bottom-left to upper-right, focal point created through contrast and detail density, negative space used deliberately as a design element, multiple layers of transparency creating depth. Texture: mix of smooth digital gradients and impasto-like brush strokes, crystalline structures emerging from fluid forms, fine line details creating visual pathways. Emotional quality: [MOOD - e.g., contemplative, explosive, ethereal]. Style influences: Zaha Hadid architecture, James Turrell light installations, generative art aesthetics. --ar 1:1 --v 6 --s 800 --q 2 --style raw',
      category: 'midjourney-prompts',
      tags: 'midjourney,abstract,art,generative,contemporary',
      difficulty: 'intermediate',
      views: 3456,
      likes: 289,
      copies: 1245,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },

    // Coding Prompts (3)
    {
      title: 'Full-Stack App Architect',
      slug: 'full-stack-app-architect',
      description: 'Generates complete application architectures with tech stack recommendations, folder structure, and implementation guidance.',
      content: 'You are a senior full-stack architect with 15 years of experience building scalable applications. Design a complete architecture for [APP DESCRIPTION]. Provide: 1) Recommended tech stack with justifications (frontend framework, backend, database, caching, deployment), 2) Detailed folder structure following clean architecture principles, 3) Database schema with entity relationships (include migration strategy), 4) API design: RESTful endpoints or GraphQL schema with authentication flow, 5) State management strategy (server state vs client state), 6) Component hierarchy and data flow diagram (described in text), 7) Authentication and authorization approach (JWT, sessions, OAuth), 8) Error handling strategy with specific patterns, 9) Testing pyramid recommendation with example test structures, 10) CI/CD pipeline outline, 11) Performance optimization strategies (caching, code splitting, lazy loading), 12) Security considerations and mitigations, 13) Scalability roadmap from MVP to 100K users. Include code examples for the 3 most critical patterns.',
      category: 'coding-prompts',
      tags: 'coding,architecture,fullstack,development,software',
      difficulty: 'advanced',
      views: 6789,
      likes: 534,
      copies: 2876,
      isFeatured: true,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'API Documentation Writer',
      slug: 'api-documentation-writer',
      description: 'Creates comprehensive API documentation with endpoint descriptions, request/response examples, and error handling guides.',
      content: 'You are a technical writer specializing in API documentation. Create complete, developer-friendly documentation for [API NAME/DESCRIPTION]. Include: 1) API Overview: authentication methods, base URL, rate limits, versioning strategy, 2) For each endpoint: HTTP method and URL path, description of what it does, required and optional parameters with types and validation rules, request headers, request body example (JSON), success response with status code and example body, error responses with all possible status codes and error objects, cURL example, SDK examples in Python and JavaScript, 3) Pagination pattern documentation, 4) Webhook documentation (if applicable) with payload examples, 5) Error codes reference table with descriptions and resolution steps, 6) Changelog section, 7) Getting Started quickstart guide (5-minute setup), 8) Common use cases with code walkthroughs. Format everything in clean Markdown with proper code blocks and syntax highlighting. Use consistent naming conventions throughout.',
      category: 'coding-prompts',
      tags: 'coding,api,documentation,technical-writing,development',
      difficulty: 'intermediate',
      views: 3456,
      likes: 267,
      copies: 1432,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Bug Fix Detective',
      slug: 'bug-fix-detective',
      description: 'Analyzes code issues with systematic debugging approach, identifies root causes, and suggests verified fixes with prevention strategies.',
      content: 'You are an expert debugging specialist with deep knowledge of common software pitfalls and systematic troubleshooting methodologies. Analyze the following code issue: [PASTE CODE/ERROR]. Perform a systematic investigation: 1) Symptom Analysis: What exactly is happening vs what should happen? Identify the specific failure mode, 2) Root Cause Investigation: Trace the execution path from input to failure point, identify the exact line/statement causing the issue, explain WHY it fails (not just THAT it fails), check for common categories: null/undefined references, type mismatches, async/await issues, race conditions, off-by-one errors, scope problems, state mutation, 3) Fix Implementation: Provide the corrected code with clear comments on what changed and why, explain any alternative approaches considered, 4) Prevention Strategy: Suggest linting rules, type system improvements, or testing patterns that would catch this class of bug, 5) Related Vulnerabilities: Identify similar patterns elsewhere in the codebase that might have the same issue, 6) Testing: Write a test case that reproduces the bug and validates the fix. Format your response with clear sections and code blocks.',
      category: 'coding-prompts',
      tags: 'coding,debugging,bug-fix,development,troubleshooting',
      difficulty: 'beginner',
      views: 5234,
      likes: 412,
      copies: 2156,
      isFeatured: false,
      isTrending: true,
      authorName: 'PromptNova Team',
    },

    // YouTube Prompts (3)
    {
      title: 'Viral Script Writer',
      slug: 'viral-script-writer',
      description: 'Creates engaging YouTube video scripts with hooks, retention strategies, and call-to-actions optimized for the algorithm.',
      content: 'You are a YouTube scriptwriter who has helped channels reach millions of subscribers. Write a complete video script for [VIDEO TOPIC]. Structure: 1) HOOK (0-15 seconds): Pattern interrupt opening that immediately creates curiosity. Start with a bold claim, surprising statistic, or provocative question. Must make the viewer think "I NEED to watch this." 2) INTRO (15-45 seconds): Expand on the hook, establish credibility, and preview the value the viewer will get. Include a subtle retention trigger ("And I will share the one mistake that costs creators 90% of their views"). 3) MAIN CONTENT: Break into 4-6 clearly labeled sections, each with a mini-hook at the start, use storytelling with specific examples, add pattern interrupts every 60-90 seconds (visual change, B-roll cue, sound effect note, or topic pivot), include on-screen text/graphics cues [BRACKETS], write in conversational tone as if talking to a friend, 4) ENGAGEMENT BEATS: 2-3 natural points to ask for likes/subscribes with value-first framing, 5) CTA (last 30 seconds): Summarize key takeaway, direct to next video with specific title, call to action that feels organic. Target length: [DURATION] minutes. Include timestamps and B-roll suggestions.',
      category: 'youtube-prompts',
      tags: 'youtube,script,video,content-creator,viral',
      difficulty: 'intermediate',
      views: 7823,
      likes: 623,
      copies: 3456,
      isFeatured: true,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Thumbnail Concept Generator',
      slug: 'thumbnail-concept-generator',
      description: 'Generates high-click-rate thumbnail ideas with visual descriptions, text overlays, and emotional triggers for YouTube videos.',
      content: 'You are a YouTube thumbnail design expert who understands the psychology of click-through rates. Create 5 thumbnail concepts for a video about [VIDEO TOPIC]. For each concept provide: 1) Visual Description: Detailed scene composition with specific elements, character expressions and body language (if applicable), color scheme that stands out in YouTube browse feed (high contrast, saturated), background that provides context without clutter, 2) Text Overlay: Maximum 4-5 words in large bold font, specific font style recommendation (thick, shadowed, 3D), placement that does not cover faces or key elements, emotional trigger words that create curiosity or urgency, 3) Emotional Hook: Primary emotion the thumbnail triggers (curiosity, shock, desire, FOMO), psychological principle at play, 4) Technical Notes: Recommended resolution (1280x720), safe zone considerations for YouTube UI overlay, contrast and brightness optimization for mobile viewing, 5) A/B Test Recommendation: Which 2 thumbnails to test against each other and why. Also include: 3 common thumbnail mistakes to avoid for this topic, competitor thumbnail analysis notes, and trending thumbnail patterns in this niche.',
      category: 'youtube-prompts',
      tags: 'youtube,thumbnail,design,ctr,video-optimization',
      difficulty: 'beginner',
      views: 4123,
      likes: 334,
      copies: 1678,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Video Description Optimizer',
      slug: 'video-description-optimizer',
      description: 'Creates SEO-optimized video descriptions with keywords, timestamps, and engagement elements for maximum discoverability.',
      content: 'You are a YouTube SEO specialist. Create an optimized video description for a video about [VIDEO TOPIC]. Include: 1) First 2 Lines (visible before "Show More"): Compelling hook with primary keyword naturally integrated, must encourage clicking "Show More", 2) Video Summary (3-5 sentences): Keyword-rich overview that helps YouTube algorithm understand the content, include secondary keywords naturally, 3) Timestamps: 8-12 chapters with descriptive titles (each containing a keyword where natural), format as 0:00 Chapter Name, 4) Links Section: Recommended tools/products with brief descriptions (affiliate-friendly format), link to related video, link to subscribe, social media handles, 5) SEO Keywords Paragraph: Natural paragraph containing 8-12 relevant keywords/phrases (not stuffed, genuinely readable), 6) About Section: Brief channel description with value proposition, 7) Hashtags: 3-5 relevant hashtags (first 3 show above title), 8) Call to Action: Engaging CTA that drives comments ("Drop a comment below telling me..."), 9) Legal/Disclaimer: If applicable, include sponsorship disclosure. Total description length: 4000-5000 characters. Ensure primary keyword appears in first 25 words.',
      category: 'youtube-prompts',
      tags: 'youtube,seo,description,optimization,video-marketing',
      difficulty: 'beginner',
      views: 3456,
      likes: 278,
      copies: 1345,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },

    // Business Prompts (3)
    {
      title: 'Business Plan Generator',
      slug: 'business-plan-generator',
      description: 'Creates comprehensive business plans with market analysis, financial projections, and strategic roadmaps for startups and entrepreneurs.',
      content: 'You are a seasoned business consultant and startup advisor who has helped raise over $100M in venture funding. Create a comprehensive business plan for [BUSINESS IDEA]. Include: 1) Executive Summary: Mission statement, problem/solution overview, unique value proposition, funding ask (if applicable), 2) Market Analysis: TAM/SAM/SOM breakdown with cited market size, target customer personas (3 detailed personas with demographics, psychographics, buying behavior), competitive landscape with positioning matrix, industry trends and tailwinds, 3) Product/Service: Detailed offering description, features vs benefits breakdown, development roadmap (6-month, 12-month, 24-month), intellectual property or moat, 4) Business Model: Revenue streams and pricing strategy, unit economics (CAC, LTV, payback period), gross margin projections, 5) Go-to-Market Strategy: Customer acquisition channels ranked by efficiency, content and distribution plan, partnership strategy, 6) Financial Projections: 3-year P&L statement (monthly for year 1, quarterly for years 2-3), cash flow projections, break-even analysis, key assumptions, 7) Team: Key roles needed, hiring timeline, advisory board recommendations, 8) Risk Analysis: Top 5 risks with probability/impact matrix and mitigation strategies, 9) Milestones: 90-day, 6-month, 12-month milestones with specific KPIs.',
      category: 'business-prompts',
      tags: 'business,startup,business-plan,strategy,entrepreneurship',
      difficulty: 'advanced',
      views: 5678,
      likes: 445,
      copies: 2345,
      isFeatured: true,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Pitch Deck Creator',
      slug: 'pitch-deck-creator',
      description: 'Generates investor pitch content with compelling narratives, data visualization ideas, and persuasive slide-by-slide breakdowns.',
      content: 'You are a pitch deck expert who has helped startups raise from Seed to Series C. Create a compelling pitch deck for [STARTUP DESCRIPTION]. Design 12-15 slides with the following structure: Slide 1 - Title: Company name, one-line description that creates intrigue, your name and date. Slide 2 - Problem: 3 pain points with real statistics, paint the picture of the current broken state. Slide 3 - Solution: How you solve it in one clear sentence, then 3 key benefits with brief explanations. Slide 4 - Demo/Product: Key features showcase, 3 killer screenshots or mockup descriptions, "Aha moment" description. Slide 5 - Market Size: TAM/SAM/SOM with bottom-up calculation, why now (timing is everything). Slide 6 - Business Model: How you make money, unit economics, pricing rationale. Slide 7 - Traction: Key metrics with growth rates, customer testimonials (2-3 quotes), revenue chart description. Slide 8 - Competition: 2x2 positioning matrix description, your unfair advantages. Slide 9 - Go-to-Market: Channel strategy, CAC trends, viral coefficients if applicable. Slide 10 - Team: Key team members with credibility markers, what you are looking for. Slide 11 - Financials: 3-year projections, key assumptions, path to profitability. Slide 12 - The Ask: How much, what for, what milestones it unlocks. For each slide include: headline text, body content, speaker notes, and suggested data visualization.',
      category: 'business-prompts',
      tags: 'business,pitch-deck,startup,fundraising,investor',
      difficulty: 'advanced',
      views: 4567,
      likes: 378,
      copies: 1987,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Market Analysis Assistant',
      slug: 'market-analysis-assistant',
      description: 'Analyzes market opportunities with competitive intelligence, trend identification, and strategic positioning recommendations.',
      content: 'You are a market research analyst with expertise in identifying emerging opportunities and competitive dynamics. Conduct a thorough market analysis for [INDUSTRY/PRODUCT]. Provide: 1) Market Overview: Current market size and growth rate (CAGR), key market segments and their relative sizes, geographic distribution of demand, 2) Trends Analysis: Top 5 macro trends affecting this market, emerging sub-trends within each, timeline of trend maturity (emerging, growing, mature, declining), 3) Competitive Landscape: Top 10 players with market share estimates, competitive positioning map description, strengths and weaknesses of top 3 competitors, recent competitive moves and their implications, 4) Customer Analysis: Primary customer segments with demographic profiles, buying journey mapping (awareness → consideration → decision), key decision criteria and their weighting, unmet needs and pain points, willingness-to-pay indicators, 5) Opportunity Assessment: Market gaps and underserved segments, adjacent market opportunities, potential for disruption, entry barriers analysis (regulatory, capital, network effects), 6) Risk Factors: Market risks, regulatory risks, technology disruption risks, 7) Strategic Recommendations: Top 3 market entry/expansion strategies, quick wins vs long-term plays, key metrics to track. Include specific data points and cite sources where possible.',
      category: 'business-prompts',
      tags: 'business,market-analysis,research,strategy,competitive',
      difficulty: 'intermediate',
      views: 3234,
      likes: 256,
      copies: 1123,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },

    // Marketing Prompts (3)
    {
      title: 'Social Media Campaign Planner',
      slug: 'social-media-campaign-planner',
      description: 'Creates full social media campaigns with content calendars, platform-specific strategies, and performance metrics.',
      content: 'You are a social media strategist who has managed campaigns for Fortune 500 brands. Create a complete 30-day social media campaign for [BRAND/PRODUCT]. Include: 1) Campaign Strategy: Campaign theme and hashtag, primary objective with measurable KPI, target audience personas, brand voice guidelines for social, 2) Platform Strategy: Content mix for each platform (Instagram: 60% reels, 25% carousel, 15% stories; TikTok: 100% short video; Twitter/X: 40% threads, 35% single tweets, 25% polls; LinkedIn: 50% articles, 30% posts, 20% polls), optimal posting times for each platform, 3) Content Calendar: 30-day day-by-day content plan, for each post include: date, platform, content type, topic/angle, caption draft (platform-optimized length), hashtag set (5-10 relevant), visual direction, 4) Content Pillars: Define 4-5 content pillars with post ratio, example posts for each pillar, 5) Engagement Strategy: Community management guidelines, response templates for common interactions, user-generated content campaign idea, influencer collaboration brief, 6) Paid Amplification: Budget allocation across platforms, ad creative briefs for top 3 performing post types, targeting parameters, 7) Measurement Framework: Daily/weekly KPIs to track, attribution model, reporting cadence. Format as actionable day-by-day playbook.',
      category: 'marketing-prompts',
      tags: 'marketing,social-media,campaign,strategy,content',
      difficulty: 'advanced',
      views: 6234,
      likes: 498,
      copies: 2567,
      isFeatured: true,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Ad Copy Generator',
      slug: 'ad-copy-generator',
      description: 'Writes compelling ad copy for multiple platforms with A/B variants, psychological triggers, and conversion-focused messaging.',
      content: 'You are a direct response copywriter who has written ads generating over $50M in revenue. Create ad copy for [PRODUCT/SERVICE] targeting [AUDIENCE]. Generate the following: 1) Facebook/Instagram Ads: 3 primary ad variations (each with headline, primary text, description, CTA button text), 5 A/B headline variants for each, audience targeting suggestions, 2) Google Ads: 3 Responsive Search Ads (each with 15 headlines and 4 descriptions), keyword strategy (exact, phrase, broad match), negative keyword list, 3) LinkedIn Ads: 2 Sponsored Content variations, 2 Message Ad variations (with personalized opening), targeting criteria, 4) TikTok Ads: 3 video ad scripts (15-30 seconds each), hook variations, trending sound/format suggestions, 5) Email Ads: 2 newsletter sponsorship variations, 2 dedicated email variations, For ALL ads include: psychological trigger used (scarcity, social proof, authority, etc.), emotional appeal (fear, desire, belonging, achievement), call-to-action strength rating, estimated quality score factors, compliance notes. Ensure each variation tests a different emotional angle or value proposition.',
      category: 'marketing-prompts',
      tags: 'marketing,ad-copy,advertising,conversion,copywriting',
      difficulty: 'intermediate',
      views: 4567,
      likes: 367,
      copies: 1876,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Brand Voice Developer',
      slug: 'brand-voice-developer',
      description: 'Establishes consistent brand messaging with voice guidelines, tone examples, and communication frameworks for unified brand identity.',
      content: 'You are a brand strategist specializing in brand voice and messaging. Develop a comprehensive brand voice guide for [BRAND]. Create: 1) Brand Voice Definition: 3-4 core voice attributes (e.g., "Bold but not arrogant, Smart but not condescending"), each with a spectrum description (we are THIS, but not THAT), real-world brand analogies for reference, 2) Tone Variations by Context: Customer support (empathetic, solution-focused), Social media (witty, community-building), Sales/marketing (confident, benefit-driven), Crisis communication (transparent, reassuring), Onboarding (welcoming, encouraging), 3) Writing Guidelines: Sentence length and complexity targets, vocabulary preferences (words we use vs words we avoid with alternatives), punctuation and formatting conventions, emoji usage policy, capitalization style, 4) Example Library: 5 "before and after" writing examples showing generic copy transformed to brand voice, 3 email templates in brand voice, 5 social media post examples, 2 error message rewrites, 3 product description examples, 5) Voice Audit Checklist: 10-point checklist for evaluating any piece of content against the brand voice, scoring rubric, 6) Onboarding Section: How to train new team members on the brand voice, practice exercises, review process. Make the guide itself an example of great brand writing.',
      category: 'marketing-prompts',
      tags: 'marketing,brand,voice,messaging,strategy,copywriting',
      difficulty: 'intermediate',
      views: 2876,
      likes: 234,
      copies: 1045,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },

    // Productivity Prompts (3)
    {
      title: 'Weekly Planner Architect',
      slug: 'weekly-planner-architect',
      description: 'Creates optimal weekly schedules based on priorities, energy levels, and goals using time-blocking and productivity frameworks.',
      content: 'You are a productivity coach who combines evidence-based time management research with practical frameworks. Design an optimal weekly plan for someone who [ROLE/SITUATION] with these priorities: [LIST PRIORITIES]. Create: 1) Energy Mapping: Identify peak performance hours based on chronotype, map high/medium/low energy periods, recommend task types for each energy level, 2) Time-Block Schedule: Monday through Friday time-blocked schedule (6 AM to 9 PM), Saturday flexible schedule, Sunday planning and preparation blocks, color-code by category (deep work, meetings, admin, learning, personal), 3) Priority Allocation: 60% time on top priority, 25% on secondary, 15% on maintenance/tasks, specific time blocks for each priority, 4) Deep Work Protocol: 2-3 deep work blocks per day (90 min each), pre-work ritual suggestions, distraction elimination checklist, 5) Meeting Strategy: Meeting-free blocks, meeting preparation time, meeting follow-up time, meeting max duration guidelines, 6) Review System: Morning review (5 min), end-of-day review (10 min), weekly review (30 min on Friday), monthly review template, 7) Buffer Zones: 15-min buffers between tasks, 2-hour weekly buffer for unexpected items, emergency protocol, 8) Flexibility Framework: How to handle schedule disruptions, make-up block strategy, when to say no. Include printable-format summary.',
      category: 'productivity-prompts',
      tags: 'productivity,planning,time-management,schedule,organization',
      difficulty: 'beginner',
      views: 3890,
      likes: 312,
      copies: 1678,
      isFeatured: false,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Meeting Agenda Generator',
      slug: 'meeting-agenda-generator',
      description: 'Structures productive meetings with clear agendas, time allocations, decision frameworks, and action item tracking.',
      content: 'You are a meeting efficiency expert who helps teams cut meeting time by 40% while improving outcomes. Create a meeting agenda for [MEETING TYPE/PURPOSE] with [NUMBER] participants. Design: 1) Pre-Meeting: Meeting purpose statement (1 sentence), desired outcomes (3 max), required preparation for each attendee, pre-read materials list with estimated review time, 2) Agenda Structure: Opening context setting (2 min), each agenda item with: topic, owner, time allocation, type (discussion, decision, update, brainstorm), desired outcome for each item, 3) Decision Framework: For decision items, specify decision method (consensus, RAPID, majority vote), who is the decision maker, what information is needed, escalation path if no decision reached, 4) Facilitation Notes: Red flags to watch for (tangent, dominance, silence), intervention scripts for each, parking lot protocol, time-check milestones, 5) Closing Protocol: Decision summary (who decided what), action items with: owner, deadline, deliverable description, dependencies, next meeting purpose and date, 6) Post-Meeting Template: Meeting notes format, action item tracker, decision log, follow-up schedule. Also include: meeting cost calculator (salary-based), when this meeting should be an email instead, async alternative for each agenda item.',
      category: 'productivity-prompts',
      tags: 'productivity,meetings,agenda,efficiency,team-management',
      difficulty: 'beginner',
      views: 2345,
      likes: 189,
      copies: 876,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Goal Setting Framework',
      slug: 'goal-setting-framework',
      description: 'Develops SMART goal plans with milestone tracking, obstacle anticipation, and accountability systems for personal and professional goals.',
      content: 'You are a goal achievement coach who combines SMART framework, OKR methodology, and behavioral science. Create a comprehensive goal plan for [GOAL DESCRIPTION]. Develop: 1) SMART Goal Definition: Specific - exact outcome with measurable criteria, Measurable - key metrics and tracking method, Achievable - evidence this is realistic given current resources, Relevant - alignment with bigger picture/vision, Time-bound - deadline with interim checkpoints, 2) Outcome Mapping: Define the 3-5 key results that indicate goal achievement, for each key result define: baseline (current state), target, measurement method, tracking frequency, 3) Milestone Breakdown: Break goal into monthly milestones (3-6 months), for each milestone: specific deliverables, success criteria, potential obstacles with mitigation strategies, required resources, 4) Habit Architecture: Daily habits that compound toward the goal (3-5 habits), habit stacking formulas (After I [CURRENT HABIT], I will [NEW HABIT]), environment design suggestions, minimum viable effort for low-motivation days, 5) Obstacle Anticipation: Top 5 likely obstacles with if-then plans, "When [OBSTACLE] happens, I will [RESPONSE]", emotional obstacles and reframing strategies, 6) Accountability System: Weekly self-review questions, accountability partner check-in template, progress visualization method, celebration milestones, 7) Quarterly Reset: Review and recalibrate protocol, when to pivot vs persist. Include a one-page dashboard summary.',
      category: 'productivity-prompts',
      tags: 'productivity,goals,planning,habits,self-improvement',
      difficulty: 'intermediate',
      views: 3123,
      likes: 267,
      copies: 1234,
      isFeatured: false,
      isTrending: false,
      authorName: 'PromptNova Team',
    },

    // Social Media Prompts (3)
    {
      title: 'Instagram Caption Generator',
      slug: 'instagram-caption-generator',
      description: 'Creates engaging Instagram captions with hooks, storytelling, CTAs, and hashtag strategies for maximum engagement and reach.',
      content: 'You are an Instagram content strategist who knows the algorithm inside out. Create 5 Instagram caption variations for a post about [POST TOPIC/IMAGE DESCRIPTION]. For each caption include: 1) Hook Line (first line must stop the scroll): Use one of these formats - provocative question, bold statement, relatable observation, surprising statistic, or storytelling opener. Remember: only the first 2 lines show before "more", 2) Body Content: Tell a micro-story or share insight (3-5 sentences), use line breaks for readability (no wall of text), include 1-2 emoji strategically placed (not excessive), write at 6th-8th grade reading level, 3) CTA: End with an engagement-driving question or prompt, make it specific (not "what do you think?" but "which one would you choose: A or B?"), 4) Hashtag Strategy: 20-25 hashtags mixed as follows: 5 large (500K+ posts) for reach, 10 medium (10K-500K) for targeted reach, 10 small (under 10K) for niche discovery, no banned hashtags, relevant to content not just popular, 5) Alt Text Suggestion: Accessibility-focused image description. Also include: best posting time recommendation, carousel vs single image suggestion, and story companion post idea.',
      category: 'social-media-prompts',
      tags: 'instagram,social-media,caption,engagement,content',
      difficulty: 'beginner',
      views: 5890,
      likes: 467,
      copies: 2456,
      isFeatured: true,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'Twitter Thread Builder',
      slug: 'twitter-thread-builder',
      description: 'Builds viral thread content with hook optimization, narrative flow, and engagement strategies for X/Twitter.',
      content: 'You are a Twitter/X thread writer whose threads consistently get 100K+ impressions. Create a viral thread about [TOPIC]. Build a 8-12 tweet thread: 1) Tweet 1 (The Hook): Must stop the scroll and create FOMO, use one of these patterns: "I spent [TIME] researching [TOPIC]. Here is what I found:" OR "Nobody talks about [SURPRISING INSIGHT]. A thread:" OR "[BOLD CLAIM]. Here is the proof:", include a number or specific detail for credibility, end with "🧵" or "Thread 👇", 2) Tweets 2-9 (The Meat): Each tweet = one idea, one insight, or one step, start each with a transition or numbering for flow, include specific data points, examples, or frameworks, add relevant emoji as visual anchors, if sharing a list, use consistent formatting, 3) Tweet 10-11 (The Value Bomb): The most actionable tweet in the thread, format as a checklist, framework, or step-by-step, make it screenshot-worthy, 4) Final Tweet (The CTA): Summarize the key takeaway in one line, ask for a follow with reason to follow, link to related resource, thread bookmark reminder. Also include: 3 alternative hooks to A/B test, best posting time, quote tweet strategy, and reply engagement plan.',
      category: 'social-media-prompts',
      tags: 'twitter,thread,social-media,viral,content',
      difficulty: 'intermediate',
      views: 4321,
      likes: 345,
      copies: 1789,
      isFeatured: false,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
    {
      title: 'TikTok Script Generator',
      slug: 'tiktok-script-generator',
      description: 'Writes short-form video scripts with trending formats, hook strategies, and engagement patterns optimized for the TikTok algorithm.',
      content: 'You are a TikTok content creator who understands what goes viral. Create a TikTok script for [TOPIC/CONCEPT]. Design 3 script variations: Variation 1 - Educational/How-To: Hook (0-3 sec): "POV: You just discovered [SURPRISING FACT]" or "Stop scrolling if you want to [BENEFIT]", Setup (3-8 sec): Quick context, why this matters, Value Delivery (8-45 sec): Step-by-step or tip-by-tip, text on screen for each point, use trending transition style, CTA (45-60 sec): "Save this for later" or "Follow for part 2". Variation 2 - Storytelling: Hook: "Storytime:" or "This changed everything...", Build tension with each beat, cliffhanger at 30 sec if doing part 2 format, satisfying resolution. Variation 3 - List/Compilation: Hook: "[NUMBER] things about [TOPIC] that will blow your mind", rapid-fire format, each item gets 3-5 seconds, use text overlays and sound effects. For ALL variations include: text-on-screen suggestions (word for word), trending sound recommendations by category, filming tips (angles, lighting, props), caption with relevant hashtags (5-8), best posting time, duet/stitch potential, and comment engagement strategy with 3 seeded comments.',
      category: 'social-media-prompts',
      tags: 'tiktok,short-video,social-media,viral,script',
      difficulty: 'beginner',
      views: 5678,
      likes: 423,
      copies: 2134,
      isFeatured: false,
      isTrending: true,
      authorName: 'PromptNova Team',
    },
  ]

  const promptRecords = await Promise.all(
    prompts.map((prompt) => prisma.prompt.create({ data: prompt }))
  )
  console.log(`✅ Created ${promptRecords.length} prompts`)

  // ─── Tools ────────────────────────────────────────────────
  const tools = [
    {
      name: 'YouTube Title Generator',
      slug: 'youtube-title-generator',
      description: 'Generate click-worthy YouTube titles that boost your CTR and attract more viewers. Powered by AI to analyze trending patterns.',
      category: 'youtube',
      icon: 'Youtube',
      isFeatured: false,
      isPopular: true,
      usageCount: 23456,
    },
    {
      name: 'YouTube Tags Generator',
      slug: 'youtube-tags-generator',
      description: 'Get optimized YouTube tags to improve your video discoverability and rank higher in search results.',
      category: 'youtube',
      icon: 'Hash',
      isFeatured: false,
      isPopular: true,
      usageCount: 19876,
    },
    {
      name: 'Thumbnail Prompt Generator',
      slug: 'thumbnail-prompt-generator',
      description: 'Create AI-powered thumbnail concepts that grab attention and increase click-through rates for your videos.',
      category: 'youtube',
      icon: 'Image',
      isFeatured: false,
      isPopular: false,
      usageCount: 8765,
    },
    {
      name: 'AI Bio Generator',
      slug: 'ai-bio-generator',
      description: 'Craft the perfect bio for any social media platform. Professional, creative, or fun — get AI-generated bios that stand out.',
      category: 'social-media',
      icon: 'User',
      isFeatured: false,
      isPopular: true,
      usageCount: 31234,
    },
    {
      name: 'AI Hook Generator',
      slug: 'ai-hook-generator',
      description: 'Generate attention-grabbing hooks for your content that stop the scroll and keep your audience engaged from the first second.',
      category: 'marketing',
      icon: 'Anchor',
      isFeatured: false,
      isPopular: false,
      usageCount: 12345,
    },
    {
      name: 'AI Hashtag Generator',
      slug: 'ai-hashtag-generator',
      description: 'Get the perfect mix of hashtags to maximize your social media reach. Combines trending, niche, and evergreen tags for optimal visibility.',
      category: 'social-media',
      icon: 'Hash',
      isFeatured: true,
      isPopular: false,
      usageCount: 27890,
    },
    {
      name: 'AI Caption Generator',
      slug: 'ai-caption-generator',
      description: 'Create engaging captions for Instagram, TikTok, and more. AI-powered captions that drive likes, comments, and shares.',
      category: 'social-media',
      icon: 'MessageSquare',
      isFeatured: false,
      isPopular: false,
      usageCount: 15678,
    },
    {
      name: 'AI Script Summarizer',
      slug: 'ai-script-summarizer',
      description: 'Quickly summarize long scripts and documents into concise, actionable summaries. Save hours of reading time.',
      category: 'productivity',
      icon: 'FileText',
      isFeatured: false,
      isPopular: false,
      usageCount: 9876,
    },
    {
      name: 'Word Counter',
      slug: 'word-counter',
      description: 'Count words, characters, sentences, and paragraphs instantly. Perfect tool for writers, students, and content creators.',
      category: 'utility',
      icon: 'Type',
      isFeatured: false,
      isPopular: false,
      usageCount: 45678,
    },
    {
      name: 'QR Code Generator',
      slug: 'qr-code-generator',
      description: 'Generate custom QR codes for URLs, text, WiFi, and more. Free, instant, and no sign-up required.',
      category: 'utility',
      icon: 'QrCode',
      isFeatured: false,
      isPopular: false,
      usageCount: 34567,
    },
    {
      name: 'AI Email Writer',
      slug: 'ai-email-writer',
      description: 'Write professional emails in seconds. From cold outreach to follow-ups, get perfectly crafted emails for any business situation.',
      category: 'business',
      icon: 'Mail',
      isFeatured: false,
      isPopular: false,
      usageCount: 18765,
    },
    {
      name: 'Meta Description Generator',
      slug: 'meta-description-generator',
      description: 'Create SEO-optimized meta descriptions that improve click-through rates from search results. AI-powered for maximum impact.',
      category: 'seo',
      icon: 'Search',
      isFeatured: true,
      isPopular: false,
      usageCount: 22345,
    },
  ]

  const toolRecords = await Promise.all(
    tools.map((tool) => prisma.tool.create({ data: tool }))
  )
  console.log(`✅ Created ${toolRecords.length} tools`)

  // ─── Blog Posts ───────────────────────────────────────────
  const blogPosts = [
    {
      title: 'Best ChatGPT Prompts for 2026',
      slug: 'best-chatgpt-prompts-2026',
      excerpt: 'Discover the most powerful ChatGPT prompts that are transforming how people work, create, and communicate in 2026. From writing to coding, these prompts deliver exceptional results.',
      content: `# Best ChatGPT Prompts for 2026

The landscape of AI prompting has evolved dramatically, and knowing the right prompts can be the difference between mediocre outputs and extraordinary results. Whether you're a content creator, developer, entrepreneur, or student, these carefully crafted prompts will help you unlock ChatGPT's full potential.

## Why Prompt Engineering Matters More Than Ever

In 2026, ChatGPT has become an essential tool for millions of professionals worldwide. However, the gap between a basic user and a power user comes down to one critical skill: prompt engineering. The way you frame your request directly impacts the quality, relevance, and usefulness of the AI's response.

Studies show that users who employ structured, detailed prompts report 3x higher satisfaction with AI outputs compared to those using simple queries. This isn't just about getting better answers—it's about fundamentally transforming your workflow.

## Top 10 ChatGPT Prompts for Productivity

### 1. The Deep Work Priming Prompt
Before starting any focused work session, use this prompt to get ChatGPT to help you structure your deep work block. It considers your energy levels, priorities, and optimal focus windows to create a personalized productivity schedule.

### 2. The Decision Framework Prompt
When facing complex decisions, ChatGPT can serve as an objective analyst. This prompt guides the AI through a systematic evaluation of options using weighted criteria, risk assessment, and scenario planning.

### 3. The Learning Accelerator Prompt
Instead of passively reading about a new topic, this prompt turns ChatGPT into an interactive tutor that adapts to your learning style, provides real-world examples, and tests your understanding with targeted questions.

## Best Prompts for Content Creators

Content creators face unique challenges in 2026—the demand for fresh, engaging content has never been higher. These prompts help you maintain quality while increasing output:

**The Viral Content Analyzer:** Feed ChatGPT your best-performing content and ask it to identify patterns that made them successful. Then request new content ideas that incorporate those patterns.

**The Repurposing Engine:** Take one piece of long-form content and transform it into 10+ micro-content pieces optimized for different platforms. This alone can save content teams 15+ hours per week.

**The Audience Research Assistant:** Generate detailed audience personas based on your niche, complete with pain points, content preferences, and engagement patterns.

## Coding and Development Prompts

Developers are finding that the right prompts can reduce debugging time by up to 60%. The key is providing sufficient context:

\`\`\`
Instead of: "Fix this code"
Try: "Analyze this [language] code for [specific issue type]. 
Consider: edge cases, performance implications, 
and compatibility with [framework/version]. 
Provide the fix with explanations and suggest 
2-3 preventive patterns."
\`\`\`

## The Future of Prompting

As AI models become more capable, the art of prompting is shifting from "tricking" the AI into giving good answers to clearly communicating your intent and constraints. The best prompt engineers of 2026 focus on clarity, context, and structured thinking rather than clever wordplay.

## Key Takeaways

1. Structure your prompts with clear sections: role, task, context, constraints, and output format
2. Always provide examples of desired output when possible
3. Use iterative prompting—refine based on initial outputs
4. Build a personal prompt library for recurring tasks
5. Stay updated on new prompting techniques as AI models evolve

Ready to transform your AI workflow? Explore our full library of [ChatGPT prompts](/prompts/chatgpt) to find the perfect prompts for your needs.`,
      category: 'AI Prompts',
      tags: 'chatgpt,prompts,ai,productivity,content-creation',
      authorName: 'PromptNova Team',
      isPublished: true,
      views: 12456,
    },
    {
      title: 'Top 10 AI Tools Every Creator Needs',
      slug: 'top-10-ai-tools-creators',
      excerpt: 'From video editing to content planning, these AI tools are revolutionizing how creators work. Here are the must-have tools that top creators are using in 2026.',
      content: `# Top 10 AI Tools Every Creator Needs in 2026

The creator economy has been completely transformed by AI tools. What used to take hours now takes minutes, and what used to require a team can now be done solo. But with thousands of AI tools flooding the market, which ones actually deliver? After testing over 200 tools, here are the 10 that every creator should have in their arsenal.

## 1. AI-Powered Video Editor

Gone are the days of spending hours cutting footage. Modern AI video editors can automatically detect the best moments, remove silence, add captions, and even suggest transitions. The best ones learn your editing style over time and make increasingly accurate suggestions.

**Key Features to Look For:**
- Auto-captioning with 98%+ accuracy
- Smart cut detection that preserves narrative flow
- One-click repurposing for different platforms
- Real-time collaboration capabilities

## 2. AI Content Research Assistant

The biggest time-sink for creators isn't creating—it's researching. AI research assistants can scan thousands of sources, identify trending topics in your niche, and compile comprehensive briefs in minutes rather than hours.

**Why This Matters:** Creators who use AI research tools report publishing 40% more content while maintaining or improving quality scores.

## 3. Thumbnail and Visual AI Generator

Your thumbnail is your first impression. AI thumbnail generators analyze millions of high-performing thumbnails to suggest compositions, colors, and text overlays that maximize click-through rates. Some can even generate custom imagery based on your video content.

## 4. AI Social Media Scheduler

Not just a scheduler—an AI strategist. These tools analyze your audience's engagement patterns, determine optimal posting times, suggest content modifications for each platform, and even generate platform-specific captions from your long-form content.

## 5. Voice Cloning and Enhancement

Whether you need to fix a flubbed line or create content in multiple languages, AI voice tools have become indispensable. The latest versions are nearly indistinguishable from natural speech and can replicate your voice with just 30 seconds of sample audio.

## 6. AI Writing Assistant

Beyond basic grammar checking, modern AI writing assistants understand your brand voice, maintain consistency across all content, and can generate everything from email newsletters to video scripts while matching your unique style.

## 7. Analytics and Insights Platform

AI-powered analytics go beyond basic metrics. They identify patterns you'd never spot manually, predict which content will perform best, and provide actionable recommendations for growth based on your specific niche and audience.

## 8. AI Music and Sound Effects Generator

Finding the right background music or sound effect is no longer a licensing headache. AI music generators create custom, royalty-free tracks that match the mood and pacing of your content perfectly.

## 9. Automated Repurposing Engine

One piece of content should fuel your entire content calendar. AI repurposing tools can transform a single YouTube video into blog posts, Twitter threads, Instagram carousels, email newsletters, and podcast episodes—all optimized for their respective platforms.

## 10. AI Project Management for Creators

Managing the business side of creation is often the biggest barrier to growth. AI project management tools designed specifically for creators handle sponsor deliverables, content calendars, revenue tracking, and team coordination automatically.

## The Compound Effect

Individually, each of these tools saves you time. Together, they create a compound effect that can transform a part-time creator into a full-time content business. The key is integration—tools that work together create workflows that are greater than the sum of their parts.

## Getting Started

Don't try to adopt all 10 at once. Start with the tools that address your biggest pain points, master them, then gradually add others. Most of these tools offer free tiers, so you can test before committing.

Ready to supercharge your creative workflow? Check out our [free AI tools](/tools) collection to get started today.`,
      category: 'AI Tools',
      tags: 'ai-tools,creators,productivity,content-creation,video',
      authorName: 'PromptNova Team',
      isPublished: true,
      views: 8934,
    },
    {
      title: 'YouTube Growth Tips with AI',
      slug: 'youtube-growth-tips-ai',
      excerpt: 'Learn how top YouTubers are leveraging AI to grow their channels faster. From scripting to SEO, discover the AI-powered strategies driving YouTube success.',
      content: `# YouTube Growth Tips with AI: The Complete Guide

Growing a YouTube channel in 2026 requires more than just great content—it requires smart systems. The most successful creators are using AI not to replace their creativity, but to amplify it. Here's your complete guide to AI-powered YouTube growth.

## The AI-Powered YouTube Workflow

The most efficient YouTube creators have built AI into every stage of their content pipeline. Here's how the best are doing it:

### Stage 1: Research and Ideation

AI tools can analyze trending topics in your niche, identify content gaps, and predict which ideas have the highest growth potential. Instead of guessing what your audience wants, you can make data-driven decisions about every video.

**Pro Tip:** Use AI to analyze your top 10 performing videos. Look for patterns in topic, format, length, and posting time. Then ask AI to generate 20 video ideas that incorporate those successful patterns.

### Stage 2: Scripting

The biggest mistake creators make with AI scripting is asking it to write the entire script. Instead, use AI as a co-writer:
- Generate multiple hook options and A/B test them
- Use AI to structure your main points for maximum retention
- Let AI handle the research while you add personal stories and opinions
- Have AI suggest pattern interrupts and engagement beats

### Stage 3: Production

AI tools for production have exploded in 2026:
- **Auto-captioning** with 99% accuracy saves hours of manual work
- **AI-powered editing** can create rough cuts from raw footage in minutes
- **Smart B-roll suggestion** engines recommend relevant stock footage
- **Audio enhancement** tools clean up background noise and normalize levels automatically

### Stage 4: Optimization

This is where AI gives you the biggest competitive advantage:

**Title Optimization:** AI can generate 20+ title variations and predict which will have the highest CTR based on patterns from millions of videos.

**Thumbnail Analysis:** Upload your thumbnail to AI analysis tools that score it against proven CTR patterns and suggest improvements.

**Description and Tags:** AI generates SEO-optimized descriptions with natural keyword integration, proper timestamps, and strategic hashtag placement.

### Stage 5: Distribution and Engagement

- AI scheduling tools determine your optimal posting times
- Automated community tab posts keep your audience engaged between uploads
- AI-generated response suggestions help you engage with comments faster
- Smart notification systems alert you to trending topics in your niche for timely content

## The Numbers Don't Lie

Creators who systematically use AI across their workflow report:
- **2.5x** more content output
- **40%** increase in average view duration
- **65%** improvement in click-through rates
- **3x** faster subscriber growth

## Common Mistakes to Avoid

1. **Over-relying on AI for creativity** — Your unique perspective is irreplaceable
2. **Ignoring AI suggestions entirely** — Data-driven decisions outperform gut feelings
3. **Using the same AI-generated content as everyone else** — Always customize and add your voice
4. **Focusing only on creation AI** — Distribution and optimization AI often provides faster ROI

## Building Your AI YouTube Stack

Start with these three free tools from our collection:
1. [YouTube Title Generator](/tools/youtube-title-generator) — for high-CTR titles
2. [YouTube Tags Generator](/tools/youtube-tags-generator) — for discoverability
3. [Thumbnail Prompt Generator](/tools/thumbnail-prompt-generator) — for click-worthy visuals

Then expand as you see results. The key is consistent application—not trying every tool at once, but deeply integrating a few that address your biggest bottlenecks.

## The Future of AI on YouTube

YouTube itself is increasingly AI-powered, from recommendation algorithms to automatic dubbing. Creators who understand and work with these AI systems—rather than against them—will have an enormous advantage in the coming years.

Start building your AI-powered YouTube workflow today, and you'll be amazed at how quickly compounding improvements transform your channel's growth trajectory.`,
      category: 'YouTube',
      tags: 'youtube,growth,ai,content-strategy,video',
      authorName: 'PromptNova Team',
      isPublished: true,
      views: 6789,
    },
    {
      title: 'AI SEO Guide for Beginners',
      slug: 'ai-seo-guide-beginners',
      excerpt: 'Master SEO with AI tools even if you are starting from zero. This beginner-friendly guide shows you how to leverage AI for keyword research, content optimization, and ranking higher.',
      content: `# AI SEO Guide for Beginners: Rank Higher with Less Effort

Search engine optimization used to require years of experience and countless hours of manual work. Not anymore. AI has democratized SEO, making it accessible to anyone willing to learn the basics. This guide will walk you through everything you need to know to start ranking with AI-powered tools and techniques.

## Understanding Modern SEO

Before diving into AI tools, let's cover the fundamentals. SEO in 2026 is about three things:

1. **Relevance** — Does your content match what people are searching for?
2. **Authority** — Does your site have credibility in your niche?
3. **Experience** — Does your content provide genuine value?

AI helps with all three, but it's especially powerful for relevance and experience.

## Step 1: AI-Powered Keyword Research

Traditional keyword research was tedious—spreadsheets, search volume data, competition analysis. AI simplifies this dramatically.

### How to Use AI for Keywords

Start by describing your business or content topic to an AI tool. It will generate:
- Primary keywords with estimated search volume
- Long-tail variations with lower competition
- Related topics and questions people are asking
- Seasonal trends and emerging search patterns

**Beginner Tip:** Focus on long-tail keywords (3-5 word phrases). They have less competition and more specific intent, making them easier to rank for.

## Step 2: Content Planning with AI

Once you have keywords, AI can help you plan content that ranks:

### Content Cluster Strategy

1. Choose a broad topic (pillar)
2. Use AI to generate 8-12 related subtopics (clusters)
3. Create comprehensive content for each subtopic
4. Link them all back to your pillar content

This structure signals to search engines that you're an authority on the topic.

### Content Brief Generation

AI can create detailed content briefs that include:
- Target primary and secondary keywords
- Recommended word count based on top-ranking pages
- Suggested headings and subheadings
- Key points to cover
- Internal linking opportunities
- Related questions to answer

## Step 3: Writing SEO-Optimized Content

AI writing assistants can help you create content that ranks, but there's a right way and wrong way to use them:

### The Right Way
- Use AI to create outlines and first drafts
- Add your expertise, personal experience, and unique insights
- Have AI check for keyword optimization and readability
- Edit for your brand voice and accuracy

### The Wrong Way
- Publishing AI-generated content without review
- Stuffing keywords unnaturally
- Ignoring your audience's actual needs
- Copying competitor content structure exactly

## Step 4: On-Page Optimization

AI tools excel at on-page optimization. Here's what to focus on:

**Title Tags:** Use AI to generate title options that include your target keyword naturally and create curiosity.

**Meta Descriptions:** Our [Meta Description Generator](/tools/meta-description-generator) creates compelling descriptions that improve click-through rates.

**Header Structure:** AI can ensure your H1-H6 hierarchy is logical and keyword-optimized.

**Internal Linking:** AI can analyze your content and suggest relevant internal links based on topic relationships.

**Image Alt Text:** Generate descriptive, keyword-rich alt text automatically.

## Step 5: Technical SEO Basics

Even beginners should understand these technical fundamentals:

- **Site Speed:** AI tools can identify performance bottlenecks and suggest fixes
- **Mobile Optimization:** Ensure your site works perfectly on all devices
- **Schema Markup:** AI can generate structured data to help search engines understand your content
- **XML Sitemaps:** Automatically updated as you add new content

## Step 6: Measuring Success

Track these key metrics:
- Organic traffic growth (week over week)
- Keyword rankings for target terms
- Click-through rate from search results
- Time on page and bounce rate
- Pages per session

AI analytics tools can surface insights from this data that you might miss manually.

## Common Beginner Mistakes

1. **Targeting keywords that are too competitive** — Start with easier wins
2. **Ignoring search intent** — Match your content type to what searchers want
3. **Publishing thin content** — AI makes it easy to go deep; there's no excuse
4. **Forgetting about user experience** — SEO is worthless if visitors bounce
5. **Not tracking results** — You can't improve what you don't measure

## Your First Month Action Plan

**Week 1:** Use AI to find 20 target keywords in your niche
**Week 2:** Create content briefs for your top 5 keywords
**Week 3:** Write and optimize your first 3 articles using AI assistance
**Week 4:** Submit to search engines, build initial links, and start tracking

SEO is a marathon, not a sprint. But with AI tools, you can run that marathon much faster. Start with our free [Meta Description Generator](/tools/meta-description-generator) and build your AI SEO stack from there.`,
      category: 'SEO',
      tags: 'seo,ai,beginner,keyword-research,content-optimization',
      authorName: 'PromptNova Team',
      isPublished: true,
      views: 5432,
    },
    {
      title: 'How to Make Money with AI Prompts',
      slug: 'make-money-ai-prompts',
      excerpt: 'Turn your prompt engineering skills into income. Learn the proven strategies for monetizing AI prompts, from selling templates to building a prompt business.',
      content: `# How to Make Money with AI Prompts: The Complete Guide

The prompt economy is real, and it's growing fast. What started as a niche skill has become a legitimate income stream for thousands of people worldwide. Whether you want to earn a side income or build a full-time business, this guide covers every monetization strategy that actually works in 2026.

## The Prompt Economy: By the Numbers

Before diving in, let's look at why this matters:
- The AI prompt market is projected to reach $500M by 2027
- Top prompt engineers earn $150-300/hour as freelancers
- Prompt marketplace sales have grown 400% year-over-year
- Companies are hiring full-time prompt engineers at $80-150K salaries

## Strategy 1: Sell Prompt Templates

The most straightforward way to monetize your prompt skills is by creating and selling prompt templates.

### What Sells Best
- Industry-specific prompt packs (real estate, healthcare, legal)
- Workflow automation prompts (save 10+ hours per week)
- Creative prompt collections (Midjourney, Stable Diffusion)
- Business operations prompts (email, proposals, reports)

### Where to Sell
- Prompt marketplaces (specialized platforms)
- Your own website with digital downloads
- Gumroad, Etsy, or similar platforms
- As part of consulting packages

### Pricing Strategy
- Single prompt: $2-5
- Prompt pack (10-20 prompts): $15-30
- Complete prompt library (50+ prompts): $50-100
- Custom prompt development: $50-200 per prompt

## Strategy 2: Prompt Engineering Freelancing

Businesses need experts who can craft effective prompts for their specific use cases. This is where freelancing comes in.

### Services to Offer
- **Prompt Auditing:** Review and improve existing prompts
- **Custom Prompt Development:** Build prompts for specific business needs
- **Prompt Training:** Teach teams how to write better prompts
- **AI Workflow Design:** Create complete AI-powered workflows

### Finding Clients
- Upwork and Fiverr for entry-level gigs
- LinkedIn for premium corporate clients
- Referral networks from satisfied customers
- Content marketing (write about prompt engineering to attract clients)

### Building Your Rate
Start at $50/hour, build a portfolio, then increase to $150-300/hour as you demonstrate ROI for clients.

## Strategy 3: Build a Prompt-Powered SaaS

This is the most scalable option. Identify a repetitive task that AI prompts can automate, wrap it in a simple interface, and charge a subscription.

### Examples That Work
- AI email writer for specific industries
- Automated report generator
- Social media content calendar creator
- SEO content brief generator
- Customer response automation

### The Build Process
1. Identify a painful, repetitive task
2. Create a prompt that solves it well
3. Build a simple web interface around it
4. Charge $10-50/month subscription
5. Iterate based on user feedback

## Strategy 4: Content Creation and Education

If you're good at prompt engineering, you can earn by teaching others:

### Revenue Streams
- **YouTube channel:** Tutorial content with ad revenue and sponsorships
- **Online courses:** $50-200 per course enrollment
- **Newsletter:** Free content with premium tier ($10-20/month)
- **Community:** Paid Discord/Skool community ($20-50/month)
- **Book/eBook:** One-time purchase, evergreen income

### Content That Attracts
- "Prompt of the week" breakdowns
- Before/after prompt demonstrations
- Industry-specific prompt guides
- Tool reviews and comparisons
- Prompt engineering challenges

## Strategy 5: AI Automation Agency

Build an agency that helps businesses implement AI solutions using your prompt expertise.

### Service Packages
- **Starter ($2,000-5,000):** AI audit + 10 custom prompts
- **Growth ($5,000-15,000):** Full AI workflow implementation
- **Enterprise ($15,000+):** Complete AI transformation with ongoing support

### How to Start
1. Get 3-5 case studies by offering discounted services
2. Document the ROI you deliver
3. Create case study content
4. Cold outreach to businesses in your niche
5. Scale with contractors as demand grows

## The Compound Strategy

The most successful prompt entrepreneurs combine multiple strategies:
1. Create free content that demonstrates expertise (Strategy 4)
2. Sell prompt templates for passive income (Strategy 1)
3. Take on freelancing clients who discover you through content (Strategy 2)
4. Use client insights to identify SaaS opportunities (Strategy 3)
5. Scale the most promising SaaS into an agency model (Strategy 5)

## Getting Started Today

You don't need permission or a big investment to start. Here's your first step:

1. Pick one strategy from above
2. Create 5-10 high-quality prompts in a niche you know
3. Put them out into the world (free or paid)
4. Listen to feedback and improve
5. Scale what works

The prompt economy rewards action takers. Start building your prompt business today, and check out our [prompt library](/prompts) for inspiration and examples of what high-quality prompts look like.`,
      category: 'Business',
      tags: 'make-money,ai-prompts,business,freelancing,entrepreneurship',
      authorName: 'PromptNova Team',
      isPublished: true,
      views: 9876,
    },
  ]

  const blogRecords = await Promise.all(
    blogPosts.map((post) => prisma.blogPost.create({ data: post }))
  )
  console.log(`✅ Created ${blogRecords.length} blog posts`)

  console.log('\n🎉 Seeding complete!')
  console.log(`  - ${categoryRecords.length} categories`)
  console.log(`  - ${promptRecords.length} prompts`)
  console.log(`  - ${toolRecords.length} tools`)
  console.log(`  - ${blogRecords.length} blog posts`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
