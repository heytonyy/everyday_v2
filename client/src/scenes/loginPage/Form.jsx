import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { setLogin } from 'state';
import { useAppDispatch } from 'state/hooks';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween';

// FORM VALIDATION SCHEMAS
const registerSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  location: Yup.string().required('Location is required'),
  bio: Yup.string().required('Bio is required'),
  picture: Yup.string().required('Picture is required'),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

// INITIAL VALUES
const initialValuesRegister = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  bio: '',
  picture: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

export default function Form() {
  const [pageType, setPageType] = useState('login');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const isRegister = pageType === 'register';
  const isLogin = pageType === 'login';

  const { palette } = useTheme();
  const main = palette.primary.main;
  const light = palette.primary.light;
  const medium = palette.neutral.medium;

  const register = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      formData.append('picturePath', values.picture.name);
      const savedUserResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();
      if (savedUser) {
        setPageType('login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      );
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({ values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bio}
                  name="bio"
                  error={Boolean(touched.bio) && Boolean(errors.bio)}
                  helperText={touched.bio && errors.bio}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${main}`}
                        padding="1rem"
                        sx={{ "&: hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add picture here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <Box>
            {/* SUBMIT BUTTON */}
            <Button
              fullWidth
              type="submit"
              sx={{
                margin: "2rem 0",
                padding: "1rem",
                backgroundColor: main,
                color: palette.background.alt,
                "&:hover": { color: main },
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>

            {/* SWAP BETWEEN FORM TYPES */}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: main,
                "&:hover": { cursor: "pointer", color: light },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here"
                : "Already have an account? Login here"}
            </Typography>

          </Box>
        </form>
      )}
    </Formik >
  );
};
