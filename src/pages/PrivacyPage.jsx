import SEO from '@/components/SEO'

const EFFECTIVE_DATE = 'July 3, 2026'
const CONTACT_EMAIL  = 'privacy@shopflow.com'

const sections = [
  { id: 'overview',       title: '1. Overview' },
  { id: 'data-collected', title: '2. Data We Collect' },
  { id: 'how-we-use',     title: '3. How We Use Your Data' },
  { id: 'sharing',        title: '4. Sharing Your Data' },
  { id: 'cookies',        title: '5. Cookies & Tracking' },
  { id: 'retention',      title: '6. Data Retention' },
  { id: 'your-rights',    title: '7. Your Rights' },
  { id: 'security',       title: '8. Security' },
  { id: 'children',       title: '9. Children\'s Privacy' },
  { id: 'changes',        title: '10. Changes to This Policy' },
  { id: 'contact',        title: '11. Contact Us' },
]

function H2({ id, children }) {
  return (
    <h2 id={id} className="text-xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-24">
      {children}
    </h2>
  )
}

function P({ children }) {
  return <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
}

function Ul({ items }) {
  return (
    <ul className="list-disc list-inside space-y-1.5 text-gray-600 mb-4 ml-2">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="ShopFlow Privacy Policy — how we collect, use, and protect your personal information."
        path="/privacy"
        noIndex
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Effective date: <strong>{EFFECTIVE_DATE}</strong></p>
        </div>

        <div className="flex gap-16">
          {/* Sticky TOC — desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-3">On this page</p>
              <nav className="space-y-1">
                {sections.map(({ id, title }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-sm text-gray-500 hover:text-gray-900 py-0.5 transition-colors"
                  >
                    {title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="flex-1 min-w-0 max-w-2xl">

            <H2 id="overview">1. Overview</H2>
            <P>
              ShopFlow, Inc. ("ShopFlow," "we," "us," or "our") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or make a purchase. Please read this policy carefully.
            </P>
            <P>
              By using ShopFlow, you agree to the collection and use of information in accordance with this
              policy. If you disagree, please discontinue use of the service.
            </P>

            <H2 id="data-collected">2. Data We Collect</H2>
            <P>We collect information you provide directly, information collected automatically, and information from third parties.</P>
            <p className="text-sm font-semibold text-gray-800 mb-2">Information you provide:</p>
            <Ul items={[
              'Name, email address, and password when you create an account',
              'Billing and shipping address when you place an order',
              'Payment card details (processed and stored by Stripe — we never see raw card numbers)',
              'Order history, product reviews, and wishlist items',
              'Communications you send us via support or email',
            ]} />
            <p className="text-sm font-semibold text-gray-800 mb-2">Information collected automatically:</p>
            <Ul items={[
              'IP address, browser type, and device identifiers',
              'Pages visited, time spent, and referral URLs',
              'Cookies and similar tracking technologies (see Section 5)',
              'Purchase behavior and browsing patterns within our store',
            ]} />
            <p className="text-sm font-semibold text-gray-800 mb-2">Information from third parties:</p>
            <Ul items={[
              'Payment confirmation and fraud signals from Stripe',
              'Authentication tokens if you sign in via a social provider',
              'Shipping and delivery updates from our logistics partners',
            ]} />

            <H2 id="how-we-use">3. How We Use Your Data</H2>
            <P>We use the information we collect to:</P>
            <Ul items={[
              'Process and fulfill your orders, including sending confirmation and shipping emails',
              'Manage your account and authenticate your sessions',
              'Provide customer support and respond to your inquiries',
              'Send transactional emails (order confirmations, receipts, shipping updates)',
              'Send promotional emails and offers — only with your explicit consent',
              'Detect, investigate, and prevent fraudulent transactions and abuse',
              'Improve our website, product catalogue, and user experience',
              'Comply with legal obligations and enforce our Terms of Service',
            ]} />

            <H2 id="sharing">4. Sharing Your Data</H2>
            <P>We do not sell your personal information. We share it only in the following limited circumstances:</P>
            <Ul items={[
              'Service providers: Stripe (payments), Supabase (database), shipping carriers — only data necessary for each service',
              'Legal requirements: when required by law, court order, or governmental authority',
              'Business transfers: in connection with a merger, acquisition, or sale of assets (you will be notified)',
              'Consent: any other sharing requires your prior explicit consent',
            ]} />

            <H2 id="cookies">5. Cookies & Tracking</H2>
            <P>
              We use cookies and similar technologies to operate the site, remember your preferences, and
              understand how visitors use ShopFlow.
            </P>
            <p className="text-sm font-semibold text-gray-800 mb-2">Types of cookies we use:</p>
            <Ul items={[
              'Essential cookies — required for the site to function (cart, authentication sessions)',
              'Analytics cookies — aggregate usage data to improve the site (e.g. page views, session duration)',
              'Preference cookies — remember your language, currency, and filter settings',
              'Marketing cookies — only set with your consent to show relevant ads',
            ]} />
            <P>
              You can control cookies through your browser settings. Disabling essential cookies may affect
              site functionality. You can withdraw marketing cookie consent at any time via the Cookie
              Preferences link in the footer.
            </P>

            <H2 id="retention">6. Data Retention</H2>
            <P>
              We retain your personal data for as long as your account is active or as needed to provide
              services. Order records are retained for seven (7) years for tax and accounting purposes.
              You may request deletion of your account and associated data at any time (subject to legal
              retention requirements) by contacting us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">{CONTACT_EMAIL}</a>.
            </P>

            <H2 id="your-rights">7. Your Rights</H2>
            <P>Depending on your location, you may have the following rights regarding your personal data:</P>
            <Ul items={[
              'Access — request a copy of the personal data we hold about you',
              'Rectification — correct inaccurate or incomplete data',
              'Erasure — request deletion of your data ("right to be forgotten")',
              'Portability — receive your data in a machine-readable format',
              'Restriction — limit how we process your data in certain circumstances',
              'Objection — object to processing based on legitimate interests or for direct marketing',
              'Withdraw consent — at any time, where processing is based on consent',
            ]} />
            <P>
              To exercise any of these rights, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">{CONTACT_EMAIL}</a>.
              We will respond within 30 days. California residents may have additional rights under the CCPA.
            </P>

            <H2 id="security">8. Security</H2>
            <P>
              We implement industry-standard safeguards to protect your data, including TLS encryption in
              transit, AES-256 encryption at rest in our Supabase database, and strict access controls.
              Payment information is handled exclusively by Stripe (PCI-DSS Level 1 certified) — we never
              store card numbers on our servers.
            </P>
            <P>
              No method of transmission over the internet is 100% secure. While we strive to protect your
              data, we cannot guarantee absolute security and encourage you to use a strong, unique password.
            </P>

            <H2 id="children">9. Children's Privacy</H2>
            <P>
              ShopFlow is not directed to children under 13. We do not knowingly collect personal data from
              children under 13. If we learn that we have collected such data, we will delete it promptly.
              If you believe a child has provided us with personal information, please contact us immediately.
            </P>

            <H2 id="changes">10. Changes to This Policy</H2>
            <P>
              We may update this Privacy Policy from time to time. We will notify you of material changes
              by email (to the address on your account) or by posting a notice on the site at least 14 days
              before the change takes effect. Your continued use of ShopFlow after the effective date
              constitutes acceptance of the updated policy.
            </P>

            <H2 id="contact">11. Contact Us</H2>
            <P>If you have questions or concerns about this Privacy Policy, please contact us:</P>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm text-gray-700 space-y-1 mb-8">
              <p className="font-semibold text-gray-900">ShopFlow, Inc.</p>
              <p>123 Commerce Street, Suite 400</p>
              <p>San Francisco, CA 94105, USA</p>
              <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">{CONTACT_EMAIL}</a></p>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
