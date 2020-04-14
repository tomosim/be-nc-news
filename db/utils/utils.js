exports.formatUsers = (list) => {
  const formattedList = list.map((user) => {
    const { likedArticles, ...remainingKeys } = user;
    return remainingKeys;
  });

  return formattedList;
};

exports.formatDates = (list) => {
  const formattedList = list.map((item) => {
    const { created_at, ...remainingKeys } = item;
    return { created_at: new Date(created_at), ...remainingKeys };
  });
  return formattedList;
};

exports.makeRefObj = (list) => {
  const refObj = list.reduce((acc, el) => {
    acc[el.title] = el.article_id;
    return acc;
  }, {});

  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map((comment) => {
    const { created_by: username, belongs_to, ...restOfKeys } = comment;
    return {
      article_id: articleRef[belongs_to],
      username,
      ...restOfKeys,
    };
  });
  return formattedComments;
};

exports.formatLikes = (usersData, refObj) => {
  let formattedLikes = [];
  usersData.forEach((user) => {
    const likes = user.likedArticles.map((article) => {
      const article_id = refObj[article];
      return { username: user.username, article_id };
    });
    formattedLikes = [...formattedLikes, ...likes];
  });
  return formattedLikes;
};

exports.checkBody = (req, res, next) => {
  if ("inc_votes" in req.body === false)
    next({ status: 400, msg: "Invalid body. Include key 'inc_votes'" });
  if (typeof req.body.inc_votes !== "number")
    next({ status: 400, msg: "Invalid value. 'inc_votes' must be a number" });
  else next();
};
