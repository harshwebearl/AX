import { Helmet } from 'react-helmet-async';

/**
 * SEO Meta Component
 * Centralized SEO meta tags management for all pages
 */
export const SEOMeta = ({
  title = 'AAxiero Design Studio - Premium Interior & Architectural Design',
  description = 'Discover refined spaces designed with precision and creativity. Transform your vision into reality with our expert design studio.',
  keywords = 'interior design, architecture, design studio, space design',
  canonical = 'https://aax.kevalontechnology.in',
  ogTitle = null,
  ogDescription = null,
  ogImage = null,
  ogUrl = null,
  ogType = 'website',
  schema = null,
  children = null
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={ogUrl || canonical} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Schema.org Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {children}
    </Helmet>
  );
};

export default SEOMeta;
