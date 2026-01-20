import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Main content area with universal padding and background */}
      {/* p-4 md:p-8: 16px on mobile, 32px on desktop */}
      <main className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 pb-32 md:pb-32 pt-16 md:pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
