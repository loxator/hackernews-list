import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { getStory } from "../../../requests/hackerNewsAPI";
import mockStories from "./fixtures/Stories";
import Story from "../Story";

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock("../../../requests/hackerNewsAPI", () => ({
  getStory: jest.fn(),
}));

describe("Story", () => {
  test("renders Story component correctly", async () => {
    getStory.mockImplementation(() => Promise.resolve(mockStories[0]));

    const { getByTestId } = render(<Story id="24340352" />);

    await waitForElement(() => [
      expect(getByTestId("story__card")).toBeDefined(),
      expect(getByTestId("story__card__avatar__letter")).toBeDefined(),
      expect(getByTestId("story__card__avatar__letter").textContent).toBe("T"),
      expect(getByTestId("story__card__title")).toBeDefined(),
      expect(getByTestId("story__card__title").textContent).toBe(
        mockStories[0].title
      ),
      expect(getByTestId("story__card__author")).toBeDefined(),
      expect(getByTestId("story__card__author").textContent).toBe(
        "by - " + mockStories[0].by
      ),
      expect(getByTestId("story__card__link")).toBeDefined(),
      expect(getByTestId("story__card__link").textContent).toBe(
        "Check it out!"
      ),
      expect(getByTestId("story__card__link").href).toBe(mockStories[0].url),
    ]);
  });

  test("component should show error if API throws error", async () => {
    await getStory.mockImplementation(() => Promise.resolve({ error: true }));

    const { getByTestId } = render(<Story id="24340352" />);
    await waitForElement(() => [
      expect(getByTestId("story__error")).toBeDefined(),
      expect(getByTestId("story__error").textContent).toBe(
        "Could not load story with ID 24340352"
      ),
    ]);
  });
});
