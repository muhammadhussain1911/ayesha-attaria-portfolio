import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/layout/Navbar'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { Footer } from '@/components/layout/Footer'
import { PersonSchema, OrganizationSchema } from '@/components/seo/SchemaMarkup'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700']
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700']
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Ayesha Attaria | Web App & API Penetration Tester | Ethical Hacker',
  description: 'Ayesha Attaria is a certified Web Application & API Penetration Tester helping companies in the USA, UK, Europe, Australia & Canada secure their systems. OWASP Top 10 aligned VAPT services.',
  generator: 'v0.app',
  openGraph: {
    title: 'Ayesha Attaria | Web App & API Penetration Tester',
    description: 'Certified ethical hacker and penetration tester helping global companies secure their web applications.',
    url: 'https://ayeshaattaria.com',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayesha Attaria | Penetration Tester',
    description: 'Web App & API security expert',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} bg-white`}
    >
      <head>
        <PersonSchema />
        <OrganizationSchema />
      </head>
      <body className="font-sans antialiased text-black">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
        <Toaster position="bottom-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
