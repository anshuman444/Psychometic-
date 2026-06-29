import type { Response, DimensionScore, Question } from '../types/assessment';

/**
 * Maps standard 1-5 responses to reverse scored values.
 * Strongly Disagree (1) -> 5
 * Disagree (2) -> 4
 * Neutral (3) -> 3
 * Agree (4) -> 2
 * Strongly Agree (5) -> 1
 */
export function calculateReverseScore(rawValue: number): number {
  if (rawValue < 1 || rawValue > 5) throw new Error("Invalid raw value. Must be 1-5.");
  return 6 - rawValue;
}

/**
 * Calculates the score for a single dimension given the 6 responses.
 * Formula: Total Score = Q1 + Q2 + Q3 + Q4 + Reverse(Q5) + Reverse(Q6)
 */
export function calculateDimensionScore(
  dimensionId: string, 
  responses: Response[], 
  questionsMap: Map<string, Question>
): DimensionScore {
  
  const dimensionResponses = responses.filter(r => r.dimensionId === dimensionId);
  
  if (dimensionResponses.length !== 6) {
    throw new Error(`Expected exactly 6 responses for dimension ${dimensionId}, but got ${dimensionResponses.length}`);
  }

  let totalScore = 0;

  for (const response of dimensionResponses) {
    const question = questionsMap.get(response.questionId);
    if (!question) throw new Error(`Question ${response.questionId} not found in map.`);
    
    const valueToAdd = question.isReverseScored 
      ? calculateReverseScore(response.rawValue) 
      : response.rawValue;
      
    // Mutate response to track the calculated value for auditing
    response.calculatedValue = valueToAdd;
    
    totalScore += valueToAdd;
  }

  let tier: 'low' | 'medium' | 'high';
  if (totalScore >= 6 && totalScore <= 13) tier = 'low';
  else if (totalScore >= 14 && totalScore <= 22) tier = 'medium';
  else if (totalScore >= 23 && totalScore <= 30) tier = 'high';
  else throw new Error(`Calculated score ${totalScore} is outside bounds (6-30).`);

  return {
    dimensionId,
    score: totalScore,
    tier
  };
}

/**
 * Quality Control: Detects straight-lining (e.g., answering 3,3,3,3,3,3).
 */
export function detectStraightLining(responses: Response[]): boolean {
  if (responses.length < 10) return false; // Need sufficient sample size
  
  let consecutiveSame = 1;
  let lastValue = responses[0].rawValue;
  
  for (let i = 1; i < responses.length; i++) {
    if (responses[i].rawValue === lastValue) {
      consecutiveSame++;
      if (consecutiveSame >= 8) return true; // 8 same answers in a row triggers flag
    } else {
      consecutiveSame = 1;
      lastValue = responses[i].rawValue;
    }
  }
  
  return false;
}
