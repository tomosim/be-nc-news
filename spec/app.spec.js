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
        .then((res) => {
          expect(res.body.articles[0]).to.have.all.keys([
            "article_id",
            "title",
            "body",
            "author",
            "topic",
            "votes",
            "created_at",
          ]);
        });
    });
    it("GET: 200 - accepts a topic query and responds with articles from that topic", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then((res) => {
          res.body.articles.forEach((article) => {
            expect(article.topic).to.equal("mitch");
          });
        });
    });
    it("GET: 404 - responds with an error message when given a topic that doesn't exist", () => {
      return request(app)
        .get("/api/articles?topic=not-a-topic")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal("Topic not found");
        });
    });
    it("GET: 200 - responds with an empty array when given a topic that has no articles", function () {
      return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then(function (res) {
          expect(res.body.articles).to.deep.equal([]);
        });
    });
    it("GET: 200 - responds with an array of all articles by the selected author", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(function (res) {
          expect(res.body.articles[0]).to.have.all.keys([
            "article_id",
            "title",
            "body",
            "author",
            "topic",
            "votes",
            "created_at",
          ]);
          res.body.articles.forEach((article) => {
            expect(article.author).to.equal("butter_bridge");
          });
        });
    });
    it("GET: 404 - responds with an error message when given author does not exist", function () {
      return request(app)
        .get("/api/articles?author=not-a-username")
        .expect(404)
        .then(function (res) {
          expect(res.body.msg).to.equal("User not found");
        });
    });
    it("GET: 200 - responds with an empty array when given an author that has no articles", function () {
      return request(app)
        .get("/api/articles?author=lurker")
        .expect(200)
        .then(function (res) {
          expect(res.body.articles).to.deep.equal([]);
        });
    });
  });
});
