import { Footer, Navbar } from '../components';
import { About, Explore, Feedback, Hero } from '../sections';

const Page = () => (
  <div className="bg-cool-purple overflow-hidden">
    <Navbar />
    <div className="relative">
      <Hero />
      <div className="gradient-03 z-0" />
    </div>
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
      <Explore />
    </div>
    <div className="relative">
      <div className="gradient-04 z-0" />
      <Feedback />
    </div>
    <Footer />
  </div>
);

export default Page;
