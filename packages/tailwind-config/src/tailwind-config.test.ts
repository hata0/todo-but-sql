import { describe, expect, it } from "vitest";
import config from "./tailwind-config";

describe("tailwind.config.ts", () => {
  it("config", () => {
    expect(config).toMatchSnapshot();
  });
});
