const INITIAL_STATE = {
  editArticle: {},
};

const applyEditArticle = (state, action) => ({
  ...state,
  editArticle: action.editArticle
});

function editArticleReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'EDIT_ARTICLE': {
      return applyEditArticle(state, action);
    }
    default: return state;
  }
}

export default editArticleReducer;
