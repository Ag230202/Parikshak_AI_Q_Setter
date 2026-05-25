'use client';

import { useState } from 'react';
import { useAssignments } from '@/hooks/useAssignments';
import { CreateAssignmentForm } from '@/components/create-assignment-form';
import { useRouter } from 'next/navigation';

export default function CreateAssignmentPage() {
  const router = useRouter();
  const { createAssignment } = useAssignments();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const created = await createAssignment(formData);
      router.push(`/assignments/${created.id || created._id}`);
    } catch (error) {
      console.error('Error creating assignment:', error);
      setIsSubmitting(false);
    }
  };

  return <CreateAssignmentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}
