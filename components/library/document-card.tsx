'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Trash2 } from 'lucide-react';
import { Document } from '@/lib/assignments';
import { formatDate, formatFileSize } from '@/lib/assignments';

interface DocumentCardProps {
  document: Document;
  onDelete?: (id: string) => void;
  onDownload?: (document: Document) => void;
}

export function DocumentCard({ document, onDelete, onDownload }: DocumentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{document.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {document.category} • {formatFileSize(document.fileSize)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(document.uploadedDate)}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDownload?.(document)}
              className="h-8 w-8 p-0"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete?.(document.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
