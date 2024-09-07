import { AppBar, Tabs, Tab } from "@mui/material";
import { useState } from "react";

export default function ProfileTabs(props) {
  const [tab, setTab] = useState(0);
  const handleChange = (event, value) => {
    setTab(value);
  };
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </AppBar>
      {tab === 0 && <TabContainer></TabContainer>}
    </div>
  );
}
