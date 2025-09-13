import { faker } from '@faker-js/faker';

faker.seed(54321);

export interface Candidate {
  id: string;
  name: string;
  email: string;
  stage: 'applied' | 'screen' | 'tech' | 'offer' | 'hired' | 'rejected';
  jobId: string;
  phone: string;
  resume: string;
  notes: string[];
  appliedAt: Date;
  updatedAt: Date;
}

const stages: Candidate['stage'][] = ['applied', 'screen', 'tech', 'offer', 'hired', 'rejected'];

function generateCandidate(index: number, jobIds: string[]): Candidate {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    id: `candidate-${index + 1}`,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    stage: faker.helpers.arrayElement(stages),
    jobId: faker.helpers.arrayElement(jobIds),
    phone: faker.phone.number(),
    resume: faker.internet.url(),
    notes: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, 
      () => faker.lorem.sentence()
    ),
    appliedAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
}

// Generate job IDs for reference
const jobIds = Array.from({ length: 25 }, (_, i) => `job-${i + 1}`);

export const candidatesSeed: Candidate[] = Array.from({ length: 1000 }, 
  (_, i) => generateCandidate(i, jobIds)
);
