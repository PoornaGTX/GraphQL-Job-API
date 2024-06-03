import { GraphQLClient } from 'graphql-request';
import { ApolloClient, ApolloLink, concat, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { getAccessToken } from '../auth';

// const client = new GraphQLClient('http://localhost:9000/graphql', {
//   headers: () => {
//     const accessToken = getAccessToken();

//     if (accessToken) {
//       return { Authorization: `Bearer ${accessToken}` };
//     }
//     return {};
//   },
// });

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
  // defaultOptions: { query: { fetchPolicy: 'network-only' }, watchQuery: { fetchPolicy: 'network-only' } },
});

export const companyByIdQuery = gql`
  query CompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        date
        title
      }
    }
  }
`;

export const jobsQuery = gql`
  query Jobs($limit: Int, $skip: Int) {
    jobs(limit: $limit, skip: $skip) {
      items {
        id
        date
        title
        company {
          id
          name
        }
      }
      totalCount
    }
  }
`;

const jobDetailFragement = gql`
  fragment JobDetail on Job {
    id
    date
    title
    company {
      id
      name
    }
    description
  }
`;

export const jobByIdQuery = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragement}
`;

export const createJobMutation = gql`
  mutation createJb($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragement}
`;

//moved to job page with using useQuery
// export const getJob = async (id) => {
//   // const { job } = await client.request(query, { id });
//   // return job;

//   const { data } = await apolloClient.query({ query: jobByIdQuery, variables: { id } });
//   return data.job;
// };

//moved to Home page with using useQuery
// export const getJobs = async () => {
//   const query = gql`
//     query Jobs {
//       jobs {
//         id
//         date
//         title
//         company {
//           id
//           name
//         }
//       }
//     }
//   `;
//   // const { jobs } = await client.request(query);
//   const { data } = await apolloClient.query({ query, fetchPolicy: 'network-only' });
//   return data.jobs;
// };

//moved to company page with using useQuery
// export const getCompany = async (id) => {
//   const query = gql`
//     query CompanyById($id: ID!) {
//       company(id: $id) {
//         id
//         name
//         description
//         jobs {
//           id
//           date
//           title
//         }
//       }
//     }
//   `;
//   // const { company } = await client.request(query, { id });
//   // return company;

//   const { data } = await apolloClient.query({ query, variables: { id } });
//   return data.company;
// };

// export const createJob = async ({ title, description }) => {
//   const mutation = gql`
//     mutation createJb($input: CreateJobInput!) {
//       job: createJob(input: $input) {
//         ...JobDetail
//       }
//     }
//     ${jobDetailFragement}
//   `;
//   // const { job } = await client.request(mutation, { input: { title, description } });

//   const { data } = await apolloClient.mutate({
//     mutation,
//     variables: { input: { title, description } },
//     update: (cache, { data }) => {
//       cache.writeQuery({
//         query: jobByIdQuery,
//         variables: { id: data.job.id },
//         data,
//       });
//     },
//   });
//   return data.job;
// };
