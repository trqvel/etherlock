'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { navVariants } from '../utils/motion';
import { ConnectWallet } from './ConnectWallet';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className=""
  >
    <div className="">
      <motion.div
        className="flex justify-end space-x-10 w-full pr-10"
      >
        <Link href="/">
          <motion.button
            className="bg-blur hover:bg-mega-purple text-purple-300 font-extrabold py-2 px-4 rounded-lg"
          >
            Home
          </motion.button>
        </Link>
        <Link href="/">
          <motion.button
            className="bg-blur hover:bg-mega-purple text-purple-300 font-extrabold py-2 px-4 rounded-lg"
          >
            Token Fabric
          </motion.button>
        </Link>
        <Link href="/">
          <motion.button
            className="bg-blur hover:bg-mega-purple text-purple-300 font-extrabold py-2 px-4 rounded-lg"
          >
            NFT Fabric
          </motion.button>
        </Link>
        <Link href="/">
          <motion.button
            className="bg-blur hover:bg-mega-purple text-purple-300 font-extrabold py-2 px-4 rounded-lg"
          >
            Mint NFT
          </motion.button>
        </Link>
        <motion.button
          className="bg-blur hover:bg-mega-purple text-purple-300 font-extrabold py-2 px-4 rounded-lg"
        >
          <ConnectWallet />
        </motion.button>
      </motion.div>
    </div>
  </motion.nav>
);

export default Navbar;

/* <ThirdwebProvider>
  <Navbar />
</ThirdwebProvider> */
