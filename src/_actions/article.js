import { GET_ARTICLES, GET_DETAIL_ARTICLE } from "../constants/action-types";
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

export const getDetailArticle = (id) => {
  return {
    type: GET_DETAIL_ARTICLE,
    async payload() {
      try {
        const articles = await API.get(`/article/${id}`);
        return articles.data;
      } catch (error) {
        console.log(error);
      }
    },
  };
};