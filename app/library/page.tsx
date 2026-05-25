'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadArea } from '@/components/library/upload-area';
import { DocumentCard } from '@/components/library/document-card';
import { DeleteConfirmation } from '@/components/dialogs/delete-confirmation';
import { Document, generateDocumentId, formatDate } from '@/lib/assignments';
import { Search, BookOpen } from 'lucide-react';

const LIBRARY_STORAGE_KEY = 'vedaai_library';

export default function LibraryPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const categories = ['All', 'Mathematics', 'Science', 'English', 'History', 'Geography', 'Social Studies', 'General Resources'];

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LIBRARY_STORAGE_KEY);
    if (stored) {
      try {
        setDocuments(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load documents:', error);
      }
    }
  }, []);

  // Filter documents
  useEffect(() => {
    let filtered = documents;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((d) => d.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDocuments(filtered);
  }, [documents, searchQuery, selectedCategory]);

  // Save to localStorage
  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(documents));
    }
  }, [documents]);

  const handleUpload = (file: File, category: string) => {
    setLoading(true);
    // Simulate upload delay
    setTimeout(() => {
      const newDocument: Document = {
        id: generateDocumentId(),
        name: file.name,
        fileUrl: URL.createObjectURL(file),
        fileSize: file.size,
        fileType: file.type,
        category,
        uploadedDate: new Date().toISOString(),
      };
      setDocuments((prev) => [newDocument, ...prev]);
      setLoading(false);
    }, 500);
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    setDeleteId(null);
  };

  const handleDownload = (doc: Document) => {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.name;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Library</h1>
        <p className="text-muted-foreground">Upload and manage your learning resources</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <UploadArea onUpload={handleUpload} isLoading={loading} />
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 bg-white rounded-lg border border-border px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus:outline-none focus:ring-0 px-0"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'bg-accent hover:bg-accent/90' : ''}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div>
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onDelete={() => setDeleteId(doc.id)}
                onDownload={() => handleDownload(doc)}
              />
            ))}
          </div>
        ) : documents.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">No documents yet</h3>
                <p className="text-sm text-muted-foreground">
                  Upload documents to get started
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="text-center py-8">
            <CardContent>
              <p className="text-sm text-muted-foreground">No documents found matching your filters</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Document"
        description="Are you sure you want to delete this document? This action cannot be undone."
        onConfirm={() => deleteId && handleDelete(deleteId)}
      />
    </div>
  );
}
