import React from "react";
import { AppBar, Toolbar, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
import { useEffect, useState } from "react";

function TopBar({ advancedFeatures, setAdvancedFeatures }) {
  const location = useLocation();
  const [context, setContext] = useState("");

  useEffect(() => {
    const userMatch = location.pathname.match(/\/users\/([^/]+)/);
    const photoMatch = location.pathname.match(/\/photos\/([^/]+)/);

    if (userMatch) {
      fetchModel(`/user/${userMatch[1]}`).then((user) => {
        setContext(`${user.first_name} ${user.last_name}`);
      });
    } else if (photoMatch) {
      fetchModel(`/user/${photoMatch[1]}`).then((user) => {
        setContext(`Photos of ${user.first_name} ${user.last_name}`);
      });
    } else {
      setContext("");
    }
  }, [location.pathname]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Nguyễn Hoàng Nam B23DCCN584
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={advancedFeatures}
              onChange={(e) => setAdvancedFeatures(e.target.checked)}
              sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
            />
          }
          label={<Typography color="inherit">Enable Advanced Features</Typography>}
        />
        <Typography variant="h6" color="inherit">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;