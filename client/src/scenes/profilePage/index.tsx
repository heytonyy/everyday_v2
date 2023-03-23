/* 
  PROFILE PAGE: index.jsx
*/
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "state/hooks";
import NavBar from "scenes/navbar";
import MyDayForm from "scenes/widgets/MyDayForm";
import AllDays from "scenes/widgets/AllDays";
import UserCard from "scenes/widgets/UserCard";
import { User } from "state/types";

export default function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState<User>({
    username: "",
    firstName: "",
    lastName: "",
    location: "",
    bio: "",
    picturePath: "",
    friends: [],
  });
  const token = useAppSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <NavBar />
      {/* MAIN CONTENT */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/* LEFT - USER PROFILE & FRIENDS LIST */}
        <Box flexBasis={isNonMobileScreens ? "40%" : undefined}>
          <UserCard userId={userId!} />
          <Box margin="2rem 0" />
        </Box>
        {/* CENTER - DAYS */}
        <Box
          flexBasis={isNonMobileScreens ? "55%" : undefined}
          marginTop={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyDayForm picturePath={user.picturePath} />
          <Box margin="2rem 0" />
          <AllDays userId={userId!} isProfile />
        </Box>
      </Box>
    </Box>
  );
}
