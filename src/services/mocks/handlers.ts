import { jobsHandlers } from './jobsHandlers';
import { candidatesHandlers } from './candidatesHandlers';
import { assessmentsHandlers } from './assessmentsHandlers';
import { dashboardHandlers } from './dashboardHandlers';
import { applicationsHandlers } from './applicationsHandlers';

export const handlers = [
  ...jobsHandlers,
  ...candidatesHandlers,
  ...assessmentsHandlers,
  ...dashboardHandlers,
  ...applicationsHandlers,
];
