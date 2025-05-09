import { Answer, AssessmentResult, SupportOption } from '../types';
import { supportOptions } from '../data/supportOptions';

export const analyzeResponses = (answers: Answer[]): AssessmentResult => {
  // Get stress level question (q1)
  const stressLevelAnswer = answers.find(a => a.questionId === 'q1')?.answer as number || 0;
  
  // Get frequency question (q2)
  const frequencyAnswer = answers.find(a => a.questionId === 'q2')?.answer as string || '';
  const frequencyScore = ['Rarely', 'Sometimes', 'Often', 'Almost daily'].indexOf(frequencyAnswer);
  
  // Get impact question (q4)
  const impactAnswer = answers.find(a => a.questionId === 'q4')?.answer as string || '';
  const impactScore = ['Not at all', 'Slightly', 'Moderately', 'Significantly', 'Severely'].indexOf(impactAnswer);
  
  // Get sleep quality question (q5)
  const sleepAnswer = answers.find(a => a.questionId === 'q5')?.answer as string || '';
  const sleepScore = ['Excellent', 'Good', 'Fair', 'Poor', 'Very poor'].indexOf(sleepAnswer);
  
  // Get symptoms question (q7)
  const symptomsAnswer = answers.find(a => a.questionId === 'q7')?.answer as string[] || [];
  const symptomsScore = symptomsAnswer.includes('None of the above') ? 0 : symptomsAnswer.length;
  
  // Calculate overall score
  const maxStressLevel = 10;
  const normalizedStressLevel = (stressLevelAnswer / maxStressLevel) * 4;
  const totalScore = (normalizedStressLevel + frequencyScore + impactScore + sleepScore + (symptomsScore / 2)) / 5;
  
  // Determine stress level
  let stressLevel: 'low' | 'moderate' | 'high' | 'severe';
  if (totalScore < 1) stressLevel = 'low';
  else if (totalScore < 2) stressLevel = 'moderate';
  else if (totalScore < 3) stressLevel = 'high';
  else stressLevel = 'severe';
  
  // Determine recommended support options
  const recommendedSupport: SupportOption[] = [];
  
  // Add buddy for all stress levels
  if (stressLevel === 'low') {
    recommendedSupport.push(supportOptions.find(s => s.type === 'buddy') as SupportOption);
  }
  
  // Add counsellor for moderate and above
  if (stressLevel === 'moderate' || stressLevel === 'high' || stressLevel === 'severe') {
    recommendedSupport.push(supportOptions.find(s => s.type === 'buddy') as SupportOption);
    recommendedSupport.push(supportOptions.find(s => s.type === 'counsellor') as SupportOption);
  }
  
  // Add psychologist for high and severe
  if (stressLevel === 'high' || stressLevel === 'severe') {
    recommendedSupport.push(supportOptions.find(s => s.type === 'psychologist') as SupportOption);
  }
  
  // Add meditation for all levels but prioritize differently
  if (stressLevel === 'moderate' || stressLevel === 'high' || stressLevel === 'severe') {
    recommendedSupport.push(supportOptions.find(s => s.type === 'meditation') as SupportOption);
  }
  
  // Generate summary based on stress level
  let summary = '';
  switch (stressLevel) {
    case 'low':
      summary = 'Your stress levels appear to be manageable. Speaking with a buddy and practicing some basic stress management techniques should be helpful.';
      break;
    case 'moderate':
      summary = 'You\'re experiencing moderate stress that could benefit from professional support. We recommend speaking with a counselor who can help you develop effective coping strategies.';
      break;
    case 'high':
      summary = 'Your stress levels are high and may be significantly impacting your wellbeing. Professional support from both a counselor and possibly a clinical psychologist would be beneficial.';
      break;
    case 'severe':
      summary = 'You\'re experiencing severe stress that requires comprehensive professional support. We strongly recommend connecting with our clinical psychologist, along with considering all available support options.';
      break;
  }
  
  return {
    stressLevel,
    recommendedSupport,
    summary
  };
};