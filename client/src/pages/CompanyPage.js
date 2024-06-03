import { useParams } from 'react-router';
// import { companies } from '../lib/fake-data';
import { getCompany } from '../lib/graphql/queries';
import { useState, useEffect } from 'react';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();

  const [state, setState] = useState({
    companyDetails: null,
    loading: true,
    error: false,
  });

  const getCompanyDetails = async () => {
    try {
      const companyDetails = await getCompany(companyId);
      setState({ companyDetails, loading: false, error: false });
    } catch (error) {
      console.log('error', error);
      setState({ companyDetails: null, loading: false, error: true });
    }
  };

  useEffect(() => {
    getCompanyDetails();
  }, [companyId]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Data Unavailable</div>;
  }

  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">{state.companyDetails.name}</h1>
      <div className="box">{state.companyDetails.description}</div>

      <h2 className="title is-5">Jobs at {state.companyDetails.name}</h2>
      <JobList jobs={state.companyDetails.jobs} />
    </div>
  );
}

export default CompanyPage;
