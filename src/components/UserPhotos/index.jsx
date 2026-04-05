import React, { useEffect, useState } from "react";
import { Typography, Box, Card, CardMedia, CardContent, Divider, Button } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos({ advancedFeatures }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
  fetchModel(`/photosOfUser/${userId}`).then((data) => {
    setPhotos(data);
    const params = new URLSearchParams(location.search);
    const photoIndex = parseInt(params.get("photo"), 10);
    if (!isNaN(photoIndex) && photoIndex >= 0 && photoIndex < data.length) {
      setCurrentIndex(photoIndex);
    } else {
      setCurrentIndex(0);
    }
  });
}, [userId, location.search]);

  if (!photos || photos.length === 0) {
    return <Typography variant="body1" sx={{ p: 2 }}>No photos found.</Typography>;
  }

  const renderPhoto = (photo) => (
    <Card key={photo._id} sx={{ mb: 3 }}>
      <CardMedia
        component="img"
        image={`/images/${photo.file_name}`}
        alt="photo"
      />
      <CardContent>
        <Typography variant="caption" color="text.secondary">
          {new Date(photo.date_time).toLocaleString()}
        </Typography>

        {photo.comments && photo.comments.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2" gutterBottom>Comments:</Typography>
            {photo.comments.map((comment) => (
              <Box key={comment._id} sx={{ mb: 1 }}>
                <Divider sx={{ mb: 1 }} />
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ fontWeight: "bold", cursor: "pointer", color: "primary.main" }}
                  onClick={() => navigate(`/users/${comment.user._id}`)}
                >
                  {comment.user.first_name} {comment.user.last_name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  {new Date(comment.date_time).toLocaleString()}
                </Typography>
                <Typography variant="body2">{comment.comment}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );

  if (advancedFeatures) {
    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              const newIndex = currentIndex - 1;
              setCurrentIndex(newIndex);
              navigate(`/photos/${userId}?photo=${newIndex}`);
            }}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            {currentIndex + 1} / {photos.length}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              const newIndex = currentIndex + 1;
              setCurrentIndex(newIndex);
              navigate(`/photos/${userId}?photo=${newIndex}`);
            }}
            disabled={currentIndex === photos.length - 1}
          >
            Next
          </Button>
        </Box>
        {renderPhoto(photos[currentIndex])}
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {photos.map((photo) => renderPhoto(photo))}
    </Box>
  );
}

export default UserPhotos;