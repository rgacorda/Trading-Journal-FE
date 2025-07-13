// import Link from "next/link";

import { Footer } from "react-day-picker";
import CTA from "./_components/CTA";
import Features from "./_components/Features";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Pricing from "./_components/Pricing";
import Statistics from "./_components/Statistics";
import Testimonials from "./_components/Testimonials";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         {/* <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         /> */}
//         <h1 className="font-bold text-5xl sm:text-6xl text-center sm:text-left">
//           Trade2Learn
//         </h1>        
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Execute.
//           </li>
//           <li className="mb-2 tracking-[-.01em]">
//             Journal.
//           </li>
//           <li className="mb-2 tracking-[-.01em]">
//             Learn.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <Link
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
//             href="/login"
//           >
//             Log in
//           </Link>
//           <Link
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
//             href="/register"
//           >
//             Register
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }



function App() {
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

export default App;