import Link from 'next/link';
import '../app/globals.css';

/** Filet de sécurité : une adresse sans langue (ni /en ni /fr). */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ background: '#0d0a06', color: '#f5eee2' }}>
        <main style={{ maxWidth: 640, margin: '0 auto', padding: '20vh 24px' }}>
          <p style={{ letterSpacing: '0.16em', fontSize: 12, color: '#e39b2e' }}>404</p>
          <h1 style={{ fontSize: 36, margin: '12px 0 16px', lineHeight: 1.1 }}>
            You have wandered away from the village…
          </h1>
          <p style={{ color: '#b3a48d', marginBottom: 28 }}>
            Vous vous êtes éloigné du village…
          </p>
          <Link href="/en" style={{ color: '#e39b2e' }}>
            Back to the village →
          </Link>
        </main>
      </body>
    </html>
  );
}
