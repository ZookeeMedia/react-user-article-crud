const INITIAL_STATE = {
    articles: {},
  };
  
  const applySetArticles = (state, action) => ({
    ...state,
    articles: action.articles
  });
  
  function articleReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case 'ARTICLES_SET' : {
        return applySetArticles(state, action);
      }
      default : return state;
    }
  }
  
  export default articleReducer;
  