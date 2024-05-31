import { getJobs } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
  },

  Job: {
    // becuase in jon there is no data column, there is only createdAt colum, we etraxt that data and asign into date column.
    company: (job) => getCompany(job.companyId),
    date: (job) => toIsoDate(job.createdAt),
  },
};

const toIsoDate = (value) => {
  return value.slice(0, 'yyyy-mm-dd'.length);
};
