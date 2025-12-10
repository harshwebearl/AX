/**
 * Breadcrumb Component with Schema Markup
 * Improves navigation and SEO
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
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
    </>
  );
};

export default BreadcrumbWithSchema;
