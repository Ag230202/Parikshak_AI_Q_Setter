'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';

interface UploadAreaProps {
  onUpload: (file: File, category: string) => void;
  isLoading?: boolean;
}

const categories = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Social Studies',
  'General Resources',
];

export function UploadArea({ onUpload, isLoading }: UploadAreaProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onUpload(files[0], selectedCategory);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0], selectedCategory);
    }
  };

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition ${
          isDragging ? 'border-accent bg-accent/5' : 'border-border'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Drag and drop your file here</h3>
            <p className="text-sm text-muted-foreground">
              or click to browse (PDF, Images, Documents up to 10MB)
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
          disabled={isLoading}
        />
      </Card>

      <div className="flex gap-2 items-center">
        <label className="text-sm font-medium">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
