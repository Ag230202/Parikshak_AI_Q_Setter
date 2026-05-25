'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAssignments } from '@/hooks/useAssignments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function EditAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const { getAssignment, updateAssignment, loading } = useAssignments();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    timeAllowed: 60,
    additionalInfo: '',
    instructions: '',
  });

  const assignment = getAssignment(params.id as string);

  // Sync loaded assignment details with the form state
  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title || '',
        description: assignment.description || '',
        dueDate: assignment.dueDate ? assignment.dueDate.slice(0, 16) : '',
        timeAllowed: assignment.timeAllowed || 60,
        additionalInfo: assignment.additionalInfo || '',
        instructions: assignment.instructions || '',
      });
    }
  }, [assignment]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="space-y-4">
        <Link href="/assignments">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Assignments
          </Button>
        </Link>
        <Card>
          <CardContent className="pt-12 text-center">
            <h3 className="font-semibold mb-2">Assignment not found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The assignment you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/assignments">
              <Button className="bg-accent hover:bg-accent/90">Go to Assignments</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'timeAllowed' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateAssignment(assignment.id, {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(),
      });
      router.push(`/assignments/${assignment.id}`);
    } catch (error) {
      console.error('Error updating assignment:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href={`/assignments/${assignment.id}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Assignment</h1>
        <div></div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter assignment title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter assignment description"
                className="min-h-[100px]"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-semibold mb-2">Due Date</label>
              <Input
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            {/* Time Allowed */}
            <div>
              <label className="block text-sm font-semibold mb-2">Time Allowed (minutes)</label>
              <Input
                type="number"
                name="timeAllowed"
                value={formData.timeAllowed}
                onChange={handleChange}
                min="1"
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-semibold mb-2">Instructions</label>
              <Textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="e.g. Answer all questions. Time allowed: 3 hours."
                className="min-h-[100px]"
              />
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-sm font-semibold mb-2">Additional Information</label>
              <Textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any additional information for students"
                className="min-h-[100px]"
              />
            </div>

            {/* Note about question types */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                Note: Question types and file cannot be edited here. To modify these, please create a new assignment.
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <Link href={`/assignments/${assignment.id}`}>
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
