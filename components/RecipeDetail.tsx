"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Truck, ShoppingBag, Plus, Minus, User, Leaf, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Recipe } from "@/lib/recipes";
import { springConfig } from "@/lib/animation-config";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

interface RecipeDetailProps {
    recipe: Recipe | null;
    onClose: () => void;
}

// Retrieve and format the WhatsApp number from secure environment variables
const getWhatsAppNumber = () => {
    const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919061894018";
    const cleanNumber = rawNumber.replace(/\D/g, "");
    // If it's a standard 10-digit number, auto-prepend country code '91' for India
    return cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
};

export default function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [orderStatus, setOrderStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [addedToCartToast, setAddedToCartToast] = useState(false);
    const { addToCart, openCart } = useCart();

    if (!recipe) return null;

    const handleAddToCart = () => {
        addToCart(recipe, quantity);
        setAddedToCartToast(true);
        setTimeout(() => {
            setAddedToCartToast(false);
        }, 2500);
    };

    const handlePreOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setOrderStatus("submitting");

        // Format a clean, professional WhatsApp order message
        const messageText = `Hello! I would like to place a pre-order with Manna Nest.

[Order Details]
* Item: ${recipe.title} [${recipe.category}]
* Quantity: ${quantity} portion(s)

[Customer Details]
* Name: ${name.trim()}

Please let me know the confirmation and payment details. Thank you!`;

        const encodedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/${getWhatsAppNumber()}?text=${encodedMessage}`;

        setTimeout(() => {
            setOrderStatus("success");
            window.open(whatsappUrl, "_blank");
        }, 1200);
    };

    const handleClose = () => {
        // Reset states
        setQuantity(1);
        setName("");
        setOrderStatus("idle");
        setAddedToCartToast(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {recipe && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        layoutId={`recipe-card-${recipe.id}`}
                        className="fixed inset-0 sm:inset-4 md:inset-8 lg:inset-16 bg-cream rounded-none sm:rounded-3xl overflow-hidden shadow-2xl z-50 max-w-6xl mx-auto flex flex-col"
                    >
                        {/* Close button - Pinned Fixed to the top-right of the modal wrapper */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ ...springConfig, delay: 0.2 }}
                            onClick={handleClose}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-sage hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <div className="h-full overflow-y-auto">
                            {/* Hero image */}
                            <div className="relative h-48 sm:h-64 md:h-72 lg:h-96 w-full bg-cream border-b border-charcoal/5 flex items-center justify-center overflow-hidden">
                                {recipe.image ? (
                                    <>
                                        <Image
                                            src={recipe.image}
                                            alt={recipe.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent" />
                                    </>
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cream via-sage/5 to-cream flex flex-col items-center justify-center p-8 text-center select-none">
                                        <div className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center relative mb-4">
                                            <div className="w-14 h-14 rounded-full bg-gold/5 animate-pulse absolute" />
                                            <svg className="w-8 h-8 text-gold stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm uppercase tracking-[0.3em] font-serif text-charcoal/40 mb-1">Manna Nest</span>
                                        <span className="text-xs uppercase tracking-widest text-gold font-sans font-medium">Awaiting Kitchen Picture</span>
                                        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-transparent pointer-events-none" />
                                    </div>
                                )}
                            </div>

                            {/* Content Container */}
                            <div className="px-4 sm:px-6 md:px-12 pb-8 md:pb-12 -mt-12 sm:mt-16 md:-mt-20 relative z-10">
                                
                                {orderStatus === "success" ? (
                                    /* Success State View */
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12 max-w-xl mx-auto space-y-6"
                                    >
                                        <div className="w-20 h-20 bg-sage/10 rounded-full border border-sage flex items-center justify-center mx-auto relative">
                                            <div className="w-12 h-12 bg-sage/20 rounded-full absolute animate-pulse" />
                                            <Check className="w-8 h-8 text-sage relative z-10" strokeWidth={3} />
                                        </div>
                                        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal">
                                            Pre-Order Sent
                                        </h2>
                                        <p className="text-charcoal/60 leading-relaxed font-light">
                                            Kind soul, your pre-order for <strong className="text-charcoal font-medium">{recipe.title}</strong> has been structured. We have opened WhatsApp to send the details directly to our kitchen.
                                        </p>
                                        
                                        <div className="border border-charcoal/10 p-6 bg-cream/40 rounded-sm text-left text-sm space-y-3 font-serif">
                                            <div className="flex justify-between border-b border-charcoal/5 pb-2">
                                                <span className="text-charcoal/40">Recipient:</span>
                                                <span className="text-charcoal font-medium">{name}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-charcoal/5 pb-2">
                                                <span className="text-charcoal/40">Quantity:</span>
                                                <span className="text-charcoal font-medium">{quantity}x</span>
                                            </div>
                                            <div className="flex justify-between pt-1 text-base font-semibold">
                                                <span className="text-charcoal/60">Delivery Status:</span>
                                                <span className="text-sage">{recipe.deliveryTime}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleClose}
                                            className="px-8 py-3 bg-sage text-cream uppercase font-serif text-sm tracking-widest hover:bg-gold transition-colors duration-300 rounded-none border border-sage hover:border-gold cursor-pointer"
                                        >
                                            Return to Sanctuary
                                        </button>
                                    </motion.div>
                                ) : (
                                    /* Main Form and Product details View */
                                    <>
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ ...springConfig, delay: 0.1 }}
                                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-charcoal mb-3 md:mb-4 tracking-tight"
                                        >
                                            {recipe.title}
                                        </motion.h1>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ ...springConfig, delay: 0.15 }}
                                            className="text-base sm:text-lg md:text-xl font-light text-charcoal/60 mb-6 md:mb-12 italic leading-relaxed max-w-3xl"
                                        >
                                            {recipe.description}
                                        </motion.p>

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                                            
                                            {/* Left Column - Product Information */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ ...springConfig, delay: 0.2 }}
                                                className="lg:col-span-5 space-y-8"
                                            >
                                                <div>
                                                    <h3 className="text-lg font-serif font-medium text-charcoal mb-4 border-b border-charcoal/10 pb-2">
                                                        Our Cooking Philosophy
                                                    </h3>
                                                    <p className="text-sm font-light text-charcoal/70 leading-relaxed mb-6">
                                                        Every dish is freshly prepared in our home kitchen with care, using wholesome, natural ingredients sourced from local markets.
                                                    </p>
                                                    <ul className="space-y-3 font-serif text-sm text-charcoal/70">
                                                        <li className="flex items-center gap-3">
                                                            <Leaf className="w-4 h-4 text-sage" />
                                                            <span>Fresh & Wholesome Ingredients</span>
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <ShoppingBag className="w-4 h-4 text-sage" />
                                                            <span>Hygienic Home Cooking</span>
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <Truck className="w-4 h-4 text-sage" />
                                                            <span>Direct Home Delivery</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="border border-charcoal/5 p-6 bg-cream/30 space-y-4 rounded-sm text-sm">
                                                    <div className="flex justify-between border-b border-charcoal/5 pb-2 font-serif">
                                                        <span className="text-charcoal/40">Category:</span>
                                                        <span className="text-charcoal font-medium">{recipe.category}</span>
                                                    </div>
                                                    <div className="flex justify-between font-serif">
                                                        <span className="text-charcoal/40">Delivery Status:</span>
                                                        <span className="text-sage flex items-center gap-1.5 font-semibold">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-ping" />
                                                            {recipe.deliveryTime}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Right Column - Actions & Pre-order Form */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ ...springConfig, delay: 0.25 }}
                                                className="lg:col-span-7 border border-charcoal/10 p-6 md:p-10 bg-cream/40 space-y-8"
                                            >
                                                {/* Quantity Selector & Quick Add to Cart */}
                                                <div>
                                                    <h3 className="text-xl font-serif font-medium text-charcoal mb-4 border-b border-charcoal/10 pb-2">
                                                        Select Portion & Basket
                                                    </h3>

                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-charcoal/10 bg-cream mb-4">
                                                        <div>
                                                            <label className="block text-xs uppercase tracking-widest text-charcoal/50 font-serif">
                                                                Quantity
                                                            </label>
                                                            <span className="text-xs text-charcoal/45 italic">Select number of portions</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                                className="w-8 h-8 rounded-full border border-charcoal/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors cursor-pointer"
                                                            >
                                                                <Minus className="w-3.5 h-3.5" />
                                                            </button>
                                                            <span className="text-lg font-serif font-semibold text-charcoal min-w-[24px] text-center">
                                                                {quantity}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => setQuantity(prev => prev + 1)}
                                                                className="w-8 h-8 rounded-full border border-charcoal/20 hover:border-gold hover:text-gold flex items-center justify-center transition-colors cursor-pointer"
                                                            >
                                                                <Plus className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Add to Basket Action */}
                                                    <div className="flex flex-col sm:flex-row gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={handleAddToCart}
                                                            className="flex-1 py-3.5 px-6 bg-charcoal text-cream text-xs uppercase tracking-[0.2em] font-serif hover:bg-gold hover:text-charcoal transition-all duration-300 flex items-center justify-center gap-2"
                                                        >
                                                            <ShoppingBag className="w-4 h-4 text-gold" />
                                                            <span>Add to Pre-Order Basket</span>
                                                        </button>
                                                        
                                                        {addedToCartToast && (
                                                            <motion.button
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                onClick={() => {
                                                                    handleClose();
                                                                    openCart();
                                                                }}
                                                                className="py-3 px-4 border border-gold bg-gold/10 text-charcoal text-xs uppercase tracking-wider font-serif flex items-center justify-center gap-2 hover:bg-gold/20 transition-colors"
                                                            >
                                                                <span>View Basket</span>
                                                                <ArrowRight className="w-3.5 h-3.5" />
                                                            </motion.button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Single Item Direct Pre-Order */}
                                                <div className="pt-6 border-t border-charcoal/10">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h4 className="text-sm font-serif uppercase tracking-widest text-charcoal/70">
                                                            Or Instant Single-Item Pre-Order
                                                        </h4>
                                                    </div>

                                                    <form onSubmit={handlePreOrder} className="space-y-4">
                                                        <div>
                                                            <label htmlFor="order-name" className="block text-xs uppercase tracking-widest text-charcoal/50 mb-1.5 font-serif flex items-center gap-1.5">
                                                                <User className="w-3.5 h-3.5 text-sage" />
                                                                Your Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="order-name"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                placeholder="Enter your name for quick WhatsApp pre-order"
                                                                className="w-full px-4 py-2.5 border border-charcoal/20 bg-cream/70 focus:border-gold focus:outline-none transition-colors text-charcoal text-sm font-sans"
                                                            />
                                                        </div>

                                                        <button
                                                            type="submit"
                                                            disabled={orderStatus === "submitting" || !name.trim()}
                                                            className="w-full bg-orange-burnt/90 text-cream font-medium tracking-widest uppercase py-3 px-6 hover:bg-[#25D366] transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs font-serif"
                                                        >
                                                            {orderStatus === "submitting" ? (
                                                                <>
                                                                    <div className="w-4 h-4 border border-cream border-t-transparent rounded-full animate-spin" />
                                                                    Redirecting to WhatsApp...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span>Pre-Order This Item on WhatsApp</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </form>
                                                </div>

                                            </motion.div>

                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
