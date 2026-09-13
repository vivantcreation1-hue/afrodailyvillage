import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tableau de bord — Afro Daily Village',
  // Le tableau de bord ne doit jamais apparaître dans Google.
  robots: { index: false, follow: false },
};

/** Le tableau de bord a sa propre page complète, sans l'en-tête ni le pied du site. */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
