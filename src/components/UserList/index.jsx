import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModel("/user/list").then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <List component="nav">
      {users.map((item) => (
        <React.Fragment key={item._id}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(`/users/${item._id}`)}>
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default UserList;