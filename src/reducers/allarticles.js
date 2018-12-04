const applySetAllArticles = (state, action) => ({
  ...state,
  allarticles: action.allarticles
});

export const initialState = {
  allarticles: {}
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "ALL_ARTICLES_SET": {
      return applySetAllArticles(state, action);
    }
    default:
      return state;
  }
}

// export default allarticlesReducer;
