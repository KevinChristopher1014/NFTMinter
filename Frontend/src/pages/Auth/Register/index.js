import React from 'react';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { connect } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RegisterUser } from '../../../redux/actions/auth';
import { useNavigate } from 'react-router';
import Web3Context from '../../../store/web3-context';

const theme = createTheme();

function Register(props) {
  const history = useNavigate();

  const web3Ctx = useContext(Web3Context);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const user = {
      email: data.get('email'),
      wallet_address: data.get('wallet_address')
    };
    props.RegisterUser(user, history);
  };

  const handleLogin = () => {
    history('/login');
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="wallet_address"
              label="Wallet Address"
              id="wallet_address"
              defaultValue={web3Ctx.account}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Register
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={(e) => handleLogin()}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user_id: state.auth.user_id,
  access_token: state.auth.access_token,
  userdata: state.auth.userdata,
  error: state.auth.error,
});

const mapDispatchToProps = {
  RegisterUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);