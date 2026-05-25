'use client';

import Link from 'next/link';
import { Home, BookOpen, LayoutList, Zap, Clock, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border p-6 h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <span className="text-accent-foreground font-bold">V</span>
        </div>
        <span className="text-xl font-bold text-sidebar-foreground">VedaAI</span>
      </div>

      {/* Create Assignment Button */}
      <Link href="/create-assignment" className="block mb-8">
        <Button className="w-full bg-accent hover:bg-orange-600 text-accent-foreground rounded-full font-semibold py-6 flex items-center justify-center gap-2">
          <span className="text-lg">+</span> Create Assignment
        </Button>
      </Link>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        <Link href="/home" className="flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link href="/groups" className="flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <BookOpen size={20} />
          <span>My Groups</span>
        </Link>
        <Link href="/assignments" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors">
          <LayoutList size={20} />
          <span>Assignments</span>
          <span className="ml-auto bg-accent text-white text-xs rounded-full px-2 py-0.5">10</span>
        </Link>
        <Link href="/ai-toolkit" className="flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <Zap size={20} />
          <span>AI Teacher&apos;s Toolkit</span>
        </Link>
        <Link href="/library" className="flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <Clock size={20} />
          <span>My Library</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border pt-4 space-y-2">
        <Link href="/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <div className="px-4 py-3 rounded-lg bg-sidebar-accent">
          <p className="font-semibold text-sidebar-foreground text-sm">Delhi Public School</p>
          <p className="text-xs text-muted-foreground">Bokaro Steel City</p>
        </div>
      </div>
    </aside>
  );
}
