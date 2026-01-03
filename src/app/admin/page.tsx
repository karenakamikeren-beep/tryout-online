'use client'

import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  LayoutDashboard, 
  ListTodo, 
  ListChecks, 
  Database, 
  FileText, 
  Upload, 
  FolderOpen, 
  UserCheck,
  LogOut,
  Home,
  Users,
  Target 
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin',
      active: pathname === '/admin',
    },
    {
      title: 'Manajemen Tryout',
      icon: FileText,
      href: '/admin/tryouts',
      active: pathname === '/admin/tryouts',
    },
    {
      title: 'Manajemen Soal',
      icon: ListChecks,
      href: '/admin/questions',
      active: pathname === '/admin/questions',
    },
    {
      title: 'Kategori',
      icon: FolderOpen,
      href: '/admin/categories',
      active: pathname === '/admin/categories',
    },
    {
      title: 'Bulk Upload',
      icon: Upload,
      href: '/admin/upload',
      active: pathname === '/admin/upload',
    },
    {
      title: 'Data Dummy',
      icon: Database,
      href: '/admin/dummy-data',
      active: pathname === '/admin/dummy-data',
    },
  ]

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">TryoutAdmin</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Dashboard Pusat</p>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-green-600 dark:bg-green-500 text-white shadow-lg'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-green-50 dark:hover:bg-green-900/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          {session?.user && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">
                  {session.user.name || 'Admin'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {session.user.email}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {session.user.role === 'admin' ? 'Admin' : 'User'}
              </Badge>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/50 rounded-lg transition-colors mt-2"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                {sidebarItems.find(item => item.active)?.title || 'Admin Dashboard'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Selamat datang di panel admin
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/50 rounded-full">
                <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs font-semibold text-green-700 dark:text-green-300">Online</span>
              </div>
              <Badge variant="outline" className="hidden md:inline-flex">
                v1.0.0
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
