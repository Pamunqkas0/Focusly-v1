'use client'
import { useState, useSyncExternalStore } from 'react'
import { Search, Bell, Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSidebar } from '@/lib/sidebar-context'

const emptySubscribe = () => () => {}

export function TopNav() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { open, setOpen } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-white/10 bg-[#090f16]/40 backdrop-blur-2xl px-3 sm:px-6">
      {/* Hamburger — mobile only */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 lg:hidden shrink-0 rounded-full"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <Menu className="w-4 h-4" />
      </Button>

      {/* Search bar — hidden on mobile unless expanded */}
      <div className={`relative flex-1 max-w-md ${searchOpen ? 'flex' : 'hidden sm:flex'}`}>
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-9 pr-16 h-8 rounded-full bg-white/[0.04] border-white/10 text-sm w-full focus-visible:border-primary/50"
          placeholder="Search tasks, notes, or tools..."
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="hidden sm:inline-flex items-center justify-center h-4.5 px-1 text-[10px] font-medium text-muted-foreground border border-white/10 bg-white/[0.04] rounded-md">
            ⌘
          </kbd>
          <kbd className="hidden sm:inline-flex items-center justify-center h-4.5 px-1 text-[10px] font-medium text-muted-foreground border border-white/10 bg-white/[0.04] rounded-md">
            K
          </kbd>
          {/* Close search on mobile */}
          {searchOpen && (
            <button className="sm:hidden ml-1" onClick={() => setSearchOpen(false)}>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
        {/* Search toggle — mobile only */}
        {!searchOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full sm:hidden"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-4 h-4" />
          </Button>
        )}

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-[#FF5722] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,87,34,0.6)]">
            8
          </span>
        </Button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          suppressHydrationWarning
        >
          {mounted ? (
            resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        {/* User avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-semibold text-primary hover:bg-primary/30 shadow-[0_0_12px_rgba(0,245,212,0.25)] transition-all cursor-pointer">
              A
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl bg-card/90 backdrop-blur-xl border border-white/10 shadow-xl">
            <DropdownMenuLabel>Alex Johnson</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
