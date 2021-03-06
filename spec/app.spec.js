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
      it("GET: 200 - responds with an array of articles each with a count of the associated comments", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((res) => {
            res.body.articles.forEach((article) => {
              expect(article).to.have.all.keys([
                "article_id",
                "title",
                "body",
                "author",
                "topic",
                "votes",
                "created_at",
                "comment_count",
              ]);
            });
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
              "comment_count",
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
      it("POST: 404 - responds with an error message when the author does not exist", function () {
        return request(app)
          .post("/api/articles")
          .send({
            body: "test",
            title: "new article",
            author: "not-a-real-username",
            topic: "mitch",
          })
          .expect(404)
          .then(function (res) {
            expect(res.body.msg).to.equal("User not found");
          });
      });
      it("POST: 404 - responds with an error message when the topic does not exist", function () {
        return request(app)
          .post("/api/articles")
          .send({
            body: "test",
            title: "new article",
            author: "butter_bridge",
            topic: "not-a-topic",
          })
          .expect(404)
          .then(function (res) {
            expect(res.body.msg).to.equal("Topic not found");
          });
      });
      it("POST: 400 - responds with an error message when given a new article in the wrong format", function () {
        return request(app)
          .post("/api/articles")
          .send({ invalid: "article format" })
          .expect(400)
          .then(function (res) {
            expect(res.body.msg).to.equal("Column does not exist");
          });
      });
    });
    describe("/:article_id", () => {
      it("GET: 200 - responds with a single article", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then((res) => {
            expect(res.body.article).to.have.keys([
              "article_id",
              "title",
              "body",
              "author",
              "topic",
              "votes",
              "created_at",
              "comment_count",
            ]);
            expect(res.body.article.article_id).to.equal(1);
          });
      });
      it("GET: 404 - responds with an error when given a non-existant article ID", () => {
        return request(app)
          .get("/api/articles/999")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal("Article not found");
          });
      });
      it("GET: 400 - responds with an error when given an invalid ID", () => {
        return request(app)
          .get("/api/articles/abc")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal("Invalid ID");
          });
      });
      it("PATCH: 200 - increases the article votes and responds with updated article", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then((res) => {
            expect(res.body.article.votes).to.equal(101);
          });
      });
      it("PATCH: 200 - decreases the article votes and responds with updated article", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: -1 })
          .expect(200)
          .then((res) => {
            expect(res.body.article.votes).to.equal(99);
          });
      });
      it("PATCH: 404 - responds with an error when given a non-existant article ID", () => {
        return request(app)
          .patch("/api/articles/999")
          .send({ inc_votes: 1 })
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal("Article not found");
          });
      });
      it("PATCH: 400 - responds with an error when given an invalid ID", () => {
        return request(app)
          .patch("/api/articles/abc")
          .send({ inc_votes: 1 })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal("Invalid ID");
          });
      });
      it("PATCH: 400 - responds with an error when given a bad body", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ invalid: "body" })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal(
              "Invalid body. Include key 'inc_votes'"
            );
          });
      });
      it("PATCH: 400 - responds with an error when given a data type", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: "Not a number" })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal(
              "Invalid value. 'inc_votes' must be a number"
            );
          });
      });
      it("DEL: 204 - deletes article from database", () => {
        return request(app).del("/api/articles/1").expect(204);
      });
      it("DEL: 404 - responds with an error when given a non-existant article_id", () => {
        return request(app)
          .del("/api/articles/999")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).to.equal("Article not found");
          });
      });
      it("DEL: 400 - responds with an error when given an invalid article_id", () => {
        return request(app)
          .del("/api/articles/abc")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal("Invalid ID");
          });
      });
      describe("/comments", () => {
        it("GET: 200 - responds with an array of comments for a given article", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then((res) => {
              res.body.comments.forEach((comment) => {
                expect(comment.article_id).to.equal(1);
                expect(comment).to.have.all.keys([
                  "comment_id",
                  "body",
                  "article_id",
                  "username",
                  "votes",
                  "created_at",
                ]);
              });
            });
        });
        it("GET: 200 - responds with an empty array when the specified article has no comments", () => {
          return request(app)
            .get("/api/articles/2/comments")
            .expect(200)
            .then((res) => {
              expect(res.body.comments).to.have.lengthOf(0);
            });
        });
        it("GET: 404 - responds with an error when given a non-existant article ID", () => {
          return request(app)
            .get("/api/articles/999/comments")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).to.equal("Article not found");
            });
        });
        it("GET: 400 - responds with an error when given an invalid ID", () => {
          return request(app)
            .get("/api/articles/abc/comments")
            .expect(400)
            .then((res) => {
              expect(res.body.msg).to.equal("Invalid ID");
            });
        });
        describe("*** SORTING ***", () => {
          it("GET: 200 - the comments are sorted in descending order by created_at by default", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then((res) => {
                expect(res.body.comments).to.be.descendingBy("created_at");
              });
          });
          it("GET: 200 - takes a sort_by query and responds with the comments sorted by that column", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes")
              .expect(200)
              .then((res) => {
                expect(res.body.comments).to.be.descendingBy("votes");
              });
          });
          it("GET: 200 - takes an order query and responds with the comments sorted in that order", () => {
            return request(app)
              .get("/api/articles/1/comments?order=asc")
              .expect(200)
              .then((res) => {
                expect(res.body.comments).to.be.ascendingBy("created_at");
              });
          });
          it("GET: 400 - responds with an error when the sort_by query is a non-existent column", function () {
            return request(app)
              .get("/api/articles/1/comments?sort_by=not-a-column")
              .expect(400)
              .then(function (res) {
                expect(res.body.msg).to.equal("Column does not exist");
              });
          });
          it("GET: 200 - ignores order queries that are not asc or desc", function () {
            return request(app)
              .get("/api/articles/1/comments?order=meaningless-query")
              .expect(200)
              .then(function (res) {
                expect(res.body.comments).to.be.descendingBy("created_at");
              });
          });
        });
        describe("*** POSTING ***", () => {
          it("POST: 201 - accepts a new comment and inserts it into the database responding with the inserted comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ body: "new comment", username: "butter_bridge" })
              .expect(201)
              .then((res) => {
                expect(res.body.comment).to.have.all.keys([
                  "comment_id",
                  "body",
                  "article_id",
                  "username",
                  "votes",
                  "created_at",
                ]);
                expect(res.body.comment.body).to.equal("new comment");
                expect(res.body.comment.username).to.equal("butter_bridge");
                expect(res.body.comment.votes).to.equal(0);
              });
          });
          it("POST: 404 - responds with an error when given a non-existant article ID", () => {
            return request(app)
              .post("/api/articles/999/comments")
              .send({ body: "new comment", username: "butter_bridge" })
              .expect(404)
              .then((res) => {
                expect(res.body.msg).to.equal("Article not found");
              });
          });
          it("POST: 400 - responds with an error when given an invalid ID", () => {
            return request(app)
              .post("/api/articles/abc/comments")
              .send({ body: "new comment", username: "butter_bridge" })
              .expect(400)
              .then((res) => {
                expect(res.body.msg).to.equal("Invalid ID");
              });
          });
          it("POST: 400 - responds with an error when given a body missing a property", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "butter_bridge" })
              .expect(400)
              .then((res) => {
                expect(res.body.msg).to.equal("Incomplete body");
              });
          });
          it("POST: 404 - responds with an error when the username does not exist", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ body: "New comment", username: "not-a-real-username" })
              .expect(404)
              .then((res) => {
                expect(res.body.msg).to.equal("User not found");
              });
          });
          it("POST: 400 - responds with an error when the body contains extra keys", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                body: "New comment",
                username: "butter_bridge",
                invalid: "key",
              })
              .expect(400)
              .then((res) => {
                expect(res.body.msg).to.equal("Column does not exist");
              });
          });
        });
      });
    });
  });
  describe("/comments/:comment_id", () => {
    it("DEL: 204 - removes comment from database and responds with no body", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });
    it("DEL: 404 - responds with an error when given a non-existant comment ID", () => {
      return request(app)
        .delete("/api/comments/999")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal("Comment not found");
        });
    });
    it("DEL: 400 - responds with an error when given an invalid comment ID", () => {
      return request(app)
        .delete("/api/comments/abc")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal("Invalid ID");
        });
    });
    it("PATCH: 200 - increases the comment votes and responds with updated comment", () => {
      return request(app)
        .patch("/api/comments/5")
        .send({ inc_votes: 1 })
        .expect(200)
        .then((res) => {
          expect(res.body.comment.votes).to.equal(1);
        });
    });
    it("PATCH: 404 - responds with an error when given a non-existant comment ID", () => {
      return request(app)
        .patch("/api/comments/999")
        .send({ inc_votes: 1 })
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal("Comment not found");
        });
    });
    it("PATCH: 400 - responds with an error when given an invalid comment ID", () => {
      return request(app)
        .patch("/api/comments/abc")
        .send({ inc_votes: 1 })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal("Invalid ID");
        });
    });
    it("PATCH: 400 - responds with an error when given a bad body", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ invalid: "body" })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal(
            "Invalid body. Include key 'inc_votes'"
          );
        });
    });
    it("PATCH: 400 - responds with an error when given a data type", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: "Not a number" })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal(
            "Invalid value. 'inc_votes' must be a number"
          );
        });
    });
  });
  describe("/topics", () => {
    it("GET: 200 - responds with an array of all topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          res.body.topics.forEach((topic) => {
            expect(topic).to.have.all.keys(["slug", "description"]);
          });
        });
    });
    it("POST: 201 -  accepts a new topic and inserts it into the database responding with the inserted topic", () => {
      return request(app)
        .post("/api/topics")
        .send({ slug: "new_topic", description: "I am a new topic" })
        .expect(201)
        .then((res) => {
          expect(res.body.topic).to.deep.equal({
            slug: "new_topic",
            description: "I am a new topic",
          });
        });
    });
    it("POST: 400 - responds with an error when given invalid data types", () => {
      return request(app)
        .post("/api/topics")
        .send({ slug: 123, description: 456 })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal(
            "Invalid data types. Please use strings."
          );
        });
    });
    it("POST: 400 - responds with an error when given a body missing a property", () => {
      return request(app)
        .post("/api/topics")
        .send({ slug: "new_topic" })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal(
            "Incomplete body. Include 'slug' and 'description"
          );
        });
    });
  });
  describe("/users", () => {
    it("GET: 200 - responds with an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          res.body.users.forEach((user) => {
            expect(user).to.have.all.keys(["username", "name", "avatar_url"]);
          });
        });
    });
  });
});
