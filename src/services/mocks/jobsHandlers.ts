import { http, HttpResponse } from 'msw';
import { getAllJobs, createJob, updateJob, reorderJob, getAllCompanies } from '../db/jobsDb';
import { delay, maybeFail } from '../../utils/latency';

export const jobsHandlers = [
  http.get('/jobs', async ({ request }) => {
    // console.log('MSW Handler: /jobs request intercepted');
    // console.log('MSW Handler: Request URL:', request.url);
    await delay();
    
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status') || '';
    const jobType = url.searchParams.get('jobType') || '';
    const company = url.searchParams.get('company') || ''; // Added company parameter
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    
    // console.log('MSW Handler: Calling getAllJobs with params:', { search, status, jobType, company, page, pageSize });
    const result = await getAllJobs({ search, status, jobType, company, page, pageSize }); // Added company to params
    // console.log('MSW Handler: getAllJobs result:', result);
    
    return HttpResponse.json(result);
  }),

  // New endpoint to get all companies for filter dropdown
  http.get('/jobs/companies', async () => {
    await delay();
    const companies = await getAllCompanies();
    return HttpResponse.json(companies);
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
