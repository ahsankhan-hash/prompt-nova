import { ScrollReveal } from "@/components/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using PromptNova AI services, including our AI prompt library and free tools.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
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
              Terms of Service
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
                Welcome to PromptNova AI. These Terms of Service govern your use of the
                PromptNova AI website, AI prompt library, free tools, and related services
                (collectively, the &quot;Services&quot;). By accessing or using our Services, you
                agree to be bound by these Terms. If you do not agree to these Terms, please do
                not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By creating an account or using any of our Services, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of Service, as well as our
                Privacy Policy, which is incorporated by reference herein. These Terms constitute
                a legally binding agreement between you and PromptNova AI.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you are using the Services on behalf of an organization, you represent and
                warrant that you have the authority to bind that organization to these Terms, and
                the terms &quot;you&quot; and &quot;your&quot; will refer to that organization.
                You must be at least 13 years of age to use our Services. If you are under 18,
                you represent that your parent or legal guardian has reviewed and agreed to these
                Terms on your behalf.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Use of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to use our Services only for lawful purposes and in accordance with
                these Terms. You agree not to use the Services in any way that violates any
                applicable federal, state, local, or international law or regulation, including
                without limitation, any laws regarding the export of data or software. You must
                not attempt to gain unauthorized access to any portion of the Services, other
                accounts, computer systems, or networks connected to the Services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You are solely responsible for any content you input into our AI tools and any
                output generated from that content. You agree not to use our Services to generate
                content that is illegal, harmful, threatening, abusive, defamatory, vulgar,
                obscene, or otherwise objectionable. We reserve the right to restrict or terminate
                access to our Services for anyone who violates these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Services and their original content, features, and functionality are and will
                remain the exclusive property of PromptNova AI and its licensors. The Services
                are protected by copyright, trademark, and other laws of both the United States
                and foreign countries. Our trademarks and trade dress may not be used in
                connection with any product or service without the prior written consent of
                PromptNova AI.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The prompts, tools, and other content provided through our Services are made
                available for your personal, non-commercial use unless otherwise specified. You
                may not reproduce, distribute, modify, create derivative works of, publicly
                display, publicly perform, republish, download, store, or transmit any of the
                material on our Services, except as permitted by these Terms or with our prior
                written consent. Prompts marked as free for commercial use may be used in
                accordance with their specific licensing terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. User Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Services may allow you to post, submit, or share content, including but not
                limited to AI prompts, feedback, and other materials. You retain all rights to
                any content you submit, post, or display on or through the Services. By
                submitting content to PromptNova AI, you grant us a worldwide, non-exclusive,
                royalty-free license to use, reproduce, modify, and distribute such content for
                the purpose of providing and improving our Services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You represent and warrant that you own or control all rights in and to the content
                you submit, and that the content does not violate any third party&apos;s
                intellectual property or other rights. We reserve the right to remove any content
                that, in our sole discretion, violates these Terms or is otherwise objectionable.
                We have no obligation to monitor user content, but we may do so and remove any
                content that violates our guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
                basis. PromptNova AI makes no warranties, expressed or implied, and hereby
                disclaims all warranties, including without limitation, implied warranties of
                merchantability, fitness for a particular purpose, and non-infringement. We do
                not warrant that the Services will function uninterrupted, secure, or error-free,
                that defects will be corrected, or that the Services will be free of viruses or
                other harmful components.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The AI-generated content produced by our tools is provided for informational and
                creative purposes only. We make no guarantees regarding the accuracy, reliability,
                completeness, or timeliness of AI-generated outputs. You should independently
                verify any information generated by our tools before relying on it for
                professional, legal, medical, or financial decisions. PromptNova AI is not
                responsible for any decisions you make based on AI-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In no event shall PromptNova AI, its directors, employees, partners, agents,
                suppliers, or affiliates be liable for any indirect, incidental, special,
                consequential, or punitive damages, including without limitation, loss of profits,
                data, use, goodwill, or other intangible losses, resulting from your access to or
                use of or inability to access or use the Services, any conduct or content of any
                third party on the Services, or any content obtained from the Services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This limitation of liability applies regardless of the legal theory under which
                such damages are sought, whether based on warranty, contract, tort (including
                negligence), strict liability, or any other legal theory, even if we have been
                advised of the possibility of such damages. In no event shall our total liability
                to you for all claims arising out of or relating to the use of the Services exceed
                the amount you have paid to PromptNova AI in the twelve months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to modify or replace these Terms at any time at our sole
                discretion. If a revision is material, we will try to provide at least 30 days&apos;
                notice prior to any new terms taking effect. What constitutes a material change
                will be determined at our sole discretion. We will notify you of significant
                changes by posting the new Terms on our website and updating the &quot;Last
                updated&quot; date at the top of this page.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By continuing to access or use our Services after those revisions become effective,
                you agree to be bound by the revised terms. If you do not agree to the new terms,
                in whole or in part, please stop using the Services. It is your responsibility to
                review these Terms periodically for changes. Your continued use of the Services
                following the posting of revised Terms means that you accept and agree to the
                changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at
                legal@promptnova.ai or write to us at PromptNova AI, 123 Market Street, San
                Francisco, CA 94105. We are committed to addressing any concerns you may have
                regarding these Terms and will make reasonable efforts to resolve any disputes
                through good faith negotiation before either party seeks formal legal remedies.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
