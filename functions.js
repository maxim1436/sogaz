import { Posts, myPosts } from './app.js';

document.getElementById('newPost').addEventListener('submit', (e) => {
    let post = [{ title: document.getElementById('newTitle').value, body: document.getElementById('newBody').value }];
    createPost(post);
    e.preventDefault();
})

document.getElementById('updatePost').addEventListener('submit', (e) => {
    myPosts && myPosts.update(post.id, data);
});

function createPost(newPost) {
    const post = new Posts(newPost);
    document.getElementById('newTitle').value = '';
    document.getElementById('newBody').value = '';
    post.print('postTitles');

}

document.getElementById('close').addEventListener('click', (e) => {
    let a = document.getElementById('openModal');
    a.style.display = "none";
    e.preventDefault();
})

