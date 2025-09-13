import { http, HttpResponse } from 'msw';
import { getAllCandidates, updateCandidate, getCandidateTimeline } from '../db/candidatesDb';
import { delay, maybeFail } from '../../utils/latency';

export const candidatesHandlers = [
  http.get('/candidates', async ({ request }) => {
    await delay();
    
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const stage = url.searchParams.get('stage') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '50');
    
    const result = await getAllCandidates({ search, stage, page, pageSize });
    return HttpResponse.json(result);
  }),

  http.patch('/candidates/:id', async ({ params, request }) => {
    await delay();
    maybeFail();
    
    const updates = await request.json() as any;
    const updatedCandidate = await updateCandidate(params.id as string, updates);
    return HttpResponse.json(updatedCandidate);
  }),

  http.get('/candidates/:id/timeline', async ({ params }) => {
    await delay();
    
    const timeline = await getCandidateTimeline(params.id as string);
    return HttpResponse.json(timeline);
  }),
];
