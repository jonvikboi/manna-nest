export interface Recipe {
    id: string;
    title: string;
    description: string;
    image: string;
    price?: number;
    category: "Mains" | "Dishes" | "Snacks" | "Desserts";
    deliveryTime: string;
}

export const recipes: Recipe[] = [
    // --- MAINS ---
    {
        id: "1",
        title: "Appam",
        description: "Soft and fluffy bowl-shaped fermented rice pancakes with a thick, spongy center and crisp, delicate, lace-like golden edges. Crafted with fresh coconut milk.",
        image: "/images/appam.jpg",
        category: "Mains",
        deliveryTime: "Delivered Fresh & Warm"
    },
    {
        id: "2",
        title: "Idiyappam",
        description: "Delicate, light, and fluffy steamed rice noodle nests (string hoppers). A timeless, gentle breakfast staple that pairs beautifully with stews.",
        image: "/images/idiyappam.jpg",
        category: "Mains",
        deliveryTime: "Delivered Fresh & Warm"
    },
    {
        id: "3",
        title: "Kallappam",
        description: "Traditional spongy pan-cooked rice pancakes fermented with yeast and flavored with freshly grated coconut, aromatic cumin seeds, and shallots.",
        image: "/images/kallappam.jpg",
        category: "Mains",
        deliveryTime: "Delivered Fresh & Warm"
    },

    // --- DISHES ---
    {
        id: "4",
        title: "Chicken Stew",
        description: "Tender chicken cooked with potatoes and sweet carrots in a delicately spiced, velvety coconut milk gravy, flavored with ginger, green chilies, and fresh curry leaves.",
        image: "/images/chicken_stew.jpg",
        category: "Dishes",
        deliveryTime: "Delivered Hot"
    },
    {
        id: "5",
        title: "Buffalo Curry",
        description: "Succulent, slow-cooked Buffalo meat simmered in a deeply aromatic, dark roasted coconut gravy with traditional Malabar spices, ginger, and caramelized onions.",
        image: "/images/beef_curry.jpg",
        category: "Dishes",
        deliveryTime: "Delivered Hot"
    },
    {
        id: "6",
        title: "Fish Curry",
        description: "A tangy, authentic red fish curry cooked in a traditional clay pot, infused with smoky Kudampuli (Malabar tamarind), ginger, and fresh curry leaves.",
        image: "/images/fish_curry.jpg",
        category: "Dishes",
        deliveryTime: "Delivered Hot"
    },
    {
        id: "7",
        title: "Vegetable Stew",
        description: "A comforting blend of fresh farm vegetables slowly simmered in rich, aromatic coconut milk, spiced gently with green cardamom, cloves, and ginger.",
        image: "/images/vegetable_stew.jpg",
        category: "Dishes",
        deliveryTime: "Delivered Hot"
    },
    {
        id: "8",
        title: "Buffalo Fry",
        description: "A classic dry-roasted delicacy. Tender  Buffalo meat slow-cooked with spices, then roasted to dark, caramelized perfection with coconut slices and curry leaves in pure coconut oil.",
        image: "/images/beef_fry.jpg",
        category: "Dishes",
        deliveryTime: "Delivered Warm"
    },
    {
        id: "9",
        title: "Chicken Fry",
        description: "Crispy and juicy deep-fried chicken marinated in a robust, traditional blend of red chilies, turmeric, ginger-garlic paste, and fresh curry leaves.",
        image: "/images/chicken_fry.jpg",
        category: "Dishes",
        deliveryTime: "Delivered Warm"
    },

    // --- SNACKS ---
    {
        id: "10",
        title: "Ulli Vada",
        description: "Crispy, golden deep-fried onion fritters seasoned with ginger, fresh green chilies, and hand-torn curry leaves. The perfect tea-time comfort.",
        image: "/images/ulli_vada.jpg",
        category: "Snacks",
        deliveryTime: "Delivered Fresh & Crispy"
    },
    {
        id: "11",
        title: "Uzhunnu Vada",
        description: "Golden, doughnut-shaped savory fritters made from a light, fluffy black gram (urad dal) batter. Crispy outside, pillowy-soft inside.",
        image: "/images/uzhunnu_vada.jpg",
        category: "Snacks",
        deliveryTime: "Delivered Fresh & Crispy"
    },
    {
        id: "12",
        title: "Parippu Vada",
        description: "Crunchy, spicy lentil patties crafted from coarsely ground chana dal, infused with chopped shallots, fiery green chilies, ginger, and curry leaves.",
        image: "/images/parippu_vada.jpg",
        category: "Snacks",
        deliveryTime: "Delivered Fresh & Crispy"
    },
    {
        id: "13",
        title: "Achappam",
        description: "Intricately flower-shaped, sweet and ultra-crispy rose cookies. Made from rice flour, fresh coconut milk, sugar, and sprinkled with black sesame seeds.",
        image: "/images/achappam.jpg",
        category: "Snacks",
        deliveryTime: "Delivered Fresh"
    },
    {
        id: "14",
        title: "Unniappam",
        description: "Small, golden-brown sweet fritters fried in a traditional stone vessel. Fermented rice batter blended with sweet jaggery, ripe banana, and ghee-fried coconut bites.",
        image: "/images/unniappam.jpg",
        category: "Snacks",
        deliveryTime: "Delivered Fresh & Warm"
    },
    {
        id: "15",
        title: "Chicken Cutlet",
        description: "Delectable, spiced croquettes made of minced chicken and potato, seasoned with garam masala, coated in breadcrumbs, and shallow-fried to perfection.",
        image: "/images/chicken_cutlet.jpg",
        category: "Snacks",
        deliveryTime: "Delivered Warm"
    },
    {
        id: "16",
        title: "Meat Cutlet",
        description: "Traditional Malabar-style savory patties made with minced meat, potato, black pepper, and warm spices, fried to a delicious golden crunch.",
        image: "/images/beef_cutlet.jpg",
        category: "Snacks",
        deliveryTime: "Delivered Warm"
    },
    {
        id: "19",
        title: "Vattayappam",
        description: "Vattayappam is a traditional, slightly sweet, and fluffy steamed rice cake from Kerala, India. Made with a fermented batter of ground rice and coconut, it is naturally gluten-free and vegan. It is usually garnished with raisins and cashews, and served as a snack.",
        image: "/images/vattayappam.jpg",
        category: "Snacks",
        deliveryTime: "Delivered Fresh"
    },

    // --- DESSERTS ---
    {
        id: "17",
        title: "Payasam",
        description: "The royal dessert of Kerala. A rich, warm, and luxurious sweet pudding cooked with rice flakes (Ada), sweet jaggery, and creamy coconut milk, finished with cashews.",
        image: "/images/payasam.jpg",
        category: "Desserts",
        deliveryTime: "Delivered Warm"
    },
    {
        id: "18",
        title: "Pudding",
        description: "A smooth, refreshing, and velvety Tender Coconut (Karikku) pudding, chilled to perfection. Sweetened coconut cream and tender coconut pulp set in delicate molds.",
        image: "/images/pudding.jpg",
        category: "Desserts",
        deliveryTime: "Delivered Chilled"
    }
];
