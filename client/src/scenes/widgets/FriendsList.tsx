import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { useEffect } from "react";
import { setFriends } from "state";
import { UserIdProp } from "state/types";
import { v4 } from "uuid";

const FriendsList = ({ userId }: UserIdProp) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const friends = useAppSelector((state) => state.user!.friends);

  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  const getFriends = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Typography
        color={dark}
        variant="h5"
        fontWeight="500"
        sx={{ marginBottom: "1rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend, i) => (
          <Friend
            key={v4()}
            friendId={friend._id!}
            name={friend.username}
            location={friend.location}
            picturePath={friend.picturePath}
          />
        ))}
      </Box>
    </>
  );
};

export default FriendsList;
