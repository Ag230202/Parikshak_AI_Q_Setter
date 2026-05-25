'use client';

import Link from 'next/link';
import { Home, LayoutList, Clock, Zap } from 'lucide-react';

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-primary border-t border-border">
      <div className="flex justify-around items-center h-20 px-2">
        <Link href="/home" className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Home size={24} />
          <span>Home</span>
        </Link>
        <Link href="/assignments" className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <LayoutList size={24} />
          <span>Assignments</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Clock size={24} />
          <span>Library</span>
        </Link>
        <Link href="/ai-toolkit" className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Zap size={24} />
          <span>AI Toolkit</span>
        </Link>
      </div>
    </nav>
  );
}
