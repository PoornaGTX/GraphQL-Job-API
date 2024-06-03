import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import { useEffect, useState } from 'react';
import { getJob } from '../lib/graphql/queries';
import { useJob } from '../lib/graphql/hooks';

function JobPage() {
  const { jobId } = useParams();

  const { job, loading, error } = useJob(jobId);

  // const [job, setJob] = useState();

  // const getJobData = async () => {
  //   const job = await getJob(jobId);
  //   setJob(job);
  // };

  // useEffect(() => {
  //   getJobData();
  // }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Data Unavailable</div>;
  }

  // const job = jobs.find((job) => job.id === jobId);
  return (
    <div>
      <h1 className="title is-2">{job.title}</h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">Posted: {formatDate(job.date, 'long')}</div>
        <p className="block">{job.description}</p>
      </div>
    </div>
  );
}

export default JobPage;
