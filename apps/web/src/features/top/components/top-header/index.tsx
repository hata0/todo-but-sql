import Image from "next/image";
import { Database } from "lucide-react";
import { useQueryOverlayContext } from "../query-overlay";
import { ModeToggle } from "@/components/shadcn-ui/mode-toggle";
import { text } from "@/typography/text";
import { Button } from "@/components/shadcn-ui/button";
import { Link } from "@/i18n/navigation";
import { LanguageSelect } from "@/components/ui/language-select";

export const TopHeader = () => {
  const { open } = useQueryOverlayContext();

  return (
    <header className="z-2 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 flex h-14 items-center justify-between gap-2 border-b border-dashed px-2 backdrop-blur transition duration-500 ease-in-out">
      <Button asChild variant="ghost" size="icon" className="sm:w-fit sm:px-5">
        <Link href="/" className={text.large.className}>
          <Image src="/logo.png" alt="logo" width={32} height={32} priority />
          <span className="animate-text-gradient hidden bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent sm:block">
            Todo but SQL
          </span>
        </Link>
      </Button>
      <div className="flex items-center gap-2">
        <LanguageSelect />
        {/* QueryOverlayを開くボタン */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:animate-hover-jiggle"
          onClick={open}
        >
          <Database />
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
};
