import { useState, useEffect } from 'react';
import JobList from '../components/JobList';
// import { jobs as lk } from '../lib/fake-data';
import { getJobs } from '../lib/graphql/queries';
import { useJobs } from '../lib/graphql/hooks';

// const job = getJobs().then((jobs) => console.log('jobs', jobs));

function HomePage() {
  // const [jobs, setJobs] = useState([]);

  const { jobs, loading, error } = useJobs();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Data Unavailable</div>;
  }

  // const getJobsData = async () => {
  //   const jobs = await getJobs();
  //   setJobs(jobs);
  // };

  // useEffect(() => {
  //   getJobsData();
  // }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
