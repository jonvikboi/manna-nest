"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Recipe } from "@/lib/recipes";
import RecipeCard from "./RecipeCard";
import { staggerContainerVariants, fadeInVariants } from "@/lib/animation-config";
import { useCart } from "@/lib/cart-context";

interface RecipeGridProps {
    recipes: Recipe[];
    onRecipeClick: (recipe: Recipe) => void;
}

export default function RecipeGrid({ recipes, onRecipeClick }: RecipeGridProps) {
    const [activeCategory, setActiveCategory] = useState<"All" | "Mains" | "Dishes" | "Snacks" | "Desserts">("All");
    const { totalItems, openCart } = useCart();

    const filteredRecipes = activeCategory === "All"
        ? recipes
        : recipes.filter((recipe) => recipe.category === activeCategory);

    return (
        <section id="recipes" className="py-12 sm:py-16 md:py-24 px-4 max-w-7xl mx-auto min-h-[800px]">
            {/* Header section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainerVariants}
                className="mb-16 md:mb-20 text-left border-b border-charcoal/10 pb-8 relative"
            >
                <div className="absolute right-0 top-0 w-8 h-8 flex flex-col justify-between hidden md:flex">
                    <div className="w-full h-px bg-gold/50" />
                    <div className="w-full h-px border-t border-dashed border-gold/30" />
                </div>
                
                <motion.h2
                    variants={fadeInVariants}
                    className="text-5xl sm:text-6xl md:text-8xl font-serif font-medium text-charcoal mb-6 tracking-tight"
                >
                    Manna Offerings
                </motion.h2>
                <motion.div
                    variants={fadeInVariants}
                    className="flex items-center gap-6"
                >
                    <div className="w-12 h-px bg-gold" />
                    <p className="text-xs tracking-[0.2em] text-charcoal/50 uppercase font-serif">
                        Handcrafted Sustenance
                    </p>
                </motion.div>
            </motion.div>

            {/* Category Filter Navigation */}
            <motion.div 
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 mb-16 pb-4 border-b border-charcoal/5"
            >
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                    {(["All", "Mains", "Dishes", "Snacks", "Desserts"] as const).map((category) => {
                        const isActive = activeCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className="relative py-2 px-1 text-xs font-serif uppercase tracking-[0.25em] transition-colors duration-300 focus:outline-none cursor-pointer"
                            >
                                <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-gold font-medium" : "text-charcoal/55 hover:text-charcoal"}`}>
                                    {category}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeCategoryUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {totalItems > 0 && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={openCart}
                        className="text-xs uppercase tracking-widest font-serif font-medium text-gold hover:text-charcoal flex items-center gap-2 transition-colors py-1.5 px-3.5 border border-gold/40 bg-gold/5 hover:bg-gold/15 cursor-pointer"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Pre-Order Basket ({totalItems})</span>
                    </motion.button>
                )}
            </motion.div>

            {/* Grid display */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-0"
                style={{ gridAutoFlow: 'dense' }}
            >
                <AnimatePresence mode="popLayout">
                    {filteredRecipes.map((recipe, index) => (
                        <motion.div 
                            key={recipe.id}
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className={index % 2 === 1 ? "md:mt-32" : "md:mt-0 md:mb-32"}
                        >
                            <RecipeCard recipe={recipe} onClick={() => onRecipeClick(recipe)} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
