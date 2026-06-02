"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { Tag, Truck } from "lucide-react";
import { Recipe } from "@/lib/recipes";
import { springConfig } from "@/lib/animation-config";

interface RecipeCardProps {
    recipe: Recipe;
    onClick: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Subtle magnetic pull towards the cursor
        const xValue = ((mouseX - centerX) / centerX) * 12;
        const yValue = ((mouseY - centerY) / centerY) * 12;

        setX(xValue);
        setY(yValue);
    };

    const handleMouseLeave = () => {
        setX(0);
        setY(0);
    };

    return (
        <motion.div
            ref={cardRef}
            layoutId={`recipe-card-${recipe.id}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={springConfig}
            whileHover={{ scale: 1.02 }}
            className="relative cursor-pointer group"
        >
            <div className="relative bg-cream/50 overflow-hidden border border-charcoal/10 group-hover:border-charcoal/30 transition-colors duration-500">
                {/* Image Section */}
                <div className="relative h-[400px] w-full overflow-hidden bg-cream border-b border-charcoal/5 flex items-center justify-center">
                    {recipe.image ? (
                        <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-cream via-sage/5 to-cream flex flex-col items-center justify-center p-8 text-center select-none">
                            <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center relative mb-4 group-hover:border-gold/60 group-hover:scale-105 transition-all duration-500">
                                <div className="w-12 h-12 rounded-full bg-gold/5 animate-pulse absolute" />
                                <svg className="w-6 h-6 text-gold stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            </div>
                            <span className="text-xs uppercase tracking-[0.3em] font-serif text-charcoal/40 mb-1">Manna Nest</span>
                            <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-medium">Awaiting Kitchen Picture</span>
                        </div>
                    )}

                    {/* Difficulty badge - Sage, structural */}
                    <div className="absolute top-0 right-0 px-4 py-2 bg-sage text-xs font-medium tracking-widest text-cream uppercase font-serif z-10">
                        Pre-Order
                    </div>
                </div>

                {/* Minimalist Info Section */}
                <div className="p-6 md:p-8 bg-cream border-t border-charcoal/10 relative">
                    {/* Vertical decorative accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                    
                    <h3 className="text-2xl sm:text-3xl font-serif font-medium mb-3 text-charcoal group-hover:text-gold transition-colors duration-500">
                        {recipe.title}
                    </h3>
                    <p className="text-charcoal/60 text-sm md:text-base font-light mb-6 line-clamp-2 leading-relaxed">
                        {recipe.description}
                    </p>

                    {/* Meta information */}
                    <div className="flex items-center gap-6 text-xs tracking-widest uppercase text-charcoal/40 font-medium font-serif">
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-sage" />
                            <span>{recipe.price !== undefined ? `₹${recipe.price}` : "₹ Price on Request"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-sage" />
                            <span>{recipe.deliveryTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
