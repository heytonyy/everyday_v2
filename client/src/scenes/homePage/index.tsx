/* 
  HOMEPAGE: index.tsx
*/
import { Box, useMediaQuery } from "@mui/material";
import { useAppSelector } from "state/hooks";
import NavBar from "scenes/navbar";
import UserCard from "scenes/widgets/UserCard";
import MyDayForm from "scenes/widgets/MyDayForm";
import AllDays from "scenes/widgets/AllDays";

export default function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useAppSelector((state) => state.user!);

  return (
    <Box>
      <NavBar />
      {/* MAIN CONTENT */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* LEFT - USER PROFILE & FRIENDS LIST */}
        <Box flexBasis={isNonMobileScreens ? "40%" : undefined}>
          <UserCard userId={_id!} />
          <Box margin="2rem 0" />
        </Box>
        {/* CENTER - DAYS */}
        <Box
          flexBasis={isNonMobileScreens ? "55%" : undefined}
          marginTop={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyDayForm picturePath={picturePath} />
          <Box margin="2rem 0" />
          <AllDays userId={_id!} />
        </Box>
      </Box>
    </Box>
  );
}
