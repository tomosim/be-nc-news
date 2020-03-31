const { expect } = require("chai");
const {
  formatUsers,
  formatDates,
  makeRefObj,
  formatComments,
  formatLikes
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

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    const input = [];
    const expected = {};
    expect(makeRefObj(input)).to.deep.equal(expected);
  });
  it("makes a ref obj containing on key value pair when given an array of one article row", () => {
    const articles = [
      {
        article_id: 36,
        title: "The vegan carnivore?",
        body:
          "The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.",
        author: "tickle122",
        topic: "cooking",
        votes: 0,
        created_at: "2017-04-14T09:56:23.248Z"
      }
    ];
    const expected = { "The vegan carnivore?": 36 };
    expect(makeRefObj(articles)).to.deep.equal(expected);
  });
  it("makes a ref object out of multiple article rows", () => {
    const articles = [
      {
        article_id: 35,
        title: "Stone Soup",
        body:
          "The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.",
        author: "cooljmessy",
        topic: "cooking",
        votes: 0,
        created_at: "2016-12-13T20:58:40.516Z"
      },
      {
        article_id: 36,
        title: "The vegan carnivore?",
        body:
          "The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.",
        author: "tickle122",
        topic: "cooking",
        votes: 0,
        created_at: "2017-04-14T09:56:23.248Z"
      }
    ];
    const expected = { "Stone Soup": 35, "The vegan carnivore?": 36 };
    expect(makeRefObj(articles)).to.deep.equal(expected);
  });
  it("doesn't mutate the the original array", () => {
    const articles = [
      {
        article_id: 35,
        title: "Stone Soup",
        body:
          "The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.",
        author: "cooljmessy",
        topic: "cooking",
        votes: 0,
        created_at: "2016-12-13T20:58:40.516Z"
      },
      {
        article_id: 36,
        title: "The vegan carnivore?",
        body:
          "The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.",
        author: "tickle122",
        topic: "cooking",
        votes: 0,
        created_at: "2017-04-14T09:56:23.248Z"
      }
    ];
    const articlesCopy = [
      {
        article_id: 35,
        title: "Stone Soup",
        body:
          "The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.",
        author: "cooljmessy",
        topic: "cooking",
        votes: 0,
        created_at: "2016-12-13T20:58:40.516Z"
      },
      {
        article_id: 36,
        title: "The vegan carnivore?",
        body:
          "The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.",
        author: "tickle122",
        topic: "cooking",
        votes: 0,
        created_at: "2017-04-14T09:56:23.248Z"
      }
    ];
    makeRefObj(articles);
    expect(articles).to.deep.equal(articlesCopy);
  });
});
/*
[{
  body:
    "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
  belongs_to: "The vegan carnivore?",
  created_by: 'butter_bridge',
  votes: 16,
  created_at: 1511354163389,
},
{
  body:
    'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
  belongs_to: 'Living in the shadow of a great man',
  created_by: 'butter_bridge',
  votes: 14,
  created_at: 1479818163389,
}
]

{'The vegan carnivore?': 1, 'Living in the shadow of a great man': 2}
*/
describe("formatComments", () => {
  it("returns an empty array when given an empty array", () => {
    expect(formatComments([], {})).to.deep.equal([]);
  });
  it("changes created_by and belongs_to to username and article_id with the correct values for one comment", () => {
    const comments = [
      {
        created_by: "butter_bridge",
        belongs_to: "Living in the shadow of a great man"
      }
    ];
    const refObj = { "Living in the shadow of a great man": 1 };
    const expected = [{ username: "butter_bridge", article_id: 1 }];
    expect(formatComments(comments, refObj)).to.deep.equal(expected);
  });
  it("retains all other properties on the comment", () => {
    const comments = [
      {
        created_by: "butter_bridge",
        belongs_to: "Living in the shadow of a great man",
        body: "hello!",
        votes: 1
      }
    ];
    const refObj = { "Living in the shadow of a great man": 1 };
    const expected = [
      { username: "butter_bridge", article_id: 1, body: "hello!", votes: 1 }
    ];
    expect(formatComments(comments, refObj)).to.deep.equal(expected);
  });
  it("reformats multiple comments", () => {
    const comments = [
      {
        created_by: "butter_bridge",
        belongs_to: "Living in the shadow of a great man",
        body: "hello!",
        votes: 1
      },
      {
        created_by: "icellusedkars",
        belongs_to: "The vegan carnivore?",
        body: "garbage!",
        votes: -1
      }
    ];
    const refObj = {
      "Living in the shadow of a great man": 1,
      "The vegan carnivore?": 2
    };
    const expected = [
      { username: "butter_bridge", article_id: 1, body: "hello!", votes: 1 },
      {
        username: "icellusedkars",
        article_id: 2,
        body: "garbage!",
        votes: -1
      }
    ];
    expect(formatComments(comments, refObj)).to.deep.equal(expected);
  });
  it("doesn't mutate the original array", () => {
    const comments = [
      {
        created_by: "butter_bridge",
        belongs_to: "Living in the shadow of a great man",
        body: "hello!",
        votes: 1
      },
      {
        created_by: "icellusedkars",
        belongs_to: "The vegan carnivore?",
        body: "garbage!",
        votes: -1
      }
    ];
    const refObj = {
      "Living in the shadow of a great man": 1,
      "The vegan carnivore?": 2
    };
    const commentsCopy = [
      {
        created_by: "butter_bridge",
        belongs_to: "Living in the shadow of a great man",
        body: "hello!",
        votes: 1
      },
      {
        created_by: "icellusedkars",
        belongs_to: "The vegan carnivore?",
        body: "garbage!",
        votes: -1
      }
    ];

    formatComments(comments, refObj);
    expect(comments).to.deep.equal(commentsCopy);
  });
});

/*
[
  {username: 'tomosim', likedArticles:['The vegan carnivore?','Living in the shadow of a great man']},
  {username: 'butter_bridge', likedArticles:['Living in the shadow of a great man']},
  {username: 'icellusedcars', likedArticles:[]},
]

{'The vegan carnivore?': 1, 'Living in the shadow of a great man': 2}

[{username: 'tomosim', article_id: 1}, {username: 'tomosim', article_id: 2}, {username: 'butter_bridge', article_id: 1} ]


*/
describe("formatLikes", () => {
  it("returns an empty array when given an empty array", () => {
    expect(formatLikes([], {})).to.deep.equal([]);
  });
  it("returns an empty array when given a user with no liked articles", () => {
    const users = [{ username: "tomosim", likedArticles: [] }];
    expect(formatLikes(users, {})).to.deep.equal([]);
  });
  it("formats one liked article in one user", () => {
    const users = [
      { username: "tomosim", likedArticles: ["The vegan carnivore?"] }
    ];
    const refObj = { "The vegan carnivore?": 1 };
    expect(formatLikes(users, refObj)).to.deep.equal([
      { username: "tomosim", article_id: 1 }
    ]);
  });
  it("formats multiple likes in one user", () => {
    const users = [
      {
        username: "tomosim",
        likedArticles: [
          "The vegan carnivore?",
          "Living in the shadow of a great man"
        ]
      }
    ];
    const refObj = {
      "The vegan carnivore?": 1,
      "Living in the shadow of a great man": 2
    };
    const expected = [
      { username: "tomosim", article_id: 1 },
      { username: "tomosim", article_id: 2 }
    ];
    expect(formatLikes(users, refObj)).to.deep.equal(expected);
  });
  it("formats likes from multiple users", () => {
    const users = [
      {
        username: "tomosim",
        likedArticles: [
          "The vegan carnivore?",
          "Living in the shadow of a great man"
        ]
      },
      {
        username: "butter_bridge",
        likedArticles: ["Living in the shadow of a great man"]
      }
    ];
    const refObj = {
      "The vegan carnivore?": 1,
      "Living in the shadow of a great man": 2
    };
    const expected = [
      { username: "tomosim", article_id: 1 },
      { username: "tomosim", article_id: 2 },
      { username: "butter_bridge", article_id: 2 }
    ];
    expect(formatLikes(users, refObj)).to.deep.equal(expected);
  });
});
