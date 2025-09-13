import { http, HttpResponse } from 'msw';
import { getAllCandidates, updateCandidate, getCandidateStatistics, getCandidateTimeline, candidatesDb } from '../db/candidatesDb';
import { delay, maybeFail } from '../../utils/latency';

export const candidatesHandlers = [
  http.get('/candidates', async ({ request }) => {
    await delay();
    
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const stage = url.searchParams.get('stage') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');
    
    const result = await getAllCandidates({ search, stage, page, pageSize });
    
    return HttpResponse.json(result);
  }),

  http.get('/candidates/:id', async ({ params }) => {
    await delay();
    
    // Get candidate by ID (would need to implement in candidatesDb)
    const candidate = await candidatesDb.candidates.get(params.id as string);
    return HttpResponse.json(candidate);
  }),

  http.get('/candidates/:id/timeline', async ({ params }) => {
    await delay();
    
    // Get candidate timeline (would need to implement in candidatesDb)
    const timeline = await getCandidateTimeline(params.id as string);
    return HttpResponse.json(timeline);
  }),

  http.patch('/candidates/:id', async ({ params, request }) => {
    await delay();
    maybeFail();
    
    const updates = await request.json() as any;
    const updatedCandidate = await updateCandidate(params.id as string, updates);
    return HttpResponse.json(updatedCandidate);
  }),

  http.post('/candidates', async ({ request }) => {
    await delay();
    maybeFail();
    
    const candidateData = await request.json() as any;
    const newCandidate = await candidatesDb.candidates.add({
      ...candidateData,
      id: `candidate-${Date.now()}`,
      appliedAt: new Date(),
      updatedAt: new Date(),
    });
    return HttpResponse.json(newCandidate, { status: 201 });
  }),
];