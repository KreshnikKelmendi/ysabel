"use client";
import Image from "next/image";
import Header from "../Header/Header";

const Main = () => {
  return (
    <div className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-[#1D3428]">
      <Image
        src="/assets/ysabel-1.png"
        alt="Main background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#1D3428]/50" />
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 text-white text-center">
        <div className="flex flex-col items-center justify-center gap-6 pt-32 md:pt-40">
          <p className="text-[4vh] lg:text-[6vh] font-rhiffiral text-center leading-tight tracking-[1px] uppercase mt-[-50px] lg:mt-[-100px]">
           it is a temple of taste <br/>and atmosphere.
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Main;


