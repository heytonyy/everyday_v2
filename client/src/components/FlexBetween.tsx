import { Box } from "@mui/material";
import { styled } from "@mui/system";

interface FlexBetweenProps {
  backgroundColor?: string;
  // add any other props needed
}

const FlexBetween = styled(Box)<FlexBetweenProps>((props) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: props.backgroundColor || "inherit",
  // add any other styles needed
}));

export default FlexBetween;
