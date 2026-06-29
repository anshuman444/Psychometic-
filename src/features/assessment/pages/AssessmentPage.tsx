/**
 * AssessmentPage — Master page component managing the entire assessment flow.
 * 
 * State machine:
 *   intro → active (132 questions) → calculating → redirect to results
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../../lib/PlatformContext';
import { useAssessmentFlow } from '../hooks/useAssessmentFlow';
import { AssessmentIntro } from '../components/AssessmentIntro';
import { QuestionCard } from '../components/QuestionCard';
import { AssessmentProgress } from '../components/AssessmentProgress';
import { CalculatingScreen } from '../components/CalculatingScreen';
import { AlertTriangle } from 'lucide-react';

export const AssessmentPage: React.FC = () => {
  const { user, setUserName } = useCurrentUser();
  const navigate = useNavigate();
  const [state, actions] = useAssessmentFlow(user.userId);

  // Auto-navigate to results when pipeline completes
  React.useEffect(() => {
    if (state.phase === 'completed' && state.result) {
      // Brief delay to let the user see the final step animation
      const timer = setTimeout(() => {
        navigate('/results', { state: { result: state.result } });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.phase, state.result, navigate]);

  // Handle start: save the user's name, then begin
  const handleStart = (name: string) => {
    setUserName(name);
    actions.startAssessment();
  };

  // ─── Render based on phase ───

  // Logo component to reuse
  const LogoHeader = () => (
    <div className="absolute top-6 left-6 z-10">
      <img src="/logo.png" alt="VidyaLoop" style={{ height: '32px', width: 'auto' }} className="object-contain" />
    </div>
  );

  if (state.phase === 'intro') {
    return (
      <div className="assessment-page relative">
        <LogoHeader />
        <AssessmentIntro onStart={handleStart} userName={user.name} />
      </div>
    );
  }

  if (state.phase === 'active' && state.currentQuestion) {
    const existingAnswer = state.responses[state.currentQuestion.id];
    return (
      <div className="assessment-page relative">
        <LogoHeader />
        <AssessmentProgress
          progress={state.progress}
          currentDimension={state.currentDimensionName}
          estimatedMinutes={state.estimatedMinutesLeft}
          currentIndex={state.currentIndex}
          totalQuestions={state.totalQuestions}
        />
        <div className="assessment-page__question-area">
          <QuestionCard
            questionNumber={state.currentIndex + 1}
            totalQuestions={state.totalQuestions}
            questionText={state.currentQuestion.text}
            dimensionName={state.currentDimensionName}
            isReverseScored={state.currentQuestion.isReverseScored}
            selectedValue={existingAnswer?.rawValue}
            onAnswer={actions.answerQuestion}
            onBack={actions.goBack}
            canGoBack={state.currentIndex > 0}
          />
        </div>
      </div>
    );
  }

  if (state.phase === 'calculating') {
    return (
      <div className="assessment-page relative">
        <LogoHeader />
        <CalculatingScreen />
      </div>
    );
  }

  if (state.phase === 'error') {
    return (
      <div className="assessment-page relative">
        <LogoHeader />
        <div className="assessment-error">
          <AlertTriangle size={48} />
          <h2>Something went wrong</h2>
          <p>{state.error || 'An unexpected error occurred during processing.'}</p>
          <button className="btn btn-primary" onClick={actions.resetAssessment}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Completed phase shows briefly before redirect
  return (
    <div className="assessment-page">
      <CalculatingScreen />
    </div>
  );
};
