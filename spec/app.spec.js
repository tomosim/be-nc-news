process.env.NODE_ENV = "test";
const request = require("supertest");
const chai = require("chai");
const app = require("../server");
const connection = require("../db/connection");

chai.use(require("chai-sorted"));
const { expect } = chai;

describe("/api", () => {
  after(() => {
    return connection.destroy();
  });
  beforeEach(() => {
    return connection.seed.run();
  });
  describe("/articles", () => {
    it("GET: 200 - responds with an array of articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0]).to.have.all.keys([
            "article_id",
            "title",
            "body",
            "author",
            "topic",
            "votes",
            "created_at"
          ]);
        });
    });
  });
});
