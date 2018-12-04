import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import sessionReducer from "./session";
import userReducer from "./user";
import articleReducer from "./article";
import userAuthReducer from "./userauth"; //delete this
import editArticleReducer from "./editarticle";
//import { reducer as allarticlesReducer, initialState as articlesInitial } from './allarticles';

export const initialState = {
  //allarticles: articlesInitial
};

export const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  articleState: articleReducer,
  userAuthState: userAuthReducer, // delete this
  editArticleState: editArticleReducer
  //allArticlesState: allarticlesReducer
});
