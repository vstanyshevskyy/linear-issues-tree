import React, { useState } from "react";
import "./App.css";
import { Layout, Col, Row } from "antd";

import "antd/dist/antd.css";

import TeamSelect from "./TeamsSelect";
import ProjectSelect from "./ProjectSelect";
import ProjectGraph from "./ProjectGraph";
const { Content } = Layout;

function App() {
  const [teamId, setTeamId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  return (
    <>
      <Layout>
        <Content>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <TeamSelect onTeamChange={(id) => setTeamId(id)} />
            </Col>
            <Col className="gutter-row" span={12}>
              <ProjectSelect teamId={teamId} onProjectChange={(id) => {console.log(id);setProjectId(id)}} />
            </Col>
          </Row>
          <Row gutter={16}>
            <ProjectGraph projectId={projectId} />
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default App;
