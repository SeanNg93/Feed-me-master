import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { GeneratedContent, Node } from '../types';
import { X, BookOpen, BrainCircuit, CheckCircle, AlertCircle } from 'lucide-react';

interface ContentPanelProps {
  node: Node | null;
  content: GeneratedContent | null;
  loading: boolean;
  onClose: () => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ node, content, loading, onClose }) => {
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Reset quiz state when content changes
  React.useEffect(() => {
    setQuizAnswer(null);
    setShowResult(false);
  }, [content]);

  if (!node) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-[480px] glass-panel border-l border-zinc-800 shadow-2xl z-20 flex flex-col transition-transform duration-300">
      
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${node.type === 'root' ? 'bg-indigo-500' : node.type === 'category' ? 'bg-purple-500' : 'bg-zinc-500'}`}></div>
          <h2 className="text-xl font-bold text-white tracking-tight">{node.label}</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-800 rounded w-full"></div>
            <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
            <div className="h-32 bg-zinc-800 rounded w-full mt-6"></div>
          </div>
        ) : content ? (
          <>
            {/* Summary Section */}
            <section>
              <div className="flex items-center space-x-2 text-indigo-400 mb-3">
                <BookOpen size={18} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Summary</h3>
              </div>
              <p className="text-zinc-300 leading-relaxed text-sm">{content.summary}</p>
            </section>

            {/* Key Points */}
            <section className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50">
              <h3 className="text-sm font-semibold text-zinc-200 mb-3">Key Takeaways</h3>
              <ul className="space-y-2">
                {content.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-zinc-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Deep Dive */}
            <section>
              <div className="flex items-center space-x-2 text-indigo-400 mb-3">
                <BrainCircuit size={18} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Deep Dive</h3>
              </div>
              <div className="prose prose-invert prose-sm text-zinc-300 max-w-none">
                <ReactMarkdown>{content.explanation}</ReactMarkdown>
              </div>
            </section>

            {/* Quiz Section */}
            {content.quiz && (
              <section className="mt-8 pt-8 border-t border-zinc-800">
                 <h3 className="text-sm font-semibold text-zinc-200 mb-4 uppercase tracking-wider">Quick Check</h3>
                 <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                   <p className="text-white font-medium mb-4">{content.quiz.question}</p>
                   <div className="space-y-2">
                     {content.quiz.options.map((option, idx) => {
                       const isSelected = quizAnswer === idx;
                       const isCorrect = idx === content.quiz?.correctIndex;
                       let buttonStyle = "border-zinc-700 hover:bg-zinc-800 text-zinc-300";
                       
                       if (showResult) {
                         if (isCorrect) buttonStyle = "border-green-500 bg-green-900/20 text-green-200";
                         else if (isSelected && !isCorrect) buttonStyle = "border-red-500 bg-red-900/20 text-red-200";
                         else buttonStyle = "border-zinc-800 opacity-50";
                       } else if (isSelected) {
                         buttonStyle = "border-indigo-500 bg-indigo-900/20 text-white";
                       }

                       return (
                         <button
                           key={idx}
                           disabled={showResult}
                           onClick={() => setQuizAnswer(idx)}
                           className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${buttonStyle}`}
                         >
                           {option}
                         </button>
                       );
                     })}
                   </div>
                   
                   {!showResult && quizAnswer !== null && (
                     <button
                       onClick={() => setShowResult(true)}
                       className="mt-4 w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
                     >
                       Check Answer
                     </button>
                   )}

                    {showResult && (
                      <div className={`mt-4 flex items-center space-x-2 ${quizAnswer === content.quiz.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
                        {quizAnswer === content.quiz.correctIndex ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        <span className="font-medium text-sm">
                          {quizAnswer === content.quiz.correctIndex ? "Correct! Well done." : "Incorrect. Try again next time."}
                        </span>
                      </div>
                    )}
                 </div>
              </section>
            )}

          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
            <p>Select a node to explore its details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPanel;