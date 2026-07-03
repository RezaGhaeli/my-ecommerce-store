import SEO from '@/components/SEO'

const EFFECTIVE_DATE = 'July 3, 2026'
const CONTACT_EMAIL  = 'legal@shopflow.com'

const sections = [
  { id: 'acceptance',   title: '1. Acceptance of Terms' },
  { id: 'eligibility',  title: '2. Eligibility' },
  { id: 'accounts',     title: '3. Accounts' },
  { id: 'products',     title: '4. Products & Pricing' },
  { id: 'orders',       title: '5. Orders & Payment' },
  { id: 'shipping',     title: '6. Shipping & Delivery' },
  { id: 'returns',      title: '7. Returns & Refunds' },
  { id: 'ip',           title: '8. Intellectual Property' },
  { id: 'prohibited',   title: '9. Prohibited Uses' },
  { id: 'disclaimers',  title: '10. Disclaimers' },
  { id: 'liability',    title: '11. Limitation of Liability' },
  { id: 'indemnity',    title: '12. Indemnification' },
  { id: 'governing',    title: '13. Governing Law' },
  { id: 'changes',      title: '14. Changes to These Terms' },
  { id: 'contact',      title: '15. Contact Us' },
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

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="ShopFlow Terms of Service — the rules and conditions governing use of our platform."
        path="/terms"
        noIndex
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Terms of Service</h1>
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

            <H2 id="acceptance">1. Acceptance of Terms</H2>
            <P>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and
              ShopFlow, Inc. ("ShopFlow," "we," "us," or "our") governing your access to and use of
              the ShopFlow website and services (collectively, the "Service").
            </P>
            <P>
              By accessing or using the Service you confirm that you have read, understood, and agree to
              be bound by these Terms and our Privacy Policy. If you do not agree, do not use the Service.
            </P>

            <H2 id="eligibility">2. Eligibility</H2>
            <P>
              You must be at least 13 years old to use ShopFlow. If you are under 18, you represent that
              you have your parent or guardian's permission to use the Service and that they have agreed to
              these Terms on your behalf. By using the Service, you represent and warrant that you meet
              these requirements.
            </P>

            <H2 id="accounts">3. Accounts</H2>
            <P>
              To access certain features you must create an account. You agree to provide accurate, current,
              and complete information and to keep it up to date. You are responsible for safeguarding your
              password and for all activity that occurs under your account. Notify us immediately at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">{CONTACT_EMAIL}</a>{' '}
              if you suspect unauthorized access.
            </P>
            <P>
              We reserve the right to suspend or terminate accounts that violate these Terms or that have
              been inactive for more than 24 months.
            </P>

            <H2 id="products">4. Products & Pricing</H2>
            <P>
              We reserve the right to modify product descriptions, images, and pricing at any time without
              notice. Prices are displayed in US dollars and are exclusive of applicable taxes and shipping
              unless otherwise stated.
            </P>
            <Ul items={[
              'We make reasonable efforts to display product colors and descriptions accurately, but cannot guarantee your display will be identical to the physical product.',
              'We reserve the right to limit the quantity of any product per order or per customer.',
              'We may discontinue any product at any time.',
              'In the event of a pricing error, we reserve the right to cancel orders placed at the incorrect price and will notify affected customers promptly.',
            ]} />

            <H2 id="orders">5. Orders & Payment</H2>
            <P>
              When you place an order, you are making an offer to purchase the specified products. All orders
              are subject to acceptance and availability. We reserve the right to refuse or cancel any order
              for any reason, including suspected fraud, inaccurate pricing, or stock unavailability.
            </P>
            <P>
              Payment is processed securely by Stripe, Inc. By providing your payment details you authorize
              us to charge the total order amount including applicable taxes and shipping. Your card will be
              charged at the time of order confirmation.
            </P>
            <Ul items={[
              'Accepted payment methods: major credit/debit cards (Visa, Mastercard, Amex, Discover)',
              'All transactions are encrypted via TLS and processed under PCI-DSS compliance',
              'We do not store your card number on our servers',
              'Recurring charges do not apply — each purchase is a one-time transaction',
            ]} />

            <H2 id="shipping">6. Shipping & Delivery</H2>
            <P>
              We ship to the United States, Canada, United Kingdom, Australia, Germany, and France.
              Estimated delivery times are provided in good faith but are not guaranteed. Risk of loss
              and title for products pass to you upon delivery to the carrier.
            </P>
            <Ul items={[
              'Standard shipping: 3–5 business days (free on orders over $50)',
              'Express shipping: 1–2 business days (rates calculated at checkout)',
              'International shipping: 7–14 business days (duties and taxes are the buyer\'s responsibility)',
              'We are not responsible for delays caused by customs, weather, or carrier issues outside our control',
            ]} />

            <H2 id="returns">7. Returns & Refunds</H2>
            <P>
              We offer a 30-day return policy. To be eligible for a return, items must be unused, in the
              same condition you received them, and in the original packaging. To initiate a return, email{' '}
              <a href="mailto:returns@shopflow.com" className="text-indigo-600 hover:underline">returns@shopflow.com</a>{' '}
              with your order number and reason for return.
            </P>
            <Ul items={[
              'Refunds are processed to the original payment method within 5–10 business days of receiving the returned item',
              'Return shipping costs are the responsibility of the customer unless the item is defective or incorrect',
              'Digital goods and final-sale items are non-refundable',
              'We reserve the right to refuse returns that do not meet the above conditions',
            ]} />

            <H2 id="ip">8. Intellectual Property</H2>
            <P>
              The Service and all content on it — including text, graphics, logos, product images, audio
              clips, digital downloads, and data compilations — are the property of ShopFlow, Inc. or its
              content suppliers and are protected by United States and international copyright, trademark,
              and other intellectual property laws.
            </P>
            <P>
              You are granted a limited, non-exclusive, non-transferable license to access and use the
              Service for personal, non-commercial purposes. You may not reproduce, distribute, modify,
              create derivative works from, publicly display, or exploit any content without our express
              written consent.
            </P>

            <H2 id="prohibited">9. Prohibited Uses</H2>
            <P>You agree not to use the Service to:</P>
            <Ul items={[
              'Violate any applicable local, national, or international law or regulation',
              'Transmit unsolicited commercial communications ("spam") or malicious code',
              'Attempt to gain unauthorized access to any part of the Service or its infrastructure',
              'Scrape, crawl, or harvest data from the Service without express written permission',
              'Use the Service to conduct fraudulent transactions or impersonate any person or entity',
              'Interfere with or disrupt the integrity or performance of the Service',
              'Post or transmit content that is unlawful, defamatory, obscene, or infringes third-party rights',
              'Resell products purchased from ShopFlow on third-party marketplaces without authorization',
            ]} />

            <H2 id="disclaimers">10. Disclaimers</H2>
            <P>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE
              WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </P>

            <H2 id="liability">11. Limitation of Liability</H2>
            <P>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SHOPFLOW, INC. AND ITS OFFICERS,
              DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL —
              ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, EVEN IF ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES.
            </P>
            <P>
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID
              TO US IN THE SIX (6) MONTHS PRECEDING THE CLAIM OR (B) ONE HUNDRED US DOLLARS ($100).
            </P>

            <H2 id="indemnity">12. Indemnification</H2>
            <P>
              You agree to defend, indemnify, and hold harmless ShopFlow, Inc. and its affiliates, officers,
              directors, employees, and agents from any claims, liabilities, damages, losses, and expenses
              (including reasonable legal fees) arising from your use of the Service, your violation of
              these Terms, or your violation of any third-party rights.
            </P>

            <H2 id="governing">13. Governing Law</H2>
            <P>
              These Terms are governed by the laws of the State of California, United States, without
              regard to conflict of law principles. Any dispute arising from these Terms shall be resolved
              exclusively in the state or federal courts located in San Francisco County, California, and
              you consent to personal jurisdiction in those courts.
            </P>
            <P>
              Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in
              any court of competent jurisdiction to prevent irreparable harm pending resolution of a dispute.
            </P>

            <H2 id="changes">14. Changes to These Terms</H2>
            <P>
              We may modify these Terms at any time. Material changes will be communicated via email or a
              prominent notice on the site at least 14 days before taking effect. Your continued use of the
              Service after the effective date constitutes your acceptance of the updated Terms. If you do
              not agree to the changes, you must stop using the Service.
            </P>

            <H2 id="contact">15. Contact Us</H2>
            <P>Questions about these Terms? We're here to help:</P>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm text-gray-700 space-y-1 mb-8">
              <p className="font-semibold text-gray-900">ShopFlow, Inc. — Legal Team</p>
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
