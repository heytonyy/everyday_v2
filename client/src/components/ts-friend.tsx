// import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
// import { Box, IconButton, Typography, useTheme } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFriends } from 'state';
// import { useNavigate } from 'react-router-dom';
// import FlexBetween from 'components/FlexBetween';
// import AvatarImage from 'components/AvatarImage';
// import { StateType } from '../state/types';

// interface FriendProps {
//   friendId: string;
//   name: string;
//   subtitle: string;
//   userPicturePath: string;
// }

// const Friend = ({ friendId, name, subtitle, userPicturePath }: FriendProps) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { _id } = useSelector((state: StateType) => state.user?);
//   const token = useSelector((state: StateType) => state.token);
//   const friends = useSelector((state: StateType) => state.user?.friends);
//   const { palette } = useTheme();
//   const primaryLight = palette.primary.light;
//   const primaryDark = palette.primary.dark;
//   const main = palette.neutral.main;
//   const medium = palette.neutral.medium;

//   const isFriend = friends.find(friend => friend._id === friendId);

//   const handlePatchFriend = async () => {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}/${friendId}`,
//       {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//     const data = await response.json();
//     dispatch(setFriends({ friends: data }));
//   };

//   return (
//     <FlexBetween>
//       <FlexBetween gap="1rem">
//         <AvatarImage image={userPicturePath} size="55px" />
//         <Box
//           onClick={() => {
//             navigate(`/profile/${friendId}`);
//             // bug: need to force refresh on specific case.
//             // case: on friends profile, click on friend, then click on friend again
//             navigate(0);
//           }}
//         >
//           <Typography
//             color={main}
//             variant="h5"
//             fontWeight="500"
//             sx={{
//               "&:hover": {
//                 color: primaryLight,
//                 cursor: 'pointer'
//               }
//             }}
//           >
//             {name}
//           </Typography>
//           <Typography color={medium} fontSize="0.75rem">
//             {subtitle}
//           </Typography>
//         </Box>
//       </FlexBetween>
//       <IconButton
//         onClick={() => handlePatchFriend()}
//         sx={{ backgroundColor: primaryLight, padding: "0.6rem" }}
//       >
//         {isFriend ? (
//           <PersonRemoveOutlined sx={{ color: primaryDark }} />
//         ) : (
//           <PersonAddOutlined sx={{ color: primaryDark }} />
//         )}
//       </IconButton>
//     </FlexBetween>
//   )
// }

// export default Friend

export {};
