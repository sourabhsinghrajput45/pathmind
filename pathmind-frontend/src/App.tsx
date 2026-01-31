import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import QuizComponent from './components/Quiz/QuizComponent';
import ResultsPage from './components/Results/ResultsPage';
import RoadmapPage from './components/Roadmap/RoadmapPage';
import AboutPage from './components/About/AboutPage';
import { QuizAnswer } from './types';
import AiAnalysis from "./pages/AiAnalysis";
import InteractiveQuizzes from "./pages/InteractiveQuizzes";
import CareerRoadmaps from "./pages/CareerRoadmaps";
import LearningResources from "./pages/LearningResources";
import ProgressTracking from "./pages/ProgressTracking";
import ExpertGuidance from "./pages/ExpertGuidance";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import ProfilePage from "./pages/profile/ProfilePage";
import EditProfilePage from "./pages/profile/EditProfilePage";

// ⭐ New pages you created
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import CareerChat from "./pages/CareerChat";

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <HowItWorks />
  </>
);

const AppContent = () => {
  const [quizAnswers, setQuizAnswers] = React.useState<QuizAnswer[] | null>(null);
  const [selectedCareerId, setSelectedCareerId] = React.useState<string | null>(null);

  const handleQuizComplete = (answers: QuizAnswer[]) => {
    setQuizAnswers(answers);
  };

  const handleViewRoadmap = (careerId: string) => {
    setSelectedCareerId(careerId);
  };

  const handleBackToResults = () => {
    setSelectedCareerId(null);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/ai-analysis" element={<AiAnalysis />} />
      <Route path="/career-roadmaps" element={<CareerRoadmaps />} />
      <Route path="/interactive-quizzes" element={<InteractiveQuizzes />} />
      <Route path="/learning-resources" element={<LearningResources />} />
      <Route path="/progress-tracking" element={<ProgressTracking />} />
      <Route path="/expert-guidance" element={<ExpertGuidance />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/editprofile" element={<EditProfilePage />} />

      {/* ⭐ NEW ROUTES FOR YOUR AI FEATURES */}
      <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
      <Route path="/career-chat" element={<CareerChat />} />

      {/* Quiz + Results logic */}
      <Route 
        path="/quiz" 
        element={<QuizComponent onComplete={handleQuizComplete} />} 
      />

      <Route 
        path="/results" 
        element={
          quizAnswers ? (
            selectedCareerId ? (
              <RoadmapPage 
                careerId={selectedCareerId} 
                onBack={handleBackToResults} 
              />
            ) : (
              <ResultsPage 
                answers={quizAnswers} 
                onViewRoadmap={handleViewRoadmap} 
              />
            )
          ) : (
            <Navigate to="/quiz" replace />
          )
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <AppContent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
