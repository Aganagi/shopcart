import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext, useRef, useCallback, useMemo, memo } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import clsx$1, { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { usePage, useForm, Link, router, createInertiaApp } from "@inertiajs/react";
import { MapPin, Phone, Clock, Mail, Youtube, Github, Linkedin, Facebook, Slack, AlertCircle, Moon, Sun, XIcon, X, TextAlignStart, Search, ShoppingBag, Heart, User, LogOut, ChevronDownIcon, CheckIcon, ChevronUpIcon, ShoppingCart, Trash, Minus, Plus, Layers, Tag, Package, Calendar, StarIcon, LoaderCircle, Flame, ChevronLeft, ChevronRight, Truck, GitCompareArrows, Headset, ShieldCheck, ChevronDown, MessageSquare, CircleQuestionMark, ArrowLeft, CreditCard, Lock, SquarePlus, Share2, CornerDownLeft, Check } from "lucide-react";
import toast, { toast as toast$1 } from "react-hot-toast";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import axios from "axios";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Input({
  className,
  type,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Footer() {
  const { footerCategories, flash: flash2 } = usePage().props;
  const [year, setYear] = useState(null);
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    email: ""
  });
  useEffect(() => {
    setYear((/* @__PURE__ */ new Date()).getFullYear());
  }, []);
  useEffect(() => {
    if (flash2?.success) {
      toast.success(flash2.success);
    }
    if (flash2?.error) {
      toast.error(flash2.error);
    }
    if (flash2?.info) {
      toast(flash2.info);
    }
  }, [flash2]);
  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();
    post("/subscribe", {
      onSuccess: () => {
        reset();
      },
      onError: () => {
        if (errors.email) {
          toast.error(errors.email);
        }
      },
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsx(
    "footer",
    {
      className: clsx$1(
        "mt-6 border-t bg-white transition-colors",
        "border-neutral-200",
        "dark:bg-[#0d0d0d] dark:border-neutral-700"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx$1(
              "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b",
              "border-neutral-200",
              "dark:border-neutral-700"
            ),
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: clsx$1(
                    "flex items-center gap-3 group p-4 transition-colors",
                    "hover:bg-gray-50",
                    "dark:hover:bg-[#1a1a1a]"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      MapPin,
                      {
                        width: 24,
                        height: 24,
                        className: clsx$1(
                          "h-6 w-6 text-gray-600 transition-colors group-hover:text-black",
                          "dark:text-gray-300 dark:group-hover:text-white"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: clsx$1(
                            "font-semibold text-gray-900 transition-colors group-hover:text-black",
                            "dark:text-gray-100 dark:group-hover:text-white"
                          ),
                          children: "Visit Us"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          className: clsx$1(
                            "text-sm mt-1 text-gray-600 transition-colors group-hover:text-gray-900",
                            "dark:text-gray-400 dark:group-hover:text-gray-200"
                          ),
                          children: "Baku, Azerbaijan"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: clsx$1(
                    "flex items-center gap-3 group p-4 transition-colors",
                    "hover:bg-gray-50",
                    "dark:hover:bg-[#1a1a1a]"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      Phone,
                      {
                        width: 24,
                        height: 24,
                        className: clsx$1(
                          "h-6 w-6 text-gray-600 transition-colors group-hover:text-black",
                          "dark:text-gray-300 dark:group-hover:text-white"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: clsx$1(
                            "font-semibold text-gray-900 group-hover:text-black transition-colors",
                            "dark:text-gray-100 dark:group-hover:text-white"
                          ),
                          children: "Call Us"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          className: clsx$1(
                            "text-sm mt-1 text-gray-600 group-hover:text-gray-900 transition-colors",
                            "dark:text-gray-400 dark:group-hover:text-gray-200"
                          ),
                          children: "+11 111 111 111"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: clsx$1(
                    "flex items-center gap-3 group p-4 transition-colors",
                    "hover:bg-gray-50",
                    "dark:hover:bg-[#1a1a1a]"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      Clock,
                      {
                        width: 24,
                        height: 24,
                        className: clsx$1(
                          "h-6 w-6 text-gray-600 group-hover:text-black transition-colors",
                          "dark:text-gray-300 dark:group-hover:text-white"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: clsx$1(
                            "font-semibold text-gray-900 group-hover:text-black transition-colors",
                            "dark:text-gray-100 dark:group-hover:text-white"
                          ),
                          children: "Working Hours"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          className: clsx$1(
                            "text-sm mt-1 text-gray-600 group-hover:text-gray-900 transition-colors",
                            "dark:text-gray-400 dark:group-hover:text-gray-200"
                          ),
                          children: "Mon - Sat: 10:00 AM - 7:00 PM"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: clsx$1(
                    "flex items-center gap-3 group p-4 transition-colors",
                    "hover:bg-gray-50",
                    "dark:hover:bg-[#1a1a1a]"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      Mail,
                      {
                        width: 24,
                        height: 24,
                        className: clsx$1(
                          "h-6 w-6 text-gray-600 group-hover:text-black transition-colors",
                          "dark:text-gray-300 dark:group-hover:text-white"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: clsx$1(
                            "font-semibold text-gray-900 group-hover:text-black transition-colors",
                            "dark:text-gray-100 dark:group-hover:text-white"
                          ),
                          children: "Email Us"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "p",
                        {
                          className: clsx$1(
                            "text-sm mt-1 text-gray-600 transition-colors group-hover:text-gray-900",
                            "dark:text-gray-400 dark:group-hover:text-gray-200"
                          ),
                          children: "Shopcart@gmail.com"
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsxs(
              "h2",
              {
                className: clsx$1(
                  "text-2xl font-black tracking-wider uppercase hoverEffect group",
                  "text-[#063c28] hover:text-[#3b9c3c]",
                  "dark:text-[#4ade80] dark:hover:text-[#3b9c3c]"
                ),
                children: [
                  "Shopcar",
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: clsx$1(
                        "text-[#3b9c3c] group-hover:text-[#063c28] hoverEffect",
                        "dark:text-[#3b9c3c] dark:group-hover:text-[#4ade80]"
                      ),
                      children: "t"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: clsx$1(
                  "text-sm text-gray-600",
                  "dark:text-gray-400"
                ),
                children: "Discover curated furniture collections at Shopcart, blending style and comfort to elevate your living spaces."
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx$1(
                  "flex items-center gap-3.5 text-[#151515]/60",
                  "dark:text-gray-400"
                ),
                children: [
                  Youtube,
                  Github,
                  Linkedin,
                  Facebook,
                  Slack
                ].map((Icon, idx) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: clsx$1(
                      "p-2 border rounded-full hoverEffect",
                      "border-[#151515]/60 hover:border-[#063c28] hover:text-[#063c28]",
                      "dark:border-gray-500 dark:hover:border-[#4ade80] dark:hover:text-[#4ade80]"
                    ),
                    children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" })
                  },
                  idx
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: clsx$1("font-semibold mb-4 text-gray-900", "dark:text-gray-100"), children: "Quick Links" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: ["about", "contact-us", "terms", "privacy", "faqs", "help"].map((page, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                href: `/${page}`,
                className: clsx$1(
                  "text-sm font-medium text-gray-600 hover:text-[#063c28] hoverEffect",
                  "dark:text-gray-400 dark:hover:text-[#4ade80]"
                ),
                children: page.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
              }
            ) }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: clsx$1("font-semibold text-gray-900 mb-4", "dark:text-gray-100"), children: "Categories" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: footerCategories.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
              Link,
              {
                href: `/category/${category.name}`,
                className: clsx$1(
                  "text-sm font-medium text-gray-600 hover:text-[#063c28] hoverEffect",
                  "dark:text-gray-400 dark:hover:text-[#4ade80]"
                ),
                children: category.name
              }
            ) }, category.id)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: clsx$1("font-semibold text-gray-900 mb-4", "dark:text-gray-100"), children: "Newsletter" }),
            /* @__PURE__ */ jsx("p", { className: clsx$1("text-sm mb-4 text-gray-600", "dark:text-gray-400"), children: "Subscribe to receive updates about discounts and exclusive offers." }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "email",
                    name: "email",
                    type: "email",
                    value: data.email,
                    onChange: (e) => setData("email", e.target.value),
                    className: clsx$1(
                      "w-full px-4 py-2 border rounded-lg focus:outline-hidden focus:ring-2",
                      errors.email ? "border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900" : "border-gray-300 focus:ring-gray-200 dark:border-gray-600 dark:focus:ring-gray-700",
                      "dark:bg-[#0f0f0f] dark:text-gray-200"
                    ),
                    placeholder: "Enter your email",
                    disabled: processing,
                    required: true
                  }
                ),
                errors.email && /* @__PURE__ */ jsxs("p", { className: "mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }),
                  errors.email
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  disabled: processing,
                  className: clsx$1(
                    "w-full px-4 py-2 rounded-lg transition-colors",
                    processing ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600" : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-[#4ade80] dark:hover:bg-[#22c55e] dark:text-black"
                  ),
                  children: processing ? "Subscribing..." : "Subscribe"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx$1(
              "py-6 text-center text-sm border-t",
              "border-neutral-200 text-gray-600",
              "dark:border-neutral-700 dark:text-gray-400"
            ),
            children: /* @__PURE__ */ jsxs("p", { children: [
              "© ",
              year,
              " ",
              /* @__PURE__ */ jsxs(
                "span",
                {
                  className: clsx$1(
                    "font-black tracking-wider uppercase hoverEffect group",
                    "text-[#063c28] hover:text-[#3b9c3c]",
                    "dark:text-[#4ade80] dark:hover:text-[#3b9c3c]"
                  ),
                  children: [
                    "Shopcar",
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: clsx$1(
                          "text-[#3b9c3c] group-hover:text-[#063c28] hoverEffect",
                          "dark:text-[#3b9c3c] dark:group-hover:text-[#4ade80]"
                        ),
                        children: "t"
                      }
                    )
                  ]
                }
              ),
              ". All rights reserved."
            ] })
          }
        )
      ] })
    }
  );
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Footer
}, Symbol.toStringTag, { value: "Module" }));
const LikesContext = createContext(void 0);
const LS_IDS = "wishlist_ids";
const LS_PRODUCTS = "wishlist";
if (typeof window !== "undefined" && !window.__wishlistStore) {
  let savedIds = [];
  let savedProducts = [];
  try {
    savedIds = JSON.parse(localStorage.getItem("wishlist_ids") || "[]");
    savedProducts = JSON.parse(localStorage.getItem("wishlist") || "[]");
  } catch {
  }
  window.__wishlistStore = {
    likedItems: Array.isArray(savedIds) ? savedIds : [],
    guestProducts: Array.isArray(savedProducts) ? savedProducts : [],
    initialized: false,
    currentUserId: null,
    listeners: /* @__PURE__ */ new Set()
  };
}
const getGlobalStore = () => {
  if (typeof window === "undefined") {
    return { likedItems: [], guestProducts: [], initialized: false, currentUserId: null, listeners: /* @__PURE__ */ new Set() };
  }
  return window.__wishlistStore;
};
const notifyListeners = () => {
  const store = getGlobalStore();
  store.listeners.forEach((listener) => listener());
};
const LikesProvider = ({ children }) => {
  const { props } = usePage();
  const auth = props?.auth;
  const initialLikedIds = props?.initialLikedIds ?? [];
  const store = getGlobalStore();
  const [updateCounter, setUpdateCounter] = useState(0);
  const syncInProgressRef = useRef(false);
  const hasLoadedGuestDataRef = useRef(false);
  useEffect(() => {
    const currentUserId = auth?.user?.id ?? null;
    const userChanged = store.currentUserId !== currentUserId;
    if (userChanged) {
      console.log("User changed, reinitializing...", {
        prevUser: store.currentUserId,
        newUser: currentUserId
      });
      store.initialized = false;
      store.currentUserId = currentUserId;
      syncInProgressRef.current = false;
      hasLoadedGuestDataRef.current = false;
    }
    if (store.initialized && !userChanged) {
      if (auth?.user && Array.isArray(initialLikedIds)) {
        const currentIds = JSON.stringify([...initialLikedIds].sort());
        const storedIds = JSON.stringify([...store.likedItems || []].sort());
        if (currentIds !== storedIds) {
          console.log("Updating from server:", initialLikedIds);
          store.likedItems = [...initialLikedIds];
          notifyListeners();
        }
      }
      return;
    }
    if (auth?.user) {
      let guestIds = [];
      if (!hasLoadedGuestDataRef.current) {
        try {
          const rawIds = JSON.parse(localStorage.getItem(LS_IDS) || "[]");
          guestIds = Array.isArray(rawIds) ? rawIds.filter((i) => typeof i === "number") : [];
          hasLoadedGuestDataRef.current = true;
        } catch {
          guestIds = [];
        }
      }
      if (guestIds.length > 0 && !syncInProgressRef.current) {
        syncInProgressRef.current = true;
        const serverIds = Array.isArray(initialLikedIds) ? [...initialLikedIds] : [];
        const mergedIds = [.../* @__PURE__ */ new Set([...serverIds, ...guestIds])];
        store.likedItems = mergedIds;
        store.guestProducts = [];
        console.log("Syncing guest likes with server...", guestIds);
        if (typeof window !== "undefined") {
          localStorage.removeItem(LS_PRODUCTS);
          localStorage.removeItem(LS_IDS);
        }
        router.post(
          "/wishlist/sync",
          { product_ids: guestIds },
          {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
              syncInProgressRef.current = false;
            },
            onError: (errors) => {
              syncInProgressRef.current = false;
            }
          }
        );
      } else {
        store.likedItems = Array.isArray(initialLikedIds) ? [...initialLikedIds] : [];
        store.guestProducts = [];
        if (typeof window !== "undefined") {
          localStorage.removeItem(LS_PRODUCTS);
          localStorage.removeItem(LS_IDS);
        }
        notifyListeners();
      }
    } else {
      try {
        const rawIds = JSON.parse(localStorage.getItem(LS_IDS) || "[]");
        const rawProducts = JSON.parse(localStorage.getItem(LS_PRODUCTS) || "[]");
        store.likedItems = Array.isArray(rawIds) ? rawIds.filter((i) => typeof i === "number") : [];
        store.guestProducts = Array.isArray(rawProducts) ? rawProducts : [];
        console.log("Guest mode - loaded from localStorage:", {
          ids: store.likedItems,
          products: store.guestProducts
        });
      } catch {
        store.likedItems = [];
        store.guestProducts = [];
      }
      notifyListeners();
    }
    store.initialized = true;
    notifyListeners();
  }, [auth?.user?.id, initialLikedIds]);
  useEffect(() => {
    const listener = () => setUpdateCounter((prev) => prev + 1);
    store.listeners.add(listener);
    return () => {
      store.listeners.delete(listener);
    };
  }, []);
  useEffect(() => {
    if (typeof window === "undefined" || auth?.user) return;
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(store.guestProducts || []));
    localStorage.setItem(LS_IDS, JSON.stringify(store.likedItems || []));
  }, [updateCounter, auth?.user]);
  const addGuestProduct = useCallback((p) => {
    const store2 = getGlobalStore();
    if (!store2.guestProducts.some((x) => x.id === p.id)) {
      store2.guestProducts = [...store2.guestProducts, p];
    }
    if (!store2.likedItems.includes(p.id)) {
      store2.likedItems = [...store2.likedItems, p.id];
    }
    if (typeof window !== "undefined" && !auth?.user) {
      localStorage.setItem(LS_PRODUCTS, JSON.stringify(store2.guestProducts));
      localStorage.setItem(LS_IDS, JSON.stringify(store2.likedItems));
    }
    notifyListeners();
  }, [auth?.user]);
  const removeGuestProduct = useCallback((id) => {
    const store2 = getGlobalStore();
    store2.guestProducts = store2.guestProducts.filter((p) => p.id !== id);
    store2.likedItems = store2.likedItems.filter((i) => i !== id);
    if (typeof window !== "undefined" && !auth?.user) {
      localStorage.setItem(LS_PRODUCTS, JSON.stringify(store2.guestProducts));
      localStorage.setItem(LS_IDS, JSON.stringify(store2.likedItems));
    }
    notifyListeners();
  }, [auth?.user]);
  const resetGuestWishlist = useCallback(() => {
    const store2 = getGlobalStore();
    store2.guestProducts = [];
    store2.likedItems = [];
    if (typeof window !== "undefined") {
      localStorage.removeItem(LS_PRODUCTS);
      localStorage.removeItem(LS_IDS);
    }
    notifyListeners();
  }, []);
  const toggleLikeById = useCallback((p) => {
    const store2 = getGlobalStore();
    if (store2.likedItems.includes(p.id)) {
      removeGuestProduct(p.id);
    } else {
      addGuestProduct(p);
    }
  }, [removeGuestProduct, addGuestProduct]);
  const addLikedIdLocal = useCallback((id) => {
    const store2 = getGlobalStore();
    if (!store2.likedItems.includes(id)) {
      store2.likedItems = [...store2.likedItems, id];
      notifyListeners();
    }
  }, []);
  const removeLikedIdLocal = useCallback((id) => {
    const store2 = getGlobalStore();
    store2.likedItems = store2.likedItems.filter((x) => x !== id);
    notifyListeners();
  }, []);
  const setLikedIds = useCallback((ids) => {
    const store2 = getGlobalStore();
    store2.likedItems = Array.isArray(ids) ? [...ids] : [];
    notifyListeners();
  }, []);
  const contextValue = {
    likedItems: store.likedItems || [],
    guestProducts: store.guestProducts || [],
    addGuestProduct,
    removeGuestProduct,
    resetGuestWishlist,
    toggleLikeById,
    addLikedIdLocal,
    removeLikedIdLocal,
    setLikedIds
  };
  return /* @__PURE__ */ jsx(LikesContext.Provider, { value: contextValue, children });
};
const useLikes = () => {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error("useLikes must be used within LikesProvider");
  return ctx;
};
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LikesProvider,
  useLikes
}, Symbol.toStringTag, { value: "Module" }));
const CartContext = createContext(void 0);
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cartItems");
        if (stored) {
          const parsed = JSON.parse(stored);
          return Array.isArray(parsed) ? parsed.map((item) => ({
            ...item,
            price: Number(item.price) || 0,
            discount: Number(item.discount) || 0,
            stock: Number(item.stock) || 0,
            quantity: Number(item.quantity) || 1
          })) : [];
        }
      } catch (e) {
        localStorage.removeItem("cartItems");
      }
    }
    return [];
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);
  const addCart = useCallback((userId, product) => {
    let showSuccess = false;
    let showLimit = false;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);
      if (existing) {
        if (existing.quantity < product.stock) {
          showSuccess = true;
          return prev.map(
            (i) => i.product_id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        showLimit = true;
        return prev;
      }
      showSuccess = true;
      return [
        ...prev,
        {
          user_id: userId ?? 0,
          product_id: product.id,
          name: product.name,
          price: product.sell_price,
          stock: product.stock,
          discount: product.discount,
          image: `/storage/${product.image}`,
          quantity: 1,
          category: product.category?.name ?? ""
        }
      ];
    });
    if (showSuccess) {
      toast.success("Product added to cart.");
    }
    if (showLimit) {
      toast.error("Product limit reached.");
    }
  }, []);
  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((i) => i.product_id !== productId));
  }, []);
  const increment = useCallback((productId, stock) => {
    setCartItems(
      (prev) => prev.map(
        (item) => item.product_id === productId && item.quantity < stock ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.success("Product added to cart.");
  }, []);
  const decrement = useCallback((productId) => {
    setCartItems(
      (prev) => prev.map(
        (item) => item.product_id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0)
    );
    toast.success("Product removed from cart.");
  }, []);
  const getQuantity = useCallback((productId) => {
    const item = cartItems.find((i) => i.product_id === productId);
    return item ? item.quantity : 0;
  }, [cartItems]);
  const resetCart = useCallback(() => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cart");
    }
  }, []);
  const totalCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );
  const contextValue = useMemo(
    () => ({
      cartItems,
      addCart,
      removeFromCart,
      increment,
      decrement,
      getQuantity,
      totalCount,
      resetCart
    }),
    [
      cartItems,
      addCart,
      removeFromCart,
      increment,
      decrement,
      getQuantity,
      totalCount,
      resetCart
    ]
  );
  return /* @__PURE__ */ jsx(CartContext.Provider, { value: contextValue, children });
};
const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CartProvider,
  useCart
}, Symbol.toStringTag, { value: "Module" }));
function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      return savedTheme || systemTheme;
    }
    return "light";
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleTheme,
      className: "p-2 rounded-full cursor-pointer hoverEffect transition-colors focus:outline-none",
      "aria-label": "Toggle Theme",
      children: theme === "light" ? /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5 text-gray-800 dark:text-gray-200 hover:text-[#3b9c3c] dark:hover:text-[#3b9c3c]" }) : /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5 text-gray-800 dark:text-gray-200 hover:text-[#3b9c3c] dark:hover:text-[#3b9c3c]" })
    }
  );
}
function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return fallback;
  }
  return children;
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function useFlashMessages() {
  const { flash: flash2 } = usePage().props;
  useEffect(() => {
    if (flash2?.message) {
      toast.success(flash2.message);
    }
    if (flash2?.error) {
      toast.error(flash2.error);
    }
    if (flash2?.warning) {
      toast(flash2.warning, {
        icon: "⚠️"
      });
    }
    if (flash2?.info) {
      toast(flash2.info, {
        icon: "ℹ️"
      });
    }
  }, [flash2]);
}
function AuthModal({ defaultTab = "login", isOpen }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      setErrors({});
      setLoginData({ email: "", password: "" });
      setRegisterData({ name: "", email: "", password: "", password_confirmation: "" });
    }
  }, [isOpen, defaultTab]);
  const handleLogin = (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    router.post("/login", loginData, {
      onSuccess: () => {
        setProcessing(false);
        if (onClose) onClose();
      },
      onError: (errors2) => {
        setProcessing(false);
        setErrors(errors2);
      }
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    router.post("/register", registerData, {
      onSuccess: () => {
        setProcessing(false);
        if (onClose) onClose();
      },
      onError: (errors2) => {
        setProcessing(false);
        setErrors(errors2);
      }
    });
  };
  useFlashMessages();
  return /* @__PURE__ */ jsxs(DialogContent, { className: "dark:text-white dark:[&>button]:text-white w-[400px] max-h-[90vh] overflow-y-auto", children: [
    activeTab === "login" && /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in-50 duration-300", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "text-black dark:text-white", children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Login to your account" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Enter your email below to login to your account." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col text-black dark:text-white mt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              placeholder: "m@example.com",
              value: loginData.email,
              onChange: (e) => setLoginData({ ...loginData, email: e.target.value }),
              required: true
            }
          ),
          errors.email && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-sm", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/forgot-password",
                className: "ml-auto inline-block text-sm underline-offset-4 hover:underline text-[#063c28] dark:text-[#7fc17f]",
                children: "Forgot your password?"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              value: loginData.password,
              onChange: (e) => setLoginData({ ...loginData, password: e.target.value }),
              required: true
            }
          ),
          errors.password && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-sm", children: errors.password })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "flex gap-2 flex-col! mt-6", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleLogin,
            disabled: processing,
            className: "w-full bg-[#063d29cc] hover:bg-[#063c28] dark:bg-[#2a6a2a] dark:hover:bg-[#1e4f1e]",
            children: processing ? "Loading..." : "Login"
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "w-full",
            onClick: () => window.location.href = "/auth/google",
            children: [
              /* @__PURE__ */ jsxs("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
                /* @__PURE__ */ jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
                /* @__PURE__ */ jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
                /* @__PURE__ */ jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
              ] }),
              "Login with Google"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-center text-gray-600 dark:text-gray-400 mt-2", children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("register"),
              className: "font-semibold text-[#063c28] dark:text-[#7fc17f] hover:underline underline-offset-4",
              children: "Sign up"
            }
          )
        ] })
      ] })
    ] }),
    activeTab === "register" && /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in-50 duration-300", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "text-black dark:text-white", children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Create an account" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Enter your information to create an account." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col text-black dark:text-white mt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              type: "text",
              placeholder: "John Doe",
              value: registerData.name,
              onChange: (e) => setRegisterData({ ...registerData, name: e.target.value }),
              required: true
            }
          ),
          errors.name && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-sm", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "reg-email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "reg-email",
              type: "email",
              placeholder: "m@example.com",
              value: registerData.email,
              onChange: (e) => setRegisterData({ ...registerData, email: e.target.value }),
              required: true
            }
          ),
          errors.email && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-sm", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "reg-password", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "reg-password",
              type: "password",
              value: registerData.password,
              onChange: (e) => setRegisterData({ ...registerData, password: e.target.value }),
              required: true
            }
          ),
          errors.password && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-sm", children: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "confirm-password", children: "Confirm Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "confirm-password",
              type: "password",
              value: registerData.password_confirmation,
              onChange: (e) => setRegisterData({ ...registerData, password_confirmation: e.target.value }),
              required: true
            }
          ),
          errors.password_confirmation && /* @__PURE__ */ jsx("span", { className: "text-red-500 text-sm", children: errors.password_confirmation })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "flex gap-2 flex-col! mt-6", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleRegister,
            disabled: processing,
            className: "w-full bg-[#063d29cc] hover:bg-[#063c28] dark:bg-[#2a6a2a] dark:hover:bg-[#1e4f1e]",
            children: processing ? "Loading..." : "Sign Up"
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "w-full",
            onClick: () => window.location.href = "/auth/google",
            children: [
              /* @__PURE__ */ jsxs("svg", { className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
                /* @__PURE__ */ jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
                /* @__PURE__ */ jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
                /* @__PURE__ */ jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
              ] }),
              "Sign up with Google"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-center text-gray-600 dark:text-gray-400 mt-2", children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("login"),
              className: "font-semibold text-[#063c28] dark:text-[#7fc17f] hover:underline underline-offset-4",
              children: "Sign in"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AuthModal
}, Symbol.toStringTag, { value: "Module" }));
const NAVIGATION_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/hot-deal", label: "Hot Deal" }
];
const NavigationLinks = memo(({ links, url }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: links.map((link) => {
    const linkUrl = link.href;
    const isActive = url === linkUrl || linkUrl !== "/" && url.startsWith(linkUrl);
    return /* @__PURE__ */ jsxs(
      Link,
      {
        href: linkUrl,
        prefetch: "hover",
        className: clsx$1(
          "group hoverEffect relative transition-colors duration-150",
          isActive ? "text-[#3b9c3c]" : "text-[#52525b] hover:text-[#3b9c3c]",
          isActive ? "dark:text-[#4ade80]" : "dark:text-gray-300 dark:hover:text-[#4ade80]"
        ),
        children: [
          link.label,
          /* @__PURE__ */ jsx(
            "span",
            {
              className: clsx$1(
                "absolute -bottom-0.5 left-1/2 h-0.5 bg-[#3b9c3c] transition-all duration-150 pointer-events-none",
                isActive ? "left-0 w-1/2" : "w-0 group-hover:left-0 group-hover:w-1/2",
                "dark:bg-[#4ade80]"
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: clsx$1(
                "absolute right-1/2 -bottom-0.5 h-0.5 bg-[#3b9c3c] transition-all duration-150 pointer-events-none",
                isActive ? "right-0 w-1/2" : "w-0 group-hover:right-0 group-hover:w-1/2",
                "dark:bg-[#4ade80]"
              )
            }
          )
        ]
      },
      linkUrl
    );
  }) });
});
NavigationLinks.displayName = "NavigationLinks";
const MobileMenu = memo(({ isMenuOpen, toggleMenu, links, url }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx$1(
        `fixed inset-0 left-0 z-50 h-screen w-full transform bg-[#171717]/50 shadow-xl backdrop-blur-sm transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`,
        "bg-black/40",
        "dark:bg-[#171717]/60"
      ),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx$1(
            "z-50 flex h-screen max-w-96 min-w-72 flex-col gap-6 border-r p-10",
            "bg-white text-zinc-800 border-r-[#0e6a3f]",
            "dark:bg-black dark:text-[#fafafa] dark:border-r-[#063c28]"
          ),
          style: { opacity: 1 },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(Link, { href: "/", prefetch: "hover", onClick: toggleMenu, children: /* @__PURE__ */ jsxs(
                "h2",
                {
                  className: clsx$1(
                    "hoverEffect group font-sans text-2xl font-black tracking-wider uppercase transition-colors",
                    "text-black hover:text-[#3b9c3c]",
                    "dark:text-white dark:hover:text-[#3b9c3c]"
                  ),
                  children: [
                    "Shopcar",
                    /* @__PURE__ */ jsx("span", { className: "hoverEffect text-[#3b9c3c] group-hover:text-[#063c28]", children: "t" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: clsx$1(
                    "hoverEffect transition-colors",
                    "text-black hover:text-[#063c28]",
                    "dark:text-white dark:hover:text-[#063c28]"
                  ),
                  onClick: toggleMenu,
                  children: /* @__PURE__ */ jsx(X, {})
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx$1(
                  "flex flex-col gap-3.5 text-base font-semibold tracking-wide transition-colors",
                  "bg-white text-zinc-600",
                  "dark:bg-black dark:text-zinc-400"
                ),
                children: links.map((link) => {
                  const linkUrl = link.href;
                  const isActive = url === linkUrl || linkUrl !== "/" && url.startsWith(linkUrl);
                  return /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: linkUrl,
                      prefetch: "hover",
                      onClick: toggleMenu,
                      className: clsx$1(
                        "hoverEffect transition-colors duration-150",
                        isActive ? "text-[#3b9c3c]" : "text-gray-600 hover:text-[#3b9c3c]",
                        isActive ? "dark:text-[#4ade80]" : "dark:text-gray-400 dark:hover:text-[#4ade80]"
                      ),
                      children: link.label
                    },
                    linkUrl
                  );
                })
              }
            )
          ]
        }
      )
    }
  );
});
MobileMenu.displayName = "MobileMenu";
function Header({ onOpenSearch }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { url, props } = usePage();
  const auth = props?.auth;
  const user = auth?.user;
  const { likedItems } = useLikes();
  const { cartItems } = useCart();
  const totalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);
  const handleLogout = () => {
    router.post("/logout", {}, {
      onSuccess: () => {
        setUserMenuOpen(false);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: clsx$1(
        "sticky top-0 z-50 py-5 backdrop-blur-md transition-colors",
        "bg-white/70 text-[#52525b]",
        "dark:bg-[#0e0e0e]/70 dark:text-gray-300"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-7 px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex w-auto items-center justify-start gap-2.5 md:w-1/3 md:gap-0", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: toggleMenu, className: "md:hidden", children: /* @__PURE__ */ jsx(
            TextAlignStart,
            {
              className: clsx$1(
                "hoverEffect h-6 w-6 transition-colors",
                "text-[#52525b] hover:text-[#3b9c3c]",
                "dark:text-gray-300 dark:hover:text-[#4ade80]"
              )
            }
          ) }),
          isMenuOpen && /* @__PURE__ */ jsx(
            MobileMenu,
            {
              isMenuOpen,
              toggleMenu,
              links: NAVIGATION_LINKS,
              url
            }
          ),
          /* @__PURE__ */ jsx(Link, { href: "/", prefetch: "hover", children: /* @__PURE__ */ jsxs(
            "h2",
            {
              className: clsx$1(
                "hoverEffect group font-poppins text-2xl font-extrabold tracking-wider uppercase transition-colors",
                "text-[#063c28] hover:text-[#3b9c3c]",
                "dark:text-[#4ade80] dark:hover:text-[#3b9c3c]"
              ),
              children: [
                "Shopcar",
                /* @__PURE__ */ jsx("span", { className: "hoverEffect text-[#3b9c3c] group-hover:text-[#063c28] dark:group-hover:text-[#4ade80]", children: "t" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx$1(
              "hidden w-1/3 items-center justify-center gap-7 text-sm font-semibold capitalize md:inline-flex",
              "text-[#52525b]",
              "dark:text-gray-300"
            ),
            children: /* @__PURE__ */ jsx(NavigationLinks, { links: NAVIGATION_LINKS, url })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex w-auto items-center justify-end gap-5 md:w-1/3", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "flex items-center", onClick: onOpenSearch, children: /* @__PURE__ */ jsx(
            Search,
            {
              size: 22,
              className: clsx$1(
                "hoverEffect transition-colors",
                "text-gray-600 hover:text-[#3b9c3c]",
                "dark:text-gray-300 dark:hover:text-[#4ade80]"
              )
            }
          ) }),
          /* @__PURE__ */ jsxs(Link, { href: "/basket", prefetch: "hover", className: "group relative", children: [
            /* @__PURE__ */ jsx(
              ShoppingBag,
              {
                size: 22,
                className: clsx$1(
                  "hoverEffect transition-colors",
                  "text-gray-600 hover:text-[#3b9c3c]",
                  "dark:text-gray-300 dark:hover:text-[#4ade80]"
                )
              }
            ),
            totalCount > 0 && /* @__PURE__ */ jsx(
              "span",
              {
                className: clsx$1(
                  "absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold",
                  "bg-[#063d29] text-white",
                  "dark:bg-[#4ade80] dark:text-black"
                ),
                children: totalCount
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Link, { href: "/wishlist", prefetch: "hover", className: "group hoverEffect relative", children: [
            /* @__PURE__ */ jsx(
              Heart,
              {
                size: 22,
                className: clsx$1(
                  "hoverEffect transition-colors",
                  "text-gray-600 hover:text-[#3b9c3c]",
                  "dark:text-gray-300 dark:hover:text-[#4ade80]"
                )
              }
            ),
            likedItems.length > 0 && /* @__PURE__ */ jsx(
              "span",
              {
                className: clsx$1(
                  "absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold",
                  "bg-[#063d29] text-white",
                  "dark:bg-[#4ade80] dark:text-black"
                ),
                children: likedItems.length
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ClientOnly, { fallback: /* @__PURE__ */ jsx("div", { className: "p-2 w-9 h-9" }), children: /* @__PURE__ */ jsx(ThemeToggle, {}) }),
          user ? /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative",
              ref: menuRef,
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setUserMenuOpen(!userMenuOpen),
                    className: "cursor-pointer",
                    children: user.image ? /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: user.image,
                        alt: user.name || "User",
                        className: clsx$1(
                          "hoverEffect h-8 w-8 rounded-full border-2 object-cover transition-colors",
                          "border-gray-300 hover:border-[#3b9c3c]",
                          "dark:border-gray-500 dark:hover:border-[#4ade80]"
                        )
                      }
                    ) : /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: clsx$1(
                          "hoverEffect flex h-8 w-8 items-center justify-center rounded-full font-semibold transition-colors",
                          "bg-[#063c28] text-white hover:bg-[#3b9c3c]",
                          "dark:bg-[#4ade80] dark:text-black dark:hover:bg-[#22c55e]"
                        ),
                        children: user.name ? user.name.charAt(0).toUpperCase() : /* @__PURE__ */ jsx(User, { size: 18 })
                      }
                    )
                  }
                ),
                userMenuOpen && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: clsx$1(
                      "absolute right-0 mt-2 w-48 rounded-lg shadow-lg backdrop-blur-md z-50",
                      "bg-white/95 border border-gray-200",
                      "dark:bg-[#1a1a1a]/95 dark:border-[#333]"
                    ),
                    children: /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
                      /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 border-b border-gray-200 dark:border-[#333]", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-white truncate", children: user.name }),
                        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 truncate", children: user.email })
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: handleLogout,
                          className: clsx$1(
                            "flex items-center gap-2 px-4 py-2.5 text-sm w-full text-left transition-colors cursor-pointer",
                            "text-red-600 hover:bg-red-50",
                            "dark:text-red-400 dark:hover:bg-red-900/20"
                          ),
                          children: [
                            /* @__PURE__ */ jsx(LogOut, { size: 16 }),
                            "Logout"
                          ]
                        }
                      )
                    ] })
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxs(Dialog, { open: loginOpen, onOpenChange: setLoginOpen, children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setLoginOpen(true),
                className: clsx$1(
                  "hoverEffect text-sm font-semibold transition-colors",
                  "hover:text-[#0a0a0a]",
                  "dark:text-gray-300 dark:hover:text-white"
                ),
                children: "Login"
              }
            ) }),
            /* @__PURE__ */ jsx(AuthModal, { defaultTab: "login", isOpen: loginOpen, onClose: () => setLoginOpen(false) })
          ] })
        ] })
      ] })
    }
  );
}
const Header$1 = memo(Header);
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Header$1
}, Symbol.toStringTag, { value: "Module" }));
function Card({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      ),
      ...props
    }
  );
}
function CardContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "card-content", className: cn("px-6", className), ...props });
}
function CardFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}
function ForgotPassword({ status }) {
  const { data, setData, processing, errors } = useForm({
    email: ""
  });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    router.post("/forgot-password", {
      email: data.email
    }, {
      onSuccess: () => {
        toast.success("Please check your email and reset your password."), setSent(true);
      },
      onError: () => {
        toast.error(
          /* @__PURE__ */ jsxs("div", { children: [
            "Something went wrong.",
            /* @__PURE__ */ jsx("br", {}),
            "Please try again."
          ] })
        );
      }
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Forgot Password?" }),
      /* @__PURE__ */ jsx(CardDescription, { children: status ? "Please check your email and reset your password." : "Enter your email to get a reset link" }),
      /* @__PURE__ */ jsx(CardAction, { children: /* @__PURE__ */ jsx(Link, { href: "/", className: "text-sm text-black dark:text-white", children: "Go back" }) })
    ] }),
    sent ? /* @__PURE__ */ jsx("div", { className: "text-sm text-center text-black dark:text-white", children: "We have emailed your password reset link." }) : /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "email",
          placeholder: "m@example.com",
          value: data.email,
          onChange: (e) => setData("email", e.target.value),
          required: true
        }
      ),
      errors.email && /* @__PURE__ */ jsx("div", { className: "text-sm text-red-600 mt-2", children: errors.email })
    ] }) }),
    !sent ? /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        className: "w-full cursor-pointer",
        onClick: handleSubmit,
        disabled: processing,
        children: processing ? "Sending..." : "Send Reset Link"
      }
    ) }) : /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Link, { href: "/", className: "w-full", children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", children: "Back to Home" }) }) })
  ] }) });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    router.post("/reset-password", {
      token: data.token,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    }, {
      onSuccess: () => {
        toast.success("Password reset successfully. Please login."), setTimeout(() => {
          router.visit("/");
        }, 3e3);
      },
      onError: () => {
        toast.error(
          /* @__PURE__ */ jsxs("div", { children: [
            "Something went wrong.",
            /* @__PURE__ */ jsx("br", {}),
            "Please try again."
          ] })
        );
      }
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Reset Password" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Enter your new password" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", className: "mt-1", children: "Email" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "email",
            type: "email",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            readOnly: true
          }
        ),
        errors.email && /* @__PURE__ */ jsx("div", { className: "text-sm text-red-600 mt-1", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "New Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "password",
            type: "password",
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        errors.password && /* @__PURE__ */ jsx("div", { className: "text-sm text-red-600 mt-1", children: errors.password })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "password_confirmation", children: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "password_confirmation",
            type: "password",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        className: "w-full cursor-pointer",
        onClick: handleSubmit,
        disabled: processing,
        children: processing ? "Resetting..." : "Reset Password"
      }
    ) })
  ] }) });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Group, { "data-slot": "select-group", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.Label,
    {
      "data-slot": "select-label",
      className: cn("text-muted-foreground px-2 py-1.5 text-xs", className),
      ...props
    }
  );
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn("flex cursor-default items-center justify-center py-1", className),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn("flex cursor-default items-center justify-center py-1", className),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
function Address({ onAddressSubmit, cartItems }) {
  const page = usePage();
  const auth = page.props?.auth;
  const [open, setOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    surname: "",
    address: "",
    phone: "",
    payment_type: "",
    items: []
  });
  const [localError, setLocalError] = useState({});
  const validate = (field, value) => {
    if (!value || !value.toString().trim()) {
      return field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ") + " is required";
    }
    if (field === "phone") {
      const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/;
      if (!phoneRegex.test(value)) {
        return "Please enter a valid phone number (10-15 digits)";
      }
    }
    return "";
  };
  const handleChange = (field, value) => {
    setData(field, value);
    const error = validate(field, value);
    setLocalError((prev) => {
      const updated = { ...prev };
      if (error) updated[field] = error;
      else delete updated[field];
      return updated;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!auth || !auth.user) {
      toast.error("Please login to place an order.");
      router.visit("/login");
      return;
    }
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    const newErrors = {};
    const requiredFields = [
      "name",
      "surname",
      "address",
      "phone",
      "payment_type"
    ];
    requiredFields.forEach((field) => {
      const err = validate(field, data[field]);
      if (err) newErrors[field] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setLocalError(newErrors);
      toast.error("Please fill all required fields correctly");
      return;
    }
    const itemsPayload = cartItems.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: Number(item.price) || 0,
      discount_price: item.discount > 0 ? Number((item.price * (item.discount / 100)).toFixed(2)) : null
    }));
    if (data.payment_type === "card") {
      sessionStorage.setItem("orderData", JSON.stringify({
        name: data.name,
        surname: data.surname,
        address: data.address,
        phone: data.phone,
        payment_type: data.payment_type
      }));
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      const total = cartItems.reduce((sum, item) => {
        const price2 = Number(item.price) || 0;
        const discount = Number(item.discount) || 0;
        const finalPrice = price2 * (1 - discount / 100);
        return sum + finalPrice * item.quantity;
      }, 0);
      sessionStorage.setItem("cartTotal", total.toString());
      toast.success("Proceeding to payment...");
      router.visit("/payment");
      setOpen(false);
      reset();
      setLocalError({});
      return;
    }
    router.post(
      "/basket",
      {
        name: data.name,
        surname: data.surname,
        address: data.address,
        phone: data.phone,
        payment_type: data.payment_type,
        items: itemsPayload
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Order placed successfully! Pay cash on delivery.");
          try {
            sessionStorage.setItem(
              "addressData",
              JSON.stringify({
                name: data.name,
                surname: data.surname,
                address: data.address,
                phone: data.phone
              })
            );
          } catch (e2) {
          }
          reset();
          setOpen(false);
          setLocalError({});
          onAddressSubmit?.();
        },
        onError: (err) => {
          if (err && typeof err === "object") {
            setLocalError((p) => ({ ...p, ...err }));
          }
          toast.error(
            "Error creating order. Please check all fields."
          );
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => setOpen(true),
        className: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md\r\n                text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1\r\n                focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50\r\n                [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border\r\n                border-neutral-300 bg-white text-black dark:bg-neutral-800 dark:text-white dark:border-neutral-700\r\n                shadow-xs hover:bg-[#f5f5f5] dark:hover:bg-neutral-700\r\n                hover:text-[#171717] h-9 px-4 py-2 w-full mt-4",
        children: "Add Address"
      }
    ),
    /* @__PURE__ */ jsxs(DialogContent, { className: "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "dark:text-white", children: "Delivery Address" }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "dark:text-neutral-300", children: "Please fill in your delivery address below." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Name",
            value: data.name,
            onChange: (e) => handleChange("name", e.target.value),
            className: clsx$1(
              "transition-colors border bg-white dark:bg-neutral-800 dark:text-white",
              localError.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-neutral-700 focus:ring-gray-400"
            )
          }
        ),
        (localError.name || errors.name) && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: localError.name || errors.name }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Surname",
            value: data.surname,
            onChange: (e) => handleChange("surname", e.target.value),
            className: clsx$1(
              "transition-colors border bg-white dark:bg-neutral-800 dark:text-white",
              localError.surname ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-neutral-700 focus:ring-gray-400"
            )
          }
        ),
        (localError.surname || errors.surname) && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: localError.surname || errors.surname }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Address",
            value: data.address,
            onChange: (e) => handleChange("address", e.target.value),
            className: clsx$1(
              "transition-colors border bg-white dark:bg-neutral-800 dark:text-white",
              localError.address ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-neutral-700 focus:ring-gray-400"
            )
          }
        ),
        (localError.address || errors.address) && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: localError.address || errors.address }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Phone Number",
            value: data.phone,
            onChange: (e) => handleChange("phone", e.target.value),
            className: clsx$1(
              "transition-colors border bg-white dark:bg-neutral-800 dark:text-white",
              localError.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-neutral-700 focus:ring-gray-400"
            )
          }
        ),
        (localError.phone || errors.phone) && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: localError.phone || errors.phone }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: data.payment_type,
            onValueChange: (value) => handleChange("payment_type", value),
            children: [
              /* @__PURE__ */ jsx(
                SelectTrigger,
                {
                  className: clsx$1(
                    "bg-white text-neutral-900 w-full dark:bg-neutral-800 dark:text-white transition-colors border",
                    localError.payment_type ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-neutral-700 focus:ring-gray-400"
                  ),
                  children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select Payment Method" })
                }
              ),
              /* @__PURE__ */ jsx(SelectContent, { className: "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-md", children: /* @__PURE__ */ jsxs(SelectGroup, { children: [
                /* @__PURE__ */ jsx(SelectLabel, { className: "text-neutral-600 dark:text-neutral-400", children: "Payment Method" }),
                /* @__PURE__ */ jsx(
                  SelectItem,
                  {
                    value: "cash",
                    className: "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                    children: "Cash on Delivery"
                  }
                ),
                /* @__PURE__ */ jsx(
                  SelectItem,
                  {
                    value: "card",
                    className: "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                    children: "Credit/Debit Card"
                  }
                )
              ] }) })
            ]
          }
        ),
        (localError.payment_type || errors.payment_type) && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: localError.payment_type || errors.payment_type }),
        /* @__PURE__ */ jsxs(DialogFooter, { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              className: "cursor-pointer hover:bg-neutral-100 hover:text-black dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600",
              children: "Cancel"
            }
          ) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              className: "bg-neutral-800 border dark:border-neutral-950 dark:bg-neutral-900 text-white hover:bg-neutral-950 dark:hover:bg-neutral-950 cursor-pointer",
              disabled: processing,
              children: processing ? "Processing..." : "Continue"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Address
}, Symbol.toStringTag, { value: "Module" }));
function FavoriteButton({ product, children }) {
  const { auth } = usePage().props;
  const { likedItems, toggleLikeById, addLikedIdLocal, removeLikedIdLocal } = useLikes();
  const isFavorite = likedItems.includes(product.id);
  const handleGuestToggle = () => {
    const item = {
      id: product.id,
      name: product.name || "",
      image: typeof product.image === "string" ? product.image.startsWith("http") || product.image.startsWith("/storage/") ? product.image : `/storage/${product.image}` : "",
      category: product.category ?? null,
      brand: product.brand ?? null,
      is_active: product.is_active ?? true,
      sell_price: product.sell_price ?? 0,
      discount: product.discount ?? 0,
      stock: product.stock ?? 0
    };
    toggleLikeById(item);
  };
  const handleAuthToggle = () => {
    if (isFavorite) {
      removeLikedIdLocal(product.id);
      router.delete(`/wishlist/${product.id}`, {
        preserveState: true,
        preserveScroll: true,
        onError: () => {
          addLikedIdLocal(product.id);
        }
      });
    } else {
      addLikedIdLocal(product.id);
      router.post(
        "/wishlist",
        { product_id: product.id },
        {
          preserveState: true,
          preserveScroll: true,
          onError: () => {
            removeLikedIdLocal(product.id);
          }
        }
      );
    }
  };
  const onClick = () => {
    auth?.user ? handleAuthToggle() : handleGuestToggle();
  };
  if (children) {
    return /* @__PURE__ */ jsx("div", { onClick, children: children(isFavorite) });
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      onClick,
      className: `p-2.5 rounded-full border-0 hoverEffect
            hover:bg-[#063c28cc] hover:text-white
            dark:hover:bg-[#3B9C3Ccc] dark:hover:text-white
                ${isFavorite ? "text-white bg-[#063c28cc] dark:bg-[#3B9C3Ccc] dark:text-white" : "bg-transparent text-black dark:text-neutral-400"}`,
      type: "button",
      "aria-pressed": isFavorite,
      children: /* @__PURE__ */ jsx(Heart, { size: 16 })
    }
  );
}
function Basket() {
  const auth = usePage().props.auth;
  const { cartItems, increment, decrement, removeFromCart, resetCart } = useCart();
  const subTotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0);
  const totalDiscount = cartItems.reduce((sum, item) => {
    const price2 = Number(item.price) || 0;
    const discount = Number(item.discount) || 0;
    return sum + price2 * (discount / 100) * item.quantity;
  }, 0);
  const total = subTotal - totalDiscount;
  const [addressFilled, setAddressFilled] = useState(false);
  const handleProceed = () => {
    if (!addressFilled) {
      toast$1.error("Please fill in your delivery address first!", {
        duration: 4e3,
        style: {
          background: "#ef4444",
          color: "#fff"
        }
      });
      return;
    }
    toast$1.success("Proceeding to checkout...");
    router.visit("/payment");
  };
  const formatPrice = (value) => {
    const num = Number(value);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const handleOrderSuccess = () => {
    resetCart();
    setAddressFilled(false);
  };
  const handleResetCart = () => {
    resetCart();
    toast$1.success("Cart cleared.");
  };
  if (cartItems.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "py-10 md:py-20 bg-gradient-to-bottom from-blue-50 dark:from-[#111] to-white dark:to-[#1a1a1a] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0A0A0A] rounded-2xl shadow-xl dark:shadow-none p-8 max-w-md w-full space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-48 h-48 mx-auto", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/storage/images/emptyCart.png",
            alt: "Empty Cart",
            loading: "lazy",
            className: "drop-shadow-lg absolute h-full w-full inset-0 object-contain animate-swingZoom"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-4 -right-4 bg-blue-500 rounded-full p-2 animate-floatZoom", children: /* @__PURE__ */ jsx(ShoppingCart, { className: "text-white" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-gray-200", children: "Your cart is feeling lonely" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "It looks like you haven't added anything to your cart yet. Let's change that and find some amazing products for you!" })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        Link,
        {
          href: "/shop",
          className: "block bg-black/5 dark:bg-gray-800 border border-black/20 dark:border-[#333] text-center py-2.5 rounded-full text-sm text-black dark:text-white font-semibold tracking-wide hover:border-black hover:bg-black dark:hover:bg-[#222] hover:text-white transition",
          children: "Discover Products"
        }
      ) })
    ] }) });
  }
  if (!auth?.user) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12 md:py-32 bg-gray-100 dark:bg-[#0A0A0A] p-4", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-neutral-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-sm w-full max-w-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-6 space-y-1", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsxs("h2", { className: "text-2xl text-[#063c28] dark:text-[#7fc17f] font-black tracking-wider uppercase hover:text-[#3b9c3c] dark:hover:text-[#063c28] hoverEffect group", children: [
          "Shopcar",
          /* @__PURE__ */ jsx("span", { className: "text-[#3b9c3c] dark:text-[#063c28] group-hover:text-[#063c28] dark:group-hover:text-[#7fc17f] hoverEffect", children: "t" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "tracking-tight text-2xl font-semibold text-center", children: "Welcome Back!" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 pt-0 space-y-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[#737373] dark:text-gray-300 text-center font-medium", children: "Log in to view your cart items and checkout. Don't miss out on your favorite products!" }),
        /* @__PURE__ */ jsxs(Dialog, { open: loginOpen, onOpenChange: setLoginOpen, onClose: () => setLoginOpen(false), children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm\r\n                                    transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring\r\n                                    disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4\r\n                                    [&_svg]:shrink-0 bg-[#063d29cc] text-white shadow-sm hover:bg-[#063c28]\r\n                                    dark:bg-[#2a6a2a] dark:hover:bg-[#1e4f1e] hoverEffect h-10 rounded-md px-8 w-full font-semibold",
              children: "Sign in"
            }
          ) }),
          /* @__PURE__ */ jsx(AuthModal, { defaultTab: "login", isOpen: loginOpen, onClose: () => setRegisterOpen(false) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "items-center p-6 pt-0 flex flex-col space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground dark:text-gray-400 text-center", children: "Don't have an account?" }),
        /* @__PURE__ */ jsxs(Dialog, { open: registerOpen, onOpenChange: setRegisterOpen, children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm\r\n                                    font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1\r\n                                    focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50\r\n                                    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-[#e5e5e5] dark:border-[#444]\r\n                                    bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-xs hover:bg-[#f5f5f5] dark:hover:bg-[#222] hover:text-black h-10 rounded-md px-8 w-full",
              children: "Create an account"
            }
          ) }),
          /* @__PURE__ */ jsx(AuthModal, { defaultTab: "register", isOpen: registerOpen })
        ] })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-[#0A0A0A] pb-52 md:pb-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 py-5", children: [
      /* @__PURE__ */ jsx(ShoppingBag, { className: "w-6 h-6 text-black dark:text-white" }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl text-black dark:text-white font-semibold", children: "Shopping Cart" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 md:gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "border border-neutral-300 dark:border-[#333] bg-white dark:bg-[#1a1a1a] rounded-md", children: [
        cartItems.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "border-b border-neutral-300 dark:border-[#333] p-2.5 last:border-b-0 flex items-center justify-between gap-5",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-start gap-2 h-36 md:h-44", children: [
                /* @__PURE__ */ jsx(Link, { href: `/product/${item.product_id}`, className: "border border-neutral-300 dark:border-[#444] p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: item.image,
                    alt: item.name,
                    loading: "lazy",
                    className: "w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden transition-transform duration-500 bg-transparent"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-1 flex-col justify-between py-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 md:gap-1.5", children: [
                    /* @__PURE__ */ jsx("h2", { className: "text-[1rem] text-neutral-900 dark:text-white font-semibold line-clamp-1", children: item.name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-neutral-800 dark:text-gray-300 capitalize", children: [
                      "Category:",
                      /* @__PURE__ */ jsx("span", { className: "font-semibold text-black dark:text-white ml-1.5", children: item.category })
                    ] }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-neutral-800 dark:text-gray-300 capitalize", children: [
                      "Discount:",
                      /* @__PURE__ */ jsxs("span", { className: "font-semibold text-black dark:text-white ml-1.5", children: [
                        item.discount > 0 ? item.discount : 0,
                        "%"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(FavoriteButton, { product: { id: item.product_id, name: item.name, image: item.image, price: item.price } }) }),
                    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeFromCart(item.product_id), children: /* @__PURE__ */ jsx(Trash, { className: "w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 hoverEffect" }) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1", children: [
                item.discount > 0 ? /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] dark:text-[#7fc17f] text-lg", children: [
                    "$",
                    formatPrice(item.price - item.price * item.discount / 100)
                  ] }),
                  " ",
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsxs("span", { className: "line-through font-normal text-zinc-500 dark:text-gray-500 text-md", children: [
                    "$",
                    formatPrice(item.price)
                  ] })
                ] }) : /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] dark:text-[#7fc17f] text-lg", children: [
                  "$",
                  formatPrice(item.price)
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 pb-1 text-[1rem]", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => decrement(item.product_id),
                      className: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-neutral-900 dark:text-white font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-input bg-white dark:bg-[#222] shadow-xs dark:shadow-none hover:text-[#171717] dark:hover:text-white w-6 h-6 border-0 hover:bg-[#063c28]/20",
                      children: /* @__PURE__ */ jsx(Minus, {})
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm w-6 text-center text-black dark:text-white", children: item.quantity }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => increment(item.product_id, item.stock),
                      className: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-neutral-900 dark:text-white font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-input bg-white dark:bg-[#222] shadow-xs dark:shadow-none hover:text-[#171717] dark:hover:text-white w-6 h-6 border-0 hover:bg-[#063c28]/20",
                      children: /* @__PURE__ */ jsx(Plus, {})
                    }
                  )
                ] })
              ] })
            ]
          },
          `${item.product_id}-${item.name}`
        )),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleResetCart,
            className: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#ef4444] dark:bg-[#cc3333] text-white shadow-xs dark:shadow-none hover:bg-[#ef4444]/90 dark:hover:bg-[#dd5555] h-9 px-4 py-2 m-5 font-semibold cursor-pointer",
            children: "Reset Cart"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "hidden md:inline-block w-full bg-white dark:bg-[#1a1a1a] p-6 rounded-lg border border-neutral-300 dark:border-[#333]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl text-neutral-800 dark:text-white font-semibold mb-4", children: "Order Summary" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-neutral-800 dark:text-white", children: "SubTotal" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-black dark:text-white", children: [
                "$",
                subTotal.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-neutral-800 dark:text-white", children: "Total Discount" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-black dark:text-white", children: [
                "$",
                totalDiscount.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "shrink-0 bg-[#e5e5e5] dark:bg-[#333] h-px w-full" }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-semibold text-lg text-neutral-800 dark:text-white", children: [
              /* @__PURE__ */ jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold text-black dark:text-white", children: [
                "$",
                total.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleProceed,
                className: "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#063d29cc] dark:bg-[#2a6a2a] text-white shadow-sm dark:shadow-none hover:bg-[#063c28] dark:hover:bg-[#1e4f1e] hoverEffect h-10 px-8 w-full rounded-full font-semibold tracking-wide",
                children: "Proceed to Checkout"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-[#1a1a1a] rounded-md mt-5", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-neutral-300 dark:border-[#333] bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-sm dark:shadow-none", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-1.5 p-6", children: /* @__PURE__ */ jsx("div", { className: "font-semibold leading-none tracking-tight text-neutral-800 dark:text-white", children: "Delivery Address" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-6 pt-0", children: /* @__PURE__ */ jsx(
            Address,
            {
              onAddressSubmit: handleOrderSuccess,
              cartItems
            }
          ) })
        ] }) }) })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Basket
}, Symbol.toStringTag, { value: "Module" }));
const SearchBar = ({ isOpen, onClose: onClose2 }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ products: [], brands: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults({ products: [], brands: [], categories: [] });
    }
  }, [isOpen]);
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.length < 2) {
      setResults({ products: [], brands: [], categories: [] });
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/search/live", { params: { q: query } });
        setResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [query]);
  const hasResults = results.products.length > 0 || results.brands.length > 0 || results.categories.length > 0;
  const goToShop = (params) => {
    router.get("/shop", params);
    onClose2();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    goToShop({ q: query });
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-50 bg-black/60 dark:bg-black/80",
      onClick: onClose2,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute left-1/2 top-12 -translate-x-1/2 w-full max-w-2xl \r\n                    bg-white dark:bg-neutral-900 shadow-lg rounded-lg px-4 py-3",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg text-neutral-900 dark:text-white font-semibold", children: "Product Search" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose2,
                  className: "p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition",
                  children: /* @__PURE__ */ jsx(X, { className: "text-neutral-500 dark:text-neutral-300 w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder: "Search products, brands, categories...",
                  className: "w-full h-11 border border-neutral-200 dark:border-neutral-700 \r\n                            bg-transparent dark:bg-neutral-800 dark:text-white px-4 pr-12\r\n                            rounded-md text-sm placeholder:text-neutral-400\r\n                            focus:outline-none focus:ring-1 focus:ring-[#063c28]"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "absolute right-0 top-0 w-11 h-full flex items-center justify-center\r\n                            bg-[#063c28]/10 dark:bg-[#063c28]/30 rounded-tr-md rounded-br-md\r\n                            hover:bg-[#063c28] hover:text-white text-black dark:text-white transition",
                  children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" })
                }
              )
            ] }),
            query.length >= 2 && /* @__PURE__ */ jsxs("div", { className: "mt-3 max-h-96 overflow-y-auto", children: [
              loading && /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-400 text-center py-4", children: "Searching..." }),
              !loading && !hasResults && /* @__PURE__ */ jsxs("p", { className: "text-sm text-neutral-400 text-center py-4", children: [
                'Nothing found for "',
                query,
                '"'
              ] }),
              results.categories.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold text-neutral-400 uppercase tracking-wider px-1 mb-1 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Layers, { size: 12 }),
                  " Categories"
                ] }),
                results.categories.map((cat) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => goToShop({ category: cat.id }),
                    className: "w-full text-left px-3 py-2 rounded-md text-sm\r\n                                            text-neutral-800 dark:text-neutral-200\r\n                                            hover:bg-[#063c28]/10 dark:hover:bg-[#063c28]/20\r\n                                            hover:text-[#063c28] dark:hover:text-green-300 transition",
                    children: cat.name
                  },
                  cat.id
                ))
              ] }),
              results.brands.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold text-neutral-400 uppercase tracking-wider px-1 mb-1 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Tag, { size: 12 }),
                  " Brands"
                ] }),
                results.brands.map((brand) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => goToShop({ brand: brand.id }),
                    className: "w-full text-left px-3 py-2 rounded-md text-sm\r\n                                            text-neutral-800 dark:text-neutral-200\r\n                                            hover:bg-[#063c28]/10 dark:hover:bg-[#063c28]/20\r\n                                            hover:text-[#063c28] dark:hover:text-green-300 transition",
                    children: brand.name
                  },
                  brand.id
                ))
              ] }),
              results.products.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold text-neutral-400 uppercase tracking-wider px-1 mb-1 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Package, { size: 12 }),
                  " Products"
                ] }),
                results.products.map((product) => /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      router.get(`/product/${product.id}`);
                      onClose2();
                    },
                    className: "w-full text-left px-3 py-2 rounded-md text-sm\r\n                                        flex items-center gap-3\r\n                                        text-neutral-800 dark:text-neutral-200\r\n                                        hover:bg-[#063c28]/10 dark:hover:bg-[#063c28]/20\r\n                                        hover:text-[#063c28] dark:hover:text-green-300 transition",
                    children: [
                      product.image && /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: `/storage/${product.image}`,
                          alt: product.name,
                          className: "w-10 h-10 rounded object-cover shrink-0"
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "flex-1 line-clamp-1", children: product.name }),
                      /* @__PURE__ */ jsxs("span", { className: "text-[#063c28] dark:text-green-300 font-semibold", children: [
                        Number(product.sell_price).toFixed(2),
                        "₼"
                      ] })
                    ]
                  },
                  product.id
                ))
              ] }),
              hasResults && /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => goToShop({ q: query }),
                  className: "w-full mt-3 py-2 text-sm text-center text-[#063c28] dark:text-green-300\r\n                                    border border-[#063c28]/20 dark:border-green-300/20 rounded-md\r\n                                    hover:bg-[#063c28] hover:text-white dark:hover:bg-green-300/10 transition",
                  children: [
                    'See all results for "',
                    query,
                    '"'
                  ]
                }
              )
            ] })
          ]
        }
      )
    }
  );
};
function Index$7() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return /* @__PURE__ */ jsxs(LikesProvider, { children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx(Basket, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$7
}, Symbol.toStringTag, { value: "Module" }));
function Blog() {
  const date = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-10 dark:bg-[#0A0A0A]", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-neutral-900 dark:text-neutral-100", children: "Our Blogs" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 md:mt-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-md overflow-hidden dark:bg-neutral-800", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/blog1.webp", alt: "First blog", className: "w-full max-h-80 object-cover" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-800 p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs flex items-center gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center relative group cursor-pointer", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-[#063c28] dark:text-green-300 tracking-wider", children: "Technologies" }),
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-[#52525b] dark:text-neutral-300 relative group hover:cursor-pointer hover:text-[#063c28] dark:hover:text-green-300 hoverEffect", children: [
              /* @__PURE__ */ jsx(Calendar, { size: 15 }),
              date,
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[1rem] text-black dark:text-neutral-100 font-semibold tracking-wide mt-5 line-clamp-2 hover:text-[#063c28] dark:hover:text-green-300 hoverEffect", children: "How to Plan Your Next Big Move Step by Step" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-md overflow-hidden dark:bg-neutral-800", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/blog2.webp", alt: "blog", className: "w-full max-h-80 object-cover" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-800 p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs flex items-center gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center relative group cursor-pointer", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-[#063c28] dark:text-green-300 tracking-wider", children: "Lifestyle" }),
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-[#52525b] dark:text-neutral-300 relative group hover:cursor-pointer hover:text-[#063c28] dark:hover:text-green-300 hoverEffect", children: [
              /* @__PURE__ */ jsx(Calendar, { size: 15 }),
              date,
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[1rem] text-black dark:text-neutral-100 font-semibold tracking-wide mt-5 line-clamp-2 hover:text-[#063c28] dark:hover:text-green-300 hoverEffect", children: "Cheerful Loving Couple Bakers Drinking Coffee" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-md overflow-hidden dark:bg-neutral-800", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/blog4.webp", alt: "blog", className: "w-full max-h-80 object-cover" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-800 p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs flex items-center gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center relative group cursor-pointer", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-[#063c28] dark:text-green-300 tracking-wider", children: "Sosial Media" }),
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-[#52525b] dark:text-neutral-300 relative group hover:cursor-pointer hover:text-[#063c28] dark:hover:text-green-300 hoverEffect", children: [
              /* @__PURE__ */ jsx(Calendar, { size: 15 }),
              date,
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[1rem] text-black dark:text-neutral-100 font-semibold tracking-wide mt-5 line-clamp-2 hover:text-[#063c28] dark:hover:text-green-300 hoverEffect", children: "Traveller Visiting Ice Cave With Amazing Eye-catching Scenes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-md overflow-hidden dark:bg-neutral-800", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/blog3.webp", alt: "blog", className: "w-full max-h-80 object-cover" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-neutral-800 p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs flex items-center gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center relative group cursor-pointer", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-[#063c28] dark:text-green-300 tracking-wider", children: "Technologies" }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-[#063c28] dark:text-green-300 tracking-wider", children: "Lifestyle" }),
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-[#52525b] dark:text-neutral-300 relative group hover:cursor-pointer hover:text-[#063c28] dark:hover:text-green-300 hoverEffect", children: [
              /* @__PURE__ */ jsx(Calendar, { size: 15 }),
              date,
              /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[1rem] text-black dark:text-neutral-100 font-semibold tracking-wide mt-5 line-clamp-2 hover:text-[#063c28] dark:hover:text-green-300 hoverEffect", children: "Learning from Past Mistakes" })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Blog
}, Symbol.toStringTag, { value: "Module" }));
function Index$6() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return /* @__PURE__ */ jsxs(LikesProvider, { children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx(Blog, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$6
}, Symbol.toStringTag, { value: "Module" }));
cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Rating({ rating: initialRating = 0, productId, ratingsCount = 0 }) {
  const [rating, setRating] = useState(initialRating);
  const [count, setCount] = useState(ratingsCount);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { auth } = usePage().props;
  useEffect(() => {
    if (rating !== initialRating) {
      setRating(initialRating);
    }
    if (count !== ratingsCount) {
      setCount(ratingsCount);
    }
  }, [initialRating, ratingsCount]);
  const handleClick = (index2) => {
    const newRating = index2 + 1;
    if (!auth?.user) {
      toast.error("Please log in to rate this product.", {
        icon: "🔒",
        duration: 3e3
      });
      return;
    }
    if (productId && !isSubmitting) {
      setIsSubmitting(true);
      router.post(
        `/products/${productId}/rate`,
        { rating: newRating },
        {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            toast.success(flash?.message);
            setIsSubmitting(false);
          },
          onError: (errors) => {
            toast.error(flash?.error);
            setIsSubmitting(false);
          },
          onFinish: () => {
            setIsSubmitting(false);
          }
        }
      );
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1", children: [
    [1, 2, 3, 4, 5].map((_, i) => {
      const isActive = i < rating;
      return /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleClick(i),
          className: `
                            p-0 m-0 
                            bg-transparent 
                            border-none 
                            shadow-none 
                            hover:bg-transparent 
                            focus:ring-0 
                            focus:outline-none 
                            active:bg-transparent 
                            rounded-none
                            flex items-center justify-center

                            [&_svg]:w-5 [&_svg]:h-5

                            ${!isActive ? "[&_svg]:stroke-gray-400" : ""}
                            dark:${!isActive ? "[&_svg]:stroke-white" : ""}

                            ${isActive ? "[&_svg]:stroke-[#3b9c3c]" : ""}
                            ${isActive ? "[&_svg]:fill-[#3b9c3c]" : ""}
                        `,
          children: /* @__PURE__ */ jsx(StarIcon, {})
        },
        i
      );
    }),
    /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600 dark:text-gray-300", children: rating }),
    count > 0 && /* @__PURE__ */ jsxs("span", { className: "ml-1 text-xs text-gray-500 dark:text-gray-400", children: [
      "(",
      count,
      ")"
    ] })
  ] });
}
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rating
}, Symbol.toStringTag, { value: "Module" }));
function NoProduct() {
  return /* @__PURE__ */ jsx("div", { className: "flex-1 pt-5", children: /* @__PURE__ */ jsx("div", { className: "h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center rounded-lg w-full bg-white mt-0 dark:bg-[#1a1a1a]", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 dark:text-gray-100", children: "No Product Available" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "We're sorry, but there are no products matching criteria." }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-[#063c28] animate-pulse-scale dark:text-[#93D991]", children: [
      /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
      /* @__PURE__ */ jsx("span", { children: "We're restocking shortly" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Please check back later or explore other categories." })
  ] }) }) });
}
function Category$1({ products, categories, selectedCategory }) {
  const { auth } = usePage().props;
  const userId = auth?.user?.id || 0;
  const { addCart, increment, decrement, getQuantity } = useCart();
  const [selectedCategoryId, setSelectedCategoryId] = useState(selectedCategory?.id);
  const [currentCategory, setCurrentCategory] = useState(selectedCategory);
  useEffect(() => {
    if (selectedCategory) {
      setCurrentCategory(selectedCategory);
    }
  }, [selectedCategory]);
  const filteredProducts = currentCategory ? products.filter((p) => p.category_id === currentCategory.id) : products;
  return /* @__PURE__ */ jsxs("div", { className: "max-w-(--breakpoint-xl) mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-black dark:text-gray-100", children: [
      "Products by Category:",
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-green-600 capitalize tracking-wide ml-1.5 dark:text-green-400", children: currentCategory?.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "py-5 flex flex-col md:flex-row items-start gap-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:min-w-40 border border-neutral-200 dark:border-gray-700", children: categories.map((category) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            router.get(`/category/${category.name}`);
          },
          className: `inline-flex w-full items-center justify-center gap-2 whitespace-nowrap text-sm
                                    focus-visible:outline-hidden transition-colors
                                    h-9 border-0 p-0 rounded-none shadow-none font-semibold 
                                    border-b border-b-neutral-200 dark:border-gray-700 capitalize
                                    ${selectedCategoryId === category.id ? "bg-[#f02757] text-white dark:bg-[#f02757]" : "text-black dark:text-gray-100 hover:bg-[#f02757] hover:text-white bg-transparent"}`,
          children: /* @__PURE__ */ jsx("p", { className: "w-full text-left px-2 truncate ", children: category.name })
        }
      ) }, category.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5", children: filteredProducts.map((product) => /* @__PURE__ */ jsx("div", { className: "opacity-[1]", children: /* @__PURE__ */ jsxs("div", { className: "text-sm border rounded-md overflow-hidden border-[#6c7fd8]/20 group bg-white dark:bg-[#1a1a1a] dark:border-gray-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative group overflow-hidden bg-[#f6f6f6] dark:bg-[#2a2a2a]", children: [
            /* @__PURE__ */ jsx(Link, { href: `/product/${product.id}`, children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${product.image}`,
                alt: product.name,
                loading: "lazy",
                className: "w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx(FavoriteButton, { product }) }),
            product.discount > 0 ? /* @__PURE__ */ jsx("p", { className: "absolute top-2 left-2 z-10 text-xs text-black dark:text-green-300 border border-[#15151580] dark:border-gray-600 px-2 rounded-full group-hover:border-[#016630] hover:text-[#063c28cc] hoverEffect animate-pulse-scale", children: "Sale!" }) : /* @__PURE__ */ jsx(
              Link,
              {
                href: "/hot-deal",
                className: "absolute top-2 left-2 z-10 border border-[#fb6c0880] dark:border-[#fb6c08] p-1 rounded-full group-hover:border-[#fb6c08]/50",
                children: /* @__PURE__ */ jsx(Flame, { size: 16, fill: "#fb6c08", className: "text-[#fb6c08]/50 group-hover:text-[#fb6c08]" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("p", { className: "uppercase line-clamp-1 text-xs font-medium text-[#ababab] dark:text-gray-400", children: product.category?.name }),
            /* @__PURE__ */ jsx("h2", { className: "font-semibold text-[1rem] line-clamp-1 text-neutral-800 dark:text-white", children: product.name }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
              Rating,
              {
                rating: product.average_rating || 0,
                productId: product.id
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2.5", children: product.stock > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium text-neutral-800 dark:text-gray-200", children: "In Stock" }),
              /* @__PURE__ */ jsx("p", { className: "text-[#063c28]/80 dark:text-[#93D991] font-semibold", children: product.stock })
            ] }) : /* @__PURE__ */ jsx("p", { className: "text-[#737373] dark:text-gray-500 font-semibold", children: "Out of Stock" }) }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: product.discount > 0 ? /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] dark:text-[#93D991] text-sm", children: [
                "$",
                (Number(product.sell_price) - Number(product.sell_price) * Number(product.discount) / 100).toFixed(2)
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "line-through font-normal text-zinc-500 dark:text-gray-500 text-sm", children: [
                "$",
                Number(product.sell_price).toFixed(2)
              ] })
            ] }) : /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] dark:text-[#93D991] text-sm", children: [
              "$",
              Number(product.sell_price).toFixed(2)
            ] }) }) }),
            getQuantity(product.id) > 0 ? /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-sm w-full", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-[#737373] dark:text-gray-400", children: "Quantity" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 pb-1 text-[1rem]", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: () => decrement(product.id),
                      className: "w-6 h-6 bg-white dark:bg-[#2a2a2a] text-neutral-700 dark:text-gray-200 rounded-md hover:bg-[#063c28]/20",
                      children: /* @__PURE__ */ jsx(Minus, {})
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm w-6 text-center text-neutral-900 dark:text-gray-200", children: getQuantity(product.id) }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: () => increment(product.id, product.stock),
                      disabled: getQuantity(product.id) >= product.stock,
                      className: "w-6 h-6 bg-white dark:bg-[#2a2a2a] text-neutral-700 dark:text-gray-200 rounded-md hover:bg-[#063c28]/20",
                      children: /* @__PURE__ */ jsx(Plus, {})
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t pt-1 dark:border-gray-700", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-900 dark:text-gray-200 font-semibold", children: "Subtotal" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-neutral-950 dark:text-gray-100", children: [
                  "$",
                  ((Number(product.sell_price) - Number(product.sell_price) * (Number(product.discount) / 100)) * getQuantity(product.id)).toFixed(2)
                ] })
              ] })
            ] }) }) : /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: () => addCart(userId, product),
                disabled: product.stock <= 0,
                className: "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm\r\n                                                    h-9 px-4 py-2 bg-[#063c28]/80 dark:bg-[#063c28]/80\r\n                                                    text-[#f8f8fb] border border-[#063c28]/80 dark:border-[#063c28]/80\r\n                                                    tracking-wide w-36 rounded-full hover:bg-[#063c28]",
                children: [
                  /* @__PURE__ */ jsx(ShoppingBag, {}),
                  "Add to Cart"
                ]
              }
            ) })
          ] })
        ] }) }, product.id)) }),
        filteredProducts.length === 0 && /* @__PURE__ */ jsx(NoProduct, {})
      ] })
    ] })
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Category$1
}, Symbol.toStringTag, { value: "Module" }));
function Index$5() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { categories, products, selectedCategory } = usePage().props;
  useFlashMessages();
  return /* @__PURE__ */ jsxs(LikesProvider, { children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx(
      Category$1,
      {
        categories,
        products,
        selectedCategory
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$5
}, Symbol.toStringTag, { value: "Module" }));
function Banner() {
  return /* @__PURE__ */ jsx("div", { className: "px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-16 md:py-0 bg-[#FCF0E4] dark:bg-[#0f1814] rounded-lg px-10 lg:px-24 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-[#063c28] dark:text-[#d8f3e5] capitalize tracking-wide font-semibold text-3xl mb-5 font-poppins", children: [
        "Grab Upto 50% Off on",
        /* @__PURE__ */ jsx("br", {}),
        "Selected headphone"
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/shop",
          className: "bg-[#063d29e6] dark:bg-[#0d6d4c] text-white/90 dark:text-white px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-[#063d29] hoverEffect dark:hover:bg-[#0b5038]",
          children: "By Now"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: "/storage/images/banner.webp",
        alt: "Banner Image",
        loading: "lazy",
        className: "hidden md:inline-flex w-96"
      }
    )
  ] }) });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Banner
}, Symbol.toStringTag, { value: "Module" }));
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function Brand({ brands, loading = false }) {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const perPage = 8;
  const totalPages = Math.ceil(brands.length / perPage);
  const visibleBrands = brands.slice(page * perPage, (page + 1) * perPage);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      const mobile = window.matchMedia("(max-width: 1023px)").matches;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handlePrev = () => page > 0 && setPage(page - 1);
  const handleNext = () => page < totalPages - 1 && setPage(page + 1);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "\r\n                max-w-7xl mx-auto mt-10 lg:mt-20 \r\n                bg-[#f8f8fb] dark:bg-[#1e1e1e] \r\n                p-5 lg:p-7 rounded-md\r\n            ",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-5 justify-between mb-10", children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-48" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-semibold text-2xl text-neutral-800 dark:text-neutral-100", children: "Shop By Brands" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/shop",
              className: "\r\n                                text-sm text-neutral-800 dark:text-neutral-200 \r\n                                font-semibold tracking-wide \r\n                                hover:text-[#063c28] dark:hover:text-[#4cc78a] \r\n                                hoverEffect\r\n                            ",
              children: "View All"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: isMobile ? "h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide" : "flex items-center gap-2.5 justify-between relative",
            children: [
              !loading && !isMobile && brands.length > 8 && page > 0 && /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-1/2 -translate-y-1/2 z-10", children: /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: handlePrev,
                  variant: "secondary",
                  size: "icon",
                  className: "rounded-full shadow-md bg-white/90 dark:bg-[#2a2a2a] hover:bg-white dark:hover:bg-[#333]",
                  children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5 text-gray-600 dark:text-gray-300" })
                }
              ) }),
              !loading && !isMobile && brands.length > 8 && page < totalPages - 1 && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 z-10", children: /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: handleNext,
                  variant: "secondary",
                  size: "icon",
                  className: "rounded-full shadow-md bg-white/90 dark:bg-[#2a2a2a] hover:bg-white dark:hover:bg-[#333]",
                  children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5 text-gray-600 dark:text-gray-300" })
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: isMobile ? "grid grid-cols-2 gap-2 px-8 mx-auto" : "flex items-center gap-2", children: loading ? Array.from({ length: isMobile ? 8 : 8 }).map((_, idx) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Skeleton, { className: "bg-white dark:bg-[#2a2a2a] w-36 h-24 rounded-md" }) }, idx)) : (isMobile ? brands : visibleBrands).map((brand) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: `/shop?brand=${brand.id}`,
                  className: "\r\n                                        bg-white \r\n                                        w-36 h-24 flex items-center justify-center \r\n                                        rounded-md overflow-hidden hover:shadow-lg \r\n                                        shadow-[#063c2833] hoverEffect\r\n                                    ",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: brand.logo ? `/storage/${brand.logo}` : "/images/placeholder.webp",
                      alt: brand.name,
                      loading: "lazy",
                      className: "w-32 h-20 object-contain"
                    }
                  )
                }
              ) }, brand.id)) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "\r\n                    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 \r\n                    mt-16 p-2 shadow-xs shadow-[#3b9c3c]/20 py-5\r\n                ",
            children: [
              { icon: Truck, title: "Free Delivery", desc: "Free shipping over $100" },
              { icon: GitCompareArrows, title: "Free Return", desc: "Free shipping over $100" },
              { icon: Headset, title: "Customer Support", desc: "Friendly 27/7 customer support" },
              { icon: ShieldCheck, title: "Money Back guarantee", desc: "Quality checked by our team" }
            ].map((item, idx) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "\r\n                            flex items-center gap-3 group \r\n                            text-[#52525b] dark:text-neutral-400 \r\n                            hover:text-[#3b9c3c] dark:hover:text-[#3b9c3c]\r\n                        ",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "inline-flex scale-100 group-hover:scale-90 hoverEffect", children: /* @__PURE__ */ jsx(item.icon, { size: 24, width: 45, height: 45 }) }),
                  /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[#151515]/80 dark:text-neutral-200 font-bold capitalize", children: item.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-[#52525b] dark:text-neutral-400", children: item.desc })
                  ] })
                ]
              },
              idx
            ))
          }
        )
      ]
    }
  );
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Brand
}, Symbol.toStringTag, { value: "Module" }));
function Category({ categories = [], loading = false }) {
  const topCategories = [...categories].sort((a, b) => (b.products_count ?? 0) - (a.products_count ?? 0)).slice(0, 6);
  return /* @__PURE__ */ jsxs("div", { className: "\r\n            relative max-w-7xl mx-auto w-full \r\n            bg-white dark:bg-[#1e1e1e] \r\n            border border-[#3b9c3c]/20 dark:border-[#3b9c3c]/30 \r\n            mt-10 lg:mt-20 p-5 lg:p-7 rounded-md overflow-hidden\r\n        ", children: [
    /* @__PURE__ */ jsx("h2", { className: "\r\n                font-semibold text-2xl border-b \r\n                border-neutral-200 dark:border-neutral-700 \r\n                pb-3 text-neutral-800 dark:text-neutral-100\r\n            ", children: loading ? /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-56" }) : "Popular Categories" }),
    /* @__PURE__ */ jsx("div", { className: "relative mt-5", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-500 ease-in-out", children: loading ? Array.from({ length: 6 }).map((_, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-[#f6f6f6] dark:bg-[#2a2a2a] p-5 flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "w-20 h-20" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-40" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32" })
          ] })
        ]
      },
      idx
    )) : topCategories.length > 0 ? topCategories.map((category) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-[#f6f6f6] dark:bg-[#2a2a2a] p-5 flex items-center gap-3 group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "\r\n                                overflow-hidden \r\n                                border border-[#fb6c08]/30 dark:border-[#fb6c08]/20 \r\n                                hover:border-[#fb6c08] \r\n                                hoverEffect w-20 h-20 p-1\r\n                                ", children: /* @__PURE__ */ jsx(Link, { href: `/category/${category.name}`, children: /* @__PURE__ */ jsx(
            "img",
            {
              src: category.image ? `/storage/${category.image}` : "/placeholder.png",
              alt: category.name,
              loading: "lazy",
              className: "\r\n                                        w-full h-full object-contain \r\n                                        group-hover:scale-110 hoverEffect \r\n                                        transition-transform duration-500 ease-in-out\r\n                                    "
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-base font-semibold text-neutral-700 dark:text-neutral-200", children: category.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-[#063c28] dark:text-[#4cc78a] mr-1", children: [
                "(",
                category.products_count ?? 0,
                ")"
              ] }),
              "items Available"
            ] })
          ] })
        ]
      },
      category.id
    )) : /* @__PURE__ */ jsx("p", { className: "col-span-full text-center text-neutral-600 dark:text-neutral-400", children: "No Category Found" }) }) })
  ] });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Category
}, Symbol.toStringTag, { value: "Module" }));
function Content({ products, categories }) {
  const { auth } = usePage().props;
  const userId = auth?.user?.id || 0;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { topCategories, otherCategories } = useMemo(() => {
    const sorted = [...categories].sort(
      (a, b) => (b.products_count ?? 0) - (a.products_count ?? 0)
    );
    return {
      topCategories: sorted.slice(0, 3),
      otherCategories: sorted.slice(3)
    };
  }, [categories]);
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category_id === selectedCategory);
  }, [selectedCategory, products]);
  const { addCart, increment, decrement, getQuantity } = useCart();
  return /* @__PURE__ */ jsx("div", { className: "py-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 flex flex-col lg:px-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-wrap gap-5 justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 text-sm font-semibold", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-wrap gap-2\r\n                    w-full md:flex-nowrap md:overflow-x-auto md:whitespace-nowrap\r\n                    md:gap-2 scrollbar-hide",
          children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => setSelectedCategory("All"),
                className: `whitespace-nowrap border border-[#3b9c3c4d] px-4 py-1.5 rounded-full hoverEffect
                                ${selectedCategory === "All" ? "bg-[#3b9c3c] text-white hover:bg-[#3b9c3c]" : "bg-[#3b9c3c]/10 text-neutral-800 hover:bg-[#3b9c3c] hover:text-white dark:bg-[#3b9c3c]/20 dark:text-gray-200 dark:hover:bg-[#3b9c3c]"}`,
                children: "All"
              }
            ),
            topCategories.map((cat) => /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => setSelectedCategory(cat.id),
                className: `whitespace-nowrap border border-[#3b9c3c4d] px-5 py-2 rounded-full hoverEffect
                                    ${selectedCategory === cat.id ? "bg-[#3b9c3c] text-white hover:bg-[#3b9c3c]" : "bg-[#3b9c3c]/10 text-neutral-800 hover:bg-[#3b9c3c] hover:text-white dark:bg-[#3b9c3c]/20 dark:text-gray-200 dark:hover:bg-[#3b9c3c]"}`,
                children: cat.name
              },
              cat.id
            ))
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/shop",
          className: "border border-[#151515] px-4 py-1 text-neutral-800\r\n                        rounded-full hover:bg-[#3b9c3c] hover:text-white hover:border-[#3b9c3c]\r\n                        hoverEffect shadow dark:text-gray-200 dark:border-gray-600",
          children: "See All"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-6", children: filteredProducts.map((product) => /* @__PURE__ */ jsx("div", { style: { opacity: 1 }, children: /* @__PURE__ */ jsxs("div", { className: "text-sm border rounded-md border-[#6c7fd8]/20 group bg-white dark:bg-[#1a1a1a] dark:border-gray-700 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative group overflow-hidden bg-[#f6f6f6] dark:bg-[#2a2a2a]", children: [
        /* @__PURE__ */ jsx(Link, { href: `/product/${product.id}`, children: /* @__PURE__ */ jsx(
          "img",
          {
            src: `/storage/${product.image}`,
            alt: product.name,
            className: "w-full h-64 object-contain overflow-hidden\r\n                                            transition-transform bg-shop_light_bg duration-500\r\n                                            group-hover:scale-105"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx(FavoriteButton, { product }) }),
        product.discount > 0 ? /* @__PURE__ */ jsx(
          "p",
          {
            className: "absolute top-2 left-2 z-10 text-xs text-black border\r\n                                            border-[#15151580]/50 px-2 rounded-full group-hover:border-[#016630]\r\n                                            hover:text-[#063c28cc] hoverEffect animate-pulse-scale\r\n                                            dark:text-green-800 dark:border-gray-600 dark:hover:text-[#3b9c3c]",
            children: "Sale!"
          }
        ) : /* @__PURE__ */ jsx(
          Link,
          {
            href: "/hot-deal",
            className: "absolute top-2 left-2 z-10 border border-[#fb6c0880] p-1 rounded-full group-hover:border-[#fb6c08]/50 hover:text-[#016630] hoverEffect dark:border-[#fb6c08]",
            children: /* @__PURE__ */ jsx(
              Flame,
              {
                size: 16,
                fill: "#fb6c08",
                className: "text-[#fb6c08]/50 group-hover:text-[#fb6c08] hoverEffect"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-3 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "uppercase line-clamp-1 text-xs font-medium text-[#ababab] dark:text-gray-400", children: product.category?.name }),
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-[1rem] line-clamp-1 text-neutral-800 dark:text-white", children: product.name }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0 -ml-2", children: /* @__PURE__ */ jsx(
          Rating,
          {
            rating: product.average_rating || 0,
            productId: product.id
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2.5", children: product.stock > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-neutral-800 dark:text-gray-200", children: "In Stock" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#063c28]/80 font-semibold dark:text-[#93D991]", children: product.stock })
        ] }) : /* @__PURE__ */ jsx("p", { className: "text-[#737373] font-semibold dark:text-gray-500", children: "Out of Stock" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: Number(product.discount) > 0 ? /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] text-sm dark:text-[#93D991]", children: [
            (Number(product.sell_price) - Number(product.sell_price) * Number(product.discount) / 100).toFixed(2),
            "₼"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "line-through ml-1 font-normal text-zinc-500 text-sm dark:text-gray-500", children: [
            (Number(product.sell_price) || 0).toFixed(2),
            "₼"
          ] })
        ] }) : /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] text-sm dark:text-[#93D991]", children: [
          (Number(product.sell_price) || 0).toFixed(2),
          "₼"
        ] }) }) }),
        getQuantity(product.id) > 0 ? /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-sm w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#737373] dark:text-gray-400", children: "Quantity" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 pb-1 text-[1rem]", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => decrement(product.id),
                  className: "inline-flex items-center justify-center gap-2 whitespace-nowrap\r\n                                                            rounded-md text-sm font-medium\r\n                                                            border-[#e5e5e5] bg-white shadow-xs text-neutral-700\r\n                                                            hover:text-neutral-900 w-6 h-6 border-0 hover:bg-[#063c28]/20\r\n                                                            dark:bg-[#2a2a2a] dark:text-gray-200",
                  children: /* @__PURE__ */ jsx(Minus, {})
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm w-6 text-center text-neutral-900 dark:text-gray-200", children: getQuantity(product.id) }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => increment(product.id, product.stock),
                  disabled: getQuantity(product.id) >= product.stock,
                  className: "inline-flex items-center justify-center gap-2 whitespace-nowrap\r\n                                                            rounded-md text-sm font-medium\r\n                                                            border-[#e5e5e5] bg-white shadow-xs text-neutral-700\r\n                                                            hover:text-neutral-900 w-6 h-6 border-0 hover:bg-[#063c28]/20\r\n                                                            dark:bg-[#2a2a2a] dark:text-gray-200",
                  children: /* @__PURE__ */ jsx(Plus, {})
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t pt-1 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-900 font-semibold dark:text-gray-200", children: "Subtotal" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-neutral-950 dark:text-gray-100", children: [
              ((product.sell_price - product.sell_price * (product.discount / 100)) * getQuantity(product.id)).toFixed(2),
              "₼"
            ] })
          ] })
        ] }) }) : /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: () => addCart(userId, product),
            disabled: product.stock <= 0,
            className: "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm\r\n                                                hoverEffect h-9 px-4 py-2 bg-[#063c28]/80\r\n                                                text-[#f8f8fb] shadow-none border border-[#063c28]/80\r\n                                                font-semibold tracking-wide hover:bg-[#063c28] hover:border-[#063c28]\r\n                                                w-36 rounded-full dark:bg-[#063c28]/80 dark:border-[#063c28]/80 dark:hover:bg-[#063c28]",
            children: [
              /* @__PURE__ */ jsx(ShoppingBag, {}),
              "Add to Cart"
            ]
          }
        ) })
      ] })
    ] }) }, product.id)) }),
    filteredProducts.length === 0 && /* @__PURE__ */ jsx(NoProduct, {})
  ] }) });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Content
}, Symbol.toStringTag, { value: "Module" }));
function index() {
  const { brands, categories, products } = usePage().props;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useFlashMessages();
  return /* @__PURE__ */ jsxs(LikesProvider, { children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx(Banner, {}),
    /* @__PURE__ */ jsx(Content, { brands, categories, products }),
    /* @__PURE__ */ jsx(Category, { categories }),
    /* @__PURE__ */ jsx(Brand, { brands }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
function HotDeal({ products }) {
  const { auth } = usePage().props || { auth: {} };
  const userId = auth?.user?.id || 0;
  const { addCart, increment, decrement, getQuantity } = useCart();
  return /* @__PURE__ */ jsx("div", { className: "py-10 bg-[#f1f3f8] dark:bg-[#0A0A0A]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-(--breakpoint-xl) mx-auto px-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold mb-5 underline underline-offset-4 decoration-1 text-[1rem] text-neutral-900 dark:text-neutral-100 uppercase tracking-wide", children: "Hot Deals of the Week" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5", children: products.map((product) => /* @__PURE__ */ jsx("div", { style: { opacity: 1 }, children: /* @__PURE__ */ jsxs("div", { className: "text-sm border rounded-md border-[#6c7fd8]/20 group bg-white dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative group overflow-hidden bg-[#f6f6f6] dark:bg-neutral-700", children: [
        /* @__PURE__ */ jsx(Link, { href: `/product/${product.id}`, children: /* @__PURE__ */ jsx(
          "img",
          {
            src: `/storage/${product.image}`,
            alt: product.name,
            className: "w-full h-64 object-contain overflow-hidden transition-transform duration-500 group-hover:scale-105"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx(FavoriteButton, { product }) }),
        product.discount > 0 ? /* @__PURE__ */ jsx("p", { className: "absolute top-2 left-2 z-10 text-xs text-black dark:text-neutral-200 border border-[#15151580]/50 dark:border-neutral-400 px-2 rounded-full group-hover:border-[#016630] hover:text-[#063c28cc] hoverEffect animate-pulse-scale", children: "Sale!" }) : /* @__PURE__ */ jsx(
          Link,
          {
            href: `/product/${product.id}`,
            className: "absolute top-2 left-2 z-10 border border-[#fb6c0880] p-1 rounded-full group-hover:border-[#fb6c08]/50 hover:text-[#016630] hoverEffect",
            children: /* @__PURE__ */ jsx(Flame, { size: 16, fill: "#fb6c08", className: "text-[#fb6c08]/50 group-hover:text-[#fb6c08] hoverEffect" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-3 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "uppercase line-clamp-1 text-xs font-medium text-[#ababab] dark:text-neutral-400", children: product.category?.name }),
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-[1rem] line-clamp-1 text-neutral-800 dark:text-white", children: product.name }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0 -ml-2", children: /* @__PURE__ */ jsx(
          Rating,
          {
            rating: product.average_rating || 0,
            productId: product.id
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2.5", children: product.stock > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-neutral-800 dark:text-neutral-200", children: "In Stock" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#063c28]/80 dark:text-green-300 font-semibold", children: product.stock })
        ] }) : /* @__PURE__ */ jsx("p", { className: "text-[#737373] dark:text-neutral-500 font-semibold", children: "Out of Stock" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: product.discount > 0 ? /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] dark:text-green-300 text-sm", children: [
            (Number(product.sell_price) - Number(product.sell_price) * Number(product.discount) / 100).toFixed(2),
            "₼"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "line-through font-normal text-zinc-500 dark:text-neutral-400 text-sm", children: [
            (Number(product.sell_price) || 0).toFixed(2),
            "₼"
          ] })
        ] }) : /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] dark:text-green-300 text-sm", children: [
          (Number(product.sell_price) || 0).toFixed(2),
          "₼"
        ] }) }) }),
        getQuantity(product.id) > 0 ? /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-sm w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#737373] dark:text-neutral-400", children: "Quantity" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 pb-1 text-[1rem]", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => decrement(product.id),
                  className: "w-6 h-6 bg-white dark:bg-neutral-700 border-0 hover:bg-[#063c28]/20 dark:hover:bg-neutral-600",
                  children: /* @__PURE__ */ jsx(Minus, {})
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm w-6 text-center text-neutral-900 dark:text-neutral-200", children: getQuantity(product.id) }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => increment(product.id, product.stock),
                  disabled: getQuantity(product.id) >= product.stock,
                  className: "w-6 h-6 bg-white dark:bg-neutral-700 border-0 hover:bg-[#063c28]/20 dark:hover:bg-neutral-600",
                  children: /* @__PURE__ */ jsx(Plus, {})
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t pt-1 border-neutral-200 dark:border-neutral-700", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-900 dark:text-neutral-200 font-semibold", children: "Subtotal" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-neutral-950 dark:text-neutral-100", children: [
              "$",
              ((product.sell_price - product.sell_price * (product.discount / 100)) * getQuantity(product.id)).toFixed(2)
            ] })
          ] })
        ] }) }) : /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: () => addCart(userId, product),
            disabled: product.stock <= 0,
            className: "h-9 px-4 py-2 bg-[#063c28]/80 text-[#f8f8fb] hover:bg-[#063c28] w-36 rounded-full font-semibold tracking-wide dark:bg-green-800 dark:hover:bg-green-700",
            children: [
              /* @__PURE__ */ jsx(ShoppingBag, {}),
              "Add to Cart"
            ]
          }
        ) })
      ] })
    ] }) }, product.id)) }),
    products.length === 0 && /* @__PURE__ */ jsx(NoProduct, {})
  ] }) });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HotDeal
}, Symbol.toStringTag, { value: "Module" }));
function Index$4() {
  const { products } = usePage().props;
  useFlashMessages();
  return /* @__PURE__ */ jsxs(LikesProvider, { children: [
    /* @__PURE__ */ jsx(Header$1, {}),
    /* @__PURE__ */ jsx(HotDeal, { products }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$4
}, Symbol.toStringTag, { value: "Module" }));
function About() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return /* @__PURE__ */ jsxs(LikesProvider, { children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx("div", { className: "text-gray-800 dark:text-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto px-4 max-w-6xl lg:px-8 py-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-gray-900 dark:text-white", children: "About Shopcart" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Shopcart is a cutting-edge technology company dedicated to providing innovative solutions for modern businesses. Founded in 2020, we've quickly established ourselves as a leader in digital transformation and software development." }),
      /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Our team of expert developers, designers, and strategists work tirelessly to create custom solutions that help our clients streamline their operations, increase efficiency, and drive growth." }),
      /* @__PURE__ */ jsx("p", { children: "At Shopcart, we believe in the power of technology to transform businesses and improve lives. We're committed to staying at the forefront of technological advancements and delivering exceptional value to our clients." })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About
}, Symbol.toStringTag, { value: "Module" }));
function Textarea({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function Contact() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsx(LikesProvider, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white text-neutral-900 dark:bg-[#0D0D0D] dark:text-white", children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-bold", children: "Contact Us" }),
      /* @__PURE__ */ jsx("p", { className: "mb-6 text-neutral-800 dark:text-neutral-200", children: "We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible." }),
      /* @__PURE__ */ jsxs("form", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "name",
              className: "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              children: "Name"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              className: "flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              placeholder: "Enter your name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "email",
              className: "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "email",
              className: "flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              placeholder: "Your mail"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "email",
              className: "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              className: "flex min-h-[60px] w-full resize-none rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              rows: 6
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "hoverEffect rounded-md bg-[#063d29]/80 px-6 py-3 text-sm font-semibold text-white hover:bg-[#063d29]",
            children: "Send Message"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) }) });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contact
}, Symbol.toStringTag, { value: "Module" }));
function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleAccordion = (index2) => {
    setOpenIndex(openIndex === index2 ? null : index2);
  };
  return /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsx(LikesProvider, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white text-gray-900 dark:text-neutral-200 dark:bg-[#0D0D0D]", children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-(--breakpoint-xl) px-4", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-bold", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx("div", { className: "w-full", "data-orientation": "vertical", children: [
        {
          q: "What services does Shopcart offer?",
          a: "Shopcart offers a wide range of technology solutions including custom software development, cloud services, and digital transformation consulting."
        },
        {
          q: "How can I get support for Shopcart products?",
          a: "You can reach our support team through our contact page or by emailing support@Shopcart.com."
        },
        {
          q: "Does Shopcart offer training for its products?",
          a: "Yes, we offer comprehensive training programs for all our products and services. Please contact our sales team for more information."
        },
        {
          q: "What industries does Shopcart serve?",
          a: "Shopcart serves a wide range of industries including finance, healthcare, retail, and manufacturing."
        },
        {
          q: "How does Shopcart ensure data security?",
          a: "We employ industry-standard security measures and comply with all relevant data protection regulations to ensure the security of our clients' data."
        }
      ].map((item, index2) => {
        const isOpen = openIndex === index2;
        return /* @__PURE__ */ jsxs("div", { "data-state": isOpen ? "open" : "closed", className: "group border-b", children: [
          /* @__PURE__ */ jsx("h3", { className: "flex", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "aria-expanded": isOpen,
              onClick: () => toggleAccordion(index2),
              className: "hoverEffect flex flex-1 items-center justify-between py-4 text-left text-lg font-semibold text-neutral-950/80 dark:text-neutral-200/80 transition-all group-hover:text-neutral-950 dark:group-hover:text-neutral-200 hover:no-underline [&[data-state=open]>svg]:rotate-180",
              "data-state": isOpen ? "open" : "closed",
              children: [
                item.q,
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    className: `h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              "data-state": isOpen ? "open" : "closed",
              className: `overflow-hidden text-sm transition-all duration-300 ${isOpen ? "max-h-[1000px]" : "max-h-0"} ${isOpen ? "animate-accordion-down" : "animate-accordion-up"}`,
              children: isOpen && /* @__PURE__ */ jsx("div", { className: "pt-0 pb-4 text-gray-600 dark:text-gray-300", children: item.a })
            }
          )
        ] }, index2);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) }) });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Faqs
}, Symbol.toStringTag, { value: "Module" }));
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function Help() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleAccordion = (index2) => {
    setOpenIndex(openIndex === index2 ? null : index2);
  };
  return /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsx(LikesProvider, { children: /* @__PURE__ */ jsxs("section", { className: "bg-white text-neutral-900 dark:bg-[#0D0D0D] dark:text-white", children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-7xl px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-medium tracking-tight  sm:text-4xl md:text-5xl", children: "Help Center" }),
        /* @__PURE__ */ jsx("p", { className: "text-[#737373]", children: "Find answers, get support, and resolve issues with your orders." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute top-2 left-3 h-5 w-5 text-[#737373]" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "search",
            className: "flex h-9 w-full rounded-md border border-neutral-200 dark:border-neutral-800 dark:text-white bg-white px-3 py-1 pl-10 text-base text-zinc-900 shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#737373] placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:w-2/3 md:text-sm lg:w-1/2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-neutral-200 bg-white dark:bg-[#0D0D0D] dark:border-neutral-800 text-[#0a0a0a] dark:text-white shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5 p-6 pb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 leading-none font-semibold tracking-tight", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 text-neutral-950 dark:text-white" }),
              "Emergency Contact"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373] dark:text-gray-500", children: "Get immediate assistance for urgent issues" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-6 pt-0", children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Customer Support Hotline" }),
            /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: "1-800-SHOP-HELP" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-[#737373] dark:text-gray-500", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
              "Available 24/7 for emergencies"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center p-6 pt-0", children: /* @__PURE__ */ jsx(Button, { className: "inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-colors hover:bg-[#f5f5f5] dark:hover:bg-neutral-950 hover:text-[#171717] focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", children: "Call Now" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-neutral-200 bg-white dark:bg-[#0D0D0D] dark:border-neutral-800 text-[#0a0a0a] dark:text-white shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5 p-6 pb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 leading-none font-semibold tracking-tight", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-neutral-950 dark:text-white" }),
              "Email Support"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373] dark:text-gray-500", children: "Get help via email for non-urgent issues" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-6 pt-0", children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Customer Service Email" }),
            /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: "support@shopcart.com" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-[#737373] dark:text-gray-500", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
              "Response within 24 hours"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center p-6 pt-0", children: /* @__PURE__ */ jsx(Button, { className: "inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-colors hover:bg-[#f5f5f5] dark:hover:bg-neutral-950 hover:text-[#171717] focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", children: "Send Email" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-[#0a0a0a] dark:text-white shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5 p-6 pb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 leading-none font-semibold tracking-tight", children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "h-5 w-5 text-neutral-950 dark:text-neutral-200" }),
              "Live Chat"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373] dark:text-gray-500", children: "Chat with our support team in real-time" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-6 pt-0", children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: "Chat Support Hours" }),
            /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: "9 AM - 9 PM (Mon-Sat)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-[#737373] dark:text-gray-500", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
              "Average wait time: 2 minutes"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center p-6 pt-0", children: /* @__PURE__ */ jsx(Button, { className: "inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-[#063d29]/80 dark:bg-[#06d29] px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-xs transition-colors hover:bg-[#063D29] focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", children: "Start Chat" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "faqs", className: "w-full", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "bg-[#F5F5F5] dark:bg-neutral-800", children: [
          /* @__PURE__ */ jsx(
            TabsTrigger,
            {
              value: "faqs",
              className: "h-7 w-28 px-3 py-1 data-[state=active]:bg-white data-[state=active]:text-black",
              children: "FAQs"
            }
          ),
          /* @__PURE__ */ jsx(
            TabsTrigger,
            {
              value: "orders",
              className: "h-7 w-28 px-3 py-1 data-[state=active]:bg-white data-[state=active]:text-black",
              children: "Orders"
            }
          ),
          /* @__PURE__ */ jsx(
            TabsTrigger,
            {
              value: "returns",
              className: "h-7 w-28 px-3 py-1 data-[state=active]:bg-white data-[state=active]:text-black",
              children: "Returns"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-neutral-900 dark:text-neutral-200 shadow-sm", children: [
          /* @__PURE__ */ jsxs(TabsContent, { value: "faqs", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5 p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "leading-none font-semibold tracking-tight", children: "Frequently Asked Questions" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373] dark:text-gray-300", children: "Find answers to the most common questions about our services" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-6 pt-0", children: /* @__PURE__ */ jsx("div", { className: "w-full", "data-orientation": "vertical", children: [
              {
                q: "How do I track my order?",
                a: "You can track your order by logging into your account and visiting the Order History section. Alternatively, you can use the tracking number provided in your shipping confirmation email."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. For select regions, we also offer buy-now-pay-later options."
              },
              {
                q: "How long will shipping take?",
                a: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and international shipping options are also available."
              },
              {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Some items like intimate apparel or personalized products may not be eligible for return."
              },
              {
                q: "Do you ship internationally?",
                a: "Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by location. You can see the shipping options available to your country during checkout."
              }
            ].map((item, index2) => {
              const isOpen = openIndex === index2;
              return /* @__PURE__ */ jsxs("div", { "data-state": isOpen ? "open" : "closed", className: "group border-b", children: [
                /* @__PURE__ */ jsx("h3", { className: "flex text-gray-900 dark:text-white", children: /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    "aria-expanded": isOpen,
                    onClick: () => toggleAccordion(index2),
                    className: "hoverEffect flex flex-1 items-center justify-between py-4 text-left text-sm font-normal text-neutral-950/80 dark:text-white transition-all group-hover:text-neutral-950 dark:group-hover:text-neutral-300 hover:underline [&[data-state=open]>svg]:rotate-180",
                    "data-state": isOpen ? "open" : "closed",
                    children: [
                      item.q,
                      /* @__PURE__ */ jsx(
                        ChevronDown,
                        {
                          className: `h-5 w-5 transform text-gray-900 dark:text-gray-300 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`
                        }
                      )
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    "data-state": isOpen ? "open" : "closed",
                    className: `overflow-hidden text-sm transition-all duration-300 ${isOpen ? "max-h-[1000px]" : "max-h-0"} ${isOpen ? "animate-accordion-down" : "animate-accordion-up"}`,
                    children: isOpen && /* @__PURE__ */ jsx("div", { className: "pt-0 pb-4 text-gray-600 dark:text-neutral-300", children: item.a })
                  }
                )
              ] }, index2);
            }) }) })
          ] }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "orders", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5 p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "leading-none font-semibold tracking-tight", children: "Order Help" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373] dark:text-neutral-300", children: "Get assistance with your orders" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-6 pt-0", children: /* @__PURE__ */ jsx("div", { className: "w-full", "data-orientation": "vertical", children: [
              {
                q: "How do I cancel my order?",
                a: "If your order hasn't shipped yet, you can cancel it by going to your account's Order History section and selecting Cancel Order. If it has already shipped, you'll need to initiate a return once you receive it."
              },
              {
                q: "Can I modify my order after placing it?",
                a: "Order modifications (such as changing size, color, or shipping address) may be possible if the order hasn't been processed yet. Please contact customer service immediately with your order number."
              },
              {
                q: "How long will shipping take?",
                a: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and international shipping options are also available."
              },
              {
                q: "What if my order arrives damaged?",
                a: "If your order arrives damaged, please take photos of the damaged items and packaging, and contact our customer service within 48 hours of delivery. We'll arrange a replacement or refund."
              },
              {
                q: "My order is missing items. What should I do?",
                a: "If items are missing from your order, please check your order confirmation to verify what was purchased. If items are indeed missing, contact customer service with your order number for immediate assistance."
              }
            ].map((item, index2) => {
              const isOpen = openIndex === index2;
              return /* @__PURE__ */ jsxs("div", { "data-state": isOpen ? "open" : "closed", className: "group border-b", children: [
                /* @__PURE__ */ jsx("h3", { className: "flex text-gray-900 dark:text-white", children: /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    "aria-expanded": isOpen,
                    onClick: () => toggleAccordion(index2),
                    className: "hoverEffect flex flex-1 items-center justify-between py-4 text-left text-sm font-normal text-neutral-950/80 dark:text-white transition-all group-hover:text-neutral-950 dark:group-hover:text-gray-300 hover:underline [&[data-state=open]>svg]:rotate-180",
                    "data-state": isOpen ? "open" : "closed",
                    children: [
                      item.q,
                      /* @__PURE__ */ jsx(
                        ChevronDown,
                        {
                          className: `h-5 w-5 transform text-gray-900 dark:text-neutral-300 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`
                        }
                      )
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    "data-state": isOpen ? "open" : "closed",
                    className: `overflow-hidden text-sm transition-all duration-300 ${isOpen ? "max-h-[1000px]" : "max-h-0"} ${isOpen ? "animate-accordion-down" : "animate-accordion-up"}`,
                    children: isOpen && /* @__PURE__ */ jsx("div", { className: "pt-0 pb-4 text-gray-600 dark:text-gray-300", children: item.a })
                  }
                )
              ] }, index2);
            }) }) })
          ] }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "returns", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5 p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "leading-none font-semibold tracking-tight", children: "Returns & Refunds" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373] dark:text-neutral-300", children: "Information about our return and refund processes" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-6 pt-0", children: /* @__PURE__ */ jsx("div", { className: "w-full", "data-orientation": "vertical", children: [
              {
                q: "How do I start to return?",
                a: "To initiate a return, log into your account, go to Order History, select the order containing the item(s) you wish to return, and click Return Items. Follow the prompts to complete the return request."
              },
              {
                q: "How long do refunds take a process?",
                a: "Once we receive your returned items, it typically takes 3-5 business days to process the return. After processing, refunds usually appear in your account within 5-10 business days, depending on your payment method and financial institution."
              },
              {
                q: "Do I have to pay for return shipping?",
                a: "For standard returns, customers are responsible for return shipping costs unless the return is due to our error (wrong item shipped, defective product, etc.). Premium members receive free return shipping on all orders."
              },
              {
                q: "Can I exchange an item instead of a returing it?",
                a: "Yes, you can request an exchange for a different size or color of the same item during the return process. If the item you want is in stock, we'll ship it once we receive your return."
              }
            ].map((item, index2) => {
              const isOpen = openIndex === index2;
              return /* @__PURE__ */ jsxs("div", { "data-state": isOpen ? "open" : "closed", className: "group border-b", children: [
                /* @__PURE__ */ jsx("h3", { className: "flex text-gray-900 dark:text-white", children: /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    "aria-expanded": isOpen,
                    onClick: () => toggleAccordion(index2),
                    className: "hoverEffect flex flex-1 items-center justify-between py-4 text-left text-sm font-normal text-neutral-950/80 dark:text-neutral-300 transition-all group-hover:text-neutral-950 dark:group-hover:text-neutral-100 hover:underline [&[data-state=open]>svg]:rotate-180",
                    "data-state": isOpen ? "open" : "closed",
                    children: [
                      item.q,
                      /* @__PURE__ */ jsx(
                        ChevronDown,
                        {
                          className: `h-5 w-5 transform text-gray-900 dark:text-gray-300 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`
                        }
                      )
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    "data-state": isOpen ? "open" : "closed",
                    className: `overflow-hidden text-sm transition-all duration-300 ${isOpen ? "max-h-[1000px]" : "max-h-0"} ${isOpen ? "animate-accordion-down" : "animate-accordion-up"}`,
                    children: isOpen && /* @__PURE__ */ jsx("div", { className: "pt-0 pb-4 text-gray-600 dark:text-gray-300", children: item.a })
                  }
                )
              ] }, index2);
            }) }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-neutral-950 dark:text-neutral-200 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5 p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 leading-none font-semibold tracking-tight", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-shadow-gray-950" }),
              "Visit Our Store"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373]", children: "Get in-person assistance at our locations" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-6 pt-0", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-normal", children: "Main Store - New York" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373]", children: "123 Shopping Avenue, New York, NY 10001" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373]", children: "Mon-Sat: 10 AM - 9 PM, Sun: 11 AM - 6 PM" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-normal", children: "West Coast Branch - Los Angeles" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373]", children: "456 Retail Boulevard, Los Angeles, CA 90001" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373]", children: "Mon-Sat: 10 AM - 9 PM, Sun: 11 AM - 6 PM" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center p-6 pt-0", children: /* @__PURE__ */ jsx(Button, { className: "inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-colors hover:bg-[#f5f5f5] dark:hover:bg-neutral-950 hover:text-[#171717] focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", children: "Find Nearest Store" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-neutral-950 dark:text-neutral-200 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5 p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 leading-none font-semibold tracking-tight", children: [
              /* @__PURE__ */ jsx(CircleQuestionMark, { className: "h-5 w-5 text-shadow-gray-950" }),
              "Additional Resources"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373]", children: "Explore more ways to get help" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 p-6 pt-0", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "group flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "font-normal transition-colors group-hover:text-black dark:group-hover:text-white", children: "Size Guide" }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-[#737373] transition-colors group-hover:text-black dark:group-hover:text-white" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "group flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "font-normal transition-colors group-hover:text-black dark:group-hover:text-white", children: "Shipping Information" }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-[#737373] transition-colors group-hover:text-black dark:group-hover:text-white" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "group flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "font-normal transition-colors group-hover:text-black dark:group-hover:text-white", children: "Product Care Instructions" }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-[#737373] transition-colors group-hover:text-black dark:group-hover:text-white" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "group flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "font-normal transition-colors group-hover:text-black dark:group-hover:text-white", children: "Gift Card Balance" }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-[#737373] transition-colors group-hover:text-black dark:group-hover:text-white" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center p-6 pt-0", children: /* @__PURE__ */ jsx(Button, { className: "inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-colors hover:bg-[#f5f5f5] dark:hover:bg-neutral-950 hover:text-[#171717] focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", children: "View All Resources" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-neutral-950 dark:text-neutral-200 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5 p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "leading-none font-semibold tracking-tight", children: "Still Need Help?" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-[#737373] dark:text-gray-400", children: "Our customer service team is here to assist you with any questions or concerns." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-6 pt-0", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 text-center", children: [
            /* @__PURE__ */ jsx(Phone, { className: "mb-2 h-10 w-10 text-black dark:text-white" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: "Call Us" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#737373] dark:text-gray-400", children: "Speak directly with our support team" }),
            /* @__PURE__ */ jsx(Button, { className: "hoverEffect mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#063d29]/80 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-sm transition-colors hover:bg-[#063d29] focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", children: "1-800-SHOP-HELP" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 text-center", children: [
            /* @__PURE__ */ jsx(MessageSquare, { className: "mb-2 h-10 w-10 text-black dark:text-white" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: "Message Us" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#737373]", children: "Send us a message and we'll get back to you" }),
            /* @__PURE__ */ jsx(Button, { className: "font-noraml hoverEffect mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-white dark:bg-neutral-800 px-4 py-2 text-sm whitespace-nowrap text-black dark:text-white shadow-sm transition-colors hover:bg-[#f5f5f5] dark:hover:bg-neutral-950 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", children: "Contact Form" })
          ] })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) }) });
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Help
}, Symbol.toStringTag, { value: "Module" }));
function Privacy() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsx(LikesProvider, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white text-neutral-900 dark:bg-[#0D0D0D] dark:text-neutral-200", children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-12  sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-bold", children: "Privacy Policy" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "1. Information Collection" }),
          /* @__PURE__ */ jsx("p", { children: "We collect information you provide directly to us when using our services, as well as information about your use of our services." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "2. Use of Information" }),
          /* @__PURE__ */ jsx("p", { children: "We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "3. Information Sharing" }),
          /* @__PURE__ */ jsx("p", { children: "We do not share your personal information with third parties except as described in this Privacy Policy or with your consent." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "4. Data Security" }),
          /* @__PURE__ */ jsx("p", { children: "We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "5. Your Rights" }),
          /* @__PURE__ */ jsx("p", { children: "You have the right to access, correct, or delete your personal information. Please contact us for assistance with these requests." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) }) });
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Privacy
}, Symbol.toStringTag, { value: "Module" }));
function Terms() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsx(LikesProvider, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white text-neutral-900 dark:bg-[#0D0D0D] dark:text-neutral-200", children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-bold", children: "Terms and Conditions" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "1. Acceptance of Terms" }),
          /* @__PURE__ */ jsx("p", { children: "By accessing and using Shopcart's services, you agree to be bound by these Terms and Conditions." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "2. Use of Services" }),
          /* @__PURE__ */ jsx("p", { children: "You agree to use Shopcart's services only for lawful purposes and in accordance with these Terms and Conditions." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "3. Intellectual Property" }),
          /* @__PURE__ */ jsx("p", { children: "All content and materials available on Shopcart's services are the property of Shopcart and are protected by applicable intellectual property laws." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "4. Limitation of Liability" }),
          /* @__PURE__ */ jsx("p", { children: "Shopcart shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "5. Governing Law" }),
          /* @__PURE__ */ jsx("p", { children: "These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which Shopcart operates." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) }) });
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Terms
}, Symbol.toStringTag, { value: "Module" }));
function PaymentForm() {
  const { auth } = usePage().props;
  const { resetCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [total, setTotal] = useState(0);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    const storedOrderData = sessionStorage.getItem("orderData");
    const storedTotal = sessionStorage.getItem("cartTotal");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    }
    if (storedTotal) {
      setTotal(parseFloat(storedTotal));
    }
    if (!storedCartItems || !storedOrderData) {
      toast$1.error("No order data found. Please start from cart.");
      router.visit("/basket");
    }
  }, []);
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.slice(0, 16);
    return limited.replace(/(\d{4})(?=\d)/g, "$1 ");
  };
  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };
  const handleInputChange = (field, value) => {
    let formattedValue = value;
    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }
    setCardData((prev) => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  const validateForm = () => {
    const newErrors = {};
    const cleanCardNumber = cardData.cardNumber.replace(/\s/g, "");
    if (!cleanCardNumber || cleanCardNumber.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!cardData.cardHolder.trim()) {
      newErrors.cardHolder = "Card holder name is required";
    }
    const cleanExpiry = cardData.expiryDate.replace(/\D/g, "");
    if (!cleanExpiry || cleanExpiry.length !== 4) {
      newErrors.expiryDate = "Expiry date must be MM/YY format";
    } else {
      const month = parseInt(cleanExpiry.slice(0, 2));
      if (month < 1 || month > 12) {
        newErrors.expiryDate = "Invalid month";
      }
    }
    if (!cardData.cvv || cardData.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast$1.error("Please fill all fields correctly");
      return;
    }
    if (!cartItems.length || !orderData) {
      toast$1.error("Invalid order data");
      return;
    }
    setLoading(true);
    const items = cartItems.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: Number(item.price) || 0,
      discount_price: item.discount > 0 ? Number((item.price * (item.discount / 100)).toFixed(2)) : null
    }));
    router.post("/payment/processPayment", {
      items,
      name: orderData.name,
      surname: orderData.surname,
      address: orderData.address,
      phone: orderData.phone,
      card_number: cardData.cardNumber.replace(/\s/g, ""),
      card_holder: cardData.cardHolder,
      expiry_date: cardData.expiryDate,
      cvv: cardData.cvv
    }, {
      onSuccess: () => {
        toast$1.success("Payment successful!");
        resetCart();
        sessionStorage.removeItem("cartItems");
        sessionStorage.removeItem("orderData");
        sessionStorage.removeItem("cartTotal");
      },
      onError: (errors2) => {
        toast$1.error("Payment failed. Please try again.");
        setLoading(false);
      },
      onFinish: () => {
        setLoading(false);
      }
    });
  };
  const formatPrice = (value) => {
    const num = Number(value);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };
  if (!cartItems.length) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-[#0A0A0A] flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "Loading..." }) }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-[#0A0A0A] py-8 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs(Link, { href: "/basket", className: "inline-flex items-center gap-2 text-[#063c28] dark:text-[#7fc17f] hover:underline mb-6", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
      "Back to Cart"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#1a1a1a] rounded-lg border border-neutral-300 dark:border-[#333] p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 text-[#063c28] dark:text-[#7fc17f]" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Order Summary" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-[400px] overflow-y-auto", children: cartItems.map((item) => {
          const finalPrice = item.discount > 0 ? item.price - item.price * item.discount / 100 : item.price;
          return /* @__PURE__ */ jsxs("div", { className: "flex gap-4 border-b border-neutral-200 dark:border-[#333] pb-4 last:border-b-0", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-md overflow-hidden border border-neutral-300 dark:border-[#444]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: item.image,
                alt: item.name,
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-black dark:text-white line-clamp-1", children: item.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-1", children: [
                "Quantity: ",
                item.quantity
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mt-2", children: item.discount > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] dark:text-[#7fc17f]", children: [
                  formatPrice(finalPrice),
                  "₼"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm line-through text-gray-500", children: [
                  formatPrice(item.price),
                  "₼"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded", children: [
                  "-",
                  item.discount,
                  "%"
                ] })
              ] }) : /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] dark:text-[#7fc17f]", children: [
                formatPrice(item.price),
                "₼"
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxs("p", { className: "font-semibold text-black dark:text-white", children: [
              formatPrice(finalPrice * item.quantity),
              "₼"
            ] }) })
          ] }, item.product_id);
        }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t border-neutral-300 dark:border-[#333]", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-lg font-semibold text-black dark:text-white", children: [
          /* @__PURE__ */ jsx("span", { children: "Total Amount" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[#063c28] dark:text-[#7fc17f]", children: [
            formatPrice(total),
            "₼"
          ] })
        ] }) }),
        orderData && /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-neutral-300 dark:border-[#333]", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-black dark:text-white mb-3", children: "Delivery Address" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-sm text-gray-600 dark:text-gray-400", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-black dark:text-white", children: "Name:" }),
              " ",
              orderData.name,
              " ",
              orderData.surname
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-black dark:text-white", children: "Address:" }),
              " ",
              orderData.address
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-black dark:text-white", children: "Phone:" }),
              " ",
              orderData.phone
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#1a1a1a] rounded-lg border border-neutral-300 dark:border-[#333] p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
          /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5 text-[#063c28] dark:text-[#7fc17f]" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Payment Details" })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Card Number" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "1234 5678 9012 3456",
                value: cardData.cardNumber,
                onChange: (e) => handleInputChange("cardNumber", e.target.value),
                className: `w-full px-4 py-3 rounded-lg border ${errors.cardNumber ? "border-red-500" : "border-neutral-300 dark:border-[#444]"} bg-white dark:bg-[#0A0A0A] text-black dark:text-white focus:ring-2 focus:ring-[#063c28] dark:focus:ring-[#7fc17f] focus:border-transparent outline-none transition`
              }
            ),
            errors.cardNumber && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: errors.cardNumber })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Card Holder Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "JOHN DOE",
                value: cardData.cardHolder,
                onChange: (e) => handleInputChange("cardHolder", e.target.value.toUpperCase()),
                className: `w-full px-4 py-3 rounded-lg border ${errors.cardHolder ? "border-red-500" : "border-neutral-300 dark:border-[#444]"} bg-white dark:bg-[#0A0A0A] text-black dark:text-white focus:ring-2 focus:ring-[#063c28] dark:focus:ring-[#7fc17f] focus:border-transparent outline-none transition`
              }
            ),
            errors.cardHolder && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: errors.cardHolder })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Expiry Date" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "MM/YY",
                  value: cardData.expiryDate,
                  onChange: (e) => handleInputChange("expiryDate", e.target.value),
                  className: `w-full px-4 py-3 rounded-lg border ${errors.expiryDate ? "border-red-500" : "border-neutral-300 dark:border-[#444]"} bg-white dark:bg-[#0A0A0A] text-black dark:text-white focus:ring-2 focus:ring-[#063c28] dark:focus:ring-[#7fc17f] focus:border-transparent outline-none transition`
                }
              ),
              errors.expiryDate && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: errors.expiryDate })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "CVV" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "123",
                  value: cardData.cvv,
                  onChange: (e) => handleInputChange("cvv", e.target.value),
                  className: `w-full px-4 py-3 rounded-lg border ${errors.cvv ? "border-red-500" : "border-neutral-300 dark:border-[#444]"} bg-white dark:bg-[#0A0A0A] text-black dark:text-white focus:ring-2 focus:ring-[#063c28] dark:focus:ring-[#7fc17f] focus:border-transparent outline-none transition`
                }
              ),
              errors.cvv && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: errors.cvv })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Lock, { className: "w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-blue-900 dark:text-blue-300", children: "Secure Payment" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-700 dark:text-blue-400 mt-1", children: "This is a demo payment system. No real transactions will be processed." })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: "w-full bg-[#063d29cc] dark:bg-[#2a6a2a] text-white py-3 rounded-lg font-semibold hover:bg-[#063c28] dark:hover:bg-[#1e4f1e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
              children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                "Processing..."
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Lock, { className: "w-5 h-5" }),
                "Pay ",
                formatPrice(total),
                "₼"
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PaymentForm
}, Symbol.toStringTag, { value: "Module" }));
function Index$3() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return /* @__PURE__ */ jsxs(LikesProvider, { children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx(PaymentForm, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$3
}, Symbol.toStringTag, { value: "Module" }));
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(
          ChevronDownIcon,
          {
            className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"
          }
        )
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
function Product() {
  const { product: initialProduct, relatedProducts } = usePage().props;
  const [currentProduct, setCurrentProduct] = useState(initialProduct);
  const [viewedProducts, setViewedProducts] = useState([initialProduct]);
  const { auth } = usePage().props;
  const userId = auth?.user?.id || 0;
  const { addCart, increment, decrement, getQuantity } = useCart();
  const handleThumbnailClick = (product) => {
    setCurrentProduct(product);
    if (!viewedProducts.find((p) => p.id === product.id)) {
      setViewedProducts((prev) => [...prev, product]);
    }
  };
  const allThumbnails = [
    ...viewedProducts,
    ...relatedProducts.filter((p) => !viewedProducts.find((v) => v.id === p.id))
  ];
  return /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-(--breakpoint-xl) px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-10 py-10 md:flex-row", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full space-y-2 md:w-1/2 md:space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "group max-h-[550px] min-h-[450px] w-full overflow-hidden rounded-md border border-[#151515]/10 dark:border-white/10 opacity-[1]", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: `/storage/${currentProduct.image}`,
          alt: currentProduct.name,
          loading: "lazy",
          className: "hoverEffect h-96 max-h-[550px] min-h-[500px] w-full rounded-md object-contain group-hover:scale-110"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "grid h-20 grid-cols-6 gap-2 md:h-24 overflow-x-auto", children: allThumbnails.map((item) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleThumbnailClick(item),
          className: `overflow-hidden rounded-md border dark:ring-white/20
                                    ${item.id === currentProduct.id ? "border-[#063c28] dark:border-[#3b9c3c]" : ""}`,
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${item.image}`,
              alt: item.name,
              className: "h-auto w-full object-contain"
            }
          )
        },
        item.id
      )) })
    ] }, currentProduct.id),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-5 md:w-1/2", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold text-black dark:text-white", children: currentProduct.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm tracking-wide text-gray-600 dark:text-gray-400", children: currentProduct.short_description }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0 text-xs", children: /* @__PURE__ */ jsx(
          Rating,
          {
            rating: currentProduct.average_rating || 0,
            productId: currentProduct.id
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 border-t border-b border-gray-200 dark:border-white/10 py-5", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: currentProduct.discount > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold text-[#063c28] dark:text-green-300", children: [
            (currentProduct.sell_price - currentProduct.sell_price * currentProduct.discount / 100).toFixed(2),
            "₼"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold text-zinc-500 line-through dark:text-zinc-400", children: [
            currentProduct.sell_price,
            "₼"
          ] })
        ] }) : /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold text-[#063c28] dark:text-green-300", children: [
          currentProduct.sell_price,
          "₼"
        ] }) }) }),
        currentProduct.stock > 0 ? /* @__PURE__ */ jsx("p", { className: "w-20 rounded-md bg-green-100 dark:bg-green-800 py-1.5 text-center text-xs font-semibold text-green-600 dark:text-green-200", children: "In Stock" }) : /* @__PURE__ */ jsx("p", { className: "w-20 rounded-md bg-gray-200 dark:bg-gray-700 py-1.5 text-center text-xs font-semibold text-gray-600 dark:text-gray-300", children: "Out of Stock" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 lg:gap-5", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-full items-center", children: getQuantity(currentProduct.id) > 0 ? /* @__PURE__ */ jsx("div", { className: "flex h-12 w-full items-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#737373] dark:text-gray-300", children: "Quantity" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 pb-1 text-[1rem]", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => decrement(currentProduct.id),
                  className: "inline-flex h-6 w-6 items-center justify-center bg-white dark:bg-gray-800 text-neutral-900 dark:text-white border-0",
                  children: /* @__PURE__ */ jsx(Minus, {})
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "w-6 text-center text-sm font-semibold text-neutral-900 dark:text-white", children: getQuantity(currentProduct.id) }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => increment(currentProduct.id, currentProduct.stock),
                  disabled: getQuantity(currentProduct.id) >= currentProduct.stock,
                  className: "inline-flex h-6 w-6 items-center justify-center bg-white dark:bg-gray-800 text-neutral-900 dark:text-white border-0",
                  children: /* @__PURE__ */ jsx(Plus, {})
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t dark:border-white/10 pt-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-neutral-900 dark:text-white", children: "Subtotal" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-neutral-950 dark:text-gray-200", children: [
              "$",
              ((currentProduct.sell_price - currentProduct.sell_price * (currentProduct.discount / 100)) * getQuantity(currentProduct.id)).toFixed(2)
            ] })
          ] })
        ] }) }) : /* @__PURE__ */ jsx("div", { className: "flex h-12 w-full items-center", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: () => addCart(userId, currentProduct),
            disabled: currentProduct.stock <= 0,
            className: "inline-flex h-9 w-full items-center justify-center gap-2 bg-[#063c28]/80 hover:bg-[#063c28] text-white",
            children: [
              /* @__PURE__ */ jsx(ShoppingBag, {}),
              "Add to Cart"
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx(FavoriteButton, { product: currentProduct, children: (isLiked) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "group relative rounded-sm border border-[#3b9c3c]/80 dark:border-[#3b9c3c] p-1.5 text-[#3b9c3c]/80 dark:text-[#3b9c3c] hover:text-[#3b9c3c]",
            children: /* @__PURE__ */ jsx(
              Heart,
              {
                className: `h-5 w-5 ${isLiked ? "fill-[#063c28] text-[#3b9c3c]" : ""}`
              }
            )
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, defaultValue: "item", children: /* @__PURE__ */ jsxs(AccordionItem, { value: "item", children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-black dark:text-white", children: currentProduct.name }),
        /* @__PURE__ */ jsxs(AccordionContent, { className: "flex flex-col gap-1 pt-0 pb-4", children: [
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between text-neutral-800 dark:text-gray-300", children: [
            "Brand:",
            /* @__PURE__ */ jsxs("span", { className: "font-semibold text-neutral-900 dark:text-white", children: [
              " ",
              currentProduct.brand?.name
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between text-neutral-800 dark:text-gray-300", children: [
            "Category:",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-neutral-900 dark:text-white", children: currentProduct.category?.name })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between text-neutral-800 dark:text-gray-300", children: [
            "Stock:",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-neutral-900 dark:text-white", children: currentProduct.stock > 0 ? "Available" : "Unavailable" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "-mt-2 flex flex-wrap items-center justify-between gap-2.5 border-b border-gray-200 dark:border-white/10 py-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "hoverEffect flex items-center gap-2 text-sm text-black dark:text-gray-200 hover:text-red-600 dark:hover:text-[#3b9c3c]", children: [
          /* @__PURE__ */ jsx(SquarePlus, {}),
          /* @__PURE__ */ jsx("p", { children: "Compare color" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hoverEffect flex items-center gap-2 text-sm text-black dark:text-gray-200 hover:text-red-600 dark:hover:text-[#3b9c3c]", children: [
          /* @__PURE__ */ jsx(CircleQuestionMark, {}),
          /* @__PURE__ */ jsx("p", { children: "Ask a question" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hoverEffect flex items-center gap-2 text-sm text-black dark:text-gray-200 hover:text-red-600 dark:hover:text-[#3b9c3c]", children: [
          /* @__PURE__ */ jsx(Truck, {}),
          /* @__PURE__ */ jsx("p", { children: "Delivery & Return" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hoverEffect flex items-center gap-2 text-sm text-black dark:text-gray-200 hover:text-red-600 dark:hover:text-[#3b9c3c]", children: [
          /* @__PURE__ */ jsx(Share2, {}),
          /* @__PURE__ */ jsx("p", { children: "Share" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 border border-b-0 border-[#52525b]/25 dark:border-white/10 p-3", children: [
          /* @__PURE__ */ jsx(Truck, { width: 30, height: 30, className: "text-[#fb6c08]" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[1rem] font-semibold text-black dark:text-white", children: "Free Delivery" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 underline underline-offset-2", children: "Enter your Postal code for Delivery Availability." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 border border-[#52525b]/25 dark:border-white/10 p-3", children: [
          /* @__PURE__ */ jsx(CornerDownLeft, { width: 30, height: 30, className: "text-[#fb6c08]" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[1rem] font-semibold text-black dark:text-white", children: "Return Delivery" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-300", children: [
              "Free 30days Delivery Returns.",
              /* @__PURE__ */ jsx("span", { className: "ml-1 underline underline-offset-2", children: "Details" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Product
}, Symbol.toStringTag, { value: "Module" }));
function Index$2() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useFlashMessages();
  return /* @__PURE__ */ jsxs(LikesProvider, { children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx(Product, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
function ProductList({ products }) {
  const { auth } = usePage().props;
  const userId = auth?.user?.id || 0;
  const { addCart, increment, decrement, getQuantity } = useCart();
  const safeProducts = Array.isArray(products) ? products : [];
  return /* @__PURE__ */ jsx("div", { className: "flex-1 pt-5", children: /* @__PURE__ */ jsxs("div", { className: "h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5", children: safeProducts.map((product) => /* @__PURE__ */ jsx("div", { className: "opacity-100", children: /* @__PURE__ */ jsxs("div", { className: "text-sm border rounded-md border-[#6c7fd8]/20 group bg-white dark:bg-[#0f0f13] dark:border-[#2b2b36] overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative group overflow-hidden bg-[#f6f6f6] dark:bg-[#1a1a1f]", children: [
        /* @__PURE__ */ jsx(Link, { href: `/product/${product.id}`, children: /* @__PURE__ */ jsx(
          "img",
          {
            src: `/storage/${product.image}`,
            alt: product.name,
            className: "w-full h-64 object-contain transition-transform duration-500 bg-shop_light_bg group-hover:scale-105 dark:bg-[#1a1a1f]"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx(FavoriteButton, { product }) }),
        product.discount > 0 ? /* @__PURE__ */ jsx("p", { className: "absolute top-2 left-2 z-10 text-xs text-black border border-[#15151580] px-2 rounded-full group-hover:border-[#016630] hover:text-[#063c28cc] hoverEffect animate-pulse-scale dark:text-green-800 dark:border-white/40 dark:hover:border-[#3dd68c]", children: "Sale!" }) : /* @__PURE__ */ jsx(Link, { href: "/hot-deal", className: "absolute top-2 left-2 z-10 border border-[#fb6c0880] p-1 rounded-full group-hover:border-[#fb6c08]/50 hover:text-[#016630] hoverEffect dark:border-[#ff8a3d80] dark:hover:border-[#ff8a3d]", children: /* @__PURE__ */ jsx(Flame, { size: 16, fill: "#fb6c08", className: "text-[#fb6c08]/50 group-hover:text-[#fb6c08] hoverEffect dark:text-[#ff8a3d]" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-3 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "uppercase line-clamp-1 text-xs font-medium text-[#ababab] dark:text-gray-400", children: product.category?.name }),
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-[1rem] line-clamp-1 text-neutral-800 dark:text-gray-100", children: product.name }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0 -ml-2", children: /* @__PURE__ */ jsx(
          Rating,
          {
            rating: product.average_rating || 0,
            productId: product.id
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2.5", children: product.stock > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-neutral-800 dark:text-gray-100", children: "In Stock" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#063c28]/80 font-semibold dark:text-[#4ade80]", children: product.stock })
        ] }) : /* @__PURE__ */ jsx("p", { className: "text-[#737373] font-semibold dark:text-gray-500", children: "Out of Stock" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-5", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: Number(product.discount) > 0 ? /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] text-sm dark:text-[#4ade80]", children: [
            (Number(product.sell_price) - Number(product.sell_price) * Number(product.discount) / 100).toFixed(2),
            "₼"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "line-through ml-1 font-normal text-zinc-500 text-sm dark:text-gray-500", children: [
            (Number(product.sell_price) || 0).toFixed(2),
            "₼"
          ] })
        ] }) : /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] text-sm dark:text-[#4ade80]", children: [
          (Number(product.sell_price) || 0).toFixed(2),
          "₼"
        ] }) }) }),
        getQuantity(product.id) > 0 ? /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-sm w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#737373] dark:text-gray-300", children: "Quantity" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 pb-1 text-[1rem]", children: [
              /* @__PURE__ */ jsx(Button, { onClick: () => decrement(product.id), className: "w-6 h-6 border-0 bg-white hover:bg-[#063c28]/20 text-neutral-900 dark:bg-[#1a1a1f] dark:text-gray-100 dark:hover:bg-[#1a4030]", children: /* @__PURE__ */ jsx(Minus, {}) }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm w-6 text-center text-neutral-900 dark:text-gray-100", children: getQuantity(product.id) }),
              /* @__PURE__ */ jsx(Button, { onClick: () => increment(product.id, product.stock), disabled: getQuantity(product.id) >= product.stock, className: "w-6 h-6 border-0 bg-white hover:bg-[#063c28]/20 text-neutral-900 dark:bg-[#1a1a1f] dark:text-gray-100 dark:hover:bg-[#1a4030]", children: /* @__PURE__ */ jsx(Plus, {}) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t pt-1 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-900 font-semibold dark:text-gray-300", children: "Subtotal" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-neutral-950 dark:text-gray-100", children: [
              ((product.sell_price - product.sell_price * (product.discount / 100)) * getQuantity(product.id)).toFixed(2),
              "₼"
            ] })
          ] })
        ] }) }) : /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: /* @__PURE__ */ jsxs(Button, { onClick: () => addCart(userId, product), disabled: product.stock <= 0, className: "h-9 px-4 py-2 w-36 rounded-full bg-[#063c28]/80 text-[#f8f8fb] border border-[#063c28]/80 hover:bg-[#063c28] hover:text-white hover:border-[#063c28] font-semibold tracking-wide dark:bg-[#063c28]/80 dark:border-[#063c28]/80 dark:hover:bg-[#063c28]", children: [
          /* @__PURE__ */ jsx(ShoppingBag, {}),
          " Add to Cart"
        ] }) })
      ] })
    ] }) }, product.id)) }),
    safeProducts.length === 0 && /* @__PURE__ */ jsx(NoProduct, {})
  ] }) });
}
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductList
}, Symbol.toStringTag, { value: "Module" }));
const price = [
  { value: "Under 100", label: "Under $100" },
  { value: "100-200", label: "$100 - $200" },
  { value: "200-300", label: "$200 - $300" },
  { value: "300-400", label: "$300 - $400" },
  { value: "Over 500", label: "Over $500" }
];
function Sidebar({ categories = [], brands = [], initialCategory = null }) {
  const { products, filters } = usePage().props;
  const selectedCategory = filters?.category ? String(filters.category) : null;
  const selectedBrand = filters?.brand ? Number(filters.brand) : null;
  const selectedPrice = filters?.price || null;
  const safeProducts = Array.isArray(products?.data) ? products.data : [];
  const safeBrands = Array.isArray(brands) ? brands : [];
  const safeCategories = Array.isArray(categories) ? categories : [];
  const activeFiltersCount = (selectedCategory ? 1 : 0) + (selectedBrand ? 1 : 0) + (selectedPrice ? 1 : 0);
  const applyFilter = (newFilters) => {
    const merged = { selectedCategory, selectedBrand, selectedPrice, ...newFilters };
    const query = {};
    if (merged.selectedCategory) query.category = merged.selectedCategory;
    if (merged.selectedBrand) query.brand = merged.selectedBrand;
    if (merged.selectedPrice) query.price = merged.selectedPrice;
    router.get("/shop", query, {
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  };
  return /* @__PURE__ */ jsx("div", { className: clsx$1("border-t", "border-neutral-200", "dark:border-neutral-700"), children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 mt-5", children: [
    /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-10 mb-5", children: /* @__PURE__ */ jsx("h2", { className: clsx$1("font-semibold text-lg uppercase tracking-wide", "text-neutral-900", "dark:text-neutral-100"), children: "Get the products as your needs" }) }),
    /* @__PURE__ */ jsxs("div", { className: clsx$1("flex flex-col md:flex-row gap-5 border-t", "border-t-[#063d29]/50", "dark:border-t-[#4ade80]/30"), children: [
      /* @__PURE__ */ jsxs("div", { className: clsx$1("md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 scrollbar-hide border-r", "border-r-[#063d29]/50", "dark:border-r-[#4ade80]/30"), children: [
        /* @__PURE__ */ jsxs("div", { className: clsx$1("w-full p-5", "bg-white", "dark:bg-neutral-900"), children: [
          /* @__PURE__ */ jsx("h2", { className: clsx$1("text-[1rem] font-semibold", "text-neutral-900", "dark:text-neutral-100"), children: "Product Categories" }),
          /* @__PURE__ */ jsx("div", { role: "radiogroup", className: "grid gap-2 mt-2 space-y-1", children: safeCategories.length > 0 ? safeCategories.map((category) => /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => applyFilter({ selectedCategory: String(category.id) }),
              className: "flex items-center space-x-2 hover:cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    role: "radio",
                    className: clsx$1(
                      "aspect-square h-4 w-4 border shadow-sm rounded flex items-center justify-center",
                      selectedCategory === String(category.id) ? "border-[#063c28] dark:border-[#4ade80]" : "border-black dark:border-neutral-400",
                      "bg-white dark:bg-neutral-800"
                    ),
                    children: selectedCategory === String(category.id) && /* @__PURE__ */ jsx(Check, { className: clsx$1("h-3.5 w-3.5", "text-[#063c28]", "dark:text-[#4ade80]") })
                  }
                ),
                /* @__PURE__ */ jsx("label", { className: clsx$1("text-sm", selectedCategory === String(category.id) ? "text-[#063c28] font-bold dark:text-[#4ade80]" : "text-neutral-900 dark:text-neutral-300"), children: category.name })
              ]
            },
            category.id
          )) : /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-500 dark:text-neutral-400", children: "No categories" }) }),
          selectedCategory && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => applyFilter({ selectedCategory: null }),
              className: clsx$1("text-sm font-medium mt-2 underline", "text-neutral-900 hover:text-[#063d29]", "dark:text-neutral-300 dark:hover:text-[#4ade80]"),
              children: "Reset"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: clsx$1("w-full p-5", "bg-white", "dark:bg-neutral-900"), children: [
          /* @__PURE__ */ jsx("h2", { className: clsx$1("text-[1rem] font-semibold", "text-neutral-900", "dark:text-neutral-100"), children: "Brands" }),
          /* @__PURE__ */ jsx("div", { role: "radiogroup", className: "grid gap-2 mt-2 space-y-1", children: safeBrands.length > 0 ? safeBrands.map((brand) => /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => applyFilter({ selectedBrand: Number(brand.id) }),
              className: "flex items-center space-x-2 hover:cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    role: "radio",
                    className: clsx$1(
                      "aspect-square h-4 w-4 border shadow-sm rounded flex items-center justify-center",
                      selectedBrand === Number(brand.id) ? "border-[#063c28] dark:border-[#4ade80]" : "border-black dark:border-neutral-400",
                      "bg-white dark:bg-neutral-800"
                    ),
                    children: selectedBrand === Number(brand.id) && /* @__PURE__ */ jsx(Check, { className: clsx$1("h-3.5 w-3.5", "text-[#063c28]", "dark:text-[#4ade80]") })
                  }
                ),
                /* @__PURE__ */ jsx("label", { className: clsx$1("text-sm", selectedBrand === Number(brand.id) ? "text-[#063c28] font-bold dark:text-[#4ade80]" : "text-neutral-900 dark:text-neutral-300"), children: brand.name })
              ]
            },
            brand.id
          )) : /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-500 dark:text-neutral-400", children: "No brands" }) }),
          selectedBrand && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => applyFilter({ selectedBrand: null }),
              className: clsx$1("text-sm font-medium mt-2 underline", "text-neutral-900 hover:text-[#063d29]", "dark:text-neutral-300 dark:hover:text-[#4ade80]"),
              children: "Reset"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: clsx$1("w-full p-5", "bg-white", "dark:bg-neutral-900"), children: [
          /* @__PURE__ */ jsx("h2", { className: clsx$1("text-[1rem] font-semibold", "text-neutral-900", "dark:text-neutral-100"), children: "Price" }),
          /* @__PURE__ */ jsx("div", { role: "radiogroup", className: "grid gap-2 mt-2 space-y-1", children: price.map((p) => /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => applyFilter({ selectedPrice: p.value }),
              className: "flex items-center space-x-2 hover:cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    role: "radio",
                    className: clsx$1(
                      "aspect-square h-4 w-4 border shadow-sm rounded flex items-center justify-center",
                      selectedPrice === p.value ? "border-[#063c28] dark:border-[#4ade80]" : "border-black dark:border-neutral-400",
                      "bg-white dark:bg-neutral-800"
                    ),
                    children: selectedPrice === p.value && /* @__PURE__ */ jsx(Check, { className: clsx$1("h-3.5 w-3.5", "text-[#063c28]", "dark:text-[#4ade80]") })
                  }
                ),
                /* @__PURE__ */ jsx("label", { className: clsx$1("text-sm", selectedPrice === p.value ? "text-[#063c28] font-bold dark:text-[#4ade80]" : "text-neutral-900 dark:text-neutral-300"), children: p.label })
              ]
            },
            p.value
          )) }),
          selectedPrice && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => applyFilter({ selectedPrice: null }),
              className: clsx$1("text-sm font-medium mt-2 underline", "text-neutral-900 hover:text-[#063d29]", "dark:text-neutral-300 dark:hover:text-[#4ade80]"),
              children: "Reset"
            }
          ),
          activeFiltersCount >= 2 && /* @__PURE__ */ jsx("div", { className: "mt-2 flex justify-start", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => router.get("/shop", {}, { replace: true, preserveScroll: true }),
              className: clsx$1("text-sm font-medium mt-2 underline", "text-neutral-900 hover:text-[#063d29]", "dark:text-neutral-300 dark:hover:text-[#4ade80]"),
              children: "Reset All"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ProductList, { products: safeProducts })
    ] })
  ] }) });
}
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sidebar
}, Symbol.toStringTag, { value: "Module" }));
function Index$1() {
  const { brands, categories } = usePage().props;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useFlashMessages();
  return /* @__PURE__ */ jsxs(LikesProvider, { children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx(Sidebar, { brands, categories }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function Wishlist({ products = [] }) {
  const { auth, flash: flash2 } = usePage().props;
  const userId = auth?.user?.id || 0;
  const { addCart, increment, decrement, getQuantity } = useCart();
  const {
    guestProducts,
    removeGuestProduct,
    resetGuestWishlist,
    removeLikedIdLocal,
    setLikedIds
  } = useLikes();
  const displayedProducts = auth?.user ? products : guestProducts;
  useEffect(() => {
    if (flash2?.success) toast.success(flash2.success);
    if (flash2?.error) toast.error(flash2.error);
  }, [flash2]);
  const removeFromWishlist = (id) => {
    if (auth?.user) {
      router.delete(`/wishlist/${id}`, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          removeLikedIdLocal(id);
        }
      });
    } else {
      removeGuestProduct(id);
    }
  };
  const resetWishlist = () => {
    if (auth?.user) {
      router.delete("/wishlist/reset", {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          setLikedIds([]);
        }
      });
    } else {
      resetGuestWishlist();
    }
  };
  useFlashMessages();
  if (!displayedProducts || displayedProducts.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#737373]/20 animate-ping" }),
        /* @__PURE__ */ jsx(Heart, { className: "w-12 h-12 text-[#737373] dark:text-gray-300" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl text-neutral-900 dark:text-white font-semibold tracking-tight", children: "Your wishlist is empty" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-[#737373] dark:text-gray-400", children: "Items added to your wishlist will appear here" })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/shop",
          className: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md\r\n                    text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring\r\n                    disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none\r\n                    [&_svg]:size-4 [&_svg]:shrink-0 bg-[#063d29]/80 text-white font-semibold\r\n                    shadow-sm hover:bg-[#063d29] hoverEffect h-9 px-4 py-2",
          children: "Continue Shopping"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 my-10", children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { className: "border-b border-neutral-200 dark:border-neutral-700", children: /* @__PURE__ */ jsxs("tr", { className: "bg-white/10 dark:bg-[#0A0A0A] rounded-md", children: [
        /* @__PURE__ */ jsx("th", { className: "p-2 text-left text-black dark:text-gray-200 font-semibold", children: "Image" }),
        /* @__PURE__ */ jsx("th", { className: "p-2 text-left text-black dark:text-gray-200 font-semibold hidden md:table-cell", children: "Category" }),
        /* @__PURE__ */ jsx("th", { className: "p-2 text-left text-black dark:text-gray-200 font-semibold hidden md:table-cell", children: "Brand" }),
        /* @__PURE__ */ jsx("th", { className: "p-2 text-left text-black dark:text-gray-200 font-semibold hidden md:table-cell", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "p-2 text-left text-black dark:text-gray-200 font-semibold", children: "Price" }),
        /* @__PURE__ */ jsx("th", { className: "p-2 text-center text-black dark:text-gray-200 font-semibold md:text-left", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: displayedProducts.map((product, idx) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "border-b border-neutral-200 dark:border-neutral-700",
          children: [
            /* @__PURE__ */ jsxs("td", { className: "px-2 py-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => removeFromWishlist(product.id),
                  className: "cursor-pointer",
                  type: "button",
                  children: /* @__PURE__ */ jsx(
                    X,
                    {
                      width: 18,
                      height: 18,
                      className: "text-gray-700 dark:text-gray-300 hover:text-[#063c28] hoverEffect"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: `/product/${product.id}`,
                  className: "border border-neutral-200 dark:border-neutral-700 rounded-md group hidden md:inline-flex",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: product.image,
                      alt: product.name,
                      loading: "lazy",
                      className: "rounded-md group-hover:scale-105 hoverEffect h-20 w-20 object-contain"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "line-clamp-1 text-black dark:text-white", children: product.name })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "p-2 capitalize hidden md:table-cell", children: /* @__PURE__ */ jsx("p", { className: "uppercase line-clamp-1 text-xs text-black dark:text-gray-300 font-medium", children: product.category?.name }) }),
            /* @__PURE__ */ jsx("td", { className: "p-2 capitalize hidden md:table-cell text-black dark:text-gray-300", children: product.brand?.name }),
            /* @__PURE__ */ jsx("td", { className: "p-2 w-24 text-green-600 font-medium text-sm hidden md:table-cell", children: product.is_active ? "In Stock" : "Out of Stock" }),
            /* @__PURE__ */ jsx("td", { className: "p-2", children: Number(product.discount) > 0 ? /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#063c28] dark:text-[#60d394] text-sm", children: [
              (Number(product.sell_price) * (1 - Number(product.discount) / 100)).toFixed(2),
              "₼"
            ] }) : /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-black dark:text-gray-200", children: [
              Number(product.sell_price).toFixed(2),
              "₼"
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: getQuantity(product.id) > 0 ? /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-sm w-full", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-[#737373] dark:text-gray-300", children: "Quantity" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 pb-1 text-[1rem]", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: () => decrement(product.id),
                      className: "inline-flex items-center justify-center gap-2 whitespace-nowrap\r\n                                                                rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden\r\n                                                                focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none\r\n                                                                disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0\r\n                                                                border-[#e5e5e5] dark:border-neutral-700 dark:text-white bg-white dark:bg-neutral-900 shadow-xs\r\n                                                                hover:text-neutral-900 dark:hover:text-white w-6 h-6 border-0 hover:bg-[#063c28]/20",
                      children: /* @__PURE__ */ jsx(Minus, {})
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm w-6 text-center text-neutral-900 dark:text-white", children: getQuantity(product.id) }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: () => increment(product.id, product.stock),
                      disabled: getQuantity(product.id) >= product.stock,
                      className: "inline-flex items-center justify-center gap-2 whitespace-nowrap\r\n                                                                rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden\r\n                                                                focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none\r\n                                                                disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0\r\n                                                                border-[#e5e5e5] dark:border-neutral-700 dark:text-white bg-white dark:bg-neutral-900 shadow-xs\r\n                                                                hover:text-neutral-900 dark:hover:text-white w-6 h-6 border-0 hover:bg-[#063c28]/20",
                      children: /* @__PURE__ */ jsx(Plus, {})
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t dark:border-neutral-700 pt-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-900 dark:text-gray-300 font-semibold", children: "Subtotal" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-neutral-950 dark:text-white", children: [
                  ((product.sell_price - product.sell_price * (product.discount / 100)) * getQuantity(product.id)).toFixed(2),
                  "₼"
                ] })
              ] })
            ] }) }) : /* @__PURE__ */ jsx("div", { className: "w-full h-12 flex items-center", children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => addCart(userId, product),
                disabled: product.stock <= 0,
                className: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md\r\n                                                    text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1\r\n                                                    focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50\r\n                                                    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hoverEffect h-9 px-4 py-2\r\n                                                    bg-[#063c28]/80 text-white shadow-none border border-[#063c28]/80\r\n                                                    font-semibold tracking-wide hover:text-white hover:bg-[#063c28] hover:border-[#063c28]\r\n                                                    dark:bg-[#063c28] dark:border-[#063c28] w-full",
                children: [
                  /* @__PURE__ */ jsx(ShoppingBag, {}),
                  "Add to Cart"
                ]
              }
            ) }) }) })
          ]
        },
        `${product.id ?? "p"}-${idx}`
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: resetWishlist,
          className: "m-2.5 border px-6 py-3 border-[#063c28]/50 dark:border-[#4b725f] font-semibold text-black\r\n                dark:text-white hover:text-[#063c28] hover:border-[#063c28] hover:bg-[#063c28]/10\r\n                dark:hover:text-[#60d394] dark:hover:border-[#60d394] rounded-md hoverEffect",
          children: "Reset Favorite"
        }
      ),
      /* @__PURE__ */ jsx(Link, { href: "/basket", className: "m-2.5 border px-6 py-3 border-[#063c28]/50 dark:border-[#4b725f] font-semibold text-black\r\n                dark:text-white hover:text-[#063c28] hover:border-[#063c28] hover:bg-[#063c28]/10\r\n                dark:hover:text-[#60d394] dark:hover:border-[#60d394] rounded-md hoverEffect", children: "Buy" })
    ] })
  ] });
}
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wishlist
}, Symbol.toStringTag, { value: "Module" }));
function Index() {
  const { products } = usePage().props;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return /* @__PURE__ */ jsxs(LikesProvider, { children: [
    /* @__PURE__ */ jsx(Header$1, { onOpenSearch: () => setIsSearchOpen(true) }),
    /* @__PURE__ */ jsx(SearchBar, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    /* @__PURE__ */ jsx(Wishlist, { products }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./pages/Footer.jsx": __vite_glob_0_0, "./pages/Header.jsx": __vite_glob_0_1, "./pages/auth/auth.jsx": __vite_glob_0_2, "./pages/auth/forgot-password.jsx": __vite_glob_0_3, "./pages/auth/reset-password.jsx": __vite_glob_0_4, "./pages/basket/address.jsx": __vite_glob_0_5, "./pages/basket/basket.jsx": __vite_glob_0_6, "./pages/basket/index.jsx": __vite_glob_0_7, "./pages/blog/blog.jsx": __vite_glob_0_8, "./pages/blog/index.jsx": __vite_glob_0_9, "./pages/category/category.jsx": __vite_glob_0_10, "./pages/category/index.jsx": __vite_glob_0_11, "./pages/home/banner.jsx": __vite_glob_0_12, "./pages/home/brand.jsx": __vite_glob_0_13, "./pages/home/category.jsx": __vite_glob_0_14, "./pages/home/content.jsx": __vite_glob_0_15, "./pages/home/index.jsx": __vite_glob_0_16, "./pages/hot-deal/hot-deal.jsx": __vite_glob_0_17, "./pages/hot-deal/index.jsx": __vite_glob_0_18, "./pages/links/about.jsx": __vite_glob_0_19, "./pages/links/contact.jsx": __vite_glob_0_20, "./pages/links/faqs.jsx": __vite_glob_0_21, "./pages/links/help.jsx": __vite_glob_0_22, "./pages/links/privacy.jsx": __vite_glob_0_23, "./pages/links/terms.jsx": __vite_glob_0_24, "./pages/payment/PaymentForm.jsx": __vite_glob_0_25, "./pages/payment/index.jsx": __vite_glob_0_26, "./pages/product/index.jsx": __vite_glob_0_27, "./pages/product/product.jsx": __vite_glob_0_28, "./pages/provider/CartProvider.jsx": __vite_glob_0_29, "./pages/provider/LikesProvider.jsx": __vite_glob_0_30, "./pages/rating/rating.jsx": __vite_glob_0_31, "./pages/shop/index.jsx": __vite_glob_0_32, "./pages/shop/product-list.jsx": __vite_glob_0_33, "./pages/shop/sidebar.jsx": __vite_glob_0_34, "./pages/wishlist/index.jsx": __vite_glob_0_35, "./pages/wishlist/wishlist.jsx": __vite_glob_0_36 });
      return pages[`./pages/${name}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
