import axios from "axios";
import { assert, expect } from "chai";
const baseURL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API Tests', function () {

    let ID = 1;

    //get data
    it('GET REQUEST', async function () {
        const response = await axios.get(`${baseURL}/posts/${ID}`);

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id', 1);
        expect(response.data).to.have.property('title');
        expect(response.data).to.have.property('body');
    });

    //positive inputs
    it('POST VALID DATA', async function () {
        const newPost = {
            title: 'Ritwik Sinha',
            body: 'this is body',
            userId: 1
        };

        const response = await axios.post(`${baseURL}/posts`, newPost);
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.data.title, 'Ritwik Sinha');
        assert.strictEqual(response.data.body, 'this is body');
        assert.strictEqual(response.data.userId, 1);
    });

    //negative inputs (empty data)
    it('POST EMPTY DATA', async function () {
        const newPost = {
            title: '',
            body: '',
            userId: ''
        };
        const response = await axios.post(`${baseURL}/posts`, newPost);
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.data.title, '');
        assert.strictEqual(response.data.body, '');
        assert.strictEqual(response.data.userId, '');
    });

    //negative inputs (invalid data)
    it('POST INVALID DATA', async function () {
        const newPost = {
            title: '',
        };

        try {
            const response = await axios.post(`${baseURL}/posts`, newPost);
            assert.strictEqual(response.status, 201);
        } catch (error) {
            assert.include(error.message, "Invalid request");

        }
    });

    //updating data (valid inputs)
    it('PUT WITH VALID DATA', async function () {
        const existingPost = {
            id: 1,
            title: 'Ajay Anand',
            userId: 1
        };
        const updatedPost = {
            id: existingPost.id,
            title: existingPost.title,
            body: 'Goodbye World!',
            userId: existingPost.userId
        };

        const response = await axios.put(`${baseURL}/posts/${ID}`, updatedPost);

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id', 1);
        expect(response.data).to.have.property('title', 'Ajay Anand');
        expect(response.data).to.have.property('body', 'Goodbye World!');

    });

    //updating data (invalid inputs)
    it('PUT WITH INVALID ID', async function () {
        let invalidID = 432
        const existingPost = {
            id: invalidID,
            title: 'Ajay Anand',
            userId: 1
        };
        const updatedPost = {
            id: existingPost.id,
            title: existingPost.title,
            body: 'Goodbye World!',
            userId: existingPost.userId
        };

        try {
            const response = await axios.put(`${baseURL}/posts/${ID}`, updatedPost);
            expect(response.status).to.equal(200);
        } catch (error) {
            assert.include(error.message, "Invalid request");
        }
    });

    // updating data (invalid inputs)
    it('PUT WITH INVALID DATA', async function () {
        const updatedPost = {
            body: 'empty',
        };

        try {
            const response = await axios.put(`${baseURL}/posts/${ID}`, updatedPost);
            expect(response.status).to.equal(200);
        } catch (error) {
            assert.include(error.message, "Invalid request");
        }

    });

    //delete data
    it('DELETE WITH VALID ID', async function () {
        try {
            const response = await axios.delete(`${baseURL}/posts/${ID}`);
            expect(response.status).to.equal(200);
        } catch (error) {
            assert.include(error.message, "Invalid request");
        }

    });

    //delete data (invalid data)
    it('DELETE WITH INVALID ID', async function () {
        let id = ''
        try {
            const response = await axios.delete(`${baseURL}/posts/${id}`);
            expect(response.status).to.equal(200);
        } catch (error) {
            expect(error.response.status).to.equal(404);
        }

    });
});
