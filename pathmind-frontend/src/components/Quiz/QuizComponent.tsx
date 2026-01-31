import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, SkipForward } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuizQuestion, QuizAnswer } from '../../types';

interface QuizComponentProps {
  onComplete?: (answers: QuizAnswer[]) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ onComplete }) => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | number>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);

  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  useEffect(() => {
    if (!user || !user.name) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/quiz/get');
        if (!response.ok) throw new Error(`Failed to fetch quiz (${response.status})`);

        const data = await response.json();

const formatted = (data.questions || []).map((q: any) => ({
  id: q.id,
  category: q.category || 'General',
  text: q.text || 'Untitled Question',
  type: 'multiple-choice',
  options: ["option_a", "option_b", "option_c", "option_d"]
    .map((key) => q[key])
    .filter(Boolean),
}));


        setQuizQuestions(formatted);
      } catch (err) {
        console.error(err);
        setError('Failed to load quiz questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer: string | number) => {
    setCurrentAnswer(answer);
  };

  const handleSkip = () => {  
    if (!skippedQuestions.includes(currentQuestion)) {
      setSkippedQuestions([...skippedQuestions, currentQuestion]);
    }

    const nextIndex = currentQuestion + 1;

    // Check for continue prompt every 5 questions
    if (nextIndex % 5 === 0 && nextIndex < quizQuestions.length) {
      setShowContinuePrompt(true);
      setCurrentAnswer('');
      return;
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(nextIndex);
      setCurrentAnswer('');
    }
  };

  const handleNext = async () => {
    if (currentAnswer === '') return;

    const newAnswers = [...answers];
    const currentQ = quizQuestions[currentQuestion];

    const existingIndex = newAnswers.findIndex((a) => a.questionId === currentQ.id);

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = {
        questionId: currentQ.id,
        answer: currentAnswer,
      };
    } else {
      newAnswers.push({
        questionId: currentQ.id,
        answer: currentAnswer,
      });
    }

    setAnswers(newAnswers);

    const nextIndex = currentQuestion + 1;

    if (nextIndex % 5 === 0 && nextIndex < quizQuestions.length) {
      setShowContinuePrompt(true);
      setCurrentAnswer('');
      return;
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(nextIndex);
      setCurrentAnswer('');
      return;
    }

setSubmitting(true);
setError(null);

try {
  const formattedAnswers = newAnswers.reduce((acc, ans) => {
    acc[String(ans.questionId)] = String(ans.answer);
    return acc;
  }, {} as Record<string, string>);

  const payload = {
    user_id: user.id,   // send user ID
    answers: formattedAnswers,
  };

// 1️⃣ Save quiz answers
const saveRes = await fetch("http://127.0.0.1:5000/api/quiz/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
if (!saveRes.ok) throw new Error("Failed to save quiz answers");

// 2️⃣ Analyze based on latest saved quiz
const analysisRes = await fetch(
  `http://127.0.0.1:5000/api/analysis/run-latest/${user.id}`,
  { method: "POST" }
);

if (!analysisRes.ok) throw new Error("Failed AI analysis");

const analysisData = await analysisRes.json();

// 3️⃣ Navigate to analysis screen
navigate("/ai-analysis", { state: { analysisData } });

} catch (err) {
  console.error(err);
  setError("Failed to analyze your quiz. Please try again.");
} finally {
  setSubmitting(false);
}

  };

  const submitEarly = async () => {
    setShowContinuePrompt(false);
    setSubmitting(true);

    try {
      const formattedAnswers = answers.reduce((acc, ans) => {
        acc[String(ans.questionId)] = String(ans.answer);
        return acc;
      }, {} as Record<string, string>);

      const payload = {
        user_id: user.id,
        answers: formattedAnswers,
      };

      const response = await fetch("http://127.0.0.1:5000/api/analysis/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const analysisData = await response.json();
      navigate("/ai-analysis", { state: { analysisData } });

    } catch (err) {
      console.error(err);
      setError("Failed to fetch AI analysis.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevAnswer = answers.find(
        (a) => a.questionId === quizQuestions[currentQuestion - 1].id
      );
      setCurrentAnswer(prevAnswer?.answer || '');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg font-medium animate-pulse">
            Loading quiz questions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Oops!</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!quizQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Questions Available</h3>
          <p className="text-gray-600">Please seed your database with quiz questions.</p>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const answeredCount = answers.length;
  const isQuestionSkipped = skippedQuestions.includes(currentQuestion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Continue Prompt Modal */}
        {showContinuePrompt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md border-2 border-purple-200"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Great Progress! 🎉</h3>
              <p className="text-gray-600 mb-2">You've completed 5 questions.</p>
              <p className="text-sm text-gray-500 mb-6">
                {answeredCount} answered • {skippedQuestions.length} skipped
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    setShowContinuePrompt(false);
                    setCurrentQuestion((prev) => prev + 1);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Continue Quiz
                </button>

                <button
                  onClick={submitEarly}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  End Quiz
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Submitting Overlay */}
        {submitting && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-2xl font-bold text-gray-800 mb-2">Analyzing Your Responses</div>
              <div className="text-gray-600">Our AI is processing your answers...</div>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 mb-6 border border-white/50">
          <div className="flex justify-between items-center text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                Q {currentQuestion + 1}/{quizQuestions.length}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                ✓ {answeredCount} Answered
              </span>
              {skippedQuestions.length > 0 && (
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                  ⏭ {skippedQuestions.length} Skipped
                </span>
              )}
            </div>
            <span className="text-gray-600 font-semibold">
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-3 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border-2 border-white/50"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-bold capitalize">
                  {question.category}
                </span>
                {isQuestionSkipped && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                    Skipped
                  </span>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {(question as any).text}

              </h2>
            </div>

            <div className="space-y-3">
              {question.options && (
                <div className="grid gap-3">
                  {question.options.map((option: string, index: number) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option)}
                      className={`p-5 text-left rounded-xl border-2 transition-all duration-300 ${
                        currentAnswer === option
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">{option}</span>
                        {currentAnswer === option && (
                          <CheckCircle className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg'
            }`}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </button>

          <button
            onClick={handleSkip}
            disabled={currentQuestion === quizQuestions.length - 1}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              currentQuestion === quizQuestions.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-2 border-orange-200 hover:border-orange-300 shadow-md hover:shadow-lg'
            }`}
          >
            <SkipForward className="h-5 w-5 mr-2" />
            Skip
          </button>

          <button
            onClick={handleNext}
            disabled={currentAnswer === ''}
            className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              currentAnswer === ''
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QuizComponent;