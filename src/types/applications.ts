export interface Application {
  id: string;
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'hired';
  appliedAt: Date;
  notes?: string;
  experience?: string;
  skills?: string[];
  education?: string;
}

export interface ApplicationStage {
  id: string;
  name: string;
  applications: Application[];
}

export const APPLICATION_STAGES: ApplicationStage[] = [
  { id: 'applied', name: 'Applied', applications: [] },
  { id: 'screening', name: 'Screening', applications: [] },
  { id: 'interview', name: 'Interview', applications: [] },
  { id: 'offer', name: 'Offer', applications: [] },
  { id: 'rejected', name: 'Rejected', applications: [] },
  { id: 'hired', name: 'Hired', applications: [] },
];
