import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Dropzone from 'react-dropzone';
import AvatarImage from '../../components/AvatarImage';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { setDays } from 'state';

const MyDayForm = ({ picturePath }) => {
  const dispatch = useAppDispatch();
  const { _id } = useAppSelector(state => state.user);
  const token = useAppSelector(state => state.token);
  const [day, setDay] = useState('');
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const { palette } = useTheme();
  const mediumMain = palette.neutral.main;
  const medium = palette.neutral.medium;

  const handleDay = async () => {
    // construct form data for day model and make api call
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('description', day);
    if (image) {
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/days/create`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    // returns updated days feeds, updates state, and resets form
    const days = await response.json();
    dispatch(setDays({ days }));
    setImage(null);
    setIsImage(false);
    setDay('');
  };

  return (
    <WidgetWrapper>

      {/* PICTURE AND TEXT FORM */}
      <FlexBetween gap="1.5rem">
        <AvatarImage image={picturePath} />
        <InputBase
          id="day-field"
          placeholder="What did you do today?"
          onChange={e => setDay(e.target.value)}
          value={day}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }} />
      </FlexBetween>

      {/* IMAGE DROPZONE FORM / TOGGLE */}
      {isImage && (
        <Box
          borderRadius="5px"
          border={`1px solid ${medium}`}
          padding="1rem"
          mt="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  width="100%"
                  p="1rem"
                  sx={{ "&: hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add picture here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!day}
          onClick={handleDay}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default MyDayForm