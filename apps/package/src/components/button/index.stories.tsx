import type { StoryObj, Meta } from "@storybook/react";

import Button from ".";

const meta = {
  argTypes: {
    variant: {
      options: ["primary", "secondary", "ghost", "danger", "naked"],
      description: "Visual style",
      control: "select",
    },
    loadingPosition: {
      description: "Loading indicator position",
      options: ["start", "end", "center"],
      control: "select",
    },
    size: {
      options: ["small", "medium", "large"],
      description: "Button size",
      control: "select",
    },
    shape: {
      options: ["pill", "circle"],
      description: "Button shape",
      control: "select",
    },
    submitLoading: {
      description: "Show loading on form submit",
      control: "boolean",
    },
    disabled: {
      description: "Disable the button",
      control: "boolean",
    },
    loading: {
      description: "Show loading state",
      control: "boolean",
    },
  },
  title: "Components/Button",
  tags: ["autodocs"],
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger",
    variant: "danger",
  },
};

export const Naked: Story = {
  args: {
    children: "Naked",
    variant: "naked",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading",
    loading: true,
  },
};

export const LoadingCenter: Story = {
  args: {
    loadingPosition: "center",
    children: "Saving...",
    loading: true,
  },
};

export const LoadingEnd: Story = {
  args: {
    loadingPosition: "end",
    children: "Saving...",
    loading: true,
  },
};

export const Circle: Story = {
  args: {
    children: (
      <svg
        strokeLinejoin="round"
        stroke="currentColor"
        strokeLinecap="round"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        strokeWidth="2"
        fill="none"
      >
        <circle cx="11" cy="11" r="8" />
        <line x2="16.65" y2="16.65" x1="21" y1="21" />
      </svg>
    ),
    shape: "circle",
  },
};

export const WithLeadingElement: Story = {
  args: {
    leadingElement: (
      <svg
        strokeLinejoin="round"
        stroke="currentColor"
        strokeLinecap="round"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        strokeWidth="2"
        fill="none"
      >
        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
        <polyline points="17,21 17,13 7,13 7,21" />
        <polyline points="7,3 7,8 15,8" />
      </svg>
    ),
    children: "Save",
  },
};

export const WithTrailingElement: Story = {
  args: {
    trailingElement: (
      <svg
        strokeLinejoin="round"
        stroke="currentColor"
        strokeLinecap="round"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        strokeWidth="2"
        fill="none"
      >
        <polyline points="6,9 12,15 18,9" />
      </svg>
    ),
    children: "Dropdown",
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};
