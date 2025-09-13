import Dexie, { type EntityTable } from 'dexie';
import { type Job, jobsSeed } from '../seed/jobsSeed';

class JobsDB extends Dexie {
  jobs!: EntityTable<Job, 'id'>;

  constructor() {
    super('JobsDB');
    this.version(1).stores({
      jobs: '&id, slug, status, order, title'
    });
  }
}

export const jobsDb = new JobsDB();

export const initializeJobs = async () => {
  const count = await jobsDb.jobs.count();
  if (count === 0) {
    await jobsDb.jobs.bulkAdd(jobsSeed);
    console.log(`Seeded ${jobsSeed.length} jobs`);
  }
};

export const getAllJobs = async (params?: {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) => {
  let query = jobsDb.jobs.orderBy('order');
  
  if (params?.status) {
    query = query.filter(job => job.status === params.status);
  }
  
  if (params?.search) {
    query = query.filter(job => 
      job.title.toLowerCase().includes(params.search!.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(params.search!.toLowerCase()))
    );
  }

  const jobs = await query.toArray();
  
  if (params?.page && params?.pageSize) {
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;
    return {
      data: jobs.slice(start, end),
      total: jobs.length,
      page: params.page,
      pageSize: params.pageSize
    };
  }
  
  return { data: jobs, total: jobs.length };
};

export const createJob = async (jobData: Omit<Job, 'id' | 'createdAt'>) => {
  const newJob: Job = {
    ...jobData,
    id: `job-${Date.now()}`,
    createdAt: new Date()
  };
  await jobsDb.jobs.add(newJob);
  return newJob;
};

export const updateJob = async (id: string, updates: Partial<Job>) => {
  await jobsDb.jobs.update(id, updates);
  return jobsDb.jobs.get(id);
};

export const reorderJob = async (id: string, data: { fromOrder: number; toOrder: number }) => {
  // Implement reorder logic here
  await jobsDb.jobs.update(id, { order: data.toOrder });
  return jobsDb.jobs.get(id);
};
