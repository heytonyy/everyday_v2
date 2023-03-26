import { Box, useTheme } from "@mui/material";
import { MessageProps } from "state/types";

const Message = ({ text, own, createdAt }: MessageProps) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const light = palette.neutral.light;

  const getElapsedTime = (createdAt: string): string => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const elapsedMilliseconds = now.getTime() - createdDate.getTime();
    // Convert milliseconds to seconds, minutes, hours, or days as appropriate
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    if (elapsedSeconds < 60) return `${elapsedSeconds} seconds ago`;

    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    if (elapsedMinutes < 60) return `${elapsedMinutes} minutes ago`;

    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) return `${elapsedHours} hours ago`;

    const elapsedDays = Math.floor(elapsedHours / 24);
    return `${elapsedDays} days ago`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: own ? "flex-end" : "flex-start",
        marginTop: "0.5rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: own ? light : primaryLight,
          padding: "0.75rem",
          borderRadius: "0.5rem",
          width: "60%",
        }}
      >
        {text}
      </Box>
      <Box fontSize="0.75rem" marginTop="0.5rem" marginLeft="0.5rem">
        {getElapsedTime(createdAt)}
      </Box>
    </Box>
  );
};
export default Message;
