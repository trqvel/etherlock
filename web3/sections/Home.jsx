'use client';

import { motion } from 'framer-motion';
import { ConnectWallet } from '../components/ConnectWallet';

const Hero = () => (
  <section className="container mx-auto">
    <motion.div className="flex justify-start w-[30%] h-[30%]">
      <img
        alt="cosmonaut"
        src="/cosmo.png"
      />
    </motion.div>
    <motion.div
      className="flex justify-end space-x-10 w-full pr-10"
    >
      <motion.button
        className="w-64 h-10 left-[1100px] top-[40px] absolute text-center bg-cool-orange hover:bg-deep-orange text-white text-2xl font-extrabold rounded-lg leading-none"
      >
        <ConnectWallet />
      </motion.button>
    </motion.div>
    <img src="/discord.svg" alt="discord" type="button" className="rounded-full hover:bg-cool-purple" />
    <img src="/telegram.svg" alt="telegram" type="button" className="rounded-full hover:bg-cool-blue" />
    <div className="fixed right-6 inset-y-64">
      <img className="w-28 h-auto" src="/taiko.svg" alt="taiko" />
    </div>
    <div className="fixed right-40 inset-y-72">
      <img className="w-24 h-auto" src="/starknet.svg" alt="starknet" />
    </div>
    <div className="fixed right-80 bottom-52">
      <img className="w-28 h-auto" src="/zksync.svg" alt="zksync" />
    </div>
    <div className="fixed right-64 bottom-72">
      <img className="w-28 h-auto" src="/zkevm.svg" alt="zkevm" />
    </div>
    <div className="fixed right-96 bottom-0">
      <img className="w-24 h-auto" src="/base.svg" alt="base" />
    </div>
    <div className="fixed right-96 bottom-32">
      <img className="w-20 h-auto" src="/linea.svg" alt="linea" />
    </div>
    <div className="fixed right-0 bottom-0">
      <img className="w-96 h-auto" src="/sphere.svg" alt="sphere" />
    </div>
  </section>
);

export default Hero;
