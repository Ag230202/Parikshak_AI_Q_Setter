'use client';

import { useState, useMemo } from 'react';
import { useAssignments } from '@/hooks/useAssignments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DeleteConfirmation } from '@/components/dialogs/delete-confirmation';
import { formatDate, formatFileSize, getAssignmentStatus, getDaysUntilDue, calculateTotalQuestions, calculateTotalMarks } from '@/lib/assignments';
import { Search, Filter, Plus, MoreVertical, Eye, Edit, Trash2, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AssignmentsPage() {
  const { assignments, deleteAssignment, loading } = useAssignments();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Filter assignments
  const filteredAssignments = useMemo(() => {
    let filtered = assignments;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.className.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((a) => {
        const status = getAssignmentStatus(a.dueDate);
        return status === selectedStatus;
      });
    }

    return filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [assignments, searchQuery, selectedStatus]);

  const handleDelete = (id: string) => {
    deleteAssignment(id);
    setDeleteId(null);
  };

  const handleDownload = (assignmentId: string) => {
    const assignment = assignments.find((a) => a.id === assignmentId);
    if (assignment && assignment.fileUrl) {
      const link = document.createElement('a');
      link.href = assignment.fileUrl;
      link.download = assignment.fileName || 'assignment.pdf';
      link.click();
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading assignments...</div>;
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-col lg:flex-row">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Assignments</h1>
          <p className="text-sm lg:text-base text-muted-foreground">Manage and create assignments for your classes</p>
        </div>
        <Link href="/create-assignment" className="hidden lg:block flex-shrink-0">
          <Button className="bg-accent hover:bg-orange-600 gap-2 font-semibold">
            <Plus className="w-4 h-4" />
            Create Assignment
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 bg-card rounded-lg border border-border px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, subject, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 focus:outline-none focus:ring-0 px-0"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('all')}
            className={selectedStatus === 'all' ? 'bg-accent hover:bg-accent/90' : ''}
          >
            All
          </Button>
          <Button
            variant={selectedStatus === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('active')}
            className={selectedStatus === 'active' ? 'bg-accent hover:bg-accent/90' : ''}
          >
            Active
          </Button>
          <Button
            variant={selectedStatus === 'due-soon' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('due-soon')}
            className={selectedStatus === 'due-soon' ? 'bg-accent hover:bg-accent/90' : ''}
          >
            Due Soon
          </Button>
          <Button
            variant={selectedStatus === 'overdue' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('overdue')}
            className={selectedStatus === 'overdue' ? 'bg-accent hover:bg-accent/90' : ''}
          >
            Overdue
          </Button>
        </div>
      </div>

      {/* Assignments Table/Cards */}
      {filteredAssignments.length > 0 ? (
        <div className="space-y-3">
          {filteredAssignments.map((assignment) => {
            const status = getAssignmentStatus(assignment.dueDate);
            const daysUntil = getDaysUntilDue(assignment.dueDate);
            const statusColor =
              status === 'overdue'
                ? 'bg-red-500/10 border-red-500/30'
                : status === 'due-soon'
                  ? 'bg-orange-500/10 border-orange-500/30'
                  : 'bg-card border-border';

            return (
              <Card key={assignment.id} className={`${statusColor}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{assignment.title}</h3>
                          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Subject</p>
                              <p className="font-medium">{assignment.subject}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Class</p>
                              <p className="font-medium">{assignment.className}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Questions</p>
                              <p className="font-medium">
                                {calculateTotalQuestions(assignment.questionTypes)}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Marks</p>
                              <p className="font-medium">
                                {calculateTotalMarks(assignment.questionTypes)}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm">
                            <div>
                              <p className="text-muted-foreground">Assigned</p>
                              <p className="font-medium">{formatDate(assignment.assignedDate)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Due</p>
                              <p className="font-medium">{formatDate(assignment.dueDate)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Status</p>
                              <p
                                className={`font-medium ${
                                  status === 'overdue'
                                    ? 'text-red-600'
                                    : status === 'due-soon'
                                      ? 'text-orange-600'
                                      : 'text-green-600'
                                }`}
                              >
                                {daysUntil < 0
                                  ? `${Math.abs(daysUntil)} days overdue`
                                  : `${daysUntil} days left`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Link href={`/assignments/${assignment.id}`}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/assignments/${assignment.id}/edit`}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      {assignment.fileUrl && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownload(assignment.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(assignment.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <h3 className="font-semibold mb-2">No assignments found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {assignments.length === 0
                ? 'Create your first assignment to get started'
                : 'No assignments match your filters'}
            </p>
            {assignments.length === 0 && (
              <Link href="/create-assignment">
                <Button className="bg-accent hover:bg-accent/90">
                  Create Assignment
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmation
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Assignment"
        description="Are you sure you want to delete this assignment? This action cannot be undone and students will no longer see it."
        onConfirm={() => deleteId && handleDelete(deleteId)}
      />

      {/* Mobile Floating Action Button */}
      <Link href="/create-assignment" className="fixed bottom-24 right-4 lg:hidden">
        <Button className="bg-accent hover:bg-orange-600 text-accent-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
}
