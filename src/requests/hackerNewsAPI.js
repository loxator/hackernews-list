import request from "../services/ApiService";

export const getStoryIDs = async (urlSuffix) => {
  try {
    const response = await request({
      method: "GET",
      url: `${urlSuffix}.json?print=pretty`,
    });

    if (!response.error) {
      return response;
    } else throw response;
  } catch (error) {
    return { error: true };
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
    return { error: true };
  }
};
