import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  LegalLayout,
  LegalSection,
  P,
  UL,
  Callout,
  type LegalSectionMeta,
} from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "How to delete your data",
  description:
    "Two paths to deletion, because Ascend holds data in two capacities: conversations that belong to the practice you messaged, and accounts that belong to you.",
  path: "/legal/data-deletion",
  robots: { index: true, follow: true },
});

const UPDATED = "20 August 2026";

const sections: LegalSectionMeta[] = [
  { id: "messaged-a-practice", heading: "If you messaged a practice" },
  { id: "ascend-account", heading: "If you hold an Ascend account" },
  { id: "what-deletion-removes", heading: "What deletion removes" },
  { id: "what-we-retain", heading: "What we may retain" },
  { id: "contact", heading: "Contact" },
];

const mailto = `mailto:${SITE.email}`;

export default function DataDeletionPage() {
  return (
    <LegalLayout
      title="How to delete your data"
      intro="Two paths, because Ascend holds data in two different capacities. Read the one that describes you."
      updated={UPDATED}
      sections={sections}
    >
      <LegalSection
        id="messaged-a-practice"
        index={1}
        heading="If you messaged a practice"
      >
        <P>
          If you sent a message to a practice on Instagram, Facebook Messenger,
          WhatsApp or SMS, that conversation belongs to the practice you contacted.
          To have it deleted, email us at{" "}
          <a
            href={mailto}
            className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
          >
            {SITE.email}
          </a>{" "}
          with the phone number or account handle you messaged from and the name of
          the practice. We will forward the request to the practice and confirm
          deletion to you within 30 days.
        </P>
        <Callout>
          To stop receiving messages immediately, reply STOP to any SMS or WhatsApp
          message. That takes effect at once, and you do not need to email us
          first.
        </Callout>
      </LegalSection>

      <LegalSection id="ascend-account" index={2} heading="If you hold an Ascend account">
        <P>
          Email{" "}
          <a
            href={mailto}
            className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
          >
            {SITE.email}
          </a>{" "}
          from your account address with the subject &quot;Delete my data&quot;. We
          will confirm your identity, delete your account and its associated practice
          data within 30 days, and confirm in writing.
        </P>
      </LegalSection>

      <LegalSection id="what-deletion-removes" index={3} heading="What deletion removes">
        <UL
          items={[
            "Contact records.",
            "Message history across every channel.",
            "Appointment history.",
            "Uploaded media.",
            "Clinical records.",
            "Account details.",
            "Intelligence Network contributions are handled differently, and deliberately so. They never contained an identifier of you or of any patient: a contributing practice is recorded only as a one way hash, and only patterns general enough to apply elsewhere are emitted at all. On deletion your account stops contributing and past contributions stop counting as current evidence.",
          ]}
        />
      </LegalSection>

      <LegalSection id="what-we-retain" index={4} heading="What we may retain">
        <P>
          Records we are required to keep by law, and non identifying diagnostics
          that cannot be linked back to you.
        </P>
      </LegalSection>

      <LegalSection id="contact" index={5} heading="Contact">
        <P>
          <a
            href={mailto}
            className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
          >
            {SITE.email}
          </a>
        </P>
        <P>
          See also our{" "}
          <Link
            href="/legal/privacy"
            className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
          >
            privacy policy
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/terms"
            className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
          >
            terms of service
          </Link>
          . Last updated {UPDATED}.
        </P>
      </LegalSection>
    </LegalLayout>
  );
}
