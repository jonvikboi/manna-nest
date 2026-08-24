"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, User, Phone, Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { springConfig } from "@/lib/animation-config";

const getWhatsAppNumber = () => {
    const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919061894018";
    const cleanNumber = rawNumber.replace(/\D/g, "");
    return cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
};

export default function CartDrawer() {
    const { items, totalItems, isOpen, closeCart, updateQuantity, removeFromCart, clearCart } = useCart();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");
    const [orderStatus, setOrderStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || items.length === 0) return;

        setOrderStatus("submitting");

        const itemsList = items
            .map((item, index) => `${index + 1}. ${item.recipe.title} x ${item.quantity} portion(s) [${item.recipe.category}]`)
            .join("\n");

        const customerInfo = [
            `* Name: ${name.trim()}`,
            phone.trim() ? `* Phone: ${phone.trim()}` : null,
            notes.trim() ? `* Delivery / Special Notes: ${notes.trim()}` : null,
        ]
            .filter(Boolean)
            .join("\n");

        const messageText = `Hello! I would like to place a pre-order with Manna Nest.

[Order Summary]
${itemsList}

Total: ${totalItems} item(s)

[Customer Details]
${customerInfo}

Please let me know the availability, timing, and confirmation details. Thank you!`;

        const encodedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/${getWhatsAppNumber()}?text=${encodedMessage}`;

        setTimeout(() => {
            setOrderStatus("success");
            window.open(whatsappUrl, "_blank");
            setTimeout(() => {
                setOrderStatus("idle");
                closeCart();
            }, 1000);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={closeCart}
                        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
                    />

                    <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-screen max-w-md bg-cream border-l border-charcoal/10 shadow-2xl flex flex-col h-full overflow-hidden"
                        >
                            {/* Drawer Header */}
                            <div className="p-6 border-b border-charcoal/10 bg-cream/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center">
                                        <ShoppingBag className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-serif font-medium text-charcoal">Pre-Order Basket</h2>
                                        <p className="text-xs uppercase tracking-widest text-charcoal/50 font-serif">
                                            {totalItems} {totalItems === 1 ? "Item" : "Items"} Selected
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeCart}
                                    className="p-2 rounded-full border border-charcoal/10 hover:border-charcoal/30 text-charcoal/60 hover:text-charcoal transition-colors"
                                    aria-label="Close basket"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Drawer Body */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {items.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                                        <div className="w-16 h-16 rounded-full border border-charcoal/10 flex items-center justify-center mb-4 text-charcoal/30">
                                            <ShoppingBag className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-serif text-charcoal mb-2">Your basket is empty</h3>
                                        <p className="text-sm text-charcoal/60 max-w-xs mb-6 font-light leading-relaxed">
                                            Explore our slow-crafted Kerala delicacies and add your favorite dishes for pre-order.
                                        </p>
                                        <button
                                            onClick={closeCart}
                                            className="px-6 py-3 bg-charcoal text-cream text-xs uppercase tracking-widest font-serif hover:bg-gold hover:text-charcoal transition-colors duration-300"
                                        >
                                            Explore Offerings
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Itemized List */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between pb-2 border-b border-charcoal/5">
                                                <span className="text-xs uppercase tracking-widest text-charcoal/50 font-serif">Items</span>
                                                <button
                                                    onClick={clearCart}
                                                    className="text-xs text-charcoal/40 hover:text-orange-burnt transition-colors font-serif uppercase tracking-wider"
                                                >
                                                    Clear All
                                                </button>
                                            </div>

                                            {items.map((item) => (
                                                <motion.div
                                                    key={item.recipe.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="flex gap-4 p-3 bg-cream border border-charcoal/10 hover:border-charcoal/20 transition-colors"
                                                >
                                                    {/* Thumbnail */}
                                                    <div className="relative w-20 h-20 flex-shrink-0 bg-charcoal/5 border border-charcoal/5 overflow-hidden">
                                                        {item.recipe.image ? (
                                                            <Image
                                                                src={item.recipe.image}
                                                                alt={item.recipe.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gold text-xs">
                                                                Manna
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Details */}
                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div>
                                                                <h4 className="font-serif font-medium text-charcoal text-base leading-tight">
                                                                    {item.recipe.title}
                                                                </h4>
                                                                <span className="text-[10px] tracking-widest uppercase text-sage font-serif font-medium">
                                                                    {item.recipe.category}
                                                                </span>
                                                            </div>
                                                            <button
                                                                onClick={() => removeFromCart(item.recipe.id)}
                                                                className="text-charcoal/30 hover:text-orange-burnt transition-colors p-1"
                                                                title="Remove item"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        {/* Quantity Stepper */}
                                                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-charcoal/5">
                                                            <span className="text-xs text-charcoal/50 font-light">
                                                                {item.recipe.deliveryTime}
                                                            </span>
                                                            <div className="flex items-center border border-charcoal/15 bg-cream">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => updateQuantity(item.recipe.id, item.quantity - 1)}
                                                                    className="p-1 px-2 text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
                                                                    aria-label="Decrease quantity"
                                                                >
                                                                    <Minus className="w-3 h-3" />
                                                                </button>
                                                                <span className="px-2 text-xs font-serif font-medium text-charcoal min-w-[20px] text-center">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => updateQuantity(item.recipe.id, item.quantity + 1)}
                                                                    className="p-1 px-2 text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
                                                                    aria-label="Increase quantity"
                                                                >
                                                                    <Plus className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Pre-Order Details Form */}
                                        <form id="cart-preorder-form" onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-charcoal/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles className="w-4 h-4 text-gold" />
                                                <h3 className="text-xs uppercase tracking-[0.2em] font-serif font-medium text-charcoal/70">
                                                    Pre-Order Contact Details
                                                </h3>
                                            </div>

                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-charcoal/60 font-serif mb-1">
                                                    Your Full Name <span className="text-orange-burnt">*</span>
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/30">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="e.g. Rachel Thomas"
                                                        className="w-full pl-9 pr-4 py-2.5 bg-cream border border-charcoal/15 focus:border-gold focus:outline-none text-sm text-charcoal font-sans transition-colors placeholder:text-charcoal/30"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-charcoal/60 font-serif mb-1">
                                                    Contact Number (Optional)
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/30">
                                                        <Phone className="w-4 h-4" />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="e.g. +91 98765 43210"
                                                        className="w-full pl-9 pr-4 py-2.5 bg-cream border border-charcoal/15 focus:border-gold focus:outline-none text-sm text-charcoal font-sans transition-colors placeholder:text-charcoal/30"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs uppercase tracking-wider text-charcoal/60 font-serif mb-1">
                                                    Preferred Date / Special Requests (Optional)
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/30">
                                                        <Calendar className="w-4 h-4" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={notes}
                                                        onChange={(e) => setNotes(e.target.value)}
                                                        placeholder="e.g. Pre-order for Sunday 1:00 PM lunch"
                                                        className="w-full pl-9 pr-4 py-2.5 bg-cream border border-charcoal/15 focus:border-gold focus:outline-none text-sm text-charcoal font-sans transition-colors placeholder:text-charcoal/30"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>

                            {/* Drawer Footer & Checkout Action */}
                            {items.length > 0 && (
                                <div className="p-6 border-t border-charcoal/10 bg-cream/95 backdrop-blur-md space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-serif text-charcoal/60">Total Items in Pre-Order:</span>
                                        <span className="font-serif font-medium text-charcoal text-base">
                                            {totalItems} portion(s)
                                        </span>
                                    </div>

                                    <p className="text-[11px] text-charcoal/50 leading-relaxed font-light">
                                        All delicacies are prepared fresh from scratch in small family batches. We confirm your order timing and arrangement directly on WhatsApp.
                                    </p>

                                    <button
                                        type="submit"
                                        form="cart-preorder-form"
                                        disabled={orderStatus !== "idle" || !name.trim()}
                                        className={`w-full py-4 px-6 text-xs uppercase tracking-[0.2em] font-serif font-medium flex items-center justify-center gap-3 transition-all duration-300 ${
                                            orderStatus === "success"
                                                ? "bg-sage text-cream"
                                                : orderStatus === "submitting"
                                                ? "bg-charcoal/80 text-cream cursor-wait"
                                                : !name.trim()
                                                ? "bg-charcoal/20 text-charcoal/40 cursor-not-allowed"
                                                : "bg-charcoal text-cream hover:bg-gold hover:text-charcoal shadow-lg hover:shadow-xl"
                                        }`}
                                    >
                                        {orderStatus === "success" ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                Opening WhatsApp...
                                            </>
                                        ) : orderStatus === "submitting" ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                                                Preparing Pre-Order...
                                            </>
                                        ) : (
                                            <>
                                                <span>Confirm Pre-Order on WhatsApp</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
