'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-center space-y-6">
      {/* Illustration */}
      <div className="w-80 h-80 relative">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle cx="200" cy="200" r="120" fill="#f5f5f5" opacity="0.5" />
          
          {/* Document icon */}
          <g transform="translate(150, 140)">
            <rect x="0" y="0" width="100" height="120" rx="8" fill="white" stroke="#ddd" strokeWidth="2" />
            <line x1="15" y1="20" x2="85" y2="20" stroke="#ddd" strokeWidth="2" />
            <line x1="15" y1="40" x2="85" y2="40" stroke="#ddd" strokeWidth="2" />
            <line x1="15" y1="60" x2="70" y2="60" stroke="#ddd" strokeWidth="2" />
            <line x1="15" y1="80" x2="70" y2="80" stroke="#ddd" strokeWidth="2" />
          </g>

          {/* Magnifying glass */}
          <g transform="translate(220, 180)">
            <circle cx="0" cy="0" r="30" fill="none" stroke="#d4a5dd" strokeWidth="3" />
            <line x1="20" y1="20" x2="40" y2="40" stroke="#d4a5dd" strokeWidth="3" />
          </g>

          {/* X mark in circle */}
          <circle cx="200" cy="160" r="35" fill="none" stroke="#d4a5dd" strokeWidth="2" />
          <line x1="180" y1="140" x2="220" y2="180" stroke="#ff6b6b" strokeWidth="4" strokeLinecap="round" />
          <line x1="220" y1="140" x2="180" y2="180" stroke="#ff6b6b" strokeWidth="4" strokeLinecap="round" />

          {/* Decorative elements */}
          <path d="M80 120 Q90 110 100 120" stroke="#5b9bd5" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="320" cy="280" r="8" fill="#5b9bd5" />
          <path d="M140 300 L150 290 L160 300" stroke="#5b9bd5" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Text Content */}
      <div className="space-y-3 max-w-md">
        <h2 className="text-3xl font-bold text-foreground">No assignments yet</h2>
        <p className="text-muted-foreground text-lg">
          Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
        </p>
      </div>

      {/* CTA Button */}
      <a href="/create-assignment">
        <Button className="bg-accent hover:bg-orange-600 text-accent-foreground px-8 py-6 rounded-full font-semibold text-lg">
          + Create Your First Assignment
        </Button>
      </a>
    </div>
  );
}
