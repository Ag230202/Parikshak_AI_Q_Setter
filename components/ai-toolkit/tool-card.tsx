'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onUse: () => void;
}

export function ToolCard({ icon: Icon, title, description, onUse }: ToolCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        </div>
        <Button onClick={onUse} className="w-full bg-accent hover:bg-accent/90">
          Use Tool
        </Button>
      </CardContent>
    </Card>
  );
}
