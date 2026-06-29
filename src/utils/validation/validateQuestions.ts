import questions from '../../data/questions_master.json';

export class QuestionValidator {
  static validate() {
    
    questions.forEach(q => {
      if (!q.text) {
        console.log(`Question ${q.id} missing text`);
        
      }
      if (typeof q.isReverseScored !== 'boolean') {
        console.log(`Question ${q.id} missing isReverseScored`);
        
      }
      if (!q.dimensionId || typeof q.dimensionId !== 'string') {
        console.log(`Question ${q.id} missing dimensionId`);
        
      }
    });

    const total = questions.length;
    const reverseScored = questions.filter(q => q.isReverseScored).length;
    
    // Group by dimension
    const dimCounts = new Map<string, number>();
    questions.forEach(q => {
      dimCounts.set(q.dimensionId, (dimCounts.get(q.dimensionId) || 0) + 1);
    });

    const isTotalValid = total === 132;
    const isReverseValid = reverseScored === 44;
    const isDimensionsValid = Array.from(dimCounts.values()).every(count => count === 6);

    return {
      isValid: isTotalValid && isReverseValid && isDimensionsValid,
      metrics: {
        totalQuestions: total,
        totalReverseScored: reverseScored,
        dimensionsCount: dimCounts.size
      },
      errors: [
        !isTotalValid && `Expected 132 questions, got ${total}`,
        !isReverseValid && `Expected 44 reverse scored, got ${reverseScored}`,
        !isDimensionsValid && `Not all dimensions have exactly 6 questions`
      ].filter(Boolean)
    };
  }
}
