import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`).then((data) => {
      setUser(data);
    });
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1"><strong>Location:</strong> {user.location}</Typography>
      <Typography variant="body1"><strong>Occupation:</strong> {user.occupation}</Typography>
      <Typography
        variant="body1"
        sx={{ mt: 1 }}
        dangerouslySetInnerHTML={{ __html: user.description }}
      />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => navigate(`/photos/${user._id}`)}
      >
        View Photos
      </Button>
    </Box>
  );
}

export default UserDetail;