import "./App.css";
import { useMemo } from "react";
import * as anchor from "@project-serum/anchor";
import Home from "./Home";
import styled from "styled-components";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import Logo from "../src/img/logo.webp";
import Discord from "../src/img/discord.webp";
import Twitter from "../src/img/twitter.webp";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!
    );

    return candyMachineId;
  } catch (e) {
    console.log("Failed to construct CandyMachineId", e);
    return undefined;
  }
};
const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  & h1 {
    color: #fafafa;
    font-size: 2.4rem;
    font-style: italic;
    font-weight: 900;
    text-align: center;
    transform: translateX(-0.5rem);

    text-transform: uppercase;
    letter-spacing: 0.8rem;
  }

  & h1 span {
    color: rgb(253, 98, 98);
  }
  & .social-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateX(-6.9rem);
    cursor: pointer;
  }

  & .social-wrapper .social-link a {
    text-decoration: none;
    display: inline-block;
    height: 100%;
    width: 100%;
    cursor: pointer;
    margin: 0.8rem;
  }
`;
const candyMachineId = getCandyMachineId();
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl("devnet")
);

const txTimeoutInMilliseconds = 30000;

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <div className="image-wrapper">
          <img src={Logo} alt="main-logo" />
        </div>
        <h1>
          Pre<span>sale</span>
        </h1>
        <div className="social-wrapper">
          <div className="social-link discord">
            <a href="https://discord.com/invite/8cVPaPb4qD" target="_blank">
              <img src={Discord} alt="Discord logo" />
            </a>
          </div>
          <div className="social-link twitter">
            <a href="https://twitter.com/PoorPandasNFT" target="_blank">
              <img src={Twitter} alt="Twitter logo" />
            </a>
          </div>
        </div>
      </Header>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Home
              candyMachineId={candyMachineId}
              connection={connection}
              txTimeout={txTimeoutInMilliseconds}
              rpcHost={rpcHost}
            />
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default App;
