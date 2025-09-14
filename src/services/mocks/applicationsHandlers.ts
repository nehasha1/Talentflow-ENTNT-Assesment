import { http, HttpResponse } from 'msw';
import { 
  createApplication, 
  getAllApplications, 
  updateApplicationStatus, 
  updateApplication, 
  deleteApplication,
  getApplicationStatistics,
  applicationsDb
} from '../db/applicationsDb';
import { delay, maybeFail } from '../../utils/latency';

export const applicationsHandlers = [
  http.get('/applications', async ({ request }) => {
    await delay();
    
    const url = new URL(request.url);
    const jobId = url.searchParams.get('jobId') || url.searchParams.get('job');
    
    const applications = await getAllApplications(jobId || undefined);
    return HttpResponse.json(applications);
  }),

  http.get('/applications/statistics', async () => {
    await delay();
    const stats = await getApplicationStatistics();
    return HttpResponse.json(stats);
  }),

  http.post('/applications', async ({ request }) => {
    await delay();
    maybeFail();
    
    const applicationData = await request.json() as any;
    const newApplication = await createApplication(applicationData);
    return HttpResponse.json(newApplication, { status: 201 });
  }),

  http.patch('/applications/:id/status', async ({ params, request }) => {
    await delay();
    maybeFail();
    
    const { status } = await request.json() as { status: string };
    const updatedApplication = await updateApplicationStatus(params.id as string, status as any);
    return HttpResponse.json(updatedApplication);
  }),

  http.patch('/applications/:id', async ({ params, request }) => {
    await delay();
    maybeFail();
    
    const updates = await request.json() as any;
    const updatedApplication = await updateApplication(params.id as string, updates);
    return HttpResponse.json(updatedApplication);
  }),

  http.delete('/applications/:id', async ({ params }) => {
    await delay();
    maybeFail();
    
    await deleteApplication(params.id as string);
    return new HttpResponse(null, { status: 204 });
  }),
];
