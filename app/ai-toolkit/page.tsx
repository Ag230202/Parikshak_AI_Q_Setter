'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToolCard } from '@/components/ai-toolkit/tool-card';
import { Sparkles, Brain, BarChart3, FileText, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type ToolType = 'generate-questions' | 'grade-assignments' | 'analyze-responses' | 'create-rubrics' | null;

const tools = [
  {
    id: 'generate-questions',
    icon: Sparkles,
    title: 'Generate Questions',
    description: 'Use AI to automatically generate custom questions based on your curriculum and difficulty level.',
  },
  {
    id: 'grade-assignments',
    icon: Brain,
    title: 'Grade Assignments',
    description: 'AI-powered grading that evaluates student responses and provides detailed feedback.',
  },
  {
    id: 'analyze-responses',
    icon: BarChart3,
    title: 'Analyze Responses',
    description: 'Get insights on student performance and identify areas for improvement.',
  },
  {
    id: 'create-rubrics',
    icon: FileText,
    title: 'Create Rubrics',
    description: 'Generate comprehensive rubrics automatically for fair and consistent grading.',
  },
];

export default function AIToolkitPage() {
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToolUse = (toolId: string) => {
    setActiveTool(toolId as ToolType);
    setInput('');
    setOutput('');
  };

  const handleProcess = async () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      let result = '';
      switch (activeTool) {
        case 'generate-questions':
          result = `Generated Questions:\n\n1. What is the main concept of ${input}?\n2. Explain the principles of ${input}.\n3. How does ${input} apply in real-world scenarios?\n4. Compare and contrast different aspects of ${input}.\n5. What are the implications of ${input}?`;
          break;
        case 'grade-assignments':
          result = `Grading Analysis for "${input}":\n\nContent Accuracy: 85/100\nClarity: 90/100\nCompleteness: 75/100\nPresentation: 88/100\n\nOverall Score: 84.5/100 (Grade: B)\n\nFeedback: Good understanding of the concept. Consider adding more examples.`;
          break;
        case 'analyze-responses':
          result = `Analysis Report:\n\nAverage Score: 78%\nHighest Score: 95%\nLowest Score: 45%\n\nKey Insights:\n- 65% of students understood the core concepts\n- Common mistakes: Misinterpretation of definitions\n- Recommended review areas: Advanced applications`;
          break;
        case 'create-rubrics':
          result = `Generated Rubric for "${input}":\n\nExcellent (90-100): Demonstrates mastery\nGood (80-89): Shows good understanding\nSatisfactory (70-79): Meets basic requirements\nNeeds Improvement (60-69): Incomplete understanding\nBelow Average (Below 60): Requires additional support`;
          break;
      }
      setOutput(result);
      setIsProcessing(false);
    }, 1500);
  };

  const getToolTitle = () => {
    const tool = tools.find((t) => t.id === activeTool);
    return tool?.title || '';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AI Teacher&apos;s Toolkit</h1>
        </div>
        <p className="text-muted-foreground">Leverage AI to enhance your teaching and grading process</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            onUse={() => handleToolUse(tool.id)}
          />
        ))}
      </div>

      {/* Features Info */}
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-accent" />
            Powered by AI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Our AI Teacher&apos;s Toolkit uses advanced machine learning models to assist you with:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Question generation based on learning objectives and difficulty levels</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Intelligent assignment grading with detailed feedback</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Student performance analytics and insights</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Customizable rubric creation for fair assessment</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Tool Modal */}
      <Dialog open={activeTool !== null} onOpenChange={() => setActiveTool(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getToolTitle()}</DialogTitle>
            <DialogDescription>
              Enter your input and let AI generate results for you
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Input Area */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Input:</label>
              <Textarea
                placeholder={
                  activeTool === 'generate-questions'
                    ? 'Describe the topic for which you want to generate questions...'
                    : activeTool === 'grade-assignments'
                      ? 'Paste student response for grading...'
                      : activeTool === 'analyze-responses'
                        ? 'Describe what you want to analyze...'
                        : 'Describe the assignment or topic for rubric...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Output Area */}
            {output && (
              <div>
                <label className="text-sm font-semibold mb-2 block">Output:</label>
                <div className="p-4 rounded-lg bg-muted border border-border text-sm whitespace-pre-wrap font-mono text-sm max-h-[200px] overflow-y-auto">
                  {output}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setActiveTool(null)}>
                Close
              </Button>
              <Button
                className="bg-accent hover:bg-accent/90"
                onClick={handleProcess}
                disabled={!input.trim() || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Generate'}
              </Button>
            </div>

            {output && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  const element = document.createElement('a');
                  element.setAttribute(
                    'href',
                    'data:text/plain;charset=utf-8,' + encodeURIComponent(output)
                  );
                  element.setAttribute('download', `${getToolTitle()}.txt`);
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
              >
                Download Result
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
