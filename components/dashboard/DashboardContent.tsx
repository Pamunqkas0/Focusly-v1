'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Braces, Check, CheckCircle2, Clock3, FileText, KeyRound,
  ListTodo, Pause, Play, Plus, SkipForward, Sparkles, Trash2,
} from 'lucide-react'
import { useTodos } from '@/hooks/useTodos'
import { usePomodoro } from '@/hooks/usePomodoro'
import { useNotes } from '@/hooks/useNotes'
import { useAuth } from '@/hooks/useAuth'
import { Badge } from '@/components/ui/badge'
import { formatTime } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Task } from '@/types'

type TaskFilter = 'all' | 'today' | 'overdue'

const quickTools = [
  { href: '/json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON', icon: Braces, tint: 'text-cyan-300 bg-cyan-400/10' },
  { href: '/base64', name: 'Base64 Encoder', description: 'Encode or decode strings', icon: FileText, tint: 'text-violet-300 bg-violet-400/10' },
  { href: '/timestamp', name: 'Timestamp Converter', description: 'Convert Unix timestamps', icon: Clock3, tint: 'text-amber-300 bg-amber-400/10' },
  { href: '/password-hash', name: 'Password Hasher', description: 'Generate secure hashes', icon: KeyRound, tint: 'text-emerald-300 bg-emerald-400/10' },
]

function TaskCard({ task, onToggle, onDelete }: { task: Task; onToggle: () => void; onDelete: () => void }) {
  const done = task.status === 'completed'
  const priorityVariant = ({ critical: 'critical', high: 'high', medium: 'medium', low: 'low' } as const)[task.priority]

  return (
    <article className="group rounded-2xl border border-white/[0.05] bg-black/65 p-4 transition-colors hover:border-white/[0.12]">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${done ? 'Mark' : 'Complete'} task: ${task.title}`}
          aria-pressed={done}
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-colors',
            done ? 'border-primary bg-primary text-primary-foreground' : 'border-white/15 bg-white/[0.04] text-transparent hover:border-primary/60'
          )}
        >
          <Check className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={cn('min-w-0 flex-1 text-base font-semibold text-white', done && 'text-white/45 line-through')}>{task.title}</h3>
            <Badge variant={priorityVariant} className="shrink-0 px-2 py-0.5 text-[11px] tracking-normal normal-case">
              {task.priority === 'high' ? 'High' : task.priority}
            </Badge>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
            {task.description || (task.category ? `Category: ${task.category}` : 'No description')}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-2.5">
            <time className="text-xs tabular-nums text-white/60" dateTime={task.deadline ?? task.createdAt}>
              {new Date(task.deadline ?? task.createdAt).toLocaleDateString()}
            </time>
            <button type="button" onClick={onDelete} aria-label={`Delete task: ${task.title}`} className="rounded-md p-1 text-white/35 transition hover:bg-red-500/10 hover:text-red-400">
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function DashboardContent() {
  const { tasks, toggleTodo, deleteTodo } = useTodos()
  const { state, start, pause, skip, focusTimeToday, todaySessions } = usePomodoro()
  const { notes } = useNotes()
  const { user } = useAuth()
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all')

  const now = new Date()
  const today = now.toDateString()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const displayName = useMemo(() => {
    const fullName = user?.user_metadata?.full_name as string | undefined
    return fullName?.split(' ')[0] ?? user?.email?.split('@')[0] ?? 'there'
  }, [user])

  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const openTasks = tasks.length - completedTasks
  const todayTasks = tasks.filter(task => task.deadline && new Date(task.deadline).toDateString() === today)
  const overdueTasks = tasks.filter(task => task.deadline && task.status !== 'completed' && new Date(task.deadline).getTime() < startOfToday)
  const filteredTasks = taskFilter === 'today' ? todayTasks : taskFilter === 'overdue' ? overdueTasks : tasks
  const focusSessions = todaySessions.filter(session => session.mode === 'focus').length
  const recentTasks = filteredTasks.slice(0, 6)
  const recentNotes = notes.slice(0, 3)

  const greeting = now.getHours() < 12 ? 'Good Morning' : now.getHours() < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] p-4 pb-24 sm:p-5 sm:pb-24 xl:p-6 xl:pb-24">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-[26px]">{greeting}, {displayName}</h1>
          <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">Your developer workspace at a glance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/todo" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm text-white/80 transition hover:bg-white/[0.1]">
            <Plus className="h-4 w-4" aria-hidden="true" /> New Task
          </Link>
          <button type="button" onClick={state.isRunning ? pause : start} className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_rgba(0,245,212,.2)] transition hover:brightness-110">
            {state.isRunning ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            {state.isRunning ? 'Pause Focus' : 'Start Focus'}
          </button>
        </div>
      </header>

      <div className="grid gap-5 lg:h-[calc(100dvh-12rem)] lg:min-h-[680px] lg:grid-cols-[minmax(0,1.8fr)_minmax(340px,.95fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          <section className="shrink-0 rounded-[28px] border border-white/[0.09] bg-[rgba(3,9,14,0.88)] p-5 shadow-[0_24px_64px_rgba(0,0,0,.38)] backdrop-blur-2xl sm:p-6">
            <header className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">Developer Hub</h2>
                <p className="mt-1 text-sm text-white/55">Your tasks, notes, and developer utilities</p>
              </div>
              <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
            </header>

            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              <article className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                <div className="flex items-center justify-between text-white/55"><ListTodo className="h-4 w-4" /><span className="text-xs">Open</span></div>
                <p className="mt-3 text-[32px] font-semibold tabular-nums leading-none text-white">{openTasks}</p>
                <p className="mt-2 text-sm text-white/55">Active tasks</p>
              </article>
              <article className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                <div className="flex items-center justify-between text-white/55"><CheckCircle2 className="h-4 w-4 text-emerald-400" /><span className="text-xs">Done</span></div>
                <p className="mt-3 text-[32px] font-semibold tabular-nums leading-none text-white">{completedTasks}</p>
                <p className="mt-2 text-sm text-white/55">Completed tasks</p>
              </article>
              <article className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                <div className="flex items-center justify-between text-white/55"><Clock3 className="h-4 w-4 text-cyan-300" /><span className="text-xs">Today</span></div>
                <p className="mt-3 text-[32px] font-semibold tabular-nums leading-none text-white">{focusSessions}</p>
                <p className="mt-2 text-sm text-white/55">Focus sessions</p>
              </article>
              <article className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                <div className="flex items-center justify-between text-white/55"><FileText className="h-4 w-4 text-amber-300" /><span className="text-xs">Saved</span></div>
                <p className="mt-3 text-[32px] font-semibold tabular-nums leading-none text-white">{notes.length}</p>
                <p className="mt-2 text-sm text-white/55">Quick notes</p>
              </article>
            </div>
          </section>

          <section className="min-h-[340px] flex-1 rounded-[28px] border border-white/[0.09] bg-[rgba(3,9,14,0.88)] p-5 shadow-[0_24px_64px_rgba(0,0,0,.38)] backdrop-blur-2xl sm:p-6">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Quick Tools</h2>
                <p className="mt-1 text-sm text-white/55">Useful utilities for everyday development</p>
              </div>
              <Link href="/json-formatter" aria-label="Browse developer tools" className="rounded-full p-2 text-white/45 transition hover:bg-white/[0.08] hover:text-white">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </header>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickTools.map(({ href, name, description, icon: Icon, tint }) => (
                <Link key={href} href={href} className="group flex min-h-[104px] items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 transition hover:border-white/[0.15] hover:bg-white/[0.07]">
                  <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', tint)}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[17px] font-semibold text-white">{name}</span>
                    <span className="mt-1 block text-sm text-white/55">{description}</span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                </Link>
              ))}
            </div>

            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Recent Notes</h3>
                <Link href="/notes" className="text-sm text-white/55 transition hover:text-primary">View all</Link>
              </div>
              {recentNotes.length ? (
                <div className="grid gap-2 sm:grid-cols-3">
                  {recentNotes.map(note => (
                    <Link key={note.id} href="/notes" className="min-w-0 rounded-xl bg-black/40 p-3 transition hover:bg-white/[0.06]">
                      <p className="truncate text-sm font-medium text-white/85">{note.title || 'Untitled note'}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/50">{note.content}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link href="/notes" className="block rounded-xl border border-dashed border-white/10 px-4 py-3 text-sm text-white/55 transition hover:border-primary/30 hover:text-white/70">
                  No notes yet. Create a quick note.
                </Link>
              )}
            </div>
          </section>
        </div>

        <aside className="flex min-w-0 flex-col gap-5 lg:min-h-0">
          <section className="shrink-0 rounded-[28px] border border-white/[0.08] bg-[rgba(3,9,14,0.9)] p-5 shadow-[0_24px_64px_rgba(0,0,0,.38)] sm:p-6">
            <header className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-semibold text-white"><Clock3 className="h-5 w-5 text-primary" aria-hidden="true" /> Focus Session</h2>
                <p className="mt-1 text-sm text-white/55">{state.label ?? 'Pomodoro timer'}</p>
              </div>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{state.isRunning ? 'In progress' : 'Ready'}</span>
            </header>
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-black/55 px-5 py-4">
              <div>
                <p className="text-[44px] font-bold leading-none tabular-nums tracking-tight text-white">{formatTime(state.timeRemaining)}</p>
                <p className="mt-2 text-sm text-white/55">{Math.floor(focusTimeToday / 60)} min focused today</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={state.isRunning ? pause : start} aria-label={state.isRunning ? 'Pause focus session' : 'Start focus session'} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:brightness-110">
                  {state.isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button type="button" onClick={skip} aria-label="Skip focus session" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition hover:bg-white/[0.1] hover:text-white">
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>
            </div>
            <Link href="/pomodoro" className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/55 transition hover:text-primary">Open Pomodoro <ArrowRight className="h-3.5 w-3.5" /></Link>
          </section>

          <section className="flex min-h-[400px] min-w-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[rgba(3,9,14,0.9)] p-5 shadow-[0_24px_64px_rgba(0,0,0,.38)] sm:p-6">
            <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-white"><ListTodo className="h-5 w-5 text-white/70" aria-hidden="true" /> Tasks</h2>
              <div className="flex items-center gap-4 text-sm">
                <Link href="/todo" className="inline-flex items-center gap-1.5 text-white/65 transition hover:text-white">See All <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                <Link href="/todo" className="inline-flex items-center gap-1.5 text-white/65 transition hover:text-primary"><Plus className="h-4 w-4" /> Add New</Link>
              </div>
            </header>
            <div role="tablist" aria-label="Filter tasks" className="mb-4 flex shrink-0 gap-2 overflow-x-auto pb-1">
              {([['all', 'All', tasks.length], ['today', 'Today', todayTasks.length], ['overdue', 'Overdue', overdueTasks.length]] as const).map(([value, label, count]) => (
                <button key={value} type="button" role="tab" aria-selected={taskFilter === value} onClick={() => setTaskFilter(value)} className={cn('shrink-0 rounded-full px-4 py-2 text-sm font-medium transition', taskFilter === value ? 'bg-black text-white shadow-inner' : 'bg-white/[0.06] text-white/65 hover:bg-white/[0.11] hover:text-white')}>
                  {label} <span className="ml-1 tabular-nums">{count}</span>
                </button>
              ))}
            </div>
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
              {recentTasks.map(task => <TaskCard key={task.id} task={task} onToggle={() => toggleTodo(task.id)} onDelete={() => deleteTodo(task.id)} />)}
              {!recentTasks.length && <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-white/45">No tasks in this view.</div>}
            </div>
          </section>
        </aside>
      </div>

      <div className="fixed bottom-6 left-1/2 z-40 w-[min(430px,calc(100vw-32px))] -translate-x-1/2">
        <label className="flex h-16 items-center gap-3 rounded-full border border-white/[0.12] bg-[#17232b]/85 px-5 shadow-[0_20px_45px_rgba(0,0,0,.65)] backdrop-blur-2xl focus-within:ring-2 focus-within:ring-primary/40">
          <Sparkles className="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
          <input type="text" placeholder="How can I help you?" aria-label="Ask the assistant" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/55" />
        </label>
      </div>
    </div>
  )
}

