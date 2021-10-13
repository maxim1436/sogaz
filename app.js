const url = 'https://jsonplaceholder.typicode.com/posts/';

async function getPosts() {
    const response = await fetch(url);
    return await response.json();
}

function createId() {
    return Math.random().toString(16);
}

function createObjectsArray(posts) {
    return posts.map(i => ({
        title: i.title,
        body: i.body,
        id: createId()
    }))
};

export default class Posts {
    constructor(posts) {
        this.posts = createObjectsArray(posts);
    }

    create(title, body) {
        this.posts.push({ title, body, id: createId() });
    }

    read(id) {
        return this.posts.find(i => i.id === id);
    }

    update(id, data) {
        try {
            const index = this.posts.findIndex(i => i.id === id);
            if (!~index) throw new Error('Такого элемента нет!');
            if (!Object.keys(data).length) throw new Error('Не передаются данные!');
            const currentElement = this.posts[index];
            Object.assign(currentElement, data);
        } catch (error) {
            return error;
        }
        return this.posts;
    }

    delete(id) {
        this.posts = this.posts.filter(i => i.id !== id);
    }

    print(parrentElementId) {
        const postListElement =  document.getElementById(parrentElementId);
        this.posts.forEach(post => {
            const postElement = document.createElement('li');
            postElement.innerHTML = post.title;
            postElement.setAttribute('id', post.id);
            postListElement.append(postElement);
            const deleteListElement = document.createElement('button');
            deleteListElement.innerHTML = 'X';
            deleteListElement.setAttribute('id', post.id);
            deleteListElement.addEventListener('click', (e) => {
                this.delete(post.id);
                document.getElementById(post.id).remove();
                document.getElementById(post.id).remove();
                e.preventDefault();
            });
            postListElement.append(deleteListElement);
        });
    }
}

const loadPosts = getPosts();
loadPosts
    .then(data => {
        return new Posts(data);
    })
    .then(posts => {
        posts.print('postTitles');
    });
