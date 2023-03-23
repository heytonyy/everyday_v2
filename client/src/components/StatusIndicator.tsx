import { Box } from "@mui/material";

const StatusIndicator = ({ online = false }) => {
  return (
    <Box
      sx={{
        backgroundColor: online ? "green" : "gray",
        alignSelf: "normal",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        position: "relative",
        top: "0",
        right: "0",
        border: "1px solid white",
        // css for animation: blinking
        animation: online ? "blinking 2s infinite" : "none",
        // key frames for animation
        "@keyframes blinking": {
          "50%": {
            opacity: 0.5,
          },
        },
      }}
    />
  );
};
export default StatusIndicator;
