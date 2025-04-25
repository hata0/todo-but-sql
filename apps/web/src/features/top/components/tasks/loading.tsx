import { LoaderCircle } from "lucide-react";

export const TasksLoading = () => {
  return (
    <div className="flex w-full items-center justify-center pt-4">
      <LoaderCircle className="size-8 animate-spin text-sky-400" />
    </div>
  );
};
