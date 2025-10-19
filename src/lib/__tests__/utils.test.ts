import { formatBalance } from "../utils";

describe("formatBalance", () => {
  it("should format a number as currency with two decimals", () => {
    expect(formatBalance(10)).toBe("$10.00");
    expect(formatBalance(3.5)).toBe("$3.50");
  });

  it("should handle zero and negative numbers", () => {
    expect(formatBalance(0)).toBe("$0.00");
    expect(formatBalance(-12.3)).toBe("$-12.30");
  });
});
