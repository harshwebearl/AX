/**
 * Breadcrumb Component with Schema Markup
 * Improves navigation and SEO
 * Uses React 19 Metadata API
 */

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export const BreadcrumbWithSchema = ({ items = [] }) => {
  // Default breadcrumb
  const defaultItems = [
    { name: 'Home', url: 'https://aax.kevalontechnology.in' }
  ];

  const breadcrumbs = items.length > 0 ? [...defaultItems, ...items] : defaultItems;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  useEffect(() => {
    // Create or update breadcrumb schema script
    let schemaScript = document.querySelector('script[type="application/ld+json"][data-type="breadcrumb"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.setAttribute('data-type', 'breadcrumb');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema);

    return () => {
      // Cleanup breadcrumb schema on unmount
      if (schemaScript && schemaScript.parentNode) {
        schemaScript.parentNode.removeChild(schemaScript);
      }
    };
  }, [breadcrumbs]);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            {item.isActive ? (
              <span className="text-gray-600">{item.name}</span>
            ) : (
              <Link to={item.url || '#'} className="text-blue-600 hover:underline">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbWithSchema;
