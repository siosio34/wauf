import { configureChains, createConfig, WagmiConfig } from "wagmi";

import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { gnosis, auroraTestnet } from "viem/chains";

const chains = [gnosis, auroraTestnet];

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    UNSTABLE_shimOnConnectSelectAccount: true,
    shimDisconnect: true,
  },
});

const { publicClient } = configureChains(chains, [publicProvider()]);

const config = createConfig({
  autoConnect: false,
  connectors: [metaMaskConnector],
  publicClient,
});

export default function WagmiProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  const { children } = props;
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
