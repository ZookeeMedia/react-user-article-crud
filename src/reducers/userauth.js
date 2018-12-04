const INITIAL_STATE = {
    userAuth: {},
  };
  
  const applySetUserAuth = (state, action) => ({
    ...state,
    userAuth: action.userAuth
  });
  
  function userAuthReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case 'USERAUTH_SET' : {
        return applySetUserAuth(state, action);
      }
      default : return state;
    }
  }
  
  export default userAuthReducer;
  