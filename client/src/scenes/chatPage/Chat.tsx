import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import AvatarImage from "components/AvatarImage";
import { Chat as ChatProps } from "state/types";
import StatusIndicator from "components/StatusIndicator";

const Chat = ({ friendId, username, bio, picturePath }: ChatProps) => {
  const navigate = useNavigate();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <FlexBetween>
          <AvatarImage image={picturePath} size="55px" />
          <StatusIndicator online />
        </FlexBetween>
        <Box onClick={() => navigate(`/chat/${friendId}`)}>
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
            {username}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {bio}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Chat;
