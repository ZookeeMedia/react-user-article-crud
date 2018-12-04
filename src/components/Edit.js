import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';
// import * as routes from '../constants/routes';
import { NewArticleForm } from './NewArticle';

class EditPage extends Component {

    constructor(props) {
        super(props);
        // this.state = { ...INITIAL_STATE };
        this.state = {};
    }

    componentDidMount() {
        const { onEditArticle } = this.props;
        const id = this.props.match.params.id

        this.unsubscribe = db.onceGetArticle().onSnapshot((snapshot) => {
            let article = db.mapArticle(snapshot, id)[0];
            this.refreshEditArticle();
            onEditArticle(article);
        },
            (error) => {
                console.log(`Error on firestore Snapshot: ${error}`)
            });

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    refreshEditArticle = () =>
        this.setState({ refreshEditArticle: !this.state.refreshEditArticle });

    render() {
        const { authUser, editArticle, article } = this.props;
        return (
            <div>
                <h1>ADMIN</h1>
                <p>The Admin Page is only accessible to assigned users.</p>
                <h1>Edit Article</h1>
                <h3>Account: {authUser.email}</h3>
                <NewArticleForm editArticle={article} refresh="refreshEditArticle" />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    authUser: state.sessionState.authUser,
    editArticle: state.editArticleState.editArticle,
    article: state.articleState.find((article) =>
        article.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    onEditArticle: (editArticle) => dispatch({ type: 'EDIT_ARTICLE', editArticle }),
    onSetArticles: (articles) => dispatch({ type: 'ARTICLES_SET', articles }),
});

const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
)(EditPage);