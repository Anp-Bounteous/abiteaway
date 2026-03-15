import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/api";
import { mockFoods } from "../data/mockData";

export type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  deliveryTime: string;
  category: string;
  isVeg: boolean;
  restaurant: string;
};

export type CartItem = {
  id: string;
  foodId: string;
  quantity: number;
  food: FoodItem;
};

export type User = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  address: string;
  phone: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: string;
  deliveryAddress: string;
  paymentMethod: string;
};

type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type CheckoutPayload = {
  deliveryAddress: string;
  paymentMethod: string;
};

type AppContextValue = {
  foods: FoodItem[];
  cartItems: CartItem[];
  currentUser: User | null;
  orders: Order[];
  cartCount: number;
  cartSubtotal: number;
  cartTotal: number;
  signup: (payload: SignupPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  addToCart: (foodId: string, quantity?: number) => Promise<void>;
  updateCartItem: (foodId: string, quantity: number) => Promise<void>;
  removeCartItem: (foodId: string) => Promise<void>;
  placeOrder: (payload: CheckoutPayload) => Promise<void>;
};

type ApiFood = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt?: string;
};

type ApiCartItem = {
  id: string;
  foodId: string;
  quantity: number;
  food: ApiFood;
};

type ApiOrder = {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: string;
  items: ApiCartItem[];
};

const TOKEN_KEY = "abiteaway-token";
const USER_KEY = "abiteaway-user";

const AppContext = createContext<AppContextValue | undefined>(undefined);

const getMeta = (foodName: string, index: number) => {
  const matchedFood = mockFoods.find((item) => item.name === foodName) ?? mockFoods[index % mockFoods.length];
  return {
    rating: matchedFood?.rating ?? 4.5,
    deliveryTime: matchedFood?.deliveryTime ?? "20-30 min",
    category: matchedFood?.category ?? "Chef Specials",
    isVeg: matchedFood?.isVeg ?? false,
    restaurant: matchedFood?.restaurant ?? "ABiteAway Kitchen",
  };
};

const mapFood = (food: ApiFood, index: number): FoodItem => ({
  ...food,
  ...getMeta(food.name, index),
});

const mapUser = (user: {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  joinedAt: user.createdAt ?? new Date().toISOString(),
  address: "221B Flavor Street, Bengaluru",
  phone: "+91 98765 43210",
});

const mapCartItem = (item: ApiCartItem, index: number): CartItem => ({
  id: item.id,
  foodId: item.foodId,
  quantity: item.quantity,
  food: mapFood(item.food, index),
});

const mapOrder = (order: ApiOrder): Order => ({
  id: order.id,
  userId: order.userId,
  items: order.items.map(mapCartItem),
  total: order.total,
  status: order.status,
  createdAt: order.createdAt,
  deliveryAddress: "Saved during checkout",
  paymentMethod: "Processed",
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [foods, setFoods] = useState<FoodItem[]>(mockFoods);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  });
  const [token, setToken] = useState<string | null>(() => window.localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    void (async () => {
      try {
        const { data } = await api.get<ApiFood[]>("/foods");
        setFoods(data.map(mapFood));
      } catch {
        setFoods(mockFoods);
      }
    })();
  }, []);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      delete api.defaults.headers.common.Authorization;
      window.localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    } else {
      window.localStorage.removeItem(USER_KEY);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      setCartItems([]);
      setOrders([]);
      return;
    }

    void (async () => {
      try {
        const [{ data: cartData }, { data: orderData }] = await Promise.all([
          api.get<ApiCartItem[]>("/cart/me"),
          api.get<ApiOrder[]>("/orders/me"),
        ]);

        setCartItems(cartData.map(mapCartItem));
        setOrders(orderData.map(mapOrder));
      } catch {
        setCartItems([]);
        setOrders([]);
      }
    })();
  }, [currentUser]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
  const cartTotal = cartSubtotal + (cartItems.length ? 49 : 0);

  const signup = async ({ name, email, password }: SignupPayload) => {
    const { data } = await api.post<{
      token: string;
      user: { id: string; name: string; email: string; createdAt: string };
    }>("/auth/register", { name, email, password });

    setToken(data.token);
    setCurrentUser(mapUser(data.user));
  };

  const login = async ({ email, password }: LoginPayload) => {
    const { data } = await api.post<{
      token: string;
      user: { id: string; name: string; email: string; createdAt: string };
    }>("/auth/login", { email, password });

    setToken(data.token);
    setCurrentUser(mapUser(data.user));
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    setCartItems([]);
    setOrders([]);
  };

  const addToCart = async (foodId: string, quantity = 1) => {
    if (!currentUser) {
      throw new Error("Please sign in to add items to cart.");
    }

    const { data } = await api.post<ApiCartItem>("/cart", {
      foodId,
      quantity,
    });

    setCartItems((prev) => {
      const filtered = prev.filter((item) => item.foodId !== data.foodId);
      return [...filtered, mapCartItem(data, filtered.length)];
    });
  };

  const updateCartItem = async (foodId: string, quantity: number) => {
    const item = cartItems.find((entry) => entry.foodId === foodId);
    if (!item) {
      return;
    }

    if (quantity <= 0) {
      await removeCartItem(foodId);
      return;
    }

    const { data } = await api.put<ApiCartItem>(`/cart/${item.id}`, { quantity });
    setCartItems((prev) =>
      prev.map((entry) => (entry.id === item.id ? mapCartItem(data, 0) : entry)),
    );
  };

  const removeCartItem = async (foodId: string) => {
    const item = cartItems.find((entry) => entry.foodId === foodId);
    if (!item) {
      return;
    }

    await api.delete(`/cart/${item.id}`);
    setCartItems((prev) => prev.filter((entry) => entry.id !== item.id));
  };

  const placeOrder = async ({ deliveryAddress, paymentMethod }: CheckoutPayload) => {
    if (!currentUser || !cartItems.length) {
      throw new Error("Your cart is empty.");
    }

    const { data } = await api.post<ApiOrder>("/orders", {
      total: cartTotal,
      status: "Preparing",
      items: cartItems.map((item) => ({
        foodId: item.foodId,
        quantity: item.quantity,
      })),
      deliveryAddress,
      paymentMethod,
    });

    const mappedOrder = {
      ...mapOrder(data),
      deliveryAddress,
      paymentMethod,
    };

    setOrders((prev) => [mappedOrder, ...prev]);
    setCartItems([]);
  };

  const value: AppContextValue = {
    foods,
    cartItems,
    currentUser,
    orders,
    cartCount,
    cartSubtotal,
    cartTotal,
    signup,
    login,
    logout,
    addToCart,
    updateCartItem,
    removeCartItem,
    placeOrder,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
