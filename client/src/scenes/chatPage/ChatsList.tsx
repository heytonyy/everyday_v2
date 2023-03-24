import { Box, Typography, useTheme } from "@mui/material";
import { useAppSelector, useAppDispatch } from "state/hooks";
import { useEffect } from "react";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import AvatarImage from "components/AvatarImage";
import StatusIndicator from "components/StatusIndicator";
import { UserIdProp, ChatResponse } from "state/types";
import { setChats } from "state";

const ChatFriend = ({ userId: friendId }: UserIdProp) => {
  const navigate = useNavigate();
  const chatId = useAppSelector((state) => state.chats).find(
    (chat) => chat.friendId === friendId
  )?._id;
  const friendInfo = useAppSelector((state) => state.user!.friends).find(
    (friend) => friend._id === friendId
  );

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <>
      {friendInfo && (
        <FlexBetween marginBottom="1.5rem">
          <FlexBetween gap="1rem">
            <FlexBetween>
              <AvatarImage image={friendInfo.picturePath} size="55px" />
              <StatusIndicator online />
            </FlexBetween>
            <Box onClick={() => navigate(`/chat/${chatId}`)}>
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
                {friendInfo.username}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                {friendInfo.bio}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      )}
    </>
  );
};

const ChatList = ({ userId }: UserIdProp) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const chats = useAppSelector((state) => state.chats);

  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  const getChats = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/chats/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data: ChatResponse[] = await response.json();
    const filteredData = data.map((chat) => ({
      _id: chat._id,
      friendId: chat.members.find((friendId) => friendId !== userId),
      createdAt: chat.createdAt,
    }));
    dispatch(setChats({ chats: filteredData }));
  };

  useEffect(() => {
    getChats();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Typography
        color={dark}
        variant="h5"
        fontWeight="500"
        sx={{ marginBottom: "1rem" }}
      >
        Chat List
      </Typography>
      <Box display="flex" flexDirection="column">
        {chats &&
          chats.map((chat) => <ChatFriend key={v4()} userId={chat.friendId} />)}
      </Box>
    </>
  );
};

export default ChatList;
