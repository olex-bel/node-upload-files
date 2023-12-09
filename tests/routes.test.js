const request = require('supertest');
const app = require('../src/app.js');

describe('Static endpoints', () => {
  it('should retun error if auth is not sent', async () => {
    const res = await request(app)
        .get('/')
        .send();

    expect(res.statusCode).toEqual(401);
  });

  it('should retun content if auth is valid', async () => {
    const res = await request(app)
        .get('/')
        .auth('test', 'test')
        .send();

    expect(res.statusCode).toEqual(200);
  });
});

describe('Upload endpoint', () => {
  it('should return error if auth is not valid', async () => {
    const res = await request(app)
        .post('/upload')
        .auth('invalid', 'invalid')
        .send();

    expect(res.statusCode).toEqual(401);
  });
});
