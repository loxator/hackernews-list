import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render,
  cleanup,
  waitForElement,
  act,
  fireEvent,
} from "@testing-library/react";
import { getStoryIDs, getStory } from "../../../requests/hackerNewsAPI";
import mockIDs from "./fixtures/storyID";
import mockStories from "../../../components/Story/tests/fixtures/Stories";
import Stories from "../Stories";

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock("../../../requests/hackerNewsAPI", () => ({
  getStoryIDs: jest.fn(),
  getStory: jest.fn(),
}));

describe("Story", () => {
  test("renders Stories component correctly with one story item", async () => {
    await act(async () => {
      await getStoryIDs.mockImplementation(() => Promise.resolve([mockIDs[0]]));
      await getStory.mockImplementation(() => Promise.resolve(mockStories[0]));
      const { getByTestId, getAllByTestId, queryByText } = render(
        <Router>
          <Stories />
        </Router>
      );
      await waitForElement(() => [
        expect(getByTestId("story__end__text")).toBeDefined(),
        expect(getAllByTestId("story__item").length).toBe(1),
        expect(queryByText("Loading more stories")).toBeNull(),
      ]);
    });
  });
  test("renders Stories component correctly with 30 story items", async () => {
    await act(async () => {
      await getStoryIDs.mockImplementation(() => Promise.resolve(mockIDs));
      await getStory.mockImplementation(() => Promise.resolve(mockStories[0]));
      const { getByTestId, getAllByTestId } = render(
        <Router>
          <Stories />
        </Router>
      );
      await waitForElement(() => [
        expect(getByTestId("story__end__text")).toBeDefined(),
        expect(getAllByTestId("story__item").length).toBe(30),
      ]);
    });
  });

  /*Cannot test infinteScroll as JSDOM doesn't support it yet.
     For info - https://github.com/testing-library/react-testing-library/issues/671*/

  test("component should show loader if 31 components and make sure only 30 get rendered", async () => {
    await act(async () => {
      await getStoryIDs.mockImplementation(() =>
        Promise.resolve([...mockIDs, mockIDs[0]])
      );
      await getStory.mockImplementation(() => Promise.resolve(mockStories[0]));
      const { getByTestId, getAllByTestId } = render(
        <Router>
          <Stories />
        </Router>
      );
      await waitForElement(() => [
        expect(getAllByTestId("story__item").length).toBe(30),
        expect(getByTestId("story__loader__text")).toBeDefined(),
      ]);
    });
  });
  test("component should show error if API throws error", async () => {
    await act(async () => {
      await getStoryIDs.mockImplementation(() =>
        Promise.resolve({ error: true })
      );
      await getStory.mockImplementation(() => Promise.resolve(mockStories[0]));
      const { getByTestId } = render(
        <Router>
          <Stories />
        </Router>
      );
      await waitForElement(() => [
        expect(getByTestId("story__error")).toBeDefined(),
        expect(getByTestId("story__error").textContent).toBe("Server Error"),
      ]);
    });
  });
});
