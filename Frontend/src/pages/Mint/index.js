import * as React from 'react';
import { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Menubar from '../../components/Layouts/Menubar';
import { Input } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { NFTMint, SetIsMinting, FormatMessage } from '../../redux/actions/nftmint';
import Web3Context from '../../store/web3-context';
import swal from 'sweetalert' ;

const mdTheme = createTheme();

function Mint(props) {

  const { NFTMint, isMinting, SetIsMinting, FormatMessage, message } = props;

  const web3Ctx = useContext(Web3Context);

  useEffect(() => {
    FormatMessage();
  }, []);

  useEffect(() => {
    if(message === "success") {
      swal({
        title: "Success",
        icon: "success",
      }) ;
    } else if(message === "error") {
      swal({
        title: "Warning",
        icon: "warning",
      }) ;
    }
    FormatMessage();
  }, [message])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    SetIsMinting();
    NFTMint(data, web3Ctx.account);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Menubar 
          CurrentPage = 'Mint'
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    pl: 5,
                    pr: 5,
                    pt: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    textAlign: 'center'
                  }}
                >
                  <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                    {!isMinting ?
                      <>
                        <Input name="file" id="file" type="file" sx={{ width: '100%'}}></Input>
                        <Button type="submit" variant="contained" sx={{ mt: 5 }}>
                          Mint
                        </Button>
                      </>
                      : <CircularProgress />
                    }
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
const mapStateToProps = state => ({
  isMinting: state.nftmint.isMinting,
  message: state.nftmint.message
});

const mapDispatchToProps = {
  NFTMint,
  SetIsMinting,
  FormatMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Mint);