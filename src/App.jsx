import React, { useState } from "react";
import "./App.css";
import { Col, Row } from "antd";

import "antd/dist/antd.css";

import ConfigDrawer from "./components/ConfigDrawer";
import TeamSelect from "./components/TeamsSelect";
import ProjectSelect from "./components/ProjectSelect";
import ProjectGraph from "./components/ProjectGraph";

function App() {
  const [teamId, setTeamId] = useState(null);
  const [projectId, setProjectId] = useState(null);

  return (
    <>
      <Row gutter={16}>
        <Col className="gutter-row" span={11}>
          <TeamSelect onTeamChange={(id) => setTeamId(id)} />
        </Col>
        <Col className="gutter-row" span={11}>
          <ProjectSelect
            teamId={teamId}
            onProjectChange={(id) => {
              setProjectId(id);
            }}
          />
        </Col>
        <Col className="col-offset-1">
          <ConfigDrawer />
        </Col>
      </Row>
      <Row gutter={16}>
        <ProjectGraph projectId={projectId} />
      </Row>
    </>
  );
}

export default App;
