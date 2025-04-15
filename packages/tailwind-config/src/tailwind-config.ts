import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config = {
  theme: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      chart: {
        "1": "hsl(var(--chart-1))",
        "2": "hsl(var(--chart-2))",
        "3": "hsl(var(--chart-3))",
        "4": "hsl(var(--chart-4))",
        "5": "hsl(var(--chart-5))",
      },
    },
    spacing: {
      0: "0px",
      4: "4px",
      8: "8px",
      16: "16px",
      24: "24px",
      40: "40px",
      64: "64px",
      104: "104px",
      168: "168px",
      272: "272px",
      440: "440px",
    },
    borderRadius: {
      none: "0px",
      4: "4px",
      8: "8px",
      16: "16px",
      24: "24px",
      full: "9999px",
    },
    // ここでsatisfiesすると型エラーが解決される
    fontSize: {
      12: ["12px", "20px"],
      14: ["14px", "22px"],
      16: ["16px", "24px"],
      20: ["20px", "28px"],
      32: ["32px", "40px"],
    } satisfies NonNullable<Config["theme"]>["fontSize"],
    fontFamily: {
      "noto-sans-jp": "var(--font-noto-sans-jp)",
    },
    brightness: {
      "hover-focus": "0.95",
      press: "0.9",
    },
    opacity: {
      disabled: "0.38",
    },
    zIndex: {
      // Dialog, Search Dialog
      3: "3",
      // Menu (Dropdown Menu, Exposed Menu, Color Picker, Date Picker)
      2: "2",
      // Tooltipはなるべく被らないよう位置調整が必要
      // 絶対座標指定なもの (FAB, Tooltip, Navigation Bar)
      1: "1",
      // その他
      0: "0",
    },
  },
  plugins: [],
} satisfies Omit<Config, "content">;
export default config;
