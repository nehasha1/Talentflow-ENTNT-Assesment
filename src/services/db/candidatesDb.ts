import Dexie, { type EntityTable } from 'dexie';
import { type Candidate, candidatesSeed } from '../seed/candidateSeed';

class CandidatesDB extends Dexie {
  candidates!: EntityTable<Candidate, 'id'>;

  constructor() {
    super('CandidatesDB');
    this.version(1).stores({
      candidates: '&id, email, stage, jobId, name'
    });
  }
}

export const candidatesDb = new CandidatesDB();

export const initializeCandidates = async () => {
  const count = await candidatesDb.candidates.count();
  if (count === 0) {
    await candidatesDb.candidates.bulkAdd(candidatesSeed);
    console.log(`Seeded ${candidatesSeed.length} candidates`);
  }
};

export const getAllCandidates = async (params?: {
  search?: string;
  stage?: string;
  page?: number;
  pageSize?: number;
}) => {
  let query = candidatesDb.candidates.orderBy('appliedAt').reverse();
  
  if (params?.stage) {
    query = query.filter(candidate => candidate.stage === params.stage);
  }
  
  if (params?.search) {
    query = query.filter(candidate => 
      candidate.name.toLowerCase().includes(params.search!.toLowerCase()) ||
      candidate.email.toLowerCase().includes(params.search!.toLowerCase())
    );
  }

  const candidates = await query.toArray();
  
  if (params?.page && params?.pageSize) {
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;
    return {
      data: candidates.slice(start, end),
      total: candidates.length,
      page: params.page,
      pageSize: params.pageSize
    };
  }
  
  return { data: candidates, total: candidates.length };
};

export const updateCandidate = async (id: string, updates: Partial<Candidate>) => {
  await candidatesDb.candidates.update(id, { ...updates, updatedAt: new Date() });
  return candidatesDb.candidates.get(id);
};

export const getCandidateTimeline = async (id: string) => {
  const candidate = await candidatesDb.candidates.get(id);
  if (!candidate) return null;
  
  // Mock timeline data - in real app, you'd store stage change history
  return [
    { stage: 'applied', date: candidate.appliedAt, note: 'Application submitted' },
    { stage: candidate.stage, date: candidate.updatedAt, note: `Moved to ${candidate.stage}` }
  ];
};

// Dashboard statistics functions
export const getCandidateStatistics = async () => {
  const allCandidates = await candidatesDb.candidates.toArray();
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const newCandidates = allCandidates.filter(candidate => 
    new Date(candidate.appliedAt) >= oneWeekAgo
  );
  
  const stageCounts = allCandidates.reduce((acc, candidate) => {
    acc[candidate.stage] = (acc[candidate.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalCandidates: allCandidates.length,
    newCandidates: newCandidates.length,
    stageCounts
  };
};