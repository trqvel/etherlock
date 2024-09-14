'use client';

import { useEffect, useState } from 'react';
import {
  useMetamask,
  useChainId,
  useAddress,
  useDisconnect,
} from '@thirdweb-dev/react';

export const ConnectWallet = () => {
  const [isClient, setIsClient] = useState(false);

  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useChainId();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  if (address) {
    return (
      <div>
        Address: {address}
        <br />
        Chain ID: {network}
        <br />
        <button type="button" onClick={disconnectWallet}>Disconnect</button>
      </div>
    );
  }
  return (
    <div>
      <button type="button" onClick={() => connectWithMetamask()}>Connect wallet</button>
    </div>
  );
};
