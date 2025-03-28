"use client";
import React from "react";
// import { useRef } from 'react';
import { TextHoverEffect } from "@/components/UI/text-hover-effect";
import { SparklesCore } from "@/components/UI/sparkles";
import HomeGeometric from "@/components/kokonutui/hero-geometric";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/UI/lamp";
import { Activity, CircleSmall, Cog, Fingerprint, PanelsTopLeft, Smartphone } from "lucide-react";
import { GlowingEffect } from "@/components/UI/glowing-effect";
import FlowingMenu from '@/components/UI/FlowingMenu'
import { useSmoothScroll } from '@/components/UI/SmoothScroll';
import { StickyScroll } from "@/components/UI/sticky-scroll-reveal";
import Image from "next/image";
import ScrollVelocity from '@/components/UI/ScrollVelocity';

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];

const demoItems = [
  { link: '#', text: "Tight Budget?", image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Lack Professionalism?', image: 'https://picsum.photos/600/400?random=4'},
  { link: '#', text: 'Need Security?', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'Get Found, Get Customers', image: 'https://picsum.photos/600/400?random=2' },
];

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-white dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const Home: React.FC = () => {
  useSmoothScroll();
  
  return (
    <div className="scroll-smooth">
      <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <HomeGeometric 
            badge="Zonicks"
            title1=""
            title2=""
          />
        </div>
      </div>
      {/* Rest of the Page Content */}
      <div className="items-center mx-auto flex flex-col relative z-15 overflow-hidden h-auto">
        <div className="flex items-center w-[80%] md:w-[50%] pt-20">
          <TextHoverEffect text="Your Best" />
        </div>
        <h1 className="md:text-5xl text-4xl lg:text-7xl font-bold text-center text-white relative" >
          IT PARTNER
        </h1>
        <div className="w-[40rem] h-60 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
  
          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.1}
            maxSize={0.5}
            particleDensity={250}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
  
          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="pb-4 pt-10 mt-10 text-white bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-4xl font-medium tracking-tight md:text-7xl"
      >
        OUR <br /> OFFERINGS
      </motion.h1>

      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 md:pl-20 md:pr-20 pl-10 pr-10 p-4 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Smartphone className="h-8 w-8 text-white dark:text-neutral-400" />}
          title="App Development"
          description="We create engaging and user-friendly mobile applications for iOS and Android."
        />
       
        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={<PanelsTopLeft className="h-8 w-8 text-white dark:text-neutral-400" />}
          title="Website Development"
          description="We craft custom websites tailored to your unique brand and business goals."
        />
       
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Activity className="h-8 w-8 text-white dark:text-neutral-400" />}
          title="Digital Marketing"
          description={
          <>
          We help you reach your target audience and grow your business online.
          <br />
          <br />
          <br />
          {<CircleSmall className="inline-block h-4 w-4 text-white dark:text-neutral-400" />} SEO
          <br />
          {<CircleSmall className="inline-block h-4 w-4 text-white dark:text-neutral-400" />} Social Media Managing.....
          <br />
          </>
          }
        />
       
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Fingerprint className="h-8 w-8 text-white dark:text-neutral-400" />}
          title="Cybersecurity"
          description="We develop and implement comprehensive strategies to mitigate cyber threats, minimizing your risk and maximizing your protection."
        />
       
        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={<Cog className="h-8 w-8 text-white dark:text-neutral-400" />}
          title="Troubleshoting"
          description="We provide expert troubleshooting services to quickly identify and resolve any issues that may arise."
        />
      </ul>  

      <div className="pt-8 pb-8" style={{height: '600px', position: 'relative' }}>
        <FlowingMenu items={demoItems} />
      </div>

      <div className="space-x-10 rounded-md p-10 justify-center items-center flex flex-col">
        <StickyScroll content={content} />
      </div>

      <div className="justify-center items-center flex flex-col">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="pb-12 bg-gradient-to-br from-slate-300 to-slate-500 py-0 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
            TECHNOLOGIES
          </motion.h1>
          <ScrollVelocity
            texts={[' Reactjs , Nextjs , Javascript,  , ',
                    ' Wordpress , Laravel , Drupal,  , ',
                    ' Reactnative , Php , Python , Django , Nextjs ,  , ']} 
            
            velocity={30} 
            className="custom-scroll-text"
          />
        </LampContainer>
      </div>
    </div>
  );
}

export default Home;