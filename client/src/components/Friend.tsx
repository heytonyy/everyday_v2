import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setFriends } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import AvatarImage from "components/AvatarImage";
import { FriendProps } from "state/types";

const Friend = ({ friendId, name, location, picturePath }: FriendProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token);
  const userId = useAppSelector((state) => state.user!._id);
  const friends = useAppSelector((state) => state.user!.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const handlePatchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/users/${userId}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const navigateToChat = async () => {
    const formData = { userId, friendId };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chats`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);
    navigate(`/chat/`);
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <AvatarImage image={picturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // bug: need to force refresh on specific case.
            // case: on friends profile, click on friend, then click on friend again
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {location}
          </Typography>
        </Box>
      </FlexBetween>
      <FlexBetween gap="1rem">
        {/* MESSAGE */}
        {isFriend && (
          <IconButton
            onClick={() => navigateToChat()}
            sx={{ backgroundColor: primaryLight, padding: "0.6rem" }}
          >
            <ChatIcon sx={{ color: primaryDark }} />
          </IconButton>
        )}
        {/* ADD/REMOVE FRIEND */}
        <IconButton
          onClick={() => handlePatchFriend()}
          sx={{ backgroundColor: primaryLight, padding: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;
