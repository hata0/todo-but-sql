import { Meta, StoryObj } from "@storybook/react";
import { fn, Mock } from "@storybook/test";
import { Database } from "lucide-react";
import { faker } from "@faker-js/faker";
import {
  QueryOverlayProps,
  QueryOverlay,
  useQueryOverlayContext,
} from "./query-overlay";
import { Button } from "@/components/shadcn-ui/button";
import { ok } from "@/core/result";

const Example = ({ onQueryExecute }: QueryOverlayProps) => {
  return (
    <QueryOverlay onQueryExecute={onQueryExecute}>
      <Children />
    </QueryOverlay>
  );
};
const Children = () => {
  const { open } = useQueryOverlayContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:animate-hover-jiggle"
      onClick={open}
    >
      <Database />
    </Button>
  );
};

type Story = StoryObj<typeof Example>;

export const Default: Story = {};

const meta: Meta<typeof Example> = {
  title: "Features/top/QueryOverlay",
  component: Example,
  args: {
    onQueryExecute: fn(),
  },
  beforeEach: () => {
    (meta.args?.onQueryExecute as Mock).mockResolvedValue(
      ok(faker.lorem.lines(30)),
    );
  },
};
export default meta;
