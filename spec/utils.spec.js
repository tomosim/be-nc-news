const { expect } = require("chai");
const {
  formatUsers,
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatUsers", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(formatUsers([])).to.deep.equal([]);
  });
  it("returns an array of one user with the likedArticles property removed", () => {
    expect(
      formatUsers([
        {
          username: "lurker",
          name: "do_nothing",
          avatar_url: "placeholder-user.png",
          likedArticles: ["A", "Z"]
        }
      ])
    ).to.deep.equal([
      {
        username: "lurker",
        name: "do_nothing",
        avatar_url: "placeholder-user.png"
      }
    ]);
  });
  it("returns an array of multiple users with the likedArticles property removed", () => {
    expect(
      formatUsers([
        {
          username: "lurker",
          name: "do_nothing",
          avatar_url: "placeholder-user.png",
          likedArticles: ["A", "Z"]
        },
        {
          username: "tomosim",
          name: "tom",
          avatar_url: "placeholder-user-2.png",
          likedArticles: []
        }
      ])
    ).to.deep.equal([
      {
        username: "lurker",
        name: "do_nothing",
        avatar_url: "placeholder-user.png"
      },
      {
        username: "tomosim",
        name: "tom",
        avatar_url: "placeholder-user-2.png"
      }
    ]);
  });
  it("doesn't mutate the original array", () => {
    const users = [
      {
        username: "lurker",
        name: "do_nothing",
        avatar_url: "placeholder-user.png"
      },
      {
        username: "tomosim",
        name: "tom",
        avatar_url: "placeholder-user-2.png"
      }
    ];
    const copiedUsers = [
      {
        username: "lurker",
        name: "do_nothing",
        avatar_url: "placeholder-user.png"
      },
      {
        username: "tomosim",
        name: "tom",
        avatar_url: "placeholder-user-2.png"
      }
    ];
    formatUsers(users);
    expect(users).to.deep.equal(copiedUsers);
  });
});

describe("formatDates", () => {
  it("returns an empty array when given an empty array", () => {
    expect(formatDates([])).to.deep.equal([]);
  });
  it("returns an array of one object with the created_at value converted into a date object ", () => {
    const articles = [{ created_at: 1037708514171 }];
    const formattedArticles = [{ created_at: new Date(1037708514171) }];
    expect(formatDates(articles)).to.deep.equal(formattedArticles);
  });
  it("returns and array of one object with a copy of all keys that aren't created_at unchanged", () => {
    const articles = [{ created_at: 1037708514171, title: "test article" }];
    const formattedArticles = [
      { created_at: new Date(1037708514171), title: "test article" }
    ];
    expect(formatDates(articles)).to.deep.equal(formattedArticles);
  });
  it("returns an array of multiple objects each with the created_at key formatted", () => {
    const articles = [
      { created_at: 1037708514171, title: "test article 1" },
      { created_at: 1037708514172, title: "test article 2" }
    ];
    const formattedArticles = [
      { created_at: new Date(1037708514171), title: "test article 1" },
      { created_at: new Date(1037708514172), title: "test article 2" }
    ];
    expect(formatDates(articles)).to.deep.equal(formattedArticles);
  });
  it("doesn't mutate the original array", () => {
    const articles = [
      { created_at: 1037708514171, title: "test article 1" },
      { created_at: 1037708514172, title: "test article 2" }
    ];
    const copiedArticles = [
      { created_at: 1037708514171, title: "test article 1" },
      { created_at: 1037708514172, title: "test article 2" }
    ];
    formatDates(articles);
    expect(articles).to.deep.equal(copiedArticles);
  });
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
