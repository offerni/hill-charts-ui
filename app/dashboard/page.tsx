import { getClient } from "../lib/apolloClient";
import { gql } from "@apollo/client";
import { Squads } from "./Squads";

const query = gql`
  query Squads {
    Squads {
      has_more
      total_count
      data {
        created_at
        current_cycle_name
        id
        modified_at
        name
        scope {
          colour
          created_at
          id
          modified_at
          name
          progress
          squad_id
        }
      }
    }
  }
`;

export default async function Dashboard() {
  const client = getClient();
  const { data } = await client.query({ query });

  return <Squads squads={data.Squads.data} />;
}
