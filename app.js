const url = 'https://jsonplaceholder.typicode.com/posts/';
export const myPosts = null;
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
        isUpdating: false,
        id: createId()
    }))
};

export class Posts {
    constructor(posts) {
        this.posts = createObjectsArray(posts);
    }

    create(title, body) {
        this.posts.push({ title, body, id: createId() });
    }

    find(id) {
        return this.posts.find(i => i.id === id);
    }
    update(data) {
        try {
            let index = this.posts.findIndex(i => i.isUpdating === true);
            // const index = this.posts.findIndex(i => i.id === id);
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
        const postListElement = document.getElementById(parrentElementId);
        this.posts.forEach(post => {
            const postElement = document.createElement('li');
            postElement.innerHTML = post.title;
            postElement.setAttribute('id', post.id);
            postListElement.append(postElement);

            const listItem = document.getElementById(post.id);
            const deleteElement = document.createElement('button');
            deleteElement.innerHTML = 'X';
            deleteElement.addEventListener('click', (e) => {
                this.delete(post.id);
                document.getElementById(post.id).remove();
                e.preventDefault();
            });
            listItem.append(deleteElement);

            const updateElement = document.createElement('button');
            updateElement.innerHTML = 'update';
            postElement.setAttribute('id', post.id);
            updateElement.addEventListener('click', (e) => {
                const a = document.getElementById('openModal');
                a.style.display = "block";
                post.isUpdating = true;
                e.preventDefault();
            });
            listItem.append(updateElement);

            document.getElementById('updatePost').addEventListener('submit', (e) => {
                let post = this.posts.find(i => i.isUpdating === true);
                let data = { title: document.getElementById('updateTitle').value, body: document.getElementById('updateBody').value };
                this.update(post.id, data);
                let a = document.getElementById('openModal');
                a.style.display = "none";
                document.getElementById('updateTitle').value = '';
                document.getElementById('updateBody').value = '';
                document.getElementById(post.id).innerHTML = this.find(post.id).title;
                post.isUpdating = false;
                listItem.append(deleteElement);
                listItem.append(updateElement);
                e.preventDefault();
            });
        });

        // document.getElementById('updatePost').addEventListener('submit', (e) => {
        //     let post = this.posts.find(i => i.isUpdating === true);
        //     let data = { title: document.getElementById('updateTitle').value, body: document.getElementById('updateBody').value };
        //     this.update(post.id, data);
        //     let a = document.getElementById('openModal');
        //     a.style.display = "none";
        //     document.getElementById('updateTitle').value = '';
        //     document.getElementById('updateBody').value = '';
        //     document.getElementById(post.id).innerHTML = this.find(post.id).title;
        //     post.isUpdating = false;
        // });
    }
}

const loadPosts = getPosts();
loadPosts
    .then(data => {
        myPosts = new Posts(data);
        myPosts.print('postTitles');
    })
