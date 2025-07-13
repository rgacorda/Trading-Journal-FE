import CTA from "./_components/CTA";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Pricing from "./_components/Pricing";
import Statistics from "./_components/Statistics";
import Testimonials from "./_components/Testimonials";


function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Statistics />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;