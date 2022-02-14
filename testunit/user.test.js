const request = require("supertest");
const app = require("../server");

describe("Get Endpoints", () => {
  it("should get the schema with username and likes of user", async () => {
    const res = await request(app)
      .get("/user/1/")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQ0ODQ5NjczfQ.vs1wFri2kKY5BLWKXPzanT0uxWxXqT2GMTa57dy1UCI"
      );
    expect(res.body.status).toEqual(true);
  });
});

describe("Get Endpoints", () => {
  it("should like a user", async () => {
    const res = await request(app)
      .get("/user/1/like")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQ0ODQ5NjczfQ.vs1wFri2kKY5BLWKXPzanT0uxWxXqT2GMTa57dy1UCI"
      );
    expect(res.body.status).toEqual(true);
    expect(res.body.message).toEqual("Like Is Registred");
  });
});

describe("Get Endpoints", () => {
  it("should unlike a user", async () => {
    const res = await request(app)
      .get("/user/1/unlike")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQ0ODQ5NjczfQ.vs1wFri2kKY5BLWKXPzanT0uxWxXqT2GMTa57dy1UCI"
      );
    expect(res.body.status).toEqual(true);
    expect(res.body.message).toEqual("Unlike Is Registred");
  });
});

describe("Get Endpoints", () => {
  it("should get the schema with usernames and the number of likes to least likes", async () => {
    const res = await request(app).get("/most-liked");
    expect(res.body.status).toEqual(true);
  });
});
