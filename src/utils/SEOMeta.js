import { useEffect } from 'react';

/**
 * SEO Meta Component
 * Centralized SEO meta tags management for all pages
 * Uses React 19 Metadata API
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
  useEffect(() => {
    // Set title
    document.title = title;

    // Helper function to set or update meta tag
    const setMetaTag = (name, value, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', value);
    };

    // Set standard meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);

    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Set Open Graph tags
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:title', ogTitle || title, true);
    setMetaTag('og:description', ogDescription || description, true);
    setMetaTag('og:url', ogUrl || canonical, true);
    if (ogImage) {
      setMetaTag('og:image', ogImage, true);
    }

    // Set Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', ogTitle || title);
    setMetaTag('twitter:description', ogDescription || description);
    if (ogImage) {
      setMetaTag('twitter:image', ogImage);
    }

    // Handle schema markup
    if (schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }

    // Cleanup function
    return () => {
      // Optional: You can add cleanup logic here if needed
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, ogUrl, ogType, schema]);

  return children || null;
};

export default SEOMeta;
