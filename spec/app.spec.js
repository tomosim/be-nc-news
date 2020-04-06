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
    describe("*** FILTERING ***", function () {
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
      it("GET: 200 - responds with an array of articles liked by a specific author", function () {
        return request(app)
          .get("/api/articles?liked=butter_bridge")
          .expect(200)
          .then(function (res) {
            expect(res.body.articles).to.have.lengthOf(1);
            expect(res.body.articles[0].title).to.equal(
              "Living in the shadow of a great man"
            );
          });
      });
      it("GET: 404 - responds with an error message when given a liked query with an author that doesn't exist", function () {
        return request(app)
          .get("/api/articles?liked=not-a-user")
          .expect(404)
          .then(function (res) {
            expect(res.body.msg).to.equal("User not found");
          });
      });
      it("GET: 200 - responds with an empty array when given an author that has liked no articles", function () {
        return request(app)
          .get("/api/articles?liked=rogersop")
          .expect(200)
          .then(function (res) {
            expect(res.body.articles).to.deep.equal([]);
          });
      });
      describe("*** SORTING ***", function () {
        it("GET: 200 - responds with the articles sorted by descending created_at by default", function () {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(function (res) {
              expect(res.body.articles).to.be.descendingBy("created_at");
            });
        });
        it("GET: 200 - accepts a sort_by query that changes the sorting property", function () {
          return request(app)
            .get("/api/articles?sort_by=title")
            .expect(200)
            .then(function (res) {
              expect(res.body.articles).to.be.descendingBy("title");
            });
        });
        it("GET: 400 - responds with an error when the sort_by query is a non-existent column", function () {
          return request(app)
            .get("/api/articles?sort_by=not-a-column")
            .expect(400)
            .then(function (res) {
              expect(res.body.msg).to.equal("Column does not exist");
            });
        });
        it("GET: 200 - accepts an order query asc/desc responds with the articles in that order", function () {
          return request(app)
            .get("/api/articles?order=asc")
            .expect(200)
            .then(function (res) {
              expect(res.body.articles).to.be.ascendingBy("created_at");
            });
        });
        it("GET: 200 - ignores order queries that are not asc or desc", function () {
          return request(app)
            .get("/api/articles?order=meaningless-query")
            .expect(200)
            .then(function (res) {
              expect(res.body.articles).to.be.descendingBy("created_at");
            });
        });
        describe("*** POSTING ***", function () {
          it("POST: 201 - accepts a new article and responds with the article after it has been inserted into the database", function () {
            return request(app)
              .post("/api/articles")
              .send({
                body: "test",
                title: "new article",
                author: "butter_bridge",
                topic: "mitch",
              })
              .expect(201)
              .then(function (res) {
                expect(res.body.article).to.have.all.keys([
                  "article_id",
                  "title",
                  "body",
                  "author",
                  "topic",
                  "votes",
                  "created_at",
                ]);
                expect(res.body.article.votes).to.equal(0);
              });
          });
        });
      });
    });
  });
});
