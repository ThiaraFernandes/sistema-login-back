import request from "supertest";
import app from "../src/app";


describe('GET /usuarios', () => {
  it('deve retornar status 200 e um array', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});