import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {

    componentDidMount() {
        const { onSetUsers, onSetArticles } = this.props;

        db.onceGetUsers().then(snapshot => {
            onSetUsers(snapshot);
        });

        this.unsubscribe = db.getArticles().onSnapshot((snapshot) => {
            let articleList = db.mapArticles(snapshot);
            onSetArticles(articleList);
        },
            (error) => {
                console.log(`Error on firestore Snapshot: ${error}`)
            });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { users, articles } = this.props;
        return (
            <div>
                <h1>Home</h1>
                <p>The Home Page is accessible by every signed in user.</p>
                <hr></hr>
                {!!users && <UserList users={users} />}
                <hr></hr>
                {!!articles && <ArticleList articles={articles} />}
            </div>
        );
    }
}

const UserList = ({ users }) =>
    <div>
        <h2>List of Usernames of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>

        {Object.keys(users).map(key =>
            <div key={key}>{users[key].username}, {users[key].lastname}</div>
        )}
    </div>

const ArticleList = ({ articles }) =>
    <div>
        <h2>List of Articles</h2>
        <p>(Just randomly put in the Firestore)</p>

        {Object.keys(articles).map(key =>
            <div key={key}>{articles[key].title}</div>
        )}
    </div>

const mapStateToProps = (state) => {
    return {
        users: state.userState.users,
        articles: state.articleState.articles,
        authUser: state.sessionState.authUser,
    }
};

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
    onSetArticles: (articles) => dispatch({ type: 'ARTICLES_SET', articles }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
)(HomePage);