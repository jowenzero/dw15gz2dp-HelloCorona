import { GET_ARTICLES } from "../constants/action-types";
import { API } from "../config/api";

export const getArticles = (currDate) => {
  return {
    type: GET_ARTICLES,
    async payload() {
      try {
        if (currDate)
        {
          const articles = await API.get("/articles", {
            params: {
              createdAt: currDate,
            }
          });
          return articles.data;
        }
        else {
          const articles = await API.get("/articles")
          return articles.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
};