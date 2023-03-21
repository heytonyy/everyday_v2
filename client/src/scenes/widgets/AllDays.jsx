import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { setDays } from 'state/state'
import Day from './Day'

const AllDays = ({ userId, isProfile = false }) => {
  const dispatch = useAppDispatch()
  const days = useAppSelector(state => state.days)
  const token = useAppSelector(state => state.token)

  const getFeed = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/days/feed`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setDays({ days: data }));
  }

  const getUserDays = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/days/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setDays({ days: data }));
  }

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
            key={_id}
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
  )
}

export default AllDays