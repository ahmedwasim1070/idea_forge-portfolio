// Types
import type { ProfileLink } from "@/types";

// The developer behind the publisher.
export const profile = {
  name: "Muhammad Ahmad",
  role: "Software Engineer — Full Stack, Systems",
  location: "Pakistan",
  bio: [
    "Idea Forge is managed and operated by Muhammad Ahmad, a software engineer working across full-stack web and low-level systems development.",
    "Every product published here is solo-engineered and maintained — designed, built, shipped to the Microsoft Store, and supported by one person. That focus shapes the software: purpose-built tools that do their job precisely, hold no accounts, collect no analytics, and keep whatever they remember on your own machine.",
  ],
};

export const profileLinks: ProfileLink[] = [
  {
    href: "https://github.com/ahmedwasim1070",
    label: "GitHub",
    handle: "ahmedwasim1070",
  },
  {
    href: "https://www.linkedin.com/in/ahmedwasim1070/",
    label: "LinkedIn",
    handle: "ahmedwasim1070",
  },
];
