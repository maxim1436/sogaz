import { Posts, myPosts } from './app.js';

const url = 'https://jsonplaceholder.typicode.com/posts/';

document.getElementById('newPost').addEventListener('submit', (e) => {
    let data = { title: document.getElementById('newTitle').value, body: document.getElementById('newBody').value };
    myPosts.create(data);
    document.getElementById('newTitle').value = '';
    document.getElementById('newBody').value = '';
    e.preventDefault();
});

document.getElementById('updatePost').addEventListener('submit', (e) => {
    let data = { title: document.getElementById('updateTitle').value, body: document.getElementById('updateBody').value };
    myPosts && myPosts.update(data);
    let modalWindow = document.getElementById('openModal');
    modalWindow.style.display = "none";
    document.getElementById('updateTitle').value = '';
    document.getElementById('updateBody').value = '';
    e.preventDefault();
});

document.getElementById('close').addEventListener('click', (e) => {
    let a = document.getElementById('openModal');
    a.style.display = "none";
    document.getElementById('updateTitle').value = '';
    document.getElementById('updateBody').value = '';
    e.preventDefault();
});

document.getElementById('search').oninput = function() {
    if (document.getElementById('filterList') !== null)
        document.getElementById('filterList').remove();
    const postTitles = document.getElementById('postTitles');
    if (document.getElementById('search').value.length >= 1) {
        const filterList = document.createElement('ol');
        filterList.setAttribute('id', 'filterList');
        document.getElementById('myLists').append(filterList);
        const array = myPosts.posts.filter((i) => i.title.includes(document.getElementById('search').value));
        postTitles.style.display = 'none';
        array.forEach(post => {
            let id = post.id;
            const element = document.createElement('li');
            element.innerHTML = post.title;
            element.setAttribute('id', `${id}F`);
            document.getElementById('filterList').append(element);
            const deleteElement = document.createElement('button');
            deleteElement.innerHTML = 'X';
            deleteElement.addEventListener('click', (e) => {
                myPosts.delete(id);
                document.getElementById(`${id}F`).remove();
                document.getElementById(id).remove();
                e.preventDefault();
            });
            element.append(deleteElement);
            const updateElement = document.createElement('button');
            updateElement.innerHTML = 'update';
            updateElement.addEventListener('click', (e) => {
            const modalWindow = document.getElementById('openModal');
            modalWindow.style.display = "block";
            myPosts.find(id).isUpdating = true;
            document.getElementById('updateTitle').value = myPosts.find(id).title;
            document.getElementById('updateBody').value = myPosts.find(id).body;
            e.preventDefault();
            });
            element.append(updateElement);
        });
    } else {
        postTitles.style.display = 'block';
    }
};

export async function getPosts() {
    const response = await fetch(url);
    return await response.json();
};

export function createId() {
    return Math.random().toString(16);
};

export function createObjectsArray(posts) {
    return posts.map(i => ({
        title: i.title,
        body: i.body,
        isUpdating: false,
        id: createId()
    }))
};

export function deletePostButton(id) {
    const listItem = document.getElementById(id);
    const deleteElement = document.createElement('button');
    deleteElement.innerHTML = 'X';
    deleteElement.addEventListener('click', (e) => {
        myPosts.delete(id);
        document.getElementById(id).remove();
        e.preventDefault();
    });
    listItem.append(deleteElement);
};

export function updatePostButton(id) {
    const listItem = document.getElementById(id);
    const updateElement = document.createElement('button');
    updateElement.innerHTML = 'update';
    updateElement.addEventListener('click', (e) => {
        const modalWindow = document.getElementById('openModal');
        modalWindow.style.display = "block";
        myPosts.find(id).isUpdating = true;
        document.getElementById('updateTitle').value = myPosts.find(id).title;
        document.getElementById('updateBody').value = myPosts.find(id).body;
        e.preventDefault();
    });
    listItem.append(updateElement)
};
