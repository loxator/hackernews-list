import request from "../services/ApiService";

export const getStoryIDs = async () => {
  try {
    const response = await request({
      method: "GET",
      url: "topstories.json?print=pretty",
    });

    if (!response.error) {
      return response;
    } else throw response;
  } catch (error) {
    console.log("getStoryIDs -> error", error);
  }
};

export const getStory = async (storyId) => {
  try {
    const response = await request({
      method: "GET",
      url: `item/${storyId}.json`,
    });

    if (!response.error) {
      return response;
    } else throw response;
  } catch (error) {
    console.log("getStoryIDs -> error", error);
  }
};
