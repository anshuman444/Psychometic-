/**
 * Engine v4 Verification — Blueprint-Compliant 4-Signal Architecture
 * 
 * Career Fit = Theme Match (40%) + Interest Match (25%) + Skills Match (20%) + Learning Match (15%)
 */
const themeToDept = require('../src/data/career/themeToDepartmentMappings.json');
const dimToDept = require('../src/data/career/dimensionToDepartmentMappings.json');
const careerLibrary = require('../src/data/career/careerLibrary.json');
const themeWeights = require('../src/data/intelligence/themeWeights.json');

const deptNames = {};
for (const dept of careerLibrary.departments) deptNames[dept.id] = dept.name;

const INTEREST_DIMS = ['DIM_INT_01', 'DIM_INT_02', 'DIM_INT_03', 'DIM_MOT_01', 'DIM_MOT_02', 'DIM_MOT_03'];
const SKILLS_DIMS = ['DIM_COG_01', 'DIM_COG_02', 'DIM_COG_03', 'DIM_COG_04', 'DIM_WRK_01', 'DIM_WRK_02', 'DIM_WRK_03'];
const LEARNING_DIMS = ['DIM_LRN_01', 'DIM_LRN_02', 'DIM_LRN_03', 'DIM_LRN_04'];

function calcDimSignal(dimScores, dimGroup) {
  const deptMap = {};
  for (const dimId of dimGroup) {
    const dimScore = dimScores[dimId];
    if (dimScore === undefined) continue;
    const mapping = dimToDept[dimId];
    if (!mapping) continue;
    for (const [deptId, weight] of Object.entries(mapping)) {
      if (deptId.startsWith('_') || typeof weight !== 'number') continue;
      deptMap[deptId] = (deptMap[deptId] || 0) + (dimScore * weight);
    }
  }
  let max = 0;
  for (const v of Object.values(deptMap)) if (v > max) max = v;
  return { scores: deptMap, max };
}

function calcThemes(dimScores) {
  const themes = [];
  for (const [themeId, weights] of Object.entries(themeWeights)) {
    let raw = 0, totalW = 0;
    for (const [dimId, w] of Object.entries(weights)) {
      if (dimScores[dimId] !== undefined) { raw += dimScores[dimId] * w; totalW += w; }
    }
    themes.push({ themeId, normalizedScore: totalW > 0 ? raw / totalW : 0 });
  }
  themes.sort((a, b) => b.normalizedScore - a.normalizedScore);
  return themes;
}

function calculateFit(topThemes, dimScores) {
  const themeDeptMap = {};
  topThemes.forEach((theme, index) => {
    const pw = index === 0 ? 1.0 : index === 1 ? 0.6 : 0.3;
    const mappings = themeToDept[theme.themeId] || [];
    for (const { departmentId, weight } of mappings) {
      themeDeptMap[departmentId] = (themeDeptMap[departmentId] || 0) + (theme.normalizedScore * pw * weight);
    }
  });
  
  const interestSig = calcDimSignal(dimScores, INTEREST_DIMS);
  const skillsSig = calcDimSignal(dimScores, SKILLS_DIMS);
  const learningSig = calcDimSignal(dimScores, LEARNING_DIMS);
  
  const allDepts = new Set([...Object.keys(themeDeptMap), ...Object.keys(interestSig.scores), ...Object.keys(skillsSig.scores), ...Object.keys(learningSig.scores)]);
  const results = [];
  
  for (const deptId of allDepts) {
    const themeScore = ((themeDeptMap[deptId] || 0) / 95) * 40;
    const interestScore = interestSig.max > 0 ? ((interestSig.scores[deptId] || 0) / interestSig.max) * 25 : 0;
    const skillsScore = skillsSig.max > 0 ? ((skillsSig.scores[deptId] || 0) / skillsSig.max) * 20 : 0;
    const learningScore = learningSig.max > 0 ? ((learningSig.scores[deptId] || 0) / learningSig.max) * 15 : 0;
    
    let fit = Math.min(themeScore + interestScore + skillsScore + learningScore, 99);
    results.push({ 
      id: deptId, 
      name: deptNames[deptId] || deptId, 
      fit: parseFloat(fit.toFixed(1)),
      breakdown: { theme: themeScore.toFixed(1), interest: interestScore.toFixed(1), skills: skillsScore.toFixed(1), learning: learningScore.toFixed(1) }
    });
  }
  
  return results.sort((a, b) => b.fit - a.fit);
}

const profiles = {
  'CREATIVE ARTIST': {
    DIM_PERS_01: 95, DIM_PERS_02: 40, DIM_PERS_03: 70, DIM_PERS_04: 55, DIM_PERS_05: 60,
    DIM_COG_01: 50, DIM_COG_02: 40, DIM_COG_03: 35, DIM_COG_04: 90,
    DIM_LRN_01: 65, DIM_LRN_02: 80, DIM_LRN_03: 50, DIM_LRN_04: 30,
    DIM_MOT_01: 90, DIM_MOT_02: 40, DIM_MOT_03: 50,
    DIM_WRK_01: 45, DIM_WRK_02: 60, DIM_WRK_03: 85,
    DIM_INT_01: 30, DIM_INT_02: 25, DIM_INT_03: 95,
  },
  'TECH ENGINEER': {
    DIM_PERS_01: 60, DIM_PERS_02: 75, DIM_PERS_03: 40, DIM_PERS_04: 70, DIM_PERS_05: 35,
    DIM_COG_01: 90, DIM_COG_02: 95, DIM_COG_03: 60, DIM_COG_04: 70,
    DIM_LRN_01: 85, DIM_LRN_02: 75, DIM_LRN_03: 30, DIM_LRN_04: 60,
    DIM_MOT_01: 70, DIM_MOT_02: 65, DIM_MOT_03: 30,
    DIM_WRK_01: 80, DIM_WRK_02: 85, DIM_WRK_03: 75,
    DIM_INT_01: 95, DIM_INT_02: 60, DIM_INT_03: 20,
  },
  'SOCIAL WORKER': {
    DIM_PERS_01: 70, DIM_PERS_02: 65, DIM_PERS_03: 80, DIM_PERS_04: 75, DIM_PERS_05: 95,
    DIM_COG_01: 45, DIM_COG_02: 40, DIM_COG_03: 50, DIM_COG_04: 55,
    DIM_LRN_01: 40, DIM_LRN_02: 45, DIM_LRN_03: 90, DIM_LRN_04: 50,
    DIM_MOT_01: 60, DIM_MOT_02: 30, DIM_MOT_03: 95,
    DIM_WRK_01: 50, DIM_WRK_02: 55, DIM_WRK_03: 40,
    DIM_INT_01: 20, DIM_INT_02: 35, DIM_INT_03: 40,
  },
  'BUSINESS STRATEGIST': {
    DIM_PERS_01: 55, DIM_PERS_02: 85, DIM_PERS_03: 75, DIM_PERS_04: 80, DIM_PERS_05: 45,
    DIM_COG_01: 80, DIM_COG_02: 75, DIM_COG_03: 95, DIM_COG_04: 60,
    DIM_LRN_01: 70, DIM_LRN_02: 35, DIM_LRN_03: 55, DIM_LRN_04: 75,
    DIM_MOT_01: 55, DIM_MOT_02: 95, DIM_MOT_03: 40,
    DIM_WRK_01: 80, DIM_WRK_02: 70, DIM_WRK_03: 65,
    DIM_INT_01: 45, DIM_INT_02: 30, DIM_INT_03: 25,
  },
  'SCIENTIST': {
    DIM_PERS_01: 85, DIM_PERS_02: 80, DIM_PERS_03: 30, DIM_PERS_04: 65, DIM_PERS_05: 40,
    DIM_COG_01: 90, DIM_COG_02: 85, DIM_COG_03: 55, DIM_COG_04: 60,
    DIM_LRN_01: 90, DIM_LRN_02: 50, DIM_LRN_03: 35, DIM_LRN_04: 65,
    DIM_MOT_01: 85, DIM_MOT_02: 40, DIM_MOT_03: 55,
    DIM_WRK_01: 50, DIM_WRK_02: 90, DIM_WRK_03: 80,
    DIM_INT_01: 55, DIM_INT_02: 95, DIM_INT_03: 20,
  },
  'EDUCATOR/MENTOR': {
    DIM_PERS_01: 70, DIM_PERS_02: 70, DIM_PERS_03: 85, DIM_PERS_04: 60, DIM_PERS_05: 90,
    DIM_COG_01: 55, DIM_COG_02: 50, DIM_COG_03: 45, DIM_COG_04: 50,
    DIM_LRN_01: 50, DIM_LRN_02: 55, DIM_LRN_03: 95, DIM_LRN_04: 70,
    DIM_MOT_01: 80, DIM_MOT_02: 35, DIM_MOT_03: 85,
    DIM_WRK_01: 55, DIM_WRK_02: 60, DIM_WRK_03: 40,
    DIM_INT_01: 25, DIM_INT_02: 40, DIM_INT_03: 55,
  },
  'HANDS-ON BUILDER': {
    DIM_PERS_01: 40, DIM_PERS_02: 85, DIM_PERS_03: 50, DIM_PERS_04: 80, DIM_PERS_05: 40,
    DIM_COG_01: 55, DIM_COG_02: 65, DIM_COG_03: 40, DIM_COG_04: 50,
    DIM_LRN_01: 45, DIM_LRN_02: 95, DIM_LRN_03: 40, DIM_LRN_04: 80,
    DIM_MOT_01: 50, DIM_MOT_02: 60, DIM_MOT_03: 35,
    DIM_WRK_01: 90, DIM_WRK_02: 70, DIM_WRK_03: 45,
    DIM_INT_01: 70, DIM_INT_02: 30, DIM_INT_03: 25,
  },
  'HOSPITALITY/SERVICE': {
    DIM_PERS_01: 65, DIM_PERS_02: 55, DIM_PERS_03: 95, DIM_PERS_04: 60, DIM_PERS_05: 75,
    DIM_COG_01: 40, DIM_COG_02: 35, DIM_COG_03: 45, DIM_COG_04: 55,
    DIM_LRN_01: 40, DIM_LRN_02: 50, DIM_LRN_03: 80, DIM_LRN_04: 45,
    DIM_MOT_01: 55, DIM_MOT_02: 70, DIM_MOT_03: 50,
    DIM_WRK_01: 65, DIM_WRK_02: 40, DIM_WRK_03: 50,
    DIM_INT_01: 25, DIM_INT_02: 20, DIM_INT_03: 60,
  },
};

console.log('═══════════════════════════════════════════════════════════════════');
console.log('  ENGINE v4: Blueprint-Compliant 4-Signal Verification');
console.log('  Formula: Theme(40%) + Interest(25%) + Skills(20%) + Learning(15%)');
console.log('═══════════════════════════════════════════════════════════════════\n');

const topDeptTracker = {};

for (const [profileName, dimScores] of Object.entries(profiles)) {
  const themes = calcThemes(dimScores);
  const top3 = themes.slice(0, 3);
  const results = calculateFit(top3, dimScores);
  
  console.log(`▸ ${profileName}`);
  console.log(`  Themes: ${top3.map(t => t.themeId.replace('THEME_','')).join(', ')}`);
  
  // Show top 5 with signal breakdown
  results.slice(0, 5).forEach((r, i) => {
    const b = r.breakdown;
    console.log(`    ${i+1}. ${r.name.padEnd(35)} ${r.fit.toFixed(1).padStart(5)}%  [T:${b.theme} I:${b.interest} S:${b.skills} L:${b.learning}]`);
  });
  
  const spread = results[0].fit - results[results.length - 1].fit;
  console.log(`  Spread: ${spread.toFixed(1)}pts ${spread > 25 ? '✅' : '⚠️'}`);
  
  topDeptTracker[results[0].name] = (topDeptTracker[results[0].name] || 0) + 1;
  console.log('');
}

console.log('═══ DIVERSITY CHECK ═══');
for (const [dept, count] of Object.entries(topDeptTracker).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${dept.padEnd(35)} won ${count}x`);
}
const winners = Object.keys(topDeptTracker).length;
console.log(`\n  ${winners} unique winners out of ${Object.keys(profiles).length} profiles`);
console.log(`  ${winners >= 5 ? '✅ DIVERSE' : '❌ BIASED'}`);
