import { act, renderHook } from "@testing-library/react";
import { useCounter } from "~/hooks/useCounter";
import { describe, expect, test } from "vitest";

describe("useCounter hook", () => {
  test("初期値が0であること", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  test("increment関数がカウントを1増加させること", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test("複数回increment呼び出しでカウントが累積されること", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(3);
  });
});
