export interface QuestionType {
  id: string;
  type: string;
  noOfQuestions: number;
  marks: number;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  schoolName: string;
  className: string;
  subject: string;
  timeAllowed: number;
  maximumMarks: number;
  assignedDate: string;
  dueDate: string;
  questionTypes: QuestionType[];
  additionalInfo?: string;
  instructions?: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
  updatedAt: string;
  status?: 'generating' | 'ready' | 'completed' | 'failed' | 'pending';
  generatedPaper?: {
    sections: {
      title: string;
      instruction?: string;
      questions: {
        question: string;
        marks: number;
      }[];
    }[];
  };
}

export interface Document {
  id: string;
  name: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  category: string;
  uploadedDate: string;
  thumbnail?: string;
}

export function generateAssignmentId(): string {
  return `assign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateDocumentId(): string {
  return `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

export function calculateTotalQuestions(questionTypes: QuestionType[]): number {
  return questionTypes.reduce((total, qt) => total + qt.noOfQuestions, 0);
}

export function calculateTotalMarks(questionTypes: QuestionType[]): number {
  return questionTypes.reduce((total, qt) => total + (qt.noOfQuestions * qt.marks), 0);
}

export function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate);
  const today = new Date();
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getAssignmentStatus(dueDate: string): 'overdue' | 'due-soon' | 'active' {
  const daysUntil = getDaysUntilDue(dueDate);
  if (daysUntil < 0) return 'overdue';
  if (daysUntil <= 3) return 'due-soon';
  return 'active';
}
