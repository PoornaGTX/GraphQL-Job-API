import { useState, useEffect } from 'react';
import JobList from '../components/JobList';
// import { jobs as lk } from '../lib/fake-data';
import { getJobs } from '../lib/graphql/queries';

// const job = getJobs().then((jobs) => console.log('jobs', jobs));

function HomePage() {
  const [jobs, setJobs] = useState([]);

  const getJobsData = async () => {
    const jobs = await getJobs();
    setJobs(jobs);
  };

  useEffect(() => {
    getJobsData();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
