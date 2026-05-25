'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAssignments } from '@/hooks/useAssignments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExamPaperRenderer } from '@/components/ExamPaperRenderer';
import { DeleteConfirmation } from '@/components/dialogs/delete-confirmation';
import { formatDate, getAssignmentStatus, getDaysUntilDue, calculateTotalQuestions, calculateTotalMarks } from '@/lib/assignments';
import { ArrowLeft, Edit, Trash2, Download, Loader2, Sparkles, BookOpen, Clock, Calendar, GraduationCap, Award } from 'lucide-react';
import Link from 'next/link';

export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getAssignment, updateAssignment, deleteAssignment, loading } = useAssignments();
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [genStep, setGenStep] = useState(0);

  const paperRef = useRef<HTMLDivElement>(null);
  const assignment = getAssignment(params.id as string);

  // Visual AI generation step animation
  useEffect(() => {
    if (!assignment || assignment.status !== 'generating') {
      setGenStep(0);
      return;
    }

    const interval = setInterval(() => {
      setGenStep((prev) => {
        if (prev < 4) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [assignment]);

  const handleDelete = async () => {
    if (!assignment) return;
    setIsDeleting(true);
    try {
      await deleteAssignment(assignment.id);
      setShowDeleteConfirm(false);
      router.push('/assignments');
    } catch (error) {
      console.error('Failed to delete assignment:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = () => {
    if (!assignment) return;
    // Premium print/download behavior: opens print layout focusing on the exam paper sheet
    window.print();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
        <p className="text-muted-foreground animate-pulse text-sm">Loading assignment details...</p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="space-y-4">
        <Link href="/assignments">
          <Button variant="ghost" className="gap-2 text-foreground hover:bg-secondary">
            <ArrowLeft className="w-4 h-4" />
            Back to Assignments
          </Button>
        </Link>
        <Card className="bg-card border-border">
          <CardContent className="pt-12 text-center">
            <h3 className="font-semibold text-foreground mb-2">Assignment not found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The assignment you&apos;re looking for doesn&apos;t exist or has been deleted.
            </p>
            <Link href="/assignments">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Go to Assignments
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const status = getAssignmentStatus(assignment.dueDate);
  const daysUntil = getDaysUntilDue(assignment.dueDate);

  const statusBadgeColor =
    status === 'overdue'
      ? 'bg-red-500/10 text-red-500 border-red-500/20'
      : status === 'due-soon'
      ? 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      : 'bg-green-500/10 text-green-500 border-green-500/20';

  const progressSteps = [
    'Ingesting reference materials...',
    'Analyzing curriculum requirements...',
    'Drafting question sets and formats...',
    'Calibrating question difficulty & weightage...',
    'Generating complete print-ready PDF...'
  ];

  return (
    <div className="space-y-6 pb-24 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="space-y-1">
          <Link href="/assignments" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Assignments
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{assignment.title}</h1>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusBadgeColor}`}>
              {status === 'overdue'
                ? 'Overdue'
                : status === 'due-soon'
                ? 'Due Soon'
                : 'Active'}
            </span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          <Link href={`/assignments/${assignment.id}/edit`}>
            <Button variant="outline" size="sm" className="gap-2 border-border text-foreground hover:bg-secondary">
              <Edit className="w-4 h-4" /> Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={assignment.status === 'generating'}
            className="gap-2 border-border text-foreground hover:bg-secondary"
          >
            <Download className="w-4 h-4" /> Export / Print
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sidebar Info (Left Column) */}
        <div className="space-y-6 lg:col-span-1">
          
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-lg font-bold text-foreground">Assignment Metadata</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Subject</p>
                  <p className="font-semibold text-sm text-foreground">{assignment.subject}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Class / Grade</p>
                  <p className="font-semibold text-sm text-foreground">{assignment.className || 'Not Specified'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time Allowed</p>
                  <p className="font-semibold text-sm text-foreground">{assignment.timeAllowed} minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Due Date</p>
                  <p className="font-semibold text-sm text-foreground">{formatDate(assignment.dueDate)}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {daysUntil < 0
                      ? `${Math.abs(daysUntil)} days overdue`
                      : `${daysUntil} days left to submit`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Marks</p>
                  <p className="font-semibold text-sm text-foreground">{calculateTotalMarks(assignment.questionTypes)} marks</p>
                </div>
              </div>

            </CardContent>
          </Card>

          {assignment.additionalInfo && (
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border">
                <CardTitle className="text-base font-bold text-foreground">Teacher Context &amp; Instructions</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {assignment.additionalInfo}
                </p>
              </CardContent>
            </Card>
          )}

          {assignment.fileName && (
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border">
                <CardTitle className="text-base font-bold text-foreground">Reference File</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="p-3 bg-secondary rounded-lg border border-border flex items-center justify-between text-sm">
                  <div className="truncate font-medium text-foreground max-w-[180px]">{assignment.fileName}</div>
                  {assignment.fileUrl && (
                    <a
                      href={assignment.fileUrl}
                      download={assignment.fileName}
                      className="text-xs text-accent font-semibold hover:underline"
                    >
                      Download
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Exam Paper Sheet (Right 2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          
          {(assignment.status === 'generating' || assignment.status === 'pending') ? (
            <Card className="bg-card border-border shadow-md min-h-[450px] flex items-center justify-center">
              <CardContent className="p-8 max-w-md w-full text-center space-y-6">
                
                <div className="relative mx-auto w-16 h-16 bg-accent/10 text-accent flex items-center justify-center rounded-full">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                  <Loader2 className="w-16 h-16 text-accent animate-spin absolute inset-0" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">AI Generation In Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    VedaAI is building a highly structured, syllabus-aligned examination sheet.
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-3 pt-2">
                  <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${((genStep + 1) / progressSteps.length) * 100}%` }}
                    />
                  </div>
                  
                  {/* Step updates */}
                  <div className="h-6 overflow-hidden relative">
                    {progressSteps.map((stepText, idx) => (
                      <div
                        key={idx}
                        className={`text-xs font-semibold absolute inset-x-0 transition-all duration-300 transform ${
                          idx === genStep
                            ? 'opacity-100 translate-y-0 text-accent'
                            : idx < genStep
                            ? 'opacity-40 -translate-y-4 text-muted-foreground'
                            : 'opacity-0 translate-y-4 text-muted-foreground'
                        }`}
                      >
                        {stepText}
                      </div>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          ) : (
            <div className="rounded-xl border border-border overflow-hidden bg-[#2d3748] dark:bg-zinc-900 p-4 md:p-8 flex justify-center shadow-inner">
              <div className="shadow-2xl rounded overflow-hidden">
                <ExamPaperRenderer assignment={assignment} targetRef={paperRef} />
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete Assignment"
        description={`Are you sure you want to delete "${assignment.title}"? This will permanently remove the assignment and all generated question papers.`}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
