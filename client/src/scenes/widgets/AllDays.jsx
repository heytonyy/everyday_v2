import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDays } from 'state'
import Day from './Day'

const AllDays = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch()
  const days = useSelector(state => state.days)
  const token = useSelector(state => state.token)

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