"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RecipeGrid from "@/components/RecipeGrid";
import About from "@/components/About";
import Contact from "@/components/Contact";
import RecipeDetail from "@/components/RecipeDetail";
import CartDrawer from "@/components/CartDrawer";
import CartBar from "@/components/CartBar";
import { recipes, Recipe } from "@/lib/recipes";
import { CartProvider } from "@/lib/cart-context";

export default function Home() {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    return (
        <CartProvider>
            <main className="min-h-screen relative">
                <Navbar />
                <Hero />
                <RecipeGrid recipes={recipes} onRecipeClick={setSelectedRecipe} />
                <About />
                <Contact />
                <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
                <CartDrawer />
                <CartBar />
            </main>
        </CartProvider>
    );
}
