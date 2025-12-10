/**
 * SEO Schema Markup Generator
 * Creates structured data for Google, schema.org, etc.
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AAxiero Design Studio",
  "description": "Premium interior design and architectural visualization services",
  "url": "https://aax.kevalontechnology.in",
  "logo": "https://aax.kevalontechnology.in/images/logo/logo.png",
  "image": "https://aax.kevalontechnology.in/images/og-image.jpg",
  "sameAs": [
    "https://facebook.com/aaxiero",
    "https://instagram.com/aaxiero",
    "https://linkedin.com/company/aaxiero"
  ],
    "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "aaxierodesignstudio@gmail.com",
    "areaServed": "IN"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  }
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const projectSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.name,
  "description": project.description,
  "image": project.image,
  "creator": {
    "@type": "Organization",
    "name": "AAxiero Design Studio",
    "url": "https://aax.kevalontechnology.in"
  },
  "datePublished": project.date,
  "url": project.url
});

export const serviceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": "AAxiero Design Studio",
    "url": "https://aax.kevalontechnology.in"
  },
  "image": service.image,
  "areaServed": "IN"
});

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact AAxiero Design Studio",
  "mainEntity": {
    "@type": "Organization",
    "name": "AAxiero Design Studio",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "aaxierodesignstudio@gmail.com"
    }
  }
};

export const gallerySchema = (gallery) => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": gallery.name,
  "description": gallery.description,
  "image": gallery.images,
  "creator": {
    "@type": "Organization",
    "name": "AAxiero Design Studio"
  }
});

export const FAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
