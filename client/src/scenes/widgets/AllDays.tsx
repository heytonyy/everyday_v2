import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setDays } from "state";
import Day from "./Day";
import { AllDaysProps } from "state/types";
import { v4 } from "uuid";

const AllDays = ({ userId, isProfile = false }: AllDaysProps) => {
  const dispatch = useAppDispatch();
  const days = useAppSelector((state) => state.days);
  const token = useAppSelector((state) => state.token);

  const getFeed = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/days/feed`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setDays({ days: data }));
  };

  const getUserDays = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/days/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setDays({ days: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserDays();
    } else {
      getFeed();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {days.map(
        ({
          _id,
          userId,
          username,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <Day
            key={v4()}
            _id={_id}
            userId={userId}
            username={username}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default AllDays;
