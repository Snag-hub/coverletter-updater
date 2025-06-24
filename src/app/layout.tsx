import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Cover Letter Updater',
  description: 'Generate customized cover letters as PDFs',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
