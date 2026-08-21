import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  LegalLayout,
  LegalSection,
  P,
  H3,
  UL,
  Callout,
  SubprocessorTable,
  type LegalSectionMeta,
} from "@/components/legal/LegalLayout";
import { TokenText } from "@/components/ui/Token";
import { SITE, SUBPROCESSORS } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How Ascend handles data, in two distinct roles: as controller for visitors and account holders, and as processor and business associate for patient data a practice puts into the platform.",
  path: "/legal/privacy",
  robots: { index: true, follow: true },
});

const UPDATED = "20 August 2026";

const sections: LegalSectionMeta[] = [
  { id: "who-we-are", heading: "Who we are and how to reach us" },
  { id: "two-roles", heading: "The two roles we act in" },
  { id: "controller-data", heading: "Information we collect as controller" },
  { id: "processor-data", heading: "Information we process for practices" },
  { id: "meta", heading: "Meta platform data, specifically" },
  { id: "how-we-use", heading: "How we use information" },
  { id: "subprocessors", heading: "Subprocessors" },
  { id: "legal-bases", heading: "Legal bases and HIPAA" },
  { id: "security", heading: "Security" },
  { id: "retention", heading: "Retention" },
  { id: "choices", heading: "Your choices" },
  { id: "deletion", heading: "Deletion" },
  { id: "children", heading: "Children" },
  { id: "transfers", heading: "International transfers" },
  { id: "changes", heading: "Changes and effective date" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy policy"
      intro="Ascend holds data in two different legal roles at once. This policy is written in that order, because the answer to almost every question below depends on which of the two applies to you."
      updated={UPDATED}
      sections={sections}
    >
      <LegalSection id="who-we-are" index={1} heading="Who we are and how to reach us">
        <P>
          Ascend provides an operating system for independent, appointment based
          practices, and a remote staffing service for the same practices. Ascend
          is a registered business name of an individual rather than a separate
          company, so the party responsible for your data is the proprietor
          trading under that name.
        </P>
        <UL
          items={[
            <>
              Responsible party: <TokenText id="LEGAL_ENTITY_NAME" />
            </>,
            <>
              <TokenText id="REGISTERED_ADDRESS" />
            </>,
            <>
              Contact:{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {SITE.email}
              </a>
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection id="two-roles" index={2} heading="The two roles we act in">
        <P>
          Read the role that applies to you. Sections 3, 6 and 11 (practice users)
          describe the first role. Sections 4, 5, 8 and 11 (patients) describe the
          second.
        </P>
        <H3>Role one: Ascend as controller</H3>
        <P>
          For people who visit goascend.co, submit the contact form, apply to join
          our staffing bench, or hold a login to the Ascend dashboard, we decide
          what happens to that data and we are the controller of it.
        </P>
        <H3>Role two: Ascend as processor and business associate</H3>
        <P>
          For patient data a practice puts into Ascend, the practice is the covered
          entity and the controller. Ascend acts on that practice&apos;s
          instructions as its processor, and in the United States as its business
          associate. A message a patient sends to a practice on Instagram or
          Facebook Messenger sits in this second category, because it is a patient
          communication that belongs to the practice.
        </P>
      </LegalSection>

      <LegalSection
        id="controller-data"
        index={3}
        heading="Information we collect as controller"
      >
        <UL
          items={[
            "Contact form: name, practice name, email, phone, number of locations, approximate patient count, the systems you use today, and anything you write in the free text box.",
            "Talent applications: name, contact details, CV content and work history.",
            "Account data: name, email, organisation, role and authentication identifiers.",
            "Usage and diagnostics: pages viewed, errors encountered, and approximate location derived from IP address.",
          ]}
        />
      </LegalSection>

      <LegalSection
        id="processor-data"
        index={4}
        heading="Information we process on behalf of practices"
      >
        <P>
          A practice decides what to put into Ascend. The categories below are what
          the platform is built to hold.
        </P>
        <UL
          items={[
            "Contact records: name, phone, email, date of birth and consent state.",
            "Appointment and visit history.",
            "Message content across web chat, SMS, WhatsApp, Instagram Direct and Facebook Messenger, in both directions.",
            "Platform scoped identifiers from Meta, meaning page scoped IDs for Instagram and Messenger users, used only to route a reply back to the right conversation.",
            "Clinical records a practice chooses to store, including consultation notes, standing clinical facts and charges.",
            "Media a practice uploads, including case photographs and their recorded consent state.",
          ]}
        />
      </LegalSection>

      <LegalSection id="meta" index={5} heading="Meta platform data, specifically">
        <P>
          This section describes exactly what Ascend does with data obtained through
          Instagram and Facebook, and applies only where a practice has connected its
          own business accounts.
        </P>

        <H3>Permissions we request and why</H3>
        <UL
          items={[
            <>
              <code className="font-mono text-[0.85em] text-fg">pages_messaging</code>{" "}
              and{" "}
              <code className="font-mono text-[0.85em] text-fg">
                instagram_manage_messages
              </code>
              : to receive and reply to messages sent to the practice&apos;s own
              accounts.
            </>,
            <>
              <code className="font-mono text-[0.85em] text-fg">pages_show_list</code>{" "}
              and{" "}
              <code className="font-mono text-[0.85em] text-fg">instagram_basic</code>
              : to let the practice select which of its accounts to connect.
            </>,
            <>
              <code className="font-mono text-[0.85em] text-fg">
                pages_manage_metadata
              </code>
              : to subscribe to message webhooks for the connected account.
            </>,
          ]}
        />

        <H3>Scope of access</H3>
        <P>
          We access only messages sent to or from the connected business account. We
          do not access a person&apos;s personal profile content, their friends or
          connections, or their activity anywhere else on Instagram or Facebook.
        </P>

        <H3>How message content is processed</H3>
        <P>
          Message content is sent to Anthropic to generate a draft reply or an
          automated reply on the practice&apos;s behalf. Anthropic does not train
          its models on this content.
        </P>

        <H3>What we never do with it</H3>
        <P>
          We do not sell, rent or share this data with advertisers or data brokers,
          and we do not use it to build advertising profiles.
        </P>

        <H3>Retention and disconnection</H3>
        <UL
          items={[
            "Message content is retained for the life of the practice's account and is then deleted as described in section 10 and on the data deletion page.",
            "A practice can disconnect its Meta accounts at any time from Settings, which stops all access immediately.",
          ]}
        />
      </LegalSection>

      <LegalSection id="how-we-use" index={6} heading="How we use information">
        <UL
          items={[
            "Operating the service for the practice that holds the account.",
            "Generating replies, drafts and recommendations.",
            "Sending consent checked outreach on a practice's behalf.",
            "Security, abuse prevention and service support.",
          ]}
        />
        <Callout>
          We do not use this information for advertising, we do not sell it, and we
          do not use it to train a general purpose model.
        </Callout>
      </LegalSection>

      <LegalSection id="subprocessors" index={7} heading="Subprocessors">
        <P>
          Only the subprocessors marked below may process patient data. The rest are
          architected so that patient data never reaches them.
        </P>
        <SubprocessorTable rows={SUBPROCESSORS} />
        <P>
          Resend appears on this list because it delivers the enquiry and
          application forms on this website. Those forms collect business contact
          details from the person filling them in, never patient data.
        </P>
      </LegalSection>

      <LegalSection id="legal-bases" index={8} heading="Legal bases and HIPAA">
        <P>
          For practices in the United States, Ascend acts as a business associate
          under a business associate agreement. For processing Ascend performs at a
          practice&apos;s direction, the practice is the covered entity, and its own
          notice of privacy practices governs its relationship with its patients.
        </P>
        <P>
          Where we act as controller, our basis for processing is our legitimate
          interest in operating and securing the service, and performance of the
          contract we have with the account holder.
        </P>
      </LegalSection>

      <LegalSection id="security" index={9} heading="Security">
        <UL
          items={[
            "Row level security enforced by the database, so one practice's data cannot be returned to another even if application code forgets to filter.",
            "Role gated access to clinical records.",
            "An append only access log: opening a clinical record writes an audit row inside the same transaction as the read, and if the log write fails the read fails.",
            "Encryption in transit.",
            "Least privilege database roles.",
          ]}
        />
      </LegalSection>

      <LegalSection id="retention" index={10} heading="Retention">
        <UL
          items={[
            "Account and practice data: for the life of the account plus 30 days, then deleted.",
            "Diagnostics: 90 days.",
            "Where a legal obligation requires us to keep a record for longer, we keep only what that obligation requires, for only as long as it requires.",
          ]}
        />
      </LegalSection>

      <LegalSection id="choices" index={11} heading="Your choices">
        <H3>If you are a patient of a practice</H3>
        <P>
          Replying STOP to any SMS or WhatsApp message opts you out immediately and
          permanently from marketing on that channel. Replying START opts you back
          in. A request about your own record goes to the practice you are a patient
          of, because the practice holds that record and we act on its instructions.
        </P>
        <H3>If you hold an Ascend account</H3>
        <P>
          You can ask us to access, correct, export or delete your data by emailing
          us, and we respond within 30 days. This is not yet a self-serve action
          inside the dashboard, and we would rather say so than point you at a
          button that is not there.
        </P>
      </LegalSection>

      <LegalSection id="deletion" index={12} heading="Deletion">
        <P>
          Full instructions for having your data deleted, whether you messaged a
          practice or hold an account, are on a single page:
        </P>
        <P>
          <Link
            href="/legal/data-deletion"
            className="text-accent underline-offset-4 transition-colors duration-300 hover:text-accent-bright hover:underline"
          >
            goascend.co/legal/data-deletion
          </Link>
        </P>
      </LegalSection>

      <LegalSection id="children" index={13} heading="Children">
        <P>
          The service is not directed to children. Accounts are held by practices and
          used by their staff. Where a practice treats a minor, the practice is
          responsible for the lawful basis on which it holds and shares that
          patient&apos;s information.
        </P>
      </LegalSection>

      <LegalSection id="transfers" index={14} heading="International transfers">
        <P>
          The infrastructure that holds patient data is located in the United
          States. Every subprocessor in section 7 that may process patient data
          stores and processes it there.
        </P>
        <P>
          Ascend itself is established in Pakistan, and the people who operate and
          support the service access it from there. That access is an
          international transfer of data, including patient data, and we state it
          here rather than leaving a customer to discover it during diligence.
        </P>
        <P>
          That access is bound by the same controls described in section 9: row
          level security enforced by the database, role gating on clinical
          records, and an audit row written for every clinical read. Where a
          customer requires specific transfer safeguards or data residency
          commitments, we agree them in that customer&apos;s agreement before
          signature.
        </P>
      </LegalSection>

      <LegalSection id="changes" index={15} heading="Changes and effective date">
        <P>
          This policy was last updated on {UPDATED}. When we change it materially we
          will update that date and notify account holders by email.
        </P>
      </LegalSection>
    </LegalLayout>
  );
}
