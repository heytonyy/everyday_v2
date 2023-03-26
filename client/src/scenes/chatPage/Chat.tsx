import { Box, Typography, InputBase, Button, useTheme } from "@mui/material";
import { useAppSelector } from "state/hooks";
import { ChatProps, Message as MessageType } from "state/types";
import { useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Message from "./Message";
import StatusIndicator from "components/StatusIndicator";
import AvatarImage from "components/AvatarImage";
import { v4 } from "uuid";

const Chat = ({ chatId }: ChatProps) => {
  const userId = useAppSelector((state) => state.user!._id);
  const token = useAppSelector((state) => state.token);
  const friendId = useAppSelector((state) => state.chat!.members).find(
    (fId) => fId !== userId
  );
  const friendInfo = useAppSelector((state) => state.user!.friends).find(
    (friend) => friend._id === friendId
  );
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;
  const alt = palette.background.alt;

  const handleSendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formData = { chatId, senderId: userId, text: sendMessage };
    console.log(formData);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(response);
    setSendMessage("");
    getMessages();
  };

  const getMessages = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/messages/${chatId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    getMessages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {friendInfo && (
        <>
          {/* TOP OF Chat - CHAT USER INFO */}
          <FlexBetween marginBottom="0.75rem">
            <FlexBetween gap="1rem">
              <FlexBetween>
                <AvatarImage image={friendInfo?.picturePath} size="55px" />
                <StatusIndicator online />
              </FlexBetween>
              <Box>
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
                  {friendInfo?.username}
                </Typography>
                <Typography color={medium} fontSize="0.75rem">
                  {friendInfo?.bio}
                </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
          {/* CHAT WRAPPER */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* CHAT TOP: VIEW MESSAGES */}
            <Box
              sx={{
                height: "calc(100vh - 375px)",
                overflowY: "scroll",
              }}
            >
              {messages &&
                messages.map((msg) => (
                  <Message
                    key={v4()}
                    own={msg.senderId === userId}
                    text={msg.text}
                    createdAt={msg.createdAt}
                  />
                ))}
            </Box>
            {/* CHAT BOTTOM: SEND MESSAGE */}
            <FlexBetween gap="1.5rem">
              <InputBase
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                placeholder="Say something..."
                sx={{
                  width: "100%",
                  backgroundColor: light,
                  borderRadius: "2rem",
                  padding: "1rem 2rem",
                  margin: "1rem 0",
                }}
              />
              <Button
                onClick={handleSendMessage}
                sx={{
                  color: alt,
                  backgroundColor: main,
                  borderRadius: "3rem",
                  padding: "0.5rem 1.5rem",
                  height: "100%",
                }}
              >
                SEND
              </Button>
            </FlexBetween>
          </Box>
        </>
      )}
    </>
  );
};
export default Chat;
