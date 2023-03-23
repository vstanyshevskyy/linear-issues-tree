import React, { useState, useEffect } from "react";
import "./App.css";
import linearClient from "./linear-client";

import { Select } from "antd";

const mapTeamProjectsToSelectOptions = (teams) => {
  return teams.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
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
      const projects = await linearClient.client.rawRequest(
        `
        query ProjectsByTeam($id: String!){
          team(id: $id) {
            projects {
              nodes {
                id
                name
              }
            }
          }
        }`,
        { id: teamId }
      );

      setResults(
        mapTeamProjectsToSelectOptions(projects.data.team.projects.nodes)
      );
      console.log(results)

      setIsLoading(false);
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
