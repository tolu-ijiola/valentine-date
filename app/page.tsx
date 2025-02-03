"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web"; // Update import
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: "/2.svg",
    title: "Hi Prettyyyyyyyyy!!!",
    description: "",
  },
  {
    image: "/1.svg",
    title: "",
    description: "We've shared so many beautiful moments together.",
  },
  {
    image: "/2.svg",
    title: "",
    description: "Every day with you feels like a special celebration.",
  },
  {
    image: "/3.svg",
    title: "",
    description:
      "I'm so grateful for you, and I love how we make life feel so much better together.",
  },
  {
    image: "/drumroll.json",
    title: "The Big Question",
    description: "",
  },
];

interface Ribbon {
  id: number;
  left: string;
  delay: string;
  color: string;
}

interface Explosion {
  id: number;
  left: string;
  top: string;
}

export default function Home() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1));
  };

  const loveContainer = useRef<HTMLDivElement>(null);
  const drumContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: any = null;

    if (loveContainer.current) {
      anim = lottie.loadAnimation({
        container: loveContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/anim/love.json",
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });
    }

    // Cleanup function
    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, [current]); // Re-run when step changes

  const [status, setStatus] = useState<'initial' | 'yes' | 'no'>('initial');
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [ribbons, setRibbons] = useState<Ribbon[]>([]);

  const createRibbons = (): Ribbon[] => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      color: ['#FF6B6B', '#4ECDC4', '#FF9FF3', '#A55EEA'][Math.floor(Math.random() * 4)]
    }));
  };
  const createExplosions = () => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 80}%`
    }));
  };

  const handleYes = () => {
    setStatus("yes");
    setRibbons(createRibbons());

  };

  const handleNo = () => {
    setStatus('no');
    setExplosions(createExplosions());
  };

  useEffect(() => {
    let anim: any = null;

    if (drumContainer.current) {
      anim = lottie.loadAnimation({
        container: drumContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/anim/drumroll.json",
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });
    }

    // Cleanup function
    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, [current]); // Re-run when step changes

  const explosionVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: [0, 2, 1.5],
      opacity: [0, 1, 0],
      transition: { 
        duration: 0.5,
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatType: 'loop'
      }
    }
  };

  const shakeVariants = {
    initial: { x: 0 },
    animate: {
      x: [-10, 10, -5, 5, 0],
      transition: {
        duration: 0.3,
        repeat: 300000
      }
    }
  };

  const ribbonVariants = {
    initial: { y: -100, opacity: 1 },
    animate: (i: number) => ({
      y: typeof window !== 'undefined' ? window.innerHeight : 1000,
      rotate: Math.random() * 360,
      transition: {
        duration: 3,
        delay: i * 0.1,
        repeat: Infinity,
        repeatType: 'loop'
      }
    })
  };

  return (
    <motion.div 
      variants={status === 'no' ? shakeVariants : {}}
      animate={status === 'no' ? 'animate' : 'initial'}
    >
    <div className="flex flex-col max-h-screen items-center justify-center h-screen bg-pink-50 p-4 overflow-hidden">
    {ribbons.map((ribbon, i) => (
        <motion.div 
          key={ribbon.id}
          className="absolute w-2 h-20 top-0"
          style={{ 
            left: ribbon.left, 
            backgroundColor: ribbon.color 
          }}
          variants={ribbonVariants}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}
        {status === 'no' && explosions.map((explosion) => (
        <motion.div 
          key={explosion.id}
          className="absolute text-8xl"
          style={{
            left: explosion.left,
            top: explosion.top
          }}
          variants={explosionVariants}
          initial="hidden"
          animate="visible"
        >
          💥
        </motion.div>
      ))}
      {current <= 4 && (
        <div className=" w-full max-w-sm space-y-2 bg-white mx-auto shadow-md rounded-md p-8">
          {current === 0 && (
            <div
              ref={loveContainer}
              className="mx-auto z-50"
              style={{
                width: "200px",
                height: "200px",
                overflow: "hidden", // Add this
              }}
            />
          )}
          {current === 4 && (
            <div
              ref={drumContainer}
              className="mx-auto z-50"
              style={{
                width: "200px",
                height: "200px",
                overflow: "hidden", // Add this
              }}
            />
          )}
          {current !== 0 && current !== 4 && (
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              objectFit="contain"
              quality={100}
              width={1000}
              height={1000}
              priority
              className="z-0 object-contain h-32"
            />
          )}
          <div className=" py-4">
            <h2 className=" text-3xl text-center font-semibold">
              {slides[current].title}
            </h2>
            <p className="text-gray-600 mt-2 text-center">
              {slides[current].description}
            </p>
          </div>
          <button
            onClick={nextSlide}
            className=" mx-auto w-[180px] p-4 mt-8 block text-xs bg-pink-400 text-white rounded-lg rounded-b-2xl "
          >
            Continue
          </button>
        </div>
      )}
      {current === 5 && status === "initial" && (
        <div className=" w-full max-w-sm space-y-2 bg-white mx-auto shadow-md rounded-md p-8">
          <h2 className=" text-2xl py-8 text-center font-semibold">
            Would you be my valentine?
          </h2>
          <button
          onClick={handleYes}
            className=" mx-auto w-[180px] p-4 mt-8 block text-xs bg-pink-400 text-white rounded-lg rounded-b-2xl "
          >
            Yes💖
          </button>
          <button
            onClick={handleNo}
            className=" mx-auto block text-xs p-2 bg-red-400 text-white rounded-lg rounded-b-2xl "
          >
            No💔
          </button>
        </div>
      )}
      {current === 5 && status === "yes" && (
        <div className=" w-full max-w-sm space-y-2 bg-white mx-auto shadow-md rounded-md p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-pink-900 text-center text-2xl font-bold"
          >
          Yay! You've made me the happiest person on earth! 💖😉🍭
          </motion.div>
        </div>
      )}
      {current === 5 && status === "no" && (
        <div className=" w-full max-w-sm space-y-2 bg-white mx-auto shadow-md rounded-md p-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-red-600 text-2xl font-bold"
          >HOW DARE YOU REJECT MY LOVE! 💔🔥😠
          </motion.div>
        </div>
      )}
    </div>
    </motion.div>
  );
}
