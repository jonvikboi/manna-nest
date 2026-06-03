"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { ChefHat, Award, Star, Users } from "lucide-react";
import { springConfig } from "@/lib/animation-config";

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    // Subtle magnetic effect for image
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Subtle magnetic pull
        const xValue = ((mouseX - centerX) / centerX) * 25;
        const yValue = ((mouseY - centerY) / centerY) * 25;
        setX(xValue);
        setY(yValue);
    };

    const handleMouseLeave = () => {
        setX(0);
        setY(0);
    };

    const stats = [
        { icon: ChefHat, value: "25+", label: "Years of Family Meals" },
        { icon: Award, value: "100%", label: "Made From Scratch" },
        { icon: Star, value: "50+", label: "Perfected Family Recipes" },
        { icon: Users, value: "Daily", label: "Nourished with Care" }
    ];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="py-16 sm:py-20 md:py-32 px-4 bg-gradient-to-b from-cream via-sage/5 to-cream overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={springConfig}
                    className="mb-16 md:mb-24 text-left border-b border-charcoal/10 pb-8 relative"
                >
                    <div className="absolute right-0 top-0 w-8 h-8 flex-col justify-between hidden md:flex">
                        <div className="w-full h-px bg-gold/50" />
                        <div className="w-full h-px border-t border-dashed border-gold/30" />
                    </div>

                    <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif font-medium text-charcoal mb-6 tracking-tight">
                        The Sanctuary
                    </h2>

                    <div className="flex items-center gap-6">
                        <div className="w-12 h-px bg-gold" />
                        <p className="text-xs tracking-[0.2em] text-charcoal/50 uppercase font-serif">
                            Geena Binu Jose
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Chef Image with Magnetic Effect */}
                    <motion.div style={{ y: imageY }} className="relative z-10 w-full h-full">
                        <motion.div
                            ref={imageRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            animate={{ x, y }}
                            transition={springConfig}
                            className="relative group w-full h-full"
                        >
                            <div className="relative h-[500px] sm:h-[600px] md:h-[700px] rounded-none overflow-hidden border border-charcoal/10 group-hover:border-charcoal/30 transition-colors duration-500">
                                <Image
                                    src="/images/chef-geena.jpg"
                                    alt="Geena Binu Jose"
                                    fill
                                    className="object-cover transition-transform duration-700"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-80" />

                                {/* Sharp floating name badge */}
                                <motion.div
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    whileInView={{ opacity: 1, scaleY: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ ...springConfig, delay: 0.3 }}
                                    className="absolute bottom-6 left-6 right-6 bg-cream border border-charcoal/10 p-6 md:p-8 transform origin-bottom"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold" />
                                    <h3 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-2">Geena Binu Jose</h3>
                                    <p className="text-xs tracking-widest text-charcoal/50 uppercase font-serif">Homemaker & Passionate Cook</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        style={{ opacity: contentOpacity }}
                        className="space-y-6 md:space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...springConfig, delay: 0.2 }}
                        >
                            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed mb-4">
                                Geena Binu Jose is a homemaker whose true joy lies in cooking wholesome, delicious meals for her loved ones. For over 25 years, her home kitchen has been a gathering place where simple, fresh ingredients are turned into comforting daily feasts.
                            </p>
                            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed mb-4">
                                What began as simple daily cooking for her household has grown into a life-long passion for perfecting home-cooked flavors. From traditional regional comfort food to warm, freshly baked loaves, her kitchen provides honest food made from scratch, filled with warmth and care.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-px bg-charcoal/10 mt-12 border border-charcoal/10">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                                    whileHover={{ backgroundColor: "rgba(253, 252, 240, 1)" }}
                                    className="bg-cream p-6 sm:p-8 flex flex-col justify-center transition-colors relative group"
                                >
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/0 group-hover:border-gold/100 transition-colors m-2" />
                                    <stat.icon className="w-5 h-5 text-gold mb-4 opacity-50 stroke-1" />
                                    <div className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-charcoal/50 tracking-widest uppercase font-sans">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
