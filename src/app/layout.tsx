import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nextland',
  description: 'short your url',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="w-full flex flex-justify-center">{children}</body>
    </html>
  )
}
