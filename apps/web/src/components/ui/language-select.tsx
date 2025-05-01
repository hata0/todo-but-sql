import { Languages } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "../shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn-ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";

export const LanguageSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const changeLocale = (nextLocale: string) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:animate-hover-jiggle"
        >
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => changeLocale("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale("ja")}>
          Japanese
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
