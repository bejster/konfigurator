import './globals.css'

export const metadata = {
  title: 'Konfigurator oferty — Hantle i Talerz',
  description: 'Zaznacz co Cię interesuje, wybierz budżet i napisz do mnie w DM. Bez calli, bez Zoomów.',
  openGraph: {
    title: 'Zbuduj swoją ofertę — Hantle i Talerz',
    description: 'Forma, energia i sprawny mózg w realnym życiu. Zaznacz co Cię interesuje.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
