import { Box } from "@mui/material";
import { AvatarProps } from "state/types";

const AvatarImage = ({ image, size = "60px" }: AvatarProps) => {
  return (
    <Box width={size} height={size}>
      {image && (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`http://localhost:3001/assets/${image}`}
        />
      )}
    </Box>
  );
};

export default AvatarImage;
