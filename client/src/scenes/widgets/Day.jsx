import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  useTheme
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setDay } from 'state';


const Day = ({
  _id,
  userId,
  username,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const loggedInUserId = useSelector(state => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  const patchLike = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/days/${_id}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: loggedInUserId })
    });
    const updatedDay = await response.json();
    dispatch(setDay({ day: updatedDay }));
  };

  return (
    <WidgetWrapper margin="2rem 0">
      {/* FRIEND TOP BANNER */}
      <Friend
        friendId={userId}
        name={username}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {/* DAY SECTIONS */}
      <Typography color={main} sx={{ marginTop: '1rem' }}>
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
            <Box
              key={`${username}-${i}`}
            >
              <Divider />
              <Typography sx={{ color: main, margin: "0.5rem 0", paddingLeft: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  )
}

export default Day