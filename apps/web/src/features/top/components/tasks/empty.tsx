import { ClipboardList, Database } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { heading } from "@/typography/heading";
import { text } from "@/typography/text";

type Props = {
  onOpenQueryOverlay: (isOpen: true) => void;
};
export const TasksEmpty = ({ onOpenQueryOverlay }: Props) => {
  const t = useTranslations("TopPage.TasksEmpty");

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* 装飾用アイコン */}
      <div className="bg-muted mb-4 rounded-full p-3">
        <ClipboardList className="text-muted-foreground size-10" />
      </div>
      <h4 className={cn(heading.h4.className, "mb-1")}>{t("title")}</h4>
      <p
        className={cn(
          text.muted.className,
          "mb-4 max-w-sm whitespace-pre-wrap",
        )}
      >
        {t("description")}
      </p>
      <Button
        className="animate-bounce"
        onClick={() => onOpenQueryOverlay(true)}
      >
        <Database />
        <span>{t("button.open")}</span>
      </Button>
    </div>
  );
};
