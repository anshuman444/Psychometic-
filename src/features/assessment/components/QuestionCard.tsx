/**
 * QuestionCard — Single question display with 5-point Likert scale
 * 
 * Features:
 * - Animated card transitions between questions
 * - 5-button Likert scale: Strongly Disagree → Strongly Agree
 * - Shows dimension label and reverse-score indicator
 * - Highlights previously selected answer (for back navigation)
 */

import React from 'react';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  dimensionName: string;
  isReverseScored: boolean;
  selectedValue?: number;
  onAnswer: (value: number) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const LIKERT_OPTIONS = [
  { value: 1, label: 'Strongly Disagree', short: 'SD' },
  { value: 2, label: 'Disagree', short: 'D' },
  { value: 3, label: 'Neutral', short: 'N' },
  { value: 4, label: 'Agree', short: 'A' },
  { value: 5, label: 'Strongly Agree', short: 'SA' },
];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  dimensionName,
  selectedValue,
  onAnswer,
  onBack,
  canGoBack,
}) => {
  return (
    <div className="question-card" key={questionNumber}>
      <div className="question-card__header">
        <span className="question-card__dimension-badge">{dimensionName}</span>
        <span className="question-card__counter">
          {questionNumber} of {totalQuestions}
        </span>
      </div>

      <p className="question-card__text">{questionText}</p>

      <div className="question-card__likert">
        {LIKERT_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`question-card__likert-btn ${
              selectedValue === option.value ? 'question-card__likert-btn--selected' : ''
            }`}
            onClick={() => onAnswer(option.value)}
            aria-label={option.label}
          >
            <span className="question-card__likert-value">{option.value}</span>
            <span className="question-card__likert-label">{option.label}</span>
          </button>
        ))}
      </div>

      <div className="question-card__nav">
        {canGoBack && (
          <button className="btn btn-secondary question-card__back-btn" onClick={onBack}>
            ← Previous
          </button>
        )}
      </div>
    </div>
  );
};
