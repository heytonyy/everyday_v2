/* 
  LOGIN PAGE: index.jsx
*/
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

export default function LoginPage() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme();
  const alt = palette.background.alt;

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: alt,
          padding: "1rem 6%",
          textAlign: "center",
        }}
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Everday
        </Typography>
      </Box>
      <Box
        sx={{
          width: isNonMobileScreens ? "50%" : "93%",
          padding: "2rem",
          margin: "2rem auto",
          borderRadius: "1.5rem",
          backgroundColor: alt,
        }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Everday, the social media for everyone, everywhere..
          everyday!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}
