import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PouchCard from "../components/PouchCard";

const Home = () => {
  // Run Get Pouches Query
  const { loading, data } = useQuery(POUCHES_QUERY);

  return (
    <div>
      <Grid columns={3}>
        <Grid.Row>
          <h1>Your Pouches</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading Pouches...</h1>
          ) : (
            data.getPouches &&
            data.getPouches.map((pouch) => (
              <Grid.Column key={pouch.id}>
                <PouchCard pouch={pouch} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

// GraphQL Query to get all pouches and to feed into useQuery hook
const POUCHES_QUERY = gql`
  {
    getPouches {
      id
      name
      createdAt
      resources {
        id
        email
        createdAt
        link
      }
    }
  }
`;

export default Home;
