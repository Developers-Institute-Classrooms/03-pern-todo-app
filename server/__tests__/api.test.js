const request = require('supertest');
const app = require('../index');

app.get('/user', function (req, res) {
    res.status(200).json({ name: 'john' });
});

test('get todo', async () => {
    const res = await request(app).get('/api/todos');
    const response = [];
    expect(res.status).toBe(200);
    expect(res.body).toEqual(response);
});
