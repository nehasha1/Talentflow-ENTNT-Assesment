import { http, HttpResponse } from 'msw';
import { getJobStatistics } from '../db/jobsDb';
import { getCandidateStatistics } from '../db/candidatesDb';
import { getAssessmentStatistics } from '../db/assessmentsDb';
import { delay } from '../../utils/latency';

export const dashboardHandlers = [
  http.get('/dashboard/statistics', async () => {
    await delay();
    
    const [jobStats, candidateStats, assessmentStats] = await Promise.all([
      getJobStatistics(),
      getCandidateStatistics(),
      getAssessmentStatistics()
    ]);
    
    // Calculate mock interview and offer statistics
    const interviewsScheduled = Math.floor(Math.random() * 10) + 5;
    const offersPending = Math.floor(Math.random() * 5) + 1;
    
    const statistics = {
      totalJobs: jobStats.totalJobs,
      activeJobs: jobStats.activeJobs,
      totalCandidates: candidateStats.totalCandidates,
      newCandidates: candidateStats.newCandidates,
      totalAssessments: assessmentStats.totalAssessments,
      completedAssessments: assessmentStats.completedAssessments,
      interviewsScheduled,
      offersPending
    };
    
    return HttpResponse.json(statistics);
  }),
];
