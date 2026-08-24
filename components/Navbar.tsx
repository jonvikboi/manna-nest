"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import GlassSurface from "./GlassSurface";
import { useCart } from "@/lib/cart-context";

const menuContainerVariants = {
    hidden: { 
        height: 0, 
        opacity: 0,
        transition: { 
            height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.15 }
        }
    },
    visible: { 
        height: "auto", 
        opacity: 1,
        transition: { 
            height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.2 },
            staggerChildren: 0.05,
            delayChildren: 0.02
        }
    }
};

const menuItemVariants = {
    hidden: { opacity: 0, y: -10, transition: { type: "spring", stiffness: 350, damping: 25 } },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 22 } }
};

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isOpen, setIsOpen] = useState(false);
    const { totalItems, openCart } = useCart();

    // Show navbar when scrolling past the hero section (approx 500px)
    const navbarOpacity = useTransform(scrollY, [500, 600], [0, 1]);
    const navbarY = useTransform(scrollY, [500, 600], [-100, 0]);

    // Title scale that shrinks slightly as you scroll
    const titleScale = useTransform(scrollY, [0, 150], [1, 0.9]);

    return (
        <motion.nav
            style={{
                opacity: navbarOpacity,
                y: navbarY,
            }}
            className="fixed top-8 left-1/2 z-50 pointer-events-none"
        >
            <div className="-translate-x-1/2 flex justify-center w-full min-w-[300px] sm:min-w-[360px] md:min-w-[480px]">
                {/* Liquid Glass container with dynamic border radius */}
                <GlassSurface
                    width="auto"
                    height="auto"
                    borderRadius={isOpen ? 24 : 50}
                    brightness={98}
                    opacity={0.95}
                    backgroundOpacity={0.83}
                    saturation={1.3}
                    blur={25}
                    className="px-5 md:px-8 py-3 md:py-3.5 pointer-events-auto shadow-lg backdrop-blur-xl border border-charcoal/10 w-full transition-shadow duration-300"
                >
                    <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between gap-4 md:gap-8 w-full">
                            <div className="flex items-center gap-3">
                                {/* Minimalist Logo Mark */}
                                <motion.div
                                    style={{ scale: titleScale }}
                                    className="w-2.5 h-2.5 rounded-full border border-gold bg-gold/25 mt-0.5 hidden sm:block"
                                />

                                {/* Brand name */}
                                <motion.h2
                                    style={{ scale: titleScale }}
                                    className="text-lg sm:text-xl md:text-2xl font-serif text-charcoal tracking-tight select-none"
                                >
                                    MANNA NEST
                                </motion.h2>
                            </div>

                            {/* Navigation links & Cart action */}
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="hidden md:flex items-center gap-6 pl-4 md:pl-6 border-l border-charcoal/10">
                                    <NavLink href="#recipes">Recipes</NavLink>
                                    <NavLink href="#about">About</NavLink>
                                    <NavLink href="#contact">Contact</NavLink>
                                </div>

                                {/* Cart Toggle Button */}
                                <button
                                    onClick={openCart}
                                    className="relative p-2 rounded-full border border-charcoal/10 hover:border-gold/60 text-charcoal/80 hover:text-charcoal transition-all duration-300 cursor-pointer group flex items-center justify-center bg-cream/50"
                                    aria-label="Open Pre-Order Basket"
                                >
                                    <ShoppingBag className="w-4 h-4 text-charcoal group-hover:text-gold transition-colors" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-gold text-charcoal font-serif font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-cream shadow-xs">
                                            {totalItems}
                                        </span>
                                    )}
                                </button>

                                {/* Hamburger Menu - visible on mobile only */}
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="md:hidden flex items-center justify-center w-8 h-8 focus:outline-none cursor-pointer relative z-50"
                                    aria-label="Toggle Menu"
                                >
                                    <div className="relative w-5 h-4 flex items-center justify-center">
                                        <motion.span
                                            animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute w-5 h-0.5 bg-charcoal block"
                                        />
                                        <motion.span
                                            animate={isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute w-5 h-0.5 bg-charcoal block"
                                        />
                                        <motion.span
                                            animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute w-5 h-0.5 bg-charcoal block"
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Dropdown Panel with Staggered Transitions */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={menuContainerVariants}
                                    className="md:hidden flex flex-col items-center gap-4 mt-4 pt-4 border-t border-charcoal/10 w-full overflow-hidden"
                                >
                                    <motion.div variants={menuItemVariants} className="w-full text-center">
                                        <MobileNavLink href="#recipes" onClick={() => setIsOpen(false)}>
                                            Recipes
                                        </MobileNavLink>
                                    </motion.div>
                                    <motion.div variants={menuItemVariants} className="w-full text-center">
                                        <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>
                                            About
                                        </MobileNavLink>
                                    </motion.div>
                                    <motion.div variants={menuItemVariants} className="w-full text-center">
                                        <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>
                                            Contact
                                        </MobileNavLink>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </GlassSurface>
            </div>
        </motion.nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="text-xs uppercase tracking-[0.2em] text-charcoal/60 hover:text-gold transition-colors duration-300 relative group"
        >
            {children}
            <span className="absolute -bottom-1 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </a>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className="text-xs uppercase tracking-[0.25em] text-charcoal/70 hover:text-gold transition-colors duration-300 py-2 block font-serif w-full"
        >
            {children}
        </a>
    );
}
