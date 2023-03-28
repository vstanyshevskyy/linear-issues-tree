import React, { useState, useEffect } from "react";
import getClient from "../lib/linear-client";

import { Select } from "antd";

const mapTeamProjectsToSelectOptions = (projects) => {
  console.log(projects)
  return projects
 .sort((a,b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }).map(({ id, name,state }) => ({
    value: id,
    label: `${name} - ${state}`,
  }))
};

function ProjectSelect({ teamId, onProjectChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!teamId) {
        return;
      }
      setIsLoading(true);
      try {
        const linearClient = getClient()

        // TODO: Projects filter -- projects (filter: {state: {eq: "completed"}}) {
        const projects = await linearClient.client.rawRequest(
          `
          query ProjectsByTeam($id: String!){
            team(id: $id) {
              projects {
                nodes {
                  id
                  name
                  state
                }
              }
            }
          }`,
          { id: teamId }
        );
  
        setResults(
          mapTeamProjectsToSelectOptions(projects.data.team.projects.nodes)
        );
      } catch (e) {
        console.log(e)
      }
      finally {
        setIsLoading(false);
      }

    };
    fetchProjects();
  }, [teamId]);

  return (
    <Select
      placeholder="Select a project"
      style={{ width: "100%" }}
      options={results}
      disabled={isLoading}
      onChange={onProjectChange}
    />
  );
}

export default ProjectSelect;
