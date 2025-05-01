import { Suspense } from "react";
import { Top } from "@/features/top/components/top";

export default function TopPage() {
  return (
    <Suspense>
      <Top />
    </Suspense>
  );
}
