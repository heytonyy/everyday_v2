import { Box, Typography, InputBase, Button, useTheme } from "@mui/material";
import { useAppSelector } from "state/hooks";
import { UserIdProp } from "state/types";
import FlexBetween from "components/FlexBetween";
import Message from "./Message";
import StatusIndicator from "components/StatusIndicator";

interface ProfPicProps {
  size?: string;
}
const ProfPic = ({ size = "60px" }: ProfPicProps) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="profile picture"
        src={`https://picsum.photos/200/300`}
      />
    </Box>
  );
};

const Conversation = ({ userId: friendId }: UserIdProp) => {
  const friendInfo = useAppSelector((state) => state.user!.friends).find(
    (friend) => friend._id === friendId
  );

  // TODO: add handler to check to see if friend is online

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;
  const alt = palette.background.alt;

  return (
    <Box>
      {/* TOP OF CONVERSATION - CHAT USER INFO */}
      <FlexBetween marginBottom="0.75rem">
        <FlexBetween gap="1rem">
          <FlexBetween>
            <ProfPic />
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
              John Doe
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              Living life, doing things
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
          <Message />
          <Message own />
          <Message />
          <Message />
          <Message own />
          <Message />
          <Message own />
        </Box>
        {/* CHAT BOTTOM: SEND MESSAGE */}
        <FlexBetween gap="1.5rem">
          <InputBase
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
    </Box>
  );
};
export default Conversation;
