import { faker } from '@faker-js/faker';
import { type Application } from '../../types/applications';
import { type Candidate } from './candidateSeed';
import { candidatesSeed } from './candidateSeed';

faker.seed(54321);

// Map old candidate stages to new application stages
const stageMapping: Record<Candidate['stage'], Application['status']> = {
  'applied': 'applied',
  'screen': 'screening', 
  'tech': 'interview',
  'offer': 'offer',
  'hired': 'hired',
  'rejected': 'rejected'
};

function generateApplicationFromCandidate(candidate: Candidate): Application {
  // Generate some additional skills based on the candidate
  const techSkills = [
    'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java',
    'TypeScript', 'JavaScript', 'AWS', 'Docker', 'Kubernetes',
    'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST API',
    'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
    'Machine Learning', 'Data Science', 'DevOps', 'Frontend', 'Backend'
  ];

  const skills = faker.helpers.arrayElements(techSkills, { min: 2, max: 6 });
  
  // Generate experience description
  const experience = `Experienced developer with ${faker.number.int({ min: 1, max: 8 })} years of experience in software development. Proficient in ${skills.slice(0, 3).join(', ')}. Strong background in building scalable applications and working in agile environments.`;

  // Generate cover letter
  const coverLetter = `Dear Hiring Manager,

I am writing to express my interest in the position. With my background in ${skills.slice(0, 2).join(' and ')}, I am confident that I would be a valuable addition to your team.

${faker.lorem.paragraph()}

I am excited about the opportunity to contribute to your organization and would welcome the chance to discuss my qualifications further.

Best regards,
${candidate.name}`;

  return {
    id: `app-${candidate.id}`,
    jobId: candidate.jobId,
    candidateName: candidate.name,
    candidateEmail: candidate.email,
    candidatePhone: candidate.phone,
    resumeUrl: candidate.resume,
    coverLetter,
    status: stageMapping[candidate.stage],
    appliedAt: candidate.appliedAt,
    notes: candidate.notes.join('; '),
    experience,
    skills,
    education: faker.helpers.arrayElement([
      'Bachelor\'s in Computer Science',
      'Master\'s in Software Engineering', 
      'Bachelor\'s in Information Technology',
      'Associate\'s in Computer Programming',
      'Bachelor\'s in Engineering',
      'Master\'s in Computer Science',
      'Bachelor\'s in Mathematics',
      'PhD in Computer Science'
    ])
  };
}

// Generate applications from existing candidates
export const applicationsSeed: Application[] = candidatesSeed.map(generateApplicationFromCandidate);

// Log the generated applications for debugging
console.log(`applicationsSeed: Generated ${applicationsSeed.length} applications from ${candidatesSeed.length} candidates`);
console.log('applicationsSeed: First few applications:', applicationsSeed.slice(0, 3));
