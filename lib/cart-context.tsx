"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Recipe } from "./recipes";

export interface CartItem {
    recipe: Recipe;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addToCart: (recipe: Recipe, quantity?: number) => void;
    updateQuantity: (recipeId: string, quantity: number) => void;
    removeFromCart: (recipeId: string) => void;
    getItemQuantity: (recipeId: string) => number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "manna_nest_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            }
        } catch (e) {
            console.error("Failed to load cart from localStorage", e);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // Save cart to localStorage on changes
    useEffect(() => {
        if (!isInitialized) return;
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch (e) {
            console.error("Failed to save cart to localStorage", e);
        }
    }, [items, isInitialized]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const toggleCart = () => setIsOpen((prev) => !prev);

    const addToCart = (recipe: Recipe, quantity = 1) => {
        setItems((prev) => {
            const existingIndex = prev.findIndex((item) => item.recipe.id === recipe.id);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                };
                return updated;
            }
            return [...prev, { recipe, quantity }];
        });
    };

    const updateQuantity = (recipeId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(recipeId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.recipe.id === recipeId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (recipeId: string) => {
        setItems((prev) => prev.filter((item) => item.recipe.id !== recipeId));
    };

    const getItemQuantity = (recipeId: string) => {
        const item = items.find((i) => i.recipe.id === recipeId);
        return item ? item.quantity : 0;
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                totalItems,
                isOpen,
                openCart,
                closeCart,
                toggleCart,
                addToCart,
                updateQuantity,
                removeFromCart,
                getItemQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
