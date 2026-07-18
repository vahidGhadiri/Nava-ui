import type { ReactNode } from "react";

const icons: Record<string, ReactNode> = {
  Menu: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <line x2="21" x1="3" y1="6" y2="6" />
      <line y1="12" x2="21" y2="12" x1="3" />
      <line y1="18" x2="21" y2="18" x1="3" />
      <circle fill="currentColor" cx="7" cy="6" r="1" />
      <circle fill="currentColor" cy="12" cx="7" r="1" />
      <circle fill="currentColor" cy="18" cx="7" r="1" />
    </svg>
  ),
  Alert: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" x2="12" y2="13" y1="9" />
      <line x2="12.01" x1="12" y1="17" y2="17" />
    </svg>
  ),
  Table: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <rect height="18" width="20" rx="2" x="2" y="3" />
      <line x2="22" x1="2" y1="9" y2="9" />
      <line y1="15" x2="22" y2="15" x1="2" />
      <line y2="21" x1="9" y1="3" x2="9" />
    </svg>
  ),
  Input: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <rect height="10" width="20" rx="2" x="2" y="7" />
      <path d="M6 12h2M14 12h4" />
      <circle fill="currentColor" cx="10" cy="12" r="0.5" />
    </svg>
  ),
  Tag: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <circle fill="currentColor" r="1.5" cx="7" cy="7" />
    </svg>
  ),
  Modal: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <rect height="14" width="18" rx="2" x="3" y="5" />
      <line x2="21" x1="3" y1="9" y2="9" />
      <line x2="15.01" x1="15" y1="6" y2="6" />
    </svg>
  ),
  Flex: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <rect height="18" width="7" rx="2" x="3" y="3" />
      <rect height="18" width="7" rx="2" x="14" y="3" />
      <path d="M3 12h18" />
    </svg>
  ),
  Badge: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle fill="currentColor" cx="12" cy="11" r="1" />
    </svg>
  ),
  Switch: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <rect height="12" width="20" rx="6" x="2" y="6" />
      <circle fill="currentColor" cx="16" cy="12" r="4" />
    </svg>
  ),
  Card: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <rect height="18" width="20" rx="2" x="2" y="3" />
      <line x2="22" x1="2" y1="9" y2="9" />
    </svg>
  ),
  Avatar: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Radio: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <circle cx="12" cy="12" r="9" />
      <circle fill="currentColor" cx="12" cy="12" r="4" />
    </svg>
  ),
  Toast: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <rect height="10" width="20" rx="2" x="2" y="7" />
      <path d="M15 11l2 2M17 11l-2 2" />
    </svg>
  ),
  Checkbox: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <rect height="18" width="18" rx="3" x="3" y="3" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Select: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <rect height="10" width="20" rx="2" x="2" y="7" />
      <path d="M15 10l-3 3-3-3" />
    </svg>
  ),
  Button: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <rect height="10" width="18" rx="3" x="3" y="7" />
      <path d="M7 12h4M9 10v4" />
    </svg>
  ),
  Spinner: (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      height="32"
      width="32"
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </svg>
  ),
};

const componentCategories = [
  {
    items: [
      {
        description: "To trigger an operation.",
        href: "/components/button",
        status: "ready" as const,
        name: "Button",
      },
    ],
    title: "General",
  },
  {
    items: [
      {
        description: "A flexible layout container.",
        status: "soon" as const,
        name: "Flex",
        href: "#",
      },
    ],
    title: "Layout",
  },
  {
    items: [
      {
        description: "Navigation menu.",
        status: "soon" as const,
        name: "Menu",
        href: "#",
      },
    ],
    title: "Navigation",
  },
  {
    items: [
      {
        description: "A form control for text input.",
        status: "soon" as const,
        name: "Input",
        href: "#",
      },
      {
        description: "Single selection from a dropdown.",
        status: "soon" as const,
        name: "Select",
        href: "#",
      },
      {
        description: "Check/uncheck an option.",
        status: "soon" as const,
        name: "Checkbox",
        href: "#",
      },
      {
        description: "Toggle between on/off states.",
        status: "soon" as const,
        name: "Switch",
        href: "#",
      },
      {
        description: "Select one option from a set.",
        status: "soon" as const,
        name: "Radio",
        href: "#",
      },
    ],
    title: "Data Entry",
  },
  {
    items: [
      {
        description: "User representation.",
        status: "soon" as const,
        name: "Avatar",
        href: "#",
      },
      {
        description: "Inline status indicator.",
        status: "soon" as const,
        name: "Badge",
        href: "#",
      },
      {
        description: "Content container.",
        status: "soon" as const,
        name: "Card",
        href: "#",
      },
      {
        description: "Display tabular data.",
        status: "soon" as const,
        name: "Table",
        href: "#",
      },
      {
        description: "Categorize or tag items.",
        status: "soon" as const,
        name: "Tag",
        href: "#",
      },
    ],
    title: "Data Display",
  },
  {
    items: [
      {
        description: "Display warning messages.",
        status: "soon" as const,
        name: "Alert",
        href: "#",
      },
      {
        description: "Dialog overlay for important content.",
        status: "soon" as const,
        name: "Modal",
        href: "#",
      },
      {
        description: "Brief automatic notification.",
        status: "soon" as const,
        name: "Toast",
        href: "#",
      },
      {
        description: "Loading state indicator.",
        status: "soon" as const,
        name: "Spinner",
        href: "#",
      },
    ],
    title: "Feedback",
  },
];

export { componentCategories, icons };
