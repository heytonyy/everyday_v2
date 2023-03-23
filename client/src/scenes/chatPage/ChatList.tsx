import { Box, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "state/hooks";
import { useEffect, useState } from "react";
import { UserIdProp, Chat as ChatType } from "state/types";
import { v4 } from "uuid";
import Chat from "./Chat";

const ChatList = ({ userId }: UserIdProp) => {
  const token = useAppSelector((state) => state.token);
  const [chats, setChats] = useState<ChatType[]>();

  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  // const getChats = async () => {
  //   const response = await fetch(`${process.env.REACT_APP_API_URL}/chats/`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ userId }),
  //   });
  //   const data = await response.json();
  //   setChats(data);
  // };

  // useEffect(() => {
  //   getChats();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {chats &&
          chats.map((chat) => (
            <Chat
              key={v4()}
              friendId={chat.friendId}
              username={chat.username}
              bio={chat.bio}
              picturePath={chat.picturePath}
            />
          ))}
      </Box>
    </>
  );
};

export default ChatList;
