import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalLayout,
  LegalSection,
  P,
  UL,
  Callout,
  type LegalSectionMeta,
} from "@/components/legal/LegalLayout";
import { TokenText } from "@/components/ui/Token";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The agreement between Ascend and the practices that use it: what the service is, what it is not, who is responsible for what, and how the ninety day working commitment operates.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: true, follow: true },
};

const UPDATED = "20 August 2026";

const sections: LegalSectionMeta[] = [
  { id: "parties", heading: "Who these terms are between" },
  { id: "service", heading: "What the service is" },
  { id: "accounts", heading: "Accounts and authorised users" },
  { id: "customer-responsibilities", heading: "The customer's responsibilities" },
  { id: "acceptable-use", heading: "Acceptable use" },
  { id: "ai-output", heading: "AI generated output" },
  { id: "fees", heading: "Fees, install fee and billing" },
  { id: "commitment", heading: "The ninety day working commitment" },
  { id: "term", heading: "Term, notice and termination" },
  { id: "data-ownership", heading: "Data ownership" },
  { id: "confidentiality", heading: "Confidentiality" },
  { id: "warranties", heading: "Warranties and disclaimers" },
  { id: "liability", heading: "Limitation of liability" },
  { id: "indemnity", heading: "Indemnity" },
  { id: "governing-law", heading: "Governing law and disputes" },
  { id: "changes", heading: "Changes to these terms" },
  { id: "contact", heading: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of service"
      intro="The agreement between Ascend and the practice that holds the account. It is written to be read, so where a clause carries a real consequence it says so in the sentence rather than in a definition."
      updated={UPDATED}
      sections={sections}
    >
      <LegalSection id="parties" index={1} heading="Who these terms are between, and acceptance">
        <P>
          These terms are between <TokenText id="LEGAL_ENTITY_NAME" /> (&quot;Ascend&quot;,
          &quot;we&quot;) and the practice or organisation that opens an account
          (&quot;the customer&quot;, &quot;you&quot;). Creating an account, signing an
          order form, or using the service constitutes acceptance of these terms.
        </P>
        <P>
          Ascend is a registered business name of an individual established in
          Pakistan, not a separate company. The proprietor named above is the
          contracting party and is personally bound by these terms.
        </P>
        <P>
          Where a signed order form or service agreement conflicts with these terms,
          the signed document governs.
        </P>
      </LegalSection>

      <LegalSection id="service" index={2} heading="What the service is">
        <P>
          Ascend provides software that answers patient enquiries across web chat,
          SMS, WhatsApp, Instagram Direct and Facebook Messenger, manages appointments
          and outreach, and produces recommendations for practice staff. On some
          tiers, Ascend also provides human services, including installation and
          ongoing operational support.
        </P>
        <Callout>
          Ascend is not a medical device. It provides no clinical advice, makes no
          diagnostic claim, and is not intended for use in diagnosis, treatment or
          the prevention of disease. Nothing Ascend produces is a substitute for the
          professional judgement of a licensed clinician.
        </Callout>
        <P>
          Ascend does not provide emergency services. It must not be relied on for
          urgent or emergency clinical communication.
        </P>
      </LegalSection>

      <LegalSection id="accounts" index={3} heading="Accounts, eligibility and authorised users">
        <P>
          You must be a business, and the person who accepts these terms must have
          authority to bind it. You are responsible for the acts and omissions of
          every user you authorise, for keeping credentials secure, and for removing
          access when a staff member leaves.
        </P>
      </LegalSection>

      <LegalSection
        id="customer-responsibilities"
        index={4}
        heading="The customer's responsibilities"
      >
        <UL
          items={[
            "Having a lawful basis to contact your own patients, and holding the consents you rely on.",
            "The accuracy of your knowledge base, including your prices, policies and hours. Ascend answers from what you give it.",
            "Obtaining photograph and marketing consent before a case is used in public content.",
            "Clinical supervision of anything Ascend drafts, before it reaches a patient.",
            "Compliance with the Telephone Consumer Protection Act and any equivalent rules that apply to your outreach, including quiet hours and opt-out handling.",
          ]}
        />
      </LegalSection>

      <LegalSection id="acceptable-use" index={5} heading="Acceptable use">
        <UL
          items={[
            "Do not use Ascend to message people who have not consented to be messaged.",
            "Do not use Ascend for emergency or urgent clinical communication.",
            "Do not reverse engineer, resell, or attempt to extract the underlying models or source of the service.",
            "Do not upload data you have no right to process.",
          ]}
        />
      </LegalSection>

      <LegalSection id="ai-output" index={6} heading="AI generated output">
        <P>
          Output may be inaccurate. Assisted mode is the default: Ascend proposes and
          a human approves, and nothing reaches a patient without that approval until
          you grant autonomy for a specific domain. You are responsible for what you
          approve and for what you allow to run autonomously.
        </P>
        <P>
          Ascend does not warrant a specific commercial outcome, except for the
          outcomes recorded in writing under the ninety day working commitment in
          section 8.
        </P>
      </LegalSection>

      <LegalSection id="fees" index={7} heading="Fees, install fee, billing and price lock">
        <UL
          items={[
            "Subscription fees are billed monthly in advance, in US dollars, at the tier stated on your order form.",
            "The install fee is billed once, at signature, and buys the installation work described in your order form.",
            "Annual terms are billed in advance and carry two months free.",
            "Founding cohort accounts hold their monthly price for the life of the account, provided the account remains continuously active.",
            "Fees are exclusive of applicable taxes.",
          ]}
        />
      </LegalSection>

      <LegalSection id="commitment" index={8} heading="The ninety day working commitment">
        <P>
          Before you sign, we agree in writing which outcomes we are committing to
          and how each will be measured. If those outcomes have not landed by day
          ninety, we keep working at no further monthly cost until they do.
        </P>
        <Callout>
          This is a commitment to continue working, not a refund. Ascend does not
          offer a money-back guarantee, and no refund of fees paid is available under
          this clause.
        </Callout>
      </LegalSection>

      <LegalSection id="term" index={9} heading="Term, notice and termination">
        <P>
          Either party may terminate on thirty days written notice. There is no exit
          fee. On request at any time, including after termination, we will export
          your data in a machine readable format.
        </P>
        <P>
          We may suspend the service for non payment, or immediately for use that
          breaches section 5 and creates a risk to patients or to the platform.
        </P>
      </LegalSection>

      <LegalSection id="data-ownership" index={10} heading="Data ownership">
        <P>
          You own your data. We own the software, and nothing in these terms
          transfers any right in it to you.
        </P>
        <P>
          Contributions to the Intelligence Network are opt in and anonymised. A
          contribution carries principles and cannot carry magnitudes: no revenue, no
          pricing, no patient counts, no conversion rates, no budgets. Withdraw from
          the Network and your contribution is purged, including from the published
          record.
        </P>
      </LegalSection>

      <LegalSection id="confidentiality" index={11} heading="Confidentiality">
        <P>
          Each party will protect the other&apos;s confidential information with at
          least the care it applies to its own, and will use it only to perform under
          this agreement. This survives termination.
        </P>
      </LegalSection>

      <LegalSection id="warranties" index={12} heading="Warranties and disclaimers">
        <P>
          We warrant that we will provide the service with reasonable skill and care.
          Except as expressly stated, the service is provided as is, and we disclaim
          all other warranties to the extent the law allows, including implied
          warranties of merchantability and fitness for a particular purpose.
        </P>
      </LegalSection>

      <LegalSection id="liability" index={13} heading="Limitation of liability">
        <P>
          Neither party is liable for indirect, incidental, special or consequential
          loss, or for lost profits or lost revenue. Each party&apos;s total
          liability arising out of this agreement is limited to the fees paid by the
          customer in the twelve months preceding the event giving rise to the claim.
        </P>
        <P>
          Nothing in this section limits liability that cannot be limited by law,
          including liability for fraud or for death or personal injury caused by
          negligence.
        </P>
      </LegalSection>

      <LegalSection id="indemnity" index={14} heading="Indemnity">
        <P>
          You will indemnify us against claims arising from data you upload without
          the right to do so, from outreach sent without a lawful basis, and from
          your use of the service in breach of section 5.
        </P>
      </LegalSection>

      <LegalSection id="governing-law" index={15} heading="Governing law and dispute resolution">
        <P>
          These terms are governed by <TokenText id="GOVERNING_LAW" />, without
          regard to its conflict of laws rules, and the state and federal courts
          located in that jurisdiction have exclusive jurisdiction over any
          dispute. Before filing, the parties will attempt in good faith to
          resolve the dispute by discussion for thirty days.
        </P>
      </LegalSection>

      <LegalSection id="changes" index={16} heading="Changes to the terms">
        <P>
          We may update these terms. Where a change is material we will give thirty
          days notice by email to the account holder, and the change takes effect at
          the start of the next billing period.
        </P>
        <P>Last updated {UPDATED}.</P>
      </LegalSection>

      <LegalSection id="contact" index={17} heading="Contact">
        <P>
          <TokenText id="LEGAL_ENTITY_NAME" />. <TokenText id="REGISTERED_ADDRESS" />
        </P>
        <P>
          <a
            href={`mailto:${SITE.email}`}
            className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
          >
            {SITE.email}
          </a>
          {" · "}
          <Link
            href="/legal/privacy"
            className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
          >
            Privacy policy
          </Link>
        </P>
      </LegalSection>
    </LegalLayout>
  );
}
