import React, { useState } from "react";
import { Drawer, Input, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import { LINEAR_API_KEY_STORAGE_KEY } from "../lib/linear-client";

const saveApiKey = (key) => {
  window.localStorage.setItem(LINEAR_API_KEY_STORAGE_KEY, key);
};

function ConfigDrawer() {
  const [isConfigDrawerOpen, setConfigDraweOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setConfigDraweOpen(true)}>
        <SettingOutlined />
      </Button>
      <Drawer
        title="Configuration"
        placement="right"
        onClose={() => setConfigDraweOpen(false)}
        open={isConfigDrawerOpen}
      >
        <p>
          <label htmlFor="linear-api-key">Linear API Key:</label>
          <Input.Password
            id="linear-api-key"
            defaultValue={window.localStorage.getItem(
              LINEAR_API_KEY_STORAGE_KEY
            )}
            onChange={e => saveApiKey(e.target.value)}
          />
        </p>
      </Drawer>
    </>
  );
}

export default ConfigDrawer;
