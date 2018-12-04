import { fs } from './firebase';

// User API
export const doCreateUser = (id, username, lastname, email) =>
    fs.collection('users').doc(id).set({
        username,
        lastname,
        email,
    });

export const getUserRole = (authUser) =>
    fs.collection('users').where("email", "==", authUser.email)
        .limit(1)
        .get()
        .then(function (querySnapshot) {
            let userRoles = querySnapshot.docs.map((docSnapshot) => ({
                role: docSnapshot.data().role,
            }));
            return userRoles[0].role;
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

export const onceGetUsers = () =>
    fs.collection('users').get().then(snapshot => {
        let userList = snapshot.docs.map((docSnapshot) => ({
            id: docSnapshot.id,
            email: docSnapshot.data().email,
            username: docSnapshot.data().username,
            lastname: docSnapshot.data().lastname,
        }));
        return userList;
    },
        (error) => {
            console.log(`Error on firestore Snapshot: ${error}`)
        });

// Articles

export const onceGetArticle = () => {
    return fs.collection('articles');
    
}

export const mapArticle = (snapshot, id) => {

    return snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        email: docSnapshot.data().email,
        title: docSnapshot.data().title,
        description: docSnapshot.data().description,
        content: docSnapshot.data().content,
        author: docSnapshot.data().author,
        date: docSnapshot.data().date,
        categories: docSnapshot.data().categories,
        tags: docSnapshot.data().tags
    })).filter(article => article.id === id);

}

export const getArticles = () =>
    fs.collection('articles');

export const mapArticles = (snapshot) => {
    return snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        title: docSnapshot.data().title,
        description: docSnapshot.data().description,
    }));
}

export const submitNewArticle = (
    email,
    title,
    description,
    content,
    author,
    date,
    categories,
    tags) =>
    fs.collection('articles').add({
        email,
        title,
        description,
        content,
        author,
        date,
        categories,
        tags
    });

export const submitEditedArticle = (
    id,
    email,
    title,
    description,
    content,
    author,
    date,
    categories,
    tags) =>
    fs.collection('articles').doc(id).set({
        email,
        title,
        description,
        content,
        author,
        date,
        categories,
        tags
    });

export const deleteArticle = (id) =>
    fs.collection('articles').doc(id).delete()
