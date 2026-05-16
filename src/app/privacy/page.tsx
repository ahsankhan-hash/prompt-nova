import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how PromptNova AI collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="size-6 text-primary" />
              <Badge variant="secondary" className="text-xs">
                Legal
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: March 1, 2026
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal delay={0.1}>
          <div className="prose-custom space-y-10">
            <section>
              <p className="text-muted-foreground leading-relaxed">
                At PromptNova AI, we take your privacy seriously. This Privacy Policy describes how
                we collect, use, disclose, and safeguard your information when you visit our
                website, use our tools, or interact with our services. Please read this policy
                carefully to understand our practices regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information that you provide directly to us when you use our services.
                This includes personal information such as your name, email address, and any other
                details you choose to provide when creating an account, subscribing to our
                newsletter, or contacting us for support. We also collect information automatically
                when you interact with our platform, including your IP address, browser type,
                operating system, device information, and usage data about how you access and use
                our services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Additionally, when you use our AI tools, we may temporarily process the text input
                you provide to generate results. This input is not stored permanently and is only
                used to provide you with the requested output. We do not use your input data to
                train our AI models or share it with third parties for any purpose beyond providing
                the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to provide, maintain, and improve our services,
                including processing your requests, sending you technical notices and support
                messages, and responding to your comments and questions. We also use your
                information to send you promotional communications, such as newsletters and
                updates about new features, tools, and prompts, but only if you have opted in to
                receive such communications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Your data helps us monitor and analyze trends, usage, and activities in connection
                with our services. This allows us to detect, investigate, and prevent fraudulent
                transactions and abuse, as well as to personalize and improve your experience on
                our platform. We may also use aggregated, non-personally identifiable information
                for research, analytics, and reporting purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our service
                and hold certain information. Cookies are files with a small amount of data which
                may include an anonymous unique identifier. You can instruct your browser to refuse
                all cookies or to indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We use both session cookies and persistent cookies. Session cookies expire when you
                close your browser, while persistent cookies remain on your device until they
                expire or you delete them. We use cookies for essential functions like keeping you
                logged in, remembering your preferences, and analyzing how you use our platform to
                improve our services. Third-party analytics services like Google Analytics may also
                place cookies to help us understand site usage patterns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may employ third-party companies and individuals to facilitate our service,
                provide the service on our behalf, perform service-related activities, or assist
                us in analyzing how our service is used. These third parties have access to your
                personal information only to perform these tasks on our behalf and are obligated
                not to disclose or use it for any other purpose.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our service may contain links to third-party websites or services that are not
                owned or controlled by PromptNova AI. We have no control over, and assume no
                responsibility for, the content, privacy policies, or practices of any
                third-party websites or services. We strongly advise you to read the terms and
                privacy policies of any third-party websites or services that you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The security of your data is important to us. We implement commercially reasonable
                security measures to protect your personal information from unauthorized access,
                alteration, disclosure, or destruction. These measures include encryption of data
                in transit using SSL/TLS, secure storage of sensitive information, and regular
                security audits of our systems and processes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                However, no method of transmission over the Internet or method of electronic
                storage is 100% secure. While we strive to use commercially acceptable means to
                protect your personal information, we cannot guarantee its absolute security. We
                encourage you to use strong passwords and to never share your login credentials
                with others.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have the right to access, update, or delete
                your personal information. You may also have the right to object to or restrict
                certain processing of your data, or to request data portability. If you wish to
                exercise any of these rights, please contact us using the information provided
                below, and we will respond to your request in accordance with applicable law.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You can unsubscribe from our promotional communications at any time by clicking
                the unsubscribe link in any email we send or by contacting us directly. You may
                also opt out of receiving targeted advertising from third-party ad networks by
                visiting their respective opt-out pages. We will retain your personal information
                only for as long as necessary to fulfill the purposes outlined in this Privacy
                Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at
                privacy@promptnova.ai or write to us at PromptNova AI, 123 Market Street,
                San Francisco, CA 94105. We are committed to working with you to resolve any
                complaints or concerns about your privacy and our handling of your personal
                information. We review and update this Privacy Policy periodically, and any
                changes will be posted on this page with an updated revision date.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
