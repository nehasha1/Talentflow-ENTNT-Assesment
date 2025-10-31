import { faker } from '@faker-js/faker';

faker.seed(12345); // For consistent data across refreshes

export interface Job {
  id: string;
  title: string;
  slug: string;
  status: 'active' | 'archived';
  tags: string[];
  order: number;
  description: string;
  requirements: string[];
  salary: string;
  location: string;
  jobType: 'Full-time' | 'Remote' | 'Part-time' | 'Contract';
  createdAt: Date;
}

const jobTitles = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'UI/UX Designer', 'Product Manager', 'Data Scientist',
  'DevOps Engineer', 'Mobile Developer', 'QA Engineer',
  'Project Manager', 'Business Analyst', 'Marketing Manager'
];

const techTags = [
  'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java',
  'TypeScript', 'JavaScript', 'AWS', 'Docker', 'Kubernetes',
  'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST API'
];

// Job types as provided by user
const jobTypes: Job['jobType'][] = ['Full-time', 'Remote', 'Part-time', 'Contract'];

// Indian cities for localization
const indianCities = [
  'Bengaluru, Karnataka',
  'Hyderabad, Telangana',
  'Pune, Maharashtra',
  'Mumbai, Maharashtra',
  'Gurugram, Haryana',
  'Noida, Uttar Pradesh',
  'Chennai, Tamil Nadu',
  'New Delhi, Delhi',
  'Kochi, Kerala',
  'Ahmedabad, Gujarat'
];

function generateJob(index: number): Job {
  const title = faker.helpers.arrayElement(jobTitles);
  const slug = title.toLowerCase().replace(/\s+/g, '-') + '-' + faker.string.alphanumeric(4);
  
  return {
    id: `job-${index + 1}`,
    title,
    slug,
    status: faker.helpers.arrayElement(['active', 'active', 'active', 'archived']), // 75% active
    tags: faker.helpers.arrayElements(techTags, { min: 2, max: 5 }),
    order: index,
    description: faker.lorem.paragraphs(2),
    requirements: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, 
      () => faker.lorem.sentence()
    ),
    // Salary in INR LPA (Lakhs Per Annum)
    salary: (() => {
      const min = faker.number.int({ min: 4, max: 20 });
      const max = Math.max(min + 2, min + faker.number.int({ min: 2, max: 10 }));
      return `₹${min}–₹${max} LPA`;
    })(),
    location: faker.helpers.arrayElement(indianCities),
    jobType: faker.helpers.arrayElement(jobTypes),
    createdAt: faker.date.past({ years: 1 })
  };
}

export const jobsSeed: Job[] = Array.from({ length: 25 }, (_, i) => generateJob(i));
