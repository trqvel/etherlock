import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Home, Nav } from '../sections';

const Page = () => (
  <div className="bg-mega-purple overflow-hidden">
    <Nav />
    <ThirdwebProvider>
      <Home />
    </ThirdwebProvider>
  </div>
);

export default Page;
