import { Box, useTheme } from "@mui/material";

const Message = ({ own = false }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const light = palette.neutral.light;

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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
        perferendis quisquam id corporis maiores unde inventore, magni similique
        quasi ipsum doloribus, libero repellat alias laudantium vero atque
        nesciunt mollitia omnis.
      </Box>
      <Box fontSize="0.75rem" marginTop="0.5rem" marginLeft="0.5rem">
        1 hour ago
      </Box>
    </Box>
  );
};
export default Message;
