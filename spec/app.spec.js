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
    it("GET: 200 - accepts a topic query and responds with articles from that topic", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(res => {
          res.body.articles.forEach(article => {
            expect(article.topic).to.equal("mitch");
          });
        });
    });
    it("GET: 404 - responds with an error message when given a topic that doesn't exist", () => {
      return request(app)
        .get("/api/articles?topic=not-a-topic")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Topic not found");
        });
    });
  });
});
