
import React, { useContext, useEffect } from 'react';

// Suspense
import { Fragment ,  Suspense , lazy } from 'react' ;

// Theme
import { ThemeProvider , CssBaseline } from '@mui/material';
import theme from './utils/theme' ;

// Global Style
// import GlobalStyles from "./utils/globalstyles";

// Language 
import { LanguageProvider } from "./utils/Language";

// Pace
// import Pace from "./utils/Pace";

// Store
import { Provider } from 'react-redux' ;
import store from './redux';

// Router
import { BrowserRouter , Routes , Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css" ;
import "bootstrap/dist/js/bootstrap.min.js" ;

import web3 from './connection/web3';
import Web3Context from './store/web3-context';

const MainComponent = lazy(() => import('./components/Main')) ;

const App = () => {
  const web3Ctx = useContext(Web3Context);
  
  useEffect(() => {
    // Check if the user has Metamask active
    if(!web3) {
      alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return;
    };
    
    // Function to fetch all the blockchain data
    const loadBlockchainData = async() => {
      // Request accounts acccess if needed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });  
      } catch(error) {
        console.error(error);
      }
      
      // Load account
      const account = await web3Ctx.loadAccount(web3);

      // Load Network ID
      const networkId = await web3Ctx.loadNetworkId(web3);

      // Metamask Event Subscription - Account changed
      window.ethereum.on('accountsChanged', (accounts) => {
        web3Ctx.loadAccount(web3);
      });

      // Metamask Event Subscription - Network changed
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    };
    
    loadBlockchainData();
  }, []);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <GlobalStyles /> */}
            {/* <Pace color={theme.palette.primary.light} /> */}
            <Suspense fallback={<Fragment />} >
              <Routes>
                  <Route path="*" element={<MainComponent />} />
              </Routes>
            </Suspense>
          </ThemeProvider>
        </Provider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
