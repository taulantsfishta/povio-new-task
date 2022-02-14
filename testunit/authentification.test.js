const request = require("supertest");
const app = require("../server");

describe("Post Endpoints", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/signup").send({
      name: "testuser1",
      password: "123456",
    });
    expect(res.body.status).toEqual(true);
    expect(res.body.message).toEqual("User Is Created!");
  });
});

describe("Post Endpoints", () => {
  it("should not create same user", async () => {
    const res = await request(app).post("/signup").send({
      name: "testuser1",
      password: "123456",
    });
    expect(res.body.status).toEqual(false);
    expect(res.body.message).not.toEqual("User Is Created!");
  });
});

describe("Post Endpoints", () => {
  it("should login the user and return token", async () => {
    const res = await request(app).post("/login").send({
      name: "testuser1",
      password: "123456",
    });
    expect(res.body.status).not.toEqual(false);
  });
});

describe("Post Endpoints", () => {
  it("should return user data", async () => {
    const res = await request(app)
      .get("/me")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQ0ODQ5NjczfQ.vs1wFri2kKY5BLWKXPzanT0uxWxXqT2GMTa57dy1UCI"
      );
    expect(res.body.status).not.toEqual(false);
  });
});

describe("Put Endpoints", () => {
  it("should update user password", async () => {
    const res = await request(app)
      .put("/me/update-password")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQ0ODQ5NjczfQ.vs1wFri2kKY5BLWKXPzanT0uxWxXqT2GMTa57dy1UCI"
      )
      .send({
        old_password: "123123",
        new_password: "1234561",
      });
    expect(res.body.status).toEqual(true);
    expect(res.body.message).toEqual("User Password Has Been Updated!");
  });
});
