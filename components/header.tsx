'use client';

import Link from 'next/link';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo for mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">V</span>
          </div>
          <span className="font-bold text-foreground">Parikshak</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notification */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} className="text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline text-sm font-medium text-foreground">John Doe</span>
          </div>

          {/* Menu button for mobile */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu size={20} className="text-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
}
