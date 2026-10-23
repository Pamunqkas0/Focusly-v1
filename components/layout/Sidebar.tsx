'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard, ListTodo, Timer, StickyNote, Code2,
  Braces, Clock, Settings, User, LogOut, HelpCircle, X, KeyRound,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/lib/sidebar-context'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/todo', label: 'Todo List', icon: ListTodo },
  { href: '/pomodoro', label: 'Pomodoro', icon: Timer },
  { href: '/notes', label: 'Quick Notes', icon: StickyNote },
  { href: '/json-formatter', label: 'JSON Formatter', icon: Code2 },
  { href: '/base64', label: 'Base64', icon: Braces },
  { href: '/timestamp', label: 'Timestamp', icon: Clock },
  { href: '/password-hash', label: 'Password Hasher', icon: KeyRound },
]

const bottomItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/settings#profile', label: 'Profile', icon: User },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { signOut } = useAuth()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash)
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [pathname])

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,245,212,0.35)]">
          <LayoutDashboard className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-foreground tracking-tight leading-none">Focusly Pro</h1>
          <p className="text-[11px] text-muted-foreground mt-1">Productivity Suite</p>
        </div>
      </div>

      <nav aria-label="Main navigation" className="flex-1 min-h-0 px-3 space-y-1 overflow-hidden">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 relative',
                isActive
                  ? 'bg-white/[0.08] text-white font-medium border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full shadow-[0_0_8px_rgba(0,245,212,0.8)]" />
              )}
              <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="shrink-0 px-3 pb-3 space-y-0.5">

        <div className="px-2 py-3">
          <button className="w-full bg-primary text-primary-foreground font-semibold rounded-xl px-3 py-2 text-xs tracking-wide shadow-[0_0_20px_-3px_rgba(0,245,212,0.4)] hover:shadow-[0_0_25px_0_rgba(0,245,212,0.6)] hover:bg-primary/95 transition-all cursor-pointer">
            Upgrade to Plus
          </button>
        </div>
        <div className="h-px bg-white/10 mx-2 my-2" />

        {bottomItems.map(({ href, label, icon: Icon }) => {
          const isProfileLink = href.endsWith('#profile')
          const isActive = pathname === '/settings' && (isProfileLink ? hash === '#profile' : hash !== '#profile')
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200',
                isActive
                  ? 'bg-white/[0.08] text-white font-medium border border-white/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
            </Link>
          )
        })}

        <Link href="/settings#support" onClick={onNavigate} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all">
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Support</span>
        </Link>

        <button type="button" onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export function Sidebar() {
  const { open, setOpen } = useSidebar()
  const pathname = usePathname()

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname, setOpen])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Desktop sidebar — always in document flow at lg+ */}
      <aside className="hidden lg:flex flex-col w-[220px] h-dvh sticky top-0 overflow-hidden border-r border-white/10 bg-[#090f16]/60 backdrop-blur-2xl shrink-0">
        <SidebarContent />
      </aside>

      {/*
        Mobile drawer — conditionally mounted so it is NEVER in the DOM on
        desktop. This avoids Safari bugs where CSS-transform + lg:hidden can
        conflict and let the drawer bleed through at desktop widths.
      */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sidebar-backdrop"
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="sidebar-drawer"
              className="fixed inset-y-0 left-0 z-50 w-[260px] overflow-hidden bg-sidebar/95 backdrop-blur-2xl border-r border-border flex flex-col lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
