import { useState, useEffect } from 'react';
import JobList from '../components/JobList';
// import { jobs as lk } from '../lib/fake-data';
import { getJobs } from '../lib/graphql/queries';
import { useJobs } from '../lib/graphql/hooks';
import PaginationBar from '../components/PaginationBar';

// const job = getJobs().then((jobs) => console.log('jobs', jobs));

const JOBS_PER_PAGE = 20;

function HomePage() {
  // const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { jobs, loading, error } = useJobs(JOBS_PER_PAGE, (currentPage - 1) * JOBS_PER_PAGE);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Data Unavailable</div>;
  }

  const totalPages = Math.ceil(jobs.totalCount / JOBS_PER_PAGE);

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
      {/* <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage == 1}>
          previous
        </button>
        <span>{`${currentPage} of ${totalPages}`}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div> */}
      <PaginationBar currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <JobList jobs={jobs.items} />
    </div>
  );
}

export default HomePage;
