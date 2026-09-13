import type { MetadataRoute } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';
import {
  getArticleSlugs,
  getCountrySlugs,
  getCultureThemeSlugs,
  getLanguageSlugs,
  getRecipeSlugs,
  getVillageSlugs,
} from '@/lib/content';

/**
 * Le plan du site pour Google.
 * Chaque page est déclarée dans les deux langues, et chacune indique où
 * se trouve sa jumelle — c'est ce qui évite que Google croie à du contenu dupliqué.
 * La page de recherche en est volontairement absente.
 */
type Href = Parameters<typeof getPathname>[0]['href'];

const FIXED: { href: Href; priority: number }[] = [
  { href: '/', priority: 1 },
  { href: '/videos', priority: 0.9 },
  { href: '/villages', priority: 0.9 },
  { href: '/stories', priority: 0.9 },
  { href: '/culture', priority: 0.8 },
  { href: '/food', priority: 0.8 },
  { href: '/languages', priority: 0.8 },
  { href: '/about', priority: 0.6 },
  { href: '/contact', priority: 0.5 },
  { href: '/partners', priority: 0.4 },
  { href: '/support', priority: 0.4 },
  { href: '/legal-notice', priority: 0.2 },
  { href: '/privacy', priority: 0.2 },
  { href: '/cookies', priority: 0.2 },
  { href: '/terms', priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, villages, countries, recipes, languages, themes] = await Promise.all([
    getArticleSlugs(),
    getVillageSlugs(),
    getCountrySlugs(),
    getRecipeSlugs(),
    getLanguageSlugs(),
    getCultureThemeSlugs(),
  ]);

  const dynamic: { href: Href; priority: number }[] = [
    ...articles.map((slug) => ({
      href: { pathname: '/stories/[slug]' as const, params: { slug } },
      priority: 0.8,
    })),
    ...villages.map((slug) => ({
      href: { pathname: '/villages/[slug]' as const, params: { slug } },
      priority: 0.7,
    })),
    ...countries.map((slug) => ({
      href: { pathname: '/countries/[slug]' as const, params: { slug } },
      priority: 0.6,
    })),
    ...recipes.map((slug) => ({
      href: { pathname: '/food/[slug]' as const, params: { slug } },
      priority: 0.7,
    })),
    ...languages.map((slug) => ({
      href: { pathname: '/languages/[slug]' as const, params: { slug } },
      priority: 0.7,
    })),
    ...themes.map((slug) => ({
      href: { pathname: '/culture/[slug]' as const, params: { slug } },
      priority: 0.6,
    })),
  ];

  const lastModified = new Date();

  return [...FIXED, ...dynamic].flatMap(({ href, priority }) =>
    routing.locales.map((locale) => ({
      url: `${site.url}${getPathname({ href, locale })}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${site.url}${getPathname({ href, locale: l })}`]),
        ),
      },
    })),
  );
}
