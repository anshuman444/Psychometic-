const fs = require('fs');

const dimensions = [
  { id: 'DIM_PERS_01', name: 'Openness', q: [
    { text: 'I enjoy trying new hobbies even if I am not good at them.', rev: false },
    { text: 'I like to explore ideas that are considered unusual.', rev: false },
    { text: 'I am quick to adapt when my daily routine changes.', rev: false },
    { text: 'I often look for new ways to solve everyday problems.', rev: false },
    { text: 'I prefer doing things the exact way they have always been done.', rev: true },
    { text: 'I feel uncomfortable when forced to change my plans suddenly.', rev: true }
  ]},
  { id: 'DIM_PERS_02', name: 'Conscientiousness', q: [
    { text: 'I always double-check my work before submitting it.', rev: false },
    { text: 'I make a schedule and stick to it carefully.', rev: false },
    { text: 'I finish my chores or assignments before taking a break.', rev: false },
    { text: 'I keep my room and workspace highly organized.', rev: false },
    { text: 'I tend to leave things until the last minute.', rev: true },
    { text: 'I often misplace my belongings because I do not put them away.', rev: true }
  ]},
  { id: 'DIM_PERS_03', name: 'Social Energy', q: [
    { text: 'I feel energized after spending time with a large group of friends.', rev: false },
    { text: 'I easily start conversations with people I have just met.', rev: false },
    { text: 'I prefer to be the center of attention in a group.', rev: false },
    { text: 'I speak up quickly during class discussions.', rev: false },
    { text: 'I feel exhausted after attending a party or social event.', rev: true },
    { text: 'I prefer to stay quiet and observe rather than speak out loud.', rev: true }
  ]},
  { id: 'DIM_PERS_04', name: 'Resilience', q: [
    { text: 'I bounce back quickly after receiving a bad grade.', rev: false },
    { text: 'I can stay calm even when everything seems to be going wrong.', rev: false },
    { text: 'I view failures as an opportunity to learn and grow.', rev: false },
    { text: 'I keep trying even when a task becomes extremely difficult.', rev: false },
    { text: 'I easily get overwhelmed when I have too much on my plate.', rev: true },
    { text: 'I take criticism very personally and it ruins my mood for a while.', rev: true }
  ]},
  { id: 'DIM_PERS_05', name: 'Empathy', q: [
    { text: 'I easily notice when a friend is feeling sad or upset.', rev: false },
    { text: 'I care deeply about how my actions affect other people.', rev: false },
    { text: "I often put myself in someone else's shoes to understand them.", rev: false },
    { text: 'I naturally want to help people when they are struggling.', rev: false },
    { text: 'I find it hard to relate to people whose experiences are different from mine.', rev: true },
    { text: 'I sometimes say things without thinking about how they might hurt others.', rev: true }
  ]},
  { id: 'DIM_COG_01', name: 'Abstract Reasoning', q: [
    { text: 'I enjoy thinking about complex, philosophical questions.', rev: false },
    { text: 'I can easily spot the underlying pattern in a confusing situation.', rev: false },
    { text: 'I like to connect ideas from different subjects together.', rev: false },
    { text: 'I find it easy to understand theories that do not have physical examples.', rev: false },
    { text: 'I struggle to understand concepts unless I can see them in real life.', rev: true },
    { text: 'I prefer simple, straightforward instructions over open-ended ideas.', rev: true }
  ]},
  { id: 'DIM_COG_02', name: 'Analytical Thinking', q: [
    { text: 'I always look for the hard facts before making a decision.', rev: false },
    { text: 'I enjoy breaking down complex problems into smaller, manageable parts.', rev: false },
    { text: "I easily spot flaws in other people's arguments.", rev: false },
    { text: 'I like playing strategy games that require deep calculation.', rev: false },
    { text: 'I make decisions based mostly on my gut feeling rather than data.', rev: true },
    { text: 'I find detailed data analysis boring and frustrating.', rev: true }
  ]},
  { id: 'DIM_COG_03', name: 'Strategic Thinking', q: [
    { text: 'I always think about the long-term consequences of my choices.', rev: false },
    { text: 'I naturally anticipate what might go wrong before starting a project.', rev: false },
    { text: 'I like to have a backup plan ready just in case.', rev: false },
    { text: 'I think several steps ahead when playing competitive games.', rev: false },
    { text: 'I prefer to live in the moment rather than worry about the future.', rev: true },
    { text: 'I usually figure things out as I go instead of planning ahead.', rev: true }
  ]},
  { id: 'DIM_COG_04', name: 'Creative Problem Solving', q: [
    { text: 'I often come up with solutions that surprise other people.', rev: false },
    { text: 'I enjoy brainstorming wild ideas even if they seem impossible.', rev: false },
    { text: 'When standard methods fail, I quickly invent a new approach.', rev: false },
    { text: 'I like to mix different concepts together to create something unique.', rev: false },
    { text: 'I struggle to come up with ideas when there are no clear rules.', rev: true },
    { text: 'I prefer using tried-and-true methods rather than inventing new ones.', rev: true }
  ]},
  { id: 'DIM_LRN_01', name: 'Self-Directed Learning', q: [
    { text: 'I often research topics on my own just because I am curious.', rev: false },
    { text: 'I prefer learning independently rather than waiting for a teacher.', rev: false },
    { text: 'I set my own learning goals outside of school requirements.', rev: false },
    { text: 'I can stay focused on a self-study project for hours.', rev: false },
    { text: 'I only learn things if they are required for a grade.', rev: true },
    { text: 'I find it hard to learn without someone explicitly telling me what to do.', rev: true }
  ]},
  { id: 'DIM_LRN_02', name: 'Hands-on Application', q: [
    { text: 'I learn best when I can physically build or test something.', rev: false },
    { text: 'I prefer classes that have lab experiments over purely lecture-based classes.', rev: false },
    { text: 'I understand concepts much better after I apply them in real life.', rev: false },
    { text: 'I like to take things apart to see how they work.', rev: false },
    { text: 'I learn perfectly fine just by reading a textbook.', rev: true },
    { text: 'I dislike group projects that require building physical prototypes.', rev: true }
  ]},
  { id: 'DIM_LRN_03', name: 'Collaborative Learning', q: [
    { text: 'I understand topics better after discussing them with my peers.', rev: false },
    { text: 'I actively seek out study groups before a major exam.', rev: false },
    { text: 'I enjoy teaching concepts to my classmates to help them understand.', rev: false },
    { text: 'I feel more motivated to learn when working on a team project.', rev: false },
    { text: 'I find group study sessions distracting and unhelpful.', rev: true },
    { text: 'I strongly prefer completing assignments entirely on my own.', rev: true }
  ]},
  { id: 'DIM_LRN_04', name: 'Structured Learning', q: [
    { text: 'I learn best when the teacher provides a clear, step-by-step syllabus.', rev: false },
    { text: 'I prefer subjects that have clear right and wrong answers.', rev: false },
    { text: 'I like to have detailed rubrics before I start an assignment.', rev: false },
    { text: 'I feel comfortable when the learning environment has strict rules.', rev: false },
    { text: 'I feel boxed in by highly structured, rule-heavy classrooms.', rev: true },
    { text: 'I prefer open-ended assignments where I can choose my own format.', rev: true }
  ]},
  { id: 'DIM_MOT_01', name: 'Intrinsic Drive', q: [
    { text: 'I will work hard on a project simply because I find the topic fascinating.', rev: false },
    { text: 'I feel a strong sense of personal satisfaction when I master a difficult skill.', rev: false },
    { text: 'I often lose track of time when I am deeply engaged in a hobby.', rev: false },
    { text: 'I push myself to improve even when no one else is watching.', rev: false },
    { text: 'I lose interest in activities if I am not being graded or rewarded.', rev: true },
    { text: 'I rarely do extra work unless it guarantees a tangible prize.', rev: true }
  ]},
  { id: 'DIM_MOT_02', name: 'Extrinsic Ambition', q: [
    { text: 'I am highly motivated by the prospect of winning awards or recognition.', rev: false },
    { text: 'I often compare my achievements to those of my peers.', rev: false },
    { text: 'I am driven by the goal of achieving high social or financial status.', rev: false },
    { text: 'I work harder when I know I am competing against others.', rev: false },
    { text: 'I do not care about being recognized as the best at something.', rev: true },
    { text: 'I prefer collaborative environments over competitive ones.', rev: true }
  ]},
  { id: 'DIM_MOT_03', name: 'Purpose Orientation', q: [
    { text: 'I want my future career to make a positive impact on the world.', rev: false },
    { text: 'I feel most motivated when my work helps other people.', rev: false },
    { text: 'I often volunteer my time for causes I believe in.', rev: false },
    { text: 'I would choose a meaningful, lower-paying job over a meaningless, high-paying one.', rev: false },
    { text: 'I prioritize my personal success over contributing to societal change.', rev: true },
    { text: 'I rarely think about how my actions affect the broader community.', rev: true }
  ]},
  { id: 'DIM_WRK_01', name: 'Execution Focus', q: [
    { text: 'I prefer to dive right in and start working rather than spending hours planning.', rev: false },
    { text: 'I am very good at checking items off my to-do list quickly.', rev: false },
    { text: 'I prioritize getting a project finished over making it absolutely perfect.', rev: false },
    { text: 'I feel frustrated when meetings delay actual progress.', rev: false },
    { text: 'I often miss deadlines because I get caught up in the details.', rev: true },
    { text: 'I prefer to over-analyze a situation before taking any action.', rev: true }
  ]},
  { id: 'DIM_WRK_02', name: 'Quality Focus', q: [
    { text: 'I will gladly spend extra time on an assignment to ensure it is flawless.', rev: false },
    { text: 'I notice tiny errors that other people usually miss.', rev: false },
    { text: 'I take great pride in delivering work that exceeds expectations.', rev: false },
    { text: 'I refuse to submit work if I know it could be better.', rev: false },
    { text: "I am perfectly fine with submitting work that is just 'good enough'.", rev: true },
    { text: 'I prioritize speed over accuracy when completing tasks.', rev: true }
  ]},
  { id: 'DIM_WRK_03', name: 'Autonomy Preference', q: [
    { text: 'I work best when I am given complete control over my project.', rev: false },
    { text: 'I dislike it when teachers or managers micromanage my process.', rev: false },
    { text: 'I prefer to set my own schedule rather than following a fixed timetable.', rev: false },
    { text: 'I trust my own instincts more than the advice of authority figures.', rev: false },
    { text: 'I feel stressed when I have to make major decisions entirely on my own.', rev: true },
    { text: 'I prefer having someone tell me exactly what to do at every step.', rev: true }
  ]},
  { id: 'DIM_INT_01', name: 'Technical Interest', q: [
    { text: 'I enjoy reading about the latest advancements in technology and software.', rev: false },
    { text: 'I like figuring out how computers and electronic devices work.', rev: false },
    { text: 'I would be interested in learning how to code or program software.', rev: false },
    { text: 'I am fascinated by artificial intelligence and robotics.', rev: false },
    { text: 'I find technology topics dry and boring to learn about.', rev: true },
    { text: 'I avoid dealing with computer or technical issues whenever possible.', rev: true }
  ]},
  { id: 'DIM_INT_02', name: 'Scientific Interest', q: [
    { text: 'I am fascinated by how the human body works.', rev: false },
    { text: 'I enjoy watching documentaries about space, nature, or medicine.', rev: false },
    { text: 'I would enjoy conducting long-term research experiments in a lab.', rev: false },
    { text: 'I like reading about new scientific discoveries.', rev: false },
    { text: 'I find biology, chemistry, and physics classes uninteresting.', rev: true },
    { text: 'I rarely pay attention to news about scientific breakthroughs.', rev: true }
  ]},
  { id: 'DIM_INT_03', name: 'Creative Interest', q: [
    { text: 'I spend a lot of my free time drawing, writing, or playing music.', rev: false },
    { text: 'I enjoy visiting art museums or attending theater performances.', rev: false },
    { text: 'I love expressing my emotions through creative projects.', rev: false },
    { text: 'I appreciate highly aesthetic and beautifully designed objects.', rev: false },
    { text: 'I find artistic and creative activities to be a waste of time.', rev: true },
    { text: 'I prefer practical facts over artistic interpretation.', rev: true }
  ]}
];

let master = [];
let qid = 1;

dimensions.forEach(dim => {
  dim.q.forEach(q => {
    master.push({
      question_id: 'Q_' + String(qid).padStart(3, '0'),
      dimension_id: dim.id,
      question_text: q.text,
      is_reverse_scored: q.rev,
      dimension_mapping: dim.name,
      metadata: {
        target_age_group: '13-22',
        language: 'en-US'
      }
    });
    qid++;
  });
});

fs.writeFileSync('d:/psychometric/src/data/questions_master.json', JSON.stringify(master, null, 2));
console.log('Successfully generated ' + master.length + ' questions. Reverse scored count: ' + master.filter(q => q.is_reverse_scored).length);
