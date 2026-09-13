import type { ReactNode } from 'react';

/**
 * Next.js exige une mise en page racine. La vraie mise en page du site
 * se trouve dans src/app/[locale]/layout.tsx, parce qu'elle dépend de la langue.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
