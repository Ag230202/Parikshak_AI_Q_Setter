import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignment extends Document {
  title: string;
  subject: string;
  instructions: string;
  dueDate: Date;
  questionTypes: any[];
  totalQuestions: number;
  totalMarks: number;
  status: string;
  generatedPaper: any;
  timeAllowed?: number;
  className?: string;
  schoolName?: string;
  additionalInfo?: string;
}

const AssignmentSchema: Schema = new Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  instructions: { type: String },
  dueDate: { type: Date },
  questionTypes: { type: [Schema.Types.Mixed] },
  totalQuestions: { type: Number },
  totalMarks: { type: Number },
  status: { type: String, default: 'pending' },
  generatedPaper: { type: Schema.Types.Mixed },
  timeAllowed: { type: Number, default: 60 },
  className: { type: String, default: '' },
  schoolName: { type: String, default: '' },
  additionalInfo: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model<IAssignment>('Assignment', AssignmentSchema);
