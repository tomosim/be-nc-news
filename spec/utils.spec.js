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

describe("formatDates", () => {});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
