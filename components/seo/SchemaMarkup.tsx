interface PersonSchemaProps {
  url?: string;
}

export function PersonSchema({ url = 'https://ayeshaattaria.com' }: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: 'Ayesha Attaria',
    jobTitle: 'Web Application Penetration Tester',
    url,
    sameAs: [
      'https://www.linkedin.com/in/ayeshaattaria',
      'https://twitter.com/ayeshaattaria',
    ],
    knowsAbout: [
      'Penetration Testing',
      'API Security',
      'OWASP Top 10',
      'Bug Bounty',
      'Ethical Hacking',
      'Cybersecurity',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProfessionalServiceSchemaProps {
  url?: string;
}

export function ProfessionalServiceSchema({
  url = 'https://ayeshaattaria.com',
}: ProfessionalServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'ProfessionalService',
    name: 'Ayesha Attaria — Web App & API Penetration Testing',
    description:
      'Manual web application and API penetration testing services aligned with OWASP Top 10',
    url,
    areaServed: ['US', 'GB', 'DE', 'NL', 'FR', 'AU', 'CA'],
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationSchemaProps {
  url?: string;
}

export function OrganizationSchema({
  url = 'https://ayeshaattaria.com',
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'Ayesha Attaria',
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostingSchemaProps {
  title: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
  url: string;
  keywords?: string[];
}

export function BlogPostingSchema({
  title,
  headline,
  description,
  datePublished,
  dateModified,
  image,
  author = 'Ayesha Attaria',
  url,
  keywords = [],
}: BlogPostingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'BlogPosting',
    headline,
    description,
    image: image || 'https://ayeshaattaria.com/og-image.jpg',
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://ayeshaattaria.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ayesha Attaria',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ayeshaattaria.com/logo.png',
      },
    },
    url,
    keywords: keywords.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  items: { question: string; answer: string }[];
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
