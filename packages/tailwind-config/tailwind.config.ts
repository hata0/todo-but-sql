import sharedConfig from "./src/tailwind-config";
import { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [sharedConfig],
  // 開発用にクラスを動的に生成できるようにする
  safelist: [{ pattern: /.*/ }],
};

export default config;
