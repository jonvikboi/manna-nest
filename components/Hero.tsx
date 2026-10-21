"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import CurvedLoop from "@/components/CurvedLoop";
import Image from "next/image";

export default function Hero() {
    const { scrollY } = useScroll();

    // Subtle parallax for the main content
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -50]);
    const opacity = useTransform(scrollY, [300, 500], [1, 0]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-cream flex items-center">
            {/* Background Texture / Negative Space */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(194, 164, 120, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(91, 105, 85, 0.12) 0%, transparent 50%)' }} />

            {/* Decorative Spinning Plate */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9, rotate: 360 }}
                transition={{
                    opacity: { duration: 1.5, ease: "easeOut" },
                    rotate: { duration: 100, repeat: Infinity, ease: "linear" }
                }}
                className="absolute -top-[5%] -right-[5%] w-[35vh] h-[35vh] sm:w-[45vh] sm:h-[45vh] lg:w-[550px] lg:h-[550px] pointer-events-none z-0 mix-blend-multiply"
                style={{ y: y2 }}
            >
                <Image
                    src="/images/plate.png"
                    alt="Decorative plate"
                    fill
                    className="object-contain"
                    priority
                />
            </motion.div>

            <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 relative z-10 grid grid-cols-12 gap-6 h-full items-center -mt-16 sm:-mt-24 md:-mt-32">

                {/* Left Column - Massive Serif Typography */}
                <motion.div
                    style={{ y: y1, opacity }}
                    className="col-span-12 md:col-span-8 flex flex-col justify-center h-full relative"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Logo Mark - Inline layout to prevent vertical crowding */}
                        <div className="flex items-center gap-4 mb-6 mt-4">
                            <div className="relative w-16 h-16 md:w-20 md:h-20">
                                <Image
                                    src="/images/manna.png"
                                    alt="Manna Nest Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <h1 className="text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[14rem] font-serif text-charcoal leading-[0.85] tracking-tighter ml-[-0.5rem]">
                            MANNA NEST
                        </h1>
                        <p className="mt-8 text-lg sm:text-xl md:text-2xl font-light text-charcoal/60 tracking-wider max-w-xl">
                            Home: filled with love, unity, and happy bites.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Right Column - Preserves exact layout structure */}
                <motion.div
                    style={{ y: y2, opacity }}
                    className="hidden md:flex col-span-4 h-full flex-col justify-end pb-32 items-end pointer-events-none"
                />
            </div>

            {/* Bottom Ticker - Very Subtle */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute bottom-6 left-0 w-full opacity-35 mix-blend-multiply z-20"
            >
                <div
                    className="h-32 md:h-24 w-full flex items-center overflow-hidden pointer-events-none"
                    style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
                >
                    <CurvedLoop
                        marqueeText="Honest Ingredients · Crafted by Hand · Nourishing Happy Bites · From Our Kitchen to Your Soul · "
                        speed={1}
                        curveAmount={0}
                        interactive={false}
                        className="fill-charcoal"
                    />
                </div>
            </motion.div>
        </section>
    );
}
