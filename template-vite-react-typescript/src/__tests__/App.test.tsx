import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "~/App";

describe("App", () => {
  test("Vite + Reactタイトルが表示されること", () => {
    render(<App />);

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });

  test("初期カウントで0が表示されること", () => {
    render(<App />);

    expect(screen.getByText("count is 0")).toBeInTheDocument();
  });

  test("ボタンをクリックするとカウントが增加すること", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is/i });

    fireEvent.click(button);

    expect(screen.getByText("count is 1")).toBeInTheDocument();
  });

  test("ボタンを複数回クリックするとカウントが累積して增加すること", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is/i });

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByText("count is 3")).toBeInTheDocument();
  });

  test("ロゴ画像が正しいaltテキストで表示されること", () => {
    render(<App />);

    expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
    expect(screen.getByAltText("React logo")).toBeInTheDocument();
  });

  test("HMRの説明テキストが表示されること", () => {
    render(<App />);

    expect(
      screen.getByText((_, element) => {
        return element?.textContent === "Edit src/App.tsx and save to test HMR";
      }),
    ).toBeInTheDocument();
  });

  test("ロゴリンクが正しいhref属性で表示されること", () => {
    render(<App />);

    const viteLink = screen.getByRole("link", { name: /vite logo/i });
    const reactLink = screen.getByRole("link", { name: /react logo/i });

    expect(viteLink).toHaveAttribute("href", "https://vite.dev");
    expect(reactLink).toHaveAttribute("href", "https://react.dev");
  });
});
