import './globals.css'

export const metadata = {
  title: 'Simbian Security Demo',
  description: 'Interactive dashboard showing security alerts with and without Simbian',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}