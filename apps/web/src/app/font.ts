import { Noto_Sans_JP } from "next/font/google";

const roboto = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const fontVariables = `${roboto.variable}`;
