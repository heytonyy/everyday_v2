import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, IconButton, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { useState } from "react";
import { setDay } from "state";
import { v4 } from "uuid";
// import { DayProps } from "state/types";

const Day = ({
  _id: dayId,
  userId,
  username,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const loggedInUserId = useAppSelector((state) => state.user?._id);
  // might need to fix likes for typescript
  const isLiked = loggedInUserId !== undefined && likes[loggedInUserId];
  const likeCount = Object.keys(likes).length;
  const [isComments, setIsComments] = useState(false);

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  const patchLike = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/days/${dayId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedDay = await response.json();
    dispatch(setDay({ day: updatedDay }));
  };

  return (
    <WidgetWrapper margin="2rem 0">
      {/* FRIEND TOP BANNER */}
      <Friend
        friendId={userId}
        name={username}
        location={location}
        picturePath={userPicturePath}
      />
      {/* DAY SECTIONS */}
      <Typography color={main} sx={{ marginTop: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="day"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      {/* DAY LIKES AND COMMENTS */}
      <FlexBetween marginTop="0.25rem">
        <FlexBetween gap="1rem">
          {/* LIKES */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography> {likeCount} </Typography>
          </FlexBetween>

          {/* COMMENTS */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography> {comments.length} </Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box marginTop="0.5rem">
          {comments.map((comment, i) => (
            <Box key={v4()}>
              <Divider />
              <Typography
                sx={{ color: main, margin: "0.5rem 0", paddingLeft: "1rem" }}
              >
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default Day;
