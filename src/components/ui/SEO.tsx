import { useEffect } from "react";
import { business } from "../../config/business";

type SEOProps = { title: string; description: string; path?: string };

export function SEO({ title, description, path = "/" }: SEOProps) {
  useEffect(() => {
    const canonical = `https://smilingjourney.com${path}`;
    document.title = title;
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", canonical, true);
    setMeta("twitter:card", "summary_large_image");
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
    let json = document.head.querySelector<HTMLScriptElement>("#travel-agency-jsonld");
    if (!json) {
      json = document.createElement("script");
      json.type = "application/ld+json";
      json.id = "travel-agency-jsonld";
      document.head.appendChild(json);
    }
    json.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: business.name,
      telephone: business.primaryPhone,
      email: business.email,
      address: business.address,
      url: "https://smilingjourney.com",
      sameAs: [business.socials.instagram, business.socials.facebook],
    });
  }, [title, description, path]);
  return null;
}
