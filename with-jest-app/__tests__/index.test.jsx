/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../pages/index";

describe("index", () => {
  it("renders a heading", () => {
    render(<Index />);

    const div = screen.getByText("hello world");

    expect(div).toBeInTheDocument();
  });
});
