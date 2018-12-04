import React, { Component } from 'react';
import { db } from '../firebase';


const NewArticlePage = () =>
    <div>
        <h1>New Article</h1>
        <NewArticleForm />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    title: '',
    description: '',
    content: '',
    author: '',
    date: '',
    categories: '',
    tags: '',
    error: null,
};

class NewArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    componentDidMount() {
        //const { editArticle } = this.props;
        //console.log('editArticle', editArticle);
        //this.editArticle = this.props.editArticle;
        //this.setState({ editArticle: this.props.editArticle })
    }

    componentWillReceiveProps(props) {
        const { editArticle } = props;
        this.setState(editArticle);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        const {
            id,
            email,
            title,
            description,
            content,
            author,
            date,
            categories,
            tags } = this.state;


        if (this.state.id === undefined) {
            db.submitNewArticle(
                email,
                title,
                description,
                content,
                author,
                date,
                categories,
                tags)
                .then(() => {
                    this.setState({ ...INITIAL_STATE });
                    console.log('saved article');
                })
                .catch(error => {
                    this.setState(byPropKey('error', error));
                    console.log('error');

                });
        } else {
            // edit article
            db.submitEditedArticle(
                id,
                email,
                title,
                description,
                content,
                author,
                date,
                categories,
                tags)
                .then(() => {
                    this.setState({ ...INITIAL_STATE });
                    console.log('edited article');
                })
                .catch(error => {
                    this.setState(byPropKey('error', error));
                    console.log('error');

                });
        }

        event.preventDefault();
    }

    render() {
        const {
            email,
            title,
            description,
            content,
            author,
            date,
            categories,
            tags,
            error,
        } = this.state;

        const isInvalid =
            email === '' ||
            title === '' ||
            description === '' ||
            content === '' ||
            author === '' ||
            date === '' ||
            categories === '' ||
            tags === '';

        return (
            <form onSubmit={this.onSubmit}>

                <input
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Email"
                />
                <br></br>
                <input
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Title"
                />
                <br></br>
                <input
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="description"
                />
                <br></br>
                <input
                    name="content"
                    value={this.state.content}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="content"
                />
                <br></br>
                <input
                    name="author"
                    value={this.state.author}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="author"
                />
                <br></br>
                <input
                    name="date"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="date"
                />
                <br></br>
                <input
                    name="categories"
                    value={this.state.categories}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="categories"
                />
                <br></br>
                <input
                    name="tags"
                    value={this.state.tags}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="tags"
                />
                <br></br>
                <button disabled={isInvalid} type="submit">
                    Submit Article
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default NewArticlePage;

export {
    NewArticleForm
};