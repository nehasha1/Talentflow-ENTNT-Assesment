import { http, HttpResponse } from 'msw';
import { getAllJobs, createJob, updateJob, reorderJob } from '../db/jobsDb';
import { delay, maybeFail } from '../../utils/latency';

export const jobsHandlers = [
  http.get('/jobs', async ({ request }) => {
    await delay();
    
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    
    const result = await getAllJobs({ search, status, page, pageSize });
    return HttpResponse.json(result);
  }),

  http.post('/jobs', async ({ request }) => {
    await delay();
    maybeFail();
    
    const jobData = await request.json() as any;
    const newJob = await createJob(jobData);
    return HttpResponse.json(newJob, { status: 201 });
  }),

  http.patch('/jobs/:id', async ({ params, request }) => {
    await delay();
    maybeFail();
    
    const updates = await request.json() as any;
    const updatedJob = await updateJob(params.id as string, updates);
    return HttpResponse.json(updatedJob);
  }),

  http.patch('/jobs/:id/reorder', async ({ params, request }) => {
    await delay();
    maybeFail();
    
    const reorderData = await request.json() as any;
    const updatedJob = await reorderJob(params.id as string, reorderData);
    return HttpResponse.json(updatedJob);
  }),
];
