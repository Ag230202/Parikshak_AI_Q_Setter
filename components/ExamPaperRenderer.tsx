import React from 'react';

interface ExamPaperProps {
  assignment: any;
  targetRef: any;
}

export function ExamPaperRenderer({ assignment, targetRef }: ExamPaperProps) {
  // Assuming assignment.generatedPaper exists, if not fallback to empty
  const paper = assignment.generatedPaper || { sections: [] };

  return (
    <div ref={targetRef} id="print-paper" className="bg-white p-8 border text-black mx-auto max-w-4xl min-h-[1056px]">
      {/* Header Info */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase">{assignment.schoolName || 'School Name'}</h1>
        <h2 className="text-xl font-semibold mt-2">{assignment.subject} Examination</h2>
        <div className="flex justify-between mt-4 text-sm font-semibold">
          <span>Class: {assignment.className}</span>
          <span>Time: {assignment.timeAllowed} Mins</span>
          <span>Max Marks: {assignment.totalMarks || 100}</span>
        </div>
      </div>

      {/* Student Details Fields */}
      <div className="flex justify-between mb-8 text-sm">
        <span>Name: ______________________</span>
        <span>Roll No: __________________</span>
        <span>Date: ____________________</span>
      </div>

      {/* Instructions */}
      {assignment.instructions && (
        <div className="mb-6 text-sm italic border-l-2 border-black pl-3 py-1 bg-neutral-50/50 whitespace-pre-line">
          <strong>Instructions:</strong>
          <div className="mt-1">{assignment.instructions}</div>
        </div>
      )}

      {/* Sections */}
      {paper.sections?.length > 0 ? (
        paper.sections.map((section: any, idx: number) => (
          <div key={idx} className="mb-8">
            <h3 className="font-bold text-lg underline mb-2">{section.title}</h3>
            {section.instruction && (
              <p className="text-sm italic mb-4">{section.instruction}</p>
            )}
            
            <div className="space-y-4">
              {section.questions?.map((q: any, qIdx: number) => (
                <div key={qIdx} className="flex justify-between items-start">
                  <div className="flex gap-2 w-full">
                    <span className="font-semibold">{qIdx + 1}.</span>
                    <div className="flex flex-col">
                      <span>{q.question}</span>
                      {q.hasDiagram && q.diagramSvg && (
                        <div 
                          className="mt-4 mb-2 max-w-md [&>svg]:w-full [&>svg]:h-auto border border-gray-300 rounded p-2" 
                          dangerouslySetInnerHTML={{ __html: q.diagramSvg }} 
                        />
                      )}
                      {q.options && q.options.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          {q.options.map((opt: string, optIdx: number) => (
                            <div key={optIdx}>
                              {String.fromCharCode(97 + optIdx)}) {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-semibold whitespace-nowrap ml-4">
                    [{q.marks}]
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground italic mt-12">
          Paper is currently generating...
        </div>
      )}
    </div>
  );
}
