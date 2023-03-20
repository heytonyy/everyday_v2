import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setFriends } from "state";


const FriendsList = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const friends = useSelector(state => state.user.friends);
  const { palette } = useTheme();

  const getFriends = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/friends`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ marginBottom: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map(friend => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={friend.username}
            subtitle={friend.bio}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendsList