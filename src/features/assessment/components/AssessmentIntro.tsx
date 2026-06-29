/**
 * AssessmentIntro — Pre-assessment landing screen
 * 
 * Now includes a name input field that must be filled before starting.
 * Displays instructions, estimated duration, and a prominent start button.
 */

import React, { useState } from 'react';
import { Sparkles, Clock, Brain, ShieldCheck, User } from 'lucide-react';

interface AssessmentIntroProps {
  onStart: (name: string) => void;
  userName: string;
}

export const AssessmentIntro: React.FC<AssessmentIntroProps> = ({ onStart, userName }) => {
  const [inputName, setInputName] = useState(userName || '');
  const [nameError, setNameError] = useState('');

  const handleStart = () => {
    const trimmed = inputName.trim();
    if (!trimmed || trimmed.length < 2) {
      setNameError('Please enter your full name (at least 2 characters).');
      return;
    }
    setNameError('');
    onStart(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleStart();
  };

  return (
    <div className="assessment-intro">
      <div className="assessment-intro__hero">
        <div className="assessment-intro__icon-ring">
          <Brain size={48} strokeWidth={1.5} />
        </div>
        <h1>Discover Your Intelligence Fingerprint</h1>
        <p className="assessment-intro__subtitle">
          This assessment maps your unique cognitive, personality,
          and motivation profile across 22 dimensions to reveal your future potential.
        </p>
      </div>

      {/* ── Name Input ── */}
      <div className="assessment-intro__name-section">
        <label className="assessment-intro__name-label" htmlFor="student-name">
          <User size={18} />
          Enter Your Full Name
        </label>
        <input
          id="student-name"
          type="text"
          className={`assessment-intro__name-input ${nameError ? 'assessment-intro__name-input--error' : ''}`}
          placeholder="e.g. Arjun Sharma"
          value={inputName}
          onChange={(e) => { setInputName(e.target.value); setNameError(''); }}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="name"
        />
        {nameError && <p className="assessment-intro__name-error">{nameError}</p>}
        <p className="assessment-intro__name-hint">
          This name will appear on your personalized psychometric report.
        </p>
      </div>

      <div className="assessment-intro__info-grid">
        <div className="assessment-intro__info-card">
          <Clock size={24} />
          <div>
            <h4>~20 Minutes</h4>
            <p>132 carefully crafted questions</p>
          </div>
        </div>
        <div className="assessment-intro__info-card">
          <Sparkles size={24} />
          <div>
            <h4>22 Dimensions</h4>
            <p>Personality, Cognition, Learning, Motivation, Interests</p>
          </div>
        </div>
        <div className="assessment-intro__info-card">
          <ShieldCheck size={24} />
          <div>
            <h4>No Right or Wrong</h4>
            <p>Answer honestly for the most accurate profile</p>
          </div>
        </div>
      </div>

      <div className="assessment-intro__tips">
        <h3>Tips for Best Results</h3>
        <ul>
          <li>Find a quiet space free from distractions</li>
          <li>Go with your first instinct — don't overthink</li>
          <li>Your progress auto-saves every few questions</li>
          <li>There are no right or wrong answers</li>
        </ul>
      </div>

      <button className="btn btn-primary assessment-intro__start-btn" onClick={handleStart}>
        <Sparkles size={20} />
        Begin Assessment
      </button>
    </div>
  );
};
