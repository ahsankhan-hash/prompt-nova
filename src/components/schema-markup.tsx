interface WebsiteSchema {
  "@type": "WebSite"
  name: string
  url: string
  description: string
  potentiAction: {
    "@type": "SearchAction"
    target: string
    "query-input": string
  }
}

interface SoftwareApplicationSchema {
  "@type": "SoftwareApplication"
  name: string
  applicationCategory: string
  operatingSystem: string
  description?: string
  offers: {
    "@type": "Offer"
    price: string
    priceCurrency: string
  }
}

interface ArticleSchema {
  "@type": "Article"
  headline: string
  description?: string
  author: {
    "@type": "Person"
    name: string
  }
  datePublished: string
  dateModified: string
  publisher: {
    "@type": "Organization"
    name: string
    url: string
  }
}

interface FAQSchema {
  "@type": "FAQPage"
  mainEntity: Array<{
    "@type": "Question"
    name: string
    acceptedAnswer: {
      "@type": "Answer"
      text: string
    }
  }>
}

type SchemaType = "website" | "softwareApplication" | "article" | "faq"

interface SchemaMarkupProps {
  type: "website"
  data?: Partial<WebsiteSchema>
}

interface SoftwareAppProps {
  type: "softwareApplication"
  data: SoftwareApplicationSchema
}

interface ArticleProps {
  type: "article"
  data: ArticleSchema
}

interface FAQProps {
  type: "faq"
  data: FAQSchema
}

type SchemaMarkupProps = SchemaMarkupProps | SoftwareAppProps | ArticleProps | FAQProps

function buildSchemaJson(props: SchemaMarkupProps): Record<string, unknown> {
  const context = "https://schema.org"

  switch (props.type) {
    case "website":
      return {
        "@context": context,
        "@type": "WebSite",
        name: props.data?.name || "PromptNova AI",
        url: props.data?.url || "https://promptnova.ai",
        description:
          props.data?.description || "Discover Viral AI Prompts & Free Creator Tools",
        potentiAction: props.data?.potentiAction || {
          "@type": "SearchAction",
          target: "https://promptnova.ai/prompts?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }

    case "softwareApplication":
      return {
        "@context": context,
        ...props.data,
      }

    case "article":
      return {
        "@context": context,
        ...props.data,
      }

    case "faq":
      return {
        "@context": context,
        ...props.data,
      }
  }
}

export function SchemaMarkup(props: SchemaMarkupProps) {
  const schema = buildSchemaJson(props)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Helper functions for creating schemas
export function createWebsiteSchema(
  overrides?: Partial<WebsiteSchema>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: overrides?.name || "PromptNova AI",
    url: overrides?.url || "https://promptnova.ai",
    description:
      overrides?.description || "Discover Viral AI Prompts & Free Creator Tools",
    potentiAction: overrides?.potentiAction || {
      "@type": "SearchAction",
      target: "https://promptnova.ai/prompts?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }
}

export function createSoftwareApplicationSchema(data: {
  name: string
  description?: string
  applicationCategory?: string
  operatingSystem?: string
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: data.name,
    description: data.description,
    applicationCategory: data.applicationCategory || "UtilityApplication",
    operatingSystem: data.operatingSystem || "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }
}

export function createArticleSchema(data: {
  headline: string
  description?: string
  authorName: string
  datePublished: string
  dateModified: string
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    author: {
      "@type": "Person",
      name: data.authorName,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    publisher: {
      "@type": "Organization",
      name: "PromptNova AI",
      url: "https://promptnova.ai",
    },
  }
}

export function createFAQSchema(
  items: Array<{ question: string; answer: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}
