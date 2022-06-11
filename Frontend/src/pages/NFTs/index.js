import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Menubar from '../../components/Layouts/Menubar';
import { GetAllNFTs, SetIsFetching } from '../../redux/actions/nftmint';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import { BACKEND_API_URL } from '../../static/constants';
import { styled } from "@mui/material/styles";

const mdTheme = createTheme();

const CustomDisableInput = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "#000",
  }
}));

function NFTs(props) {

  const { GetAllNFTs, nfts, isFetching, SetIsFetching } = props;

  useEffect(() => {
    SetIsFetching();
    GetAllNFTs();
  }, []);

  const [open, setOpen] = useState(false);
  const [nftIndex, setNFTIndex] = useState(-1);

  const handleOpen = (id) =>  {
    setOpen(true);
    setNFTIndex(id);
  }
  const handleClose = () => setOpen(false);

  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Menubar 
          CurrentPage = 'NFTs'
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
            <Grid container spacing={3}>
              {!isFetching && nfts ? <>
                {
                  nfts.map((nft, index) => {
                    return (
                      <Grid item xs={6} md={4} lg={3}>
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                            minWidth: 240
                          }}
                        >
                          <Box 
                            component={'img'} 
                            src={nft.type == 'image' 
                                  ? `https://ipfs.infura.io/ipfs/${nft.tokenURI}` 
                                  : `${BACKEND_API_URL}files/Text.png`}
                            onClick={(e) => handleOpen(index)}
                            width={200}
                            height={200}
                          />
                           
                        </Paper>
                      </Grid>
                    );
                  })
                }
                  
                </>
                : <Box sx={{ p: 3 }}>
                  <CircularProgress />
                </Box>
              }
              
            </Grid>
            {
              nftIndex !== -1 ?
                <Dialog
                  open={open}
                  onClose={handleClose}
                >
                  <DialogTitle>
                    NFT Detail
                  </DialogTitle>
                  <Divider />
                  <DialogContent
                    sx= {{
                      width: 600,
                      textAlign: 'center'
                    }}>
                    { nfts && nftIndex !== -1 && nfts[nftIndex].type == 'image' 
                      ? <Box 
                          component={'img'} 
                          src={`https://ipfs.infura.io/ipfs/${nfts[nftIndex].tokenURI}`}
                          width={200}
                          height={200}
                        />
                      : <CustomDisableInput
                          id="outlined-multiline-static"
                          label="Content"
                          fullWidth
                          multiline
                          disabled
                          rows={10}
                          defaultValue={nfts[nftIndex].content}
                        />
                    }
                    <Box sx={{mt : 1}}>
                      {`Owner : ${nfts[nftIndex].owner.substr(0,7)}...${nfts[nftIndex].owner.substr(nfts[nftIndex].owner.length - 7)}`}
                    </Box>
                  </DialogContent>
                </Dialog>
                : <></>
            }
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const mapStateToProps = state => ({
  nfts: state.nftmint.nfts,
  isFetching: state.nftmint.isFetching
});

const mapDispatchToProps = {
  GetAllNFTs,
  SetIsFetching
};

export default connect(mapStateToProps, mapDispatchToProps)(NFTs);