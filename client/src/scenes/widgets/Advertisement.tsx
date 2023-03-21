import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";


const Advertisement = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography
          variant="h5"
          color={dark}
          fontWeight="500"
        >
          Advertisement
        </Typography>
        <Typography color={medium} >Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src=""
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main} >Cosmetics</Typography>
        <Typography color={main} >cosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} margin="0.5rem 0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </WidgetWrapper>
  )
}

export default Advertisement