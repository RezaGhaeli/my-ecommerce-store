import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'ShopFlow'
const SITE_URL  = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ?? ''
const DEFAULT_DESC = 'Discover curated products across electronics, fashion, home, and sport — each picked for quality and delivered fast.'

/**
 * SEO — sets <title>, description, Open Graph, Twitter Card, canonical, and robots
 * per page. Renders nothing visible.
 *
 * Props:
 *   title        — page-specific title (appended with " — ShopFlow")
 *   description  — meta description (≤ 160 chars for best results)
 *   image        — absolute URL to a share image (1200×630 recommended)
 *   path         — e.g. "/product/1"  — used for og:url and canonical
 *   type         — og:type (default "website"; use "product" on product pages)
 *   noIndex      — set true for legal/utility pages to exclude from crawlers
 */
export default function SEO({ title, description, image, path, type = 'website', noIndex = false }) {
  const fullTitle  = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Shop Smarter, Live Better`
  const desc       = description ?? DEFAULT_DESC
  const canonical  = path ? `${SITE_URL}${path}` : undefined

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type"        content={type} />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:width"  content="1200" />}
      {image && <meta property="og:image:height" content="630" />}

      {/* Twitter Card */}
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
