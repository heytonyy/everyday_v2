import { Box, Typography, useTheme } from "@mui/material";
import { useAppSelector, useAppDispatch } from "state/hooks";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import FlexBetween from "components/FlexBetween";
import AvatarImage from "components/AvatarImage";
import StatusIndicator from "components/StatusIndicator";
import { UserIdProp, Chat } from "state/types";
import { setChats } from "state";

const ChatFriend = ({ userId: friendId }: UserIdProp) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const userId = useAppSelector((state) => state.user!._id);
  const friendInfo = useAppSelector((state) => state.user!.friends).find(
    (friend) => friend._id === friendId
  );

  const getChat = async () => {
    const formData = { userId, friendId };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chats`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data: Chat = await response.json();
    dispatch(setChats({ chat: data }));
  };

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
            <Box onClick={getChat}>
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
  const token = useAppSelector((state) => state.token);
  const [chatListState, setChatListState] = useState<Chat[]>([]);

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
    const data: Chat[] = await response.json();
    setChatListState(data);
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
        {chatListState &&
          chatListState.map((chat) => {
            const friendId = chat.members.find((member) => member !== userId);
            return friendId && <ChatFriend key={v4()} userId={friendId} />;
          })}
      </Box>
    </>
  );
};

export default ChatList;
