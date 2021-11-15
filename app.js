import { getPosts, createId, createObjectsArray, deletePostButton, updatePostButton } from './functions.js';

export let myPosts = null;

export class Posts {
    constructor(posts) {
        this.posts = createObjectsArray(posts);
    }

    create(data) {
        const { title, body } = data;
        const id = createId();
        this.posts.push({ title, body, id: id, isUpdating: false });
        const list = document.getElementById('postTitles');
        const post = document.createElement('li');
        post.innerHTML = title;
        post.setAttribute('id', id);
        list.append(post);
        deletePostButton(id);
        updatePostButton(id);
    }

    find(id) {
        return this.posts.find(i => i.id === id);
    }
    update(data) {
        try {
            let index = this.posts.findIndex(i => i.isUpdating === true);
            if (!~index) throw new Error('Такого элемента нет!');
            if (!Object.keys(data).length) throw new Error('Не передаются данные!');
            const currentElement = this.posts[index];
            Object.assign(currentElement, data);
            document.getElementById(currentElement.id).innerHTML = currentElement.title;
            if(document.getElementById(`${currentElement.id}F`) !== null)
                document.getElementById(`${currentElement.id}F`).innerHTML = currentElement.title;
            currentElement.isUpdating = false;
            deletePostButton(currentElement.id);
            updatePostButton(currentElement.id);
        } catch (error) {
            return error;
        }
        return this.posts;
    }

    delete(id) {
        this.posts = this.posts.filter(i => i.id !== id);
    }

    print(parrentElementId) {
        const postListElement = document.getElementById(parrentElementId);
        this.posts.forEach(post => {
            const element = document.createElement('li');
            element.innerHTML = post.title;
            element.setAttribute('id', post.id);
            postListElement.append(element);
            deletePostButton(post.id);
            updatePostButton(post.id);
        });
    }
}

const loadPosts = getPosts();
loadPosts
    .then(data => {
        myPosts = new Posts(data);
        myPosts.print('postTitles');
    })
