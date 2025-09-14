import Dexie, { type EntityTable } from 'dexie';
import { type Application } from '../../types/applications';
import { applicationsSeed } from '../seed/applicationsSeed';

class ApplicationsDB extends Dexie {
  applications!: EntityTable<Application, 'id'>;

  constructor() {
    super('ApplicationsDB');
    this.version(1).stores({
      applications: '&id, jobId, candidateEmail, status, appliedAt'
    });
  }
}

export const applicationsDb = new ApplicationsDB();

export const initializeApplications = async () => {
  const count = await applicationsDb.applications.count();
  console.log(`initializeApplications: Current application count: ${count}`);
  if (count === 0) {
    console.log("initializeApplications: Seeding database with applications");
    try {
      await applicationsDb.applications.bulkAdd(applicationsSeed);
      console.log(`initializeApplications: Successfully seeded ${applicationsSeed.length} applications`);
      const newCount = await applicationsDb.applications.count();
      console.log(`initializeApplications: New application count: ${newCount}`);
    } catch (error) {
      console.error("initializeApplications: Error seeding applications:", error);
    }
  } else {
    console.log("initializeApplications: Database already has applications, skipping seed");
  }
};

// Function to ensure applications exist (auto-convert candidates if needed)
export const ensureApplicationsExist = async () => {
  const count = await applicationsDb.applications.count();
  console.log(`ensureApplicationsExist: Current application count: ${count}`);
  
  if (count === 0) {
    console.log("ensureApplicationsExist: No applications found, creating from seeded candidates");
    try {
      await applicationsDb.applications.bulkAdd(applicationsSeed);
      console.log(`ensureApplicationsExist: Successfully created ${applicationsSeed.length} applications from candidates`);
      const newCount = await applicationsDb.applications.count();
      console.log(`ensureApplicationsExist: New application count: ${newCount}`);
      return true; // Indicates applications were created
    } catch (error) {
      console.error("ensureApplicationsExist: Error creating applications:", error);
      return false;
    }
  }
  
  console.log("ensureApplicationsExist: Applications already exist");
  return false; // Indicates no new applications were created
};

// Function to force re-seed applications (for debugging)
export const forceReseedApplications = async () => {
  console.log("forceReseedApplications: Clearing applications database");
  await applicationsDb.applications.clear();
  console.log("forceReseedApplications: Seeding database with applications");
  try {
    await applicationsDb.applications.bulkAdd(applicationsSeed);
    console.log(`forceReseedApplications: Successfully seeded ${applicationsSeed.length} applications`);
    const newCount = await applicationsDb.applications.count();
    console.log(`forceReseedApplications: New application count: ${newCount}`);
  } catch (error) {
    console.error("forceReseedApplications: Error seeding applications:", error);
  }
};

export const createApplication = async (applicationData: Omit<Application, 'id' | 'appliedAt'>) => {
  const newApplication: Application = {
    ...applicationData,
    id: `app-new-${Date.now()}`,
    appliedAt: new Date()
  };
  
  console.log('createApplication: Creating new application:', newApplication);
  await applicationsDb.applications.add(newApplication);
  
  // Verify the application was added
  const count = await applicationsDb.applications.count();
  console.log(`createApplication: Total applications after creation: ${count}`);
  
  return newApplication;
};

export const getAllApplications = async (jobId?: string) => {
  let query = applicationsDb.applications.orderBy('appliedAt');
  
  if (jobId) {
    query = query.filter(app => app.jobId === jobId);
  }
  
  const applications = await query.reverse().toArray();
  console.log(`getAllApplications: Found ${applications.length} applications${jobId ? ` for job ${jobId}` : ''}`);
  return applications;
};

export const getApplicationsByStatus = async (status: Application['status']) => {
  return await applicationsDb.applications
    .where('status')
    .equals(status)
    .reverse()
    .sortBy('appliedAt');
};

export const updateApplicationStatus = async (applicationId: string, status: Application['status']) => {
  await applicationsDb.applications.update(applicationId, { status });
  return applicationsDb.applications.get(applicationId);
};

export const updateApplication = async (applicationId: string, updates: Partial<Application>) => {
  await applicationsDb.applications.update(applicationId, updates);
  return applicationsDb.applications.get(applicationId);
};

export const deleteApplication = async (applicationId: string) => {
  await applicationsDb.applications.delete(applicationId);
  return true;
};

export const getApplicationStatistics = async () => {
  const allApplications = await applicationsDb.applications.toArray();
  console.log(`getApplicationStatistics: Found ${allApplications.length} total applications`);
  
  const stats = {
    totalApplications: allApplications.length,
    applied: 0,
    screening: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    hired: 0
  };
  
  allApplications.forEach(app => {
    stats[app.status]++;
  });
  
  console.log('getApplicationStatistics: Stats:', stats);
  return stats;
};
