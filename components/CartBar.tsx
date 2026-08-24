"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartBar() {
    const { totalItems, isOpen, openCart } = useCart();

    if (totalItems === 0 || isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 80, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 80, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-lg pointer-events-none"
            >
                <div
                    onClick={openCart}
                    className="pointer-events-auto cursor-pointer bg-charcoal/95 text-cream border border-gold/40 shadow-2xl backdrop-blur-xl p-3 sm:p-4 rounded-full flex items-center justify-between gap-4 hover:border-gold transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)]"
                >
                    <div className="flex items-center gap-3 pl-2">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <span className="absolute -top-1 -right-1 bg-gold text-charcoal font-serif font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-charcoal">
                                {totalItems}
                            </span>
                        </div>
                        <div className="flex flex-col text-left">
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs uppercase tracking-widest font-serif text-cream font-medium">
                                    Pre-Order Basket
                                </span>
                                <Sparkles className="w-3 h-3 text-gold" />
                            </div>
                            <span className="text-[11px] text-cream/60 font-light">
                                {totalItems} {totalItems === 1 ? "item" : "items"} ready for WhatsApp order
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-gold text-charcoal px-4 sm:px-5 py-2.5 rounded-full text-xs font-serif uppercase tracking-widest font-medium group-hover:bg-cream transition-colors duration-300">
                        <span>Review & Pre-Order</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
