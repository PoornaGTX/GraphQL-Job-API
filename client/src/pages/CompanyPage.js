import { useParams } from 'react-router';
// import { companies } from '../lib/fake-data';
import { companyByIdQuery, getCompany } from '../lib/graphql/queries';
import { useState, useEffect } from 'react';
import JobList from '../components/JobList';
import { useQuery } from '@apollo/client';
import { useCompany } from '../lib/graphql/hooks';

function CompanyPage() {
  const { companyId } = useParams();

  const { company, loading, error } = useCompany(companyId);

  // const [state, setState] = useState({
  //   companyDetails: null,
  //   loading: true,
  //   error: false,
  // });

  // const getCompanyDetails = async () => {
  //   try {
  //     const companyDetails = await getCompany(companyId);
  //     setState({ companyDetails, loading: false, error: false });
  //   } catch (error) {
  //     console.log('error', error);
  //     setState({ companyDetails: null, loading: false, error: true });
  //   }
  // };

  // useEffect(() => {
  //   getCompanyDetails();
  // }, [companyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Data Unavailable</div>;
  }

  // console.log('dda', data, loading, error);

  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>

      <h2 className="title is-5">Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
