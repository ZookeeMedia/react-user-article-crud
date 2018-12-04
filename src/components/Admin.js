import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';
// import * as routes from '../constants/routes';
import { NewArticleForm } from './NewArticle';

class AdminPage extends Component {

    componentDidMount() {
        const { onSetUsers, onSetArticles } = this.props;

        db.onceGetUsers().then(snapshot => {
            onSetUsers(snapshot);
        });

        this.unsubscribe = db.getArticles().onSnapshot((snapshot) => {
            let articleList = db.mapArticles(snapshot);
            console.log('naah this is where the state got updated');
            onSetArticles(articleList);
        },
            (error) => {
                console.log(`Error on firestore Snapshot: ${error}`)
            });

    }
    /*
    componentDidUpdate(prevProps, prevState) {
        console.log('checking');
        // only update chart if the data has changed
        if (prevProps.data !== this.props.data) {
            console.log('someone updated blud');
          //this.chart = c3.load({
          //  data: this.props.data
          //});
        }
    }
    */
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { users, articles, authUser } = this.props;
        return (
            <div>
                <h1>ADMIN</h1>
                <p>The Admin Page is only accessible to assigned users.</p>
                <h1>New Article</h1>
                <h3>Account: {authUser.email}</h3>
                <NewArticleForm />
                <hr></hr>
                {!!users && <UserList users={users} />}
                <hr></hr>
                {!!articles && <ArticleList articles={articles} />}
                <hr></hr>
            </div>
        );
    }
}

const UserList = ({ users }) =>
    <div>
        <h2>List of Usernames of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>

        {Object.keys(users).map(key =>
            <div key={key}>{users[key].username}</div>
        )}
    </div>

const ArticleList = (props) => {
    const articles = props.articles;
    const deleteArticle = (id) => {
        console.log('id', id);
        db.deleteArticle(id)
            .then(() => {
                console.log('deleted article');
            })
            .catch(error => {
                console.log('error');
            });
    }
    return (<div>
        <h2>List of Articles</h2>
        <p>(Just randomly put in the Firestore)</p>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(articles).map(key =>
                    <tr key={key}>
                        <td>{articles[key].title}</td>
                        <td>
                            <Link to={`/edit/${articles[key].id}`}>
                                <button type="button">
                                    edit
                                </button>
                            </Link>
                        </td>
                        <td><button onClick={() => { deleteArticle(articles[key].id) }}>del</button></td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>);
}

const mapStateToProps = (state) => ({
    users: state.userState.users,
    articles: state.articleState.articles,
    authUser: state.sessionState.authUser,
    editArticle: state.editArticleState.editArticle,
});

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
    onSetArticles: (articles) => dispatch({ type: 'ARTICLES_SET', articles }),
    onEditArticle: (editArticle) => dispatch({ type: 'EDIT_ARTICLE', editArticle }),
});

const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
)(AdminPage);