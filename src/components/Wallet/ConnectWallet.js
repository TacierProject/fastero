import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "@thirdweb/react";
import { darkTheme } from "@thirdweb/react";
import { createWallet } from "@thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "91e2d2d514dd899aa83f2f028742a060",
});

const wallets = [
  createWallet("walletConnect"),
  createWallet("io.metamask"),
  createWallet("io.zerion.wallet"),
  createWallet("com.okex.wallet"),
];

function Example() {
  return (
    <ConnectButton
      client={client}
      connectModal={{
        showThirdwebBranding: false,
        size: "compact",
        title: "Sign In",
      }}
      theme={darkTheme({
        colors: { modalBg: "hsl(270, 88%, 41%)" },
      })}
      wallets={wallets}
    />
  );
}
