import React, { useState, useEffect } from "react";
import linearClient from "./linear-client";

import { Select } from "antd";

const mapTeamToSelectOptions = (teams) => {
  return teams.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};

function TeamsSelect({ onTeamChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      setIsLoading(true);
      try {
        const me = await linearClient.viewer;
        const myTeams = await me.teams();
        setResults(mapTeamToSelectOptions(myTeams.nodes));
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    getTeams();
  }, []);

  return (
    <Select
      placeholder="Select a team"
      style={{ width: "100%" }}
      options={results}
      disabled={isLoading}
      onChange={onTeamChange}
    />
  );
}

export default TeamsSelect;
