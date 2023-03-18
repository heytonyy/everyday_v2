/* 
  HOMEPAGE: index.jsx
*/
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "scenes/navbar";
import UserCard from "scenes/widgets/UserCard";
import MyDayForm from "scenes/widgets/MyDayForm";
import AllDays from "scenes/widgets/AllDays";
import FriendsList from "scenes/widgets/FriendsList";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

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

        {/* LEFT - USER PROFILE */}
        <Box 
          flexBasis={isNonMobileScreens ? "40%" : undefined}
        >
          <UserCard userId={_id} picturePath={picturePath} />
          <Box m="2rem 0" />
          <FriendsList userId={_id} />
        </Box>

        {/* CENTER - DAYS */}
        <Box
          flexBasis={isNonMobileScreens ? "55%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        > 
          <MyDayForm picturePath={picturePath} />
          <AllDays userId={_id} />
        </Box>

      </Box>
    </Box>
  )
}

export default HomePage