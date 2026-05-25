'use client';

import { useState } from 'react';
import { ChevronLeft, Plus, Trash2, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

type Step = 'details' | 'questions' | 'additional' | 'review';
type QuestionType = 'multiple-choice' | 'short-answer' | 'diagram' | 'numerical';

interface QuestionTypeConfig {
  type: QuestionType;
  label: string;
  questions: number;
  marks: number;
}

interface CreateAssignmentFormProps {
  onSubmit?: (data: any) => void;
  isSubmitting?: boolean;
}

export function CreateAssignmentForm({ onSubmit, isSubmitting = false }: CreateAssignmentFormProps) {
  const [step, setStep] = useState<Step>('details');
  const [fileName, setFileName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [timeAllowed, setTimeAllowed] = useState<number>(60);
  const [questionTypes, setQuestionTypes] = useState<QuestionTypeConfig[]>([
    { type: 'multiple-choice', label: 'Multiple Choice Questions', questions: 4, marks: 1 },
    { type: 'short-answer', label: 'Short Questions', questions: 4, marks: 4 },
  ]);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const totalQuestions = questionTypes.reduce((sum, qt) => sum + qt.questions, 0);
  const totalMarks = questionTypes.reduce((sum, qt) => sum + qt.questions * qt.marks, 0);

  const handleAddQuestionType = () => {
    setQuestionTypes([...questionTypes, { type: 'multiple-choice', label: 'New Question Type', questions: 1, marks: 1 }]);
  };

  const handleRemoveQuestionType = (index: number) => {
    setQuestionTypes(questionTypes.filter((_, i) => i !== index));
  };

  const handleUpdateQuestionType = (index: number, field: string, value: any) => {
    const updated = [...questionTypes];
    updated[index] = { ...updated[index], [field]: value };
    setQuestionTypes(updated);
  };

  const handleCreate = () => {
    const formData = {
      title: title || 'Untitled Assignment',
      subject: subject || 'General',
      instructions: instructions || additionalInfo,
      dueDate: dueDate
        ? new Date(dueDate).toISOString()
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      questionTypes: questionTypes.map((qt) => ({
        id: qt.type + '_' + Math.random().toString(36).slice(2),
        type: qt.type,
        noOfQuestions: qt.questions,
        marks: qt.marks,
      })),
      totalQuestions,
      totalMarks,
      additionalInfo,
      timeAllowed,
      status: 'generating',
    };
    onSubmit?.(formData);
  };

  const handleNext = () => {
    if (step === 'details') setStep('questions');
    else if (step === 'questions') setStep('additional');
    else if (step === 'additional') setStep('review');
    else if (step === 'review') handleCreate();
  };

  const handlePrevious = () => {
    if (step === 'questions') setStep('details');
    else if (step === 'additional') setStep('questions');
    else if (step === 'review') setStep('additional');
  };

  const stepIndex = { details: 0, questions: 1, additional: 2, review: 3 }[step];

  return (
    <div className="space-y-6 relative">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl max-w-sm w-full mx-4">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-1">Generating AI Paper...</h3>
              <p className="text-sm text-muted-foreground">
                AI is creating your question paper. This takes a few seconds.
              </p>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div className="h-full bg-accent rounded-full animate-pulse w-2/3" />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className={step === 'details' ? 'invisible' : ''}
        >
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Create Assignment</h1>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 h-1.5 rounded-full overflow-hidden bg-secondary">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-all duration-300 ${
              i <= stepIndex ? 'bg-accent' : 'opacity-30 bg-secondary'
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Step {stepIndex + 1} of 4 —{' '}
        {step === 'details'
          ? 'Assignment Details'
          : step === 'questions'
          ? 'Question Types'
          : step === 'additional'
          ? 'Additional Info'
          : 'Review & Create'}
      </p>

      {/* Step: Details */}
      {step === 'details' && (
        <Card className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Assignment Details</h2>
            <p className="text-muted-foreground">Basic information about your assignment</p>
          </div>

          <div className="space-y-3">
            <label className="text-foreground font-semibold">Title *</label>
            <Input
              placeholder="e.g. Chapter 5 – Thermodynamics Test"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-secondary"
            />
          </div>

          <div className="space-y-3">
            <label className="text-foreground font-semibold">Subject *</label>
            <Input
              placeholder="e.g. Physics, Chemistry, Maths"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-secondary"
            />
          </div>

          <div className="space-y-3">
            <label className="text-foreground font-semibold">Instructions</label>
            <Textarea
              placeholder="e.g. Answer all questions. Time allowed: 3 hours."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="bg-secondary resize-none min-h-24"
            />
          </div>

          <div className="space-y-3">
            <label className="text-foreground font-semibold">Upload Document (Optional)</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary transition-colors cursor-pointer">
              <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-foreground mb-1">Choose a file or drag &amp; drop</p>
              <p className="text-sm text-muted-foreground">JPEG, PNG, up to 10MB</p>
              <Button variant="outline" className="mt-4">Browse Files</Button>
            </div>
            {fileName && <p className="text-sm text-foreground">Selected: {fileName}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-foreground font-semibold">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-secondary"
            />
          </div>

          <div className="space-y-3">
            <label className="text-foreground font-semibold">Time Allowed (minutes)</label>
            <Input
              type="number"
              value={timeAllowed}
              onChange={(e) => setTimeAllowed(parseInt(e.target.value) || 0)}
              className="bg-secondary"
            />
          </div>
        </Card>
      )}

      {/* Step: Questions */}
      {step === 'questions' && (
        <Card className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Question Types</h2>
            <p className="text-muted-foreground">Configure question types and marks</p>
          </div>

          <div className="space-y-4">
            {questionTypes.map((qt, idx) => (
              <div key={idx} className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <select
                    value={qt.type}
                    onChange={(e) => handleUpdateQuestionType(idx, 'type', e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="multiple-choice">Multiple Choice Questions</option>
                    <option value="short-answer">Short Questions</option>
                    <option value="diagram">Diagram/Graph-Based Questions</option>
                    <option value="numerical">Numerical Problems</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveQuestionType(idx)}
                    className="ml-2"
                  >
                    <Trash2 size={20} className="text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">No. of Questions</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuestionType(idx, 'questions', Math.max(1, qt.questions - 1))}
                        className="px-3 py-2 border border-border rounded"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold">{qt.questions}</span>
                      <button
                        onClick={() => handleUpdateQuestionType(idx, 'questions', qt.questions + 1)}
                        className="px-3 py-2 border border-border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Marks per Question</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuestionType(idx, 'marks', Math.max(1, qt.marks - 1))}
                        className="px-3 py-2 border border-border rounded"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold">{qt.marks}</span>
                      <button
                        onClick={() => handleUpdateQuestionType(idx, 'marks', qt.marks + 1)}
                        className="px-3 py-2 border border-border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={handleAddQuestionType} variant="outline" className="w-full">
            <Plus size={20} className="mr-2" /> Add Question Type
          </Button>

          <div className="bg-secondary p-4 rounded-lg space-y-2">
            <p className="text-foreground">
              <span className="font-semibold">Total Questions:</span> {totalQuestions}
            </p>
            <p className="text-foreground">
              <span className="font-semibold">Total Marks:</span> {totalMarks}
            </p>
          </div>
        </Card>
      )}

      {/* Step: Additional */}
      {step === 'additional' && (
        <Card className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Additional Information</h2>
            <p className="text-muted-foreground">Extra context for better AI output</p>
          </div>
          <Textarea
            placeholder="e.g. Generate a question paper for a 3 hour exam. Include topics: Newton's laws, momentum, and energy conservation. Target difficulty: medium."
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="min-h-40 bg-secondary resize-none"
          />
        </Card>
      )}

      {/* Step: Review */}
      {step === 'review' && (
        <Card className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Review Assignment</h2>
            <div className="space-y-4">
              {[
                { label: 'Title', value: title || 'Untitled' },
                { label: 'Subject', value: subject || 'General' },
                { label: 'Due Date', value: dueDate || 'Not set' },
                { label: 'Total Questions', value: totalQuestions },
                { label: 'Total Marks', value: totalMarks },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                  <span className="text-foreground font-semibold">{label}:</span>
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
              {additionalInfo && (
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Additional Info:</p>
                  <p className="text-foreground text-sm">{additionalInfo}</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex gap-4 justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          className={step === 'details' ? 'invisible' : ''}
          disabled={isSubmitting}
        >
          ← Previous
        </Button>
        <Button
          onClick={handleNext}
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
            </>
          ) : step === 'review' ? (
            '✨ Create Assignment'
          ) : (
            'Next →'
          )}
        </Button>
      </div>
    </div>
  );
}
