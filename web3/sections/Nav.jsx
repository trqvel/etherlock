'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Nav = () => (
  <section className="container mx-auto">
    <motion.div
      className="flex justify-end space-x-10 w-full pr-10"
    >
      <Link href="/">
        <motion.button
          className="w-24 h-10 left-[545px] top-[40px] absolute text-center bg-blur hover:bg-cool-dark text-purple-300 text-xl font-extrabold rounded-lg leading-none"
        >
          Home
        </motion.button>
      </Link>
      <Link href="/">
        <motion.button
          className="w-40 h-10 left-[640px] top-[40px] absolute text-center bg-blur hover:bg-cool-dark text-purple-300 text-xl font-extrabold rounded-lg leading-none"
        >
          Token Fabric
        </motion.button>
      </Link>
      <Link href="/">
        <motion.button
          className="w-36 h-10 left-[800px] top-[40px] absolute text-center bg-blur hover:bg-cool-dark text-purple-300 text-xl font-extrabold rounded-lg leading-none"
        >
          NFT Fabric
        </motion.button>
      </Link>
      <Link href="/">
        <motion.button
          className="w-32 h-10 left-[943px] top-[40px] absolute text-center bg-blur hover:bg-cool-dark text-purple-300 text-xl font-extrabold rounded-lg leading-none"
        >
          Mint NFT
        </motion.button>
      </Link>
    </motion.div>
  </section>
);

export default Nav;
