import { getLinks } from "./links";
import { SITE_URL, localePath, type Locale } from "./i18n";
import { getSite } from "./site";

export function personJsonLd(locale: Locale) {
  const { person, me } = getSite(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: person.name,
    jobTitle: person.jobTitle,
    url: `${SITE_URL}${localePath(locale, "/")}`,
    image: `${SITE_URL}${me.photo.src}`,
    sameAs: getLinks()
      .filter((l) => l.key !== "email")
      .map((l) => l.href),
  };
}

export function websiteJsonLd(locale: Locale) {
  const { meta } = getSite(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SYSP0",
    url: `${SITE_URL}${localePath(locale, "/")}`,
    description: meta.description,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}
