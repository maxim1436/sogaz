import Posts from './App.js';

document.getElementById('newPost').addEventListener('submit', (e) => {
    let post = [{title: document.getElementById('newTitle').value, body: document.getElementById('newBody').value}];
    createPost(post);
    e.preventDefault();
})

// document.getElementById().addEventListener('submit', (e) => {
//     let post = [{title: document.getElementById('newTitle').value, body: document.getElementById('newBody').value}];
//     createPost(post);
//     e.preventDefault();
// })

function createPost(newPost){
    const post = new Posts(newPost);
    document.getElementById('newTitle').value = '';
    document.getElementById('newBody').value = '';
    post.print('postTitles');

}

