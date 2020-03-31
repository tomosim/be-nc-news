exports.formatUsers = list => {
  const formattedList = list.map(user => {
    const { likedArticles, ...remainingKeys } = user;
    return remainingKeys;
  });

  return formattedList;
};

exports.formatDates = list => {
  const formattedList = list.map(item => {
    const { created_at, ...remainingKeys } = item;
    return { created_at: new Date(created_at), ...remainingKeys };
  });
  return formattedList;
};

exports.makeRefObj = list => {
  const refObj = list.reduce((acc, el) => {
    acc[el.title] = el.article_id;
    return acc;
  }, {});

  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map(comment => {
    const { created_by: username, belongs_to, ...restOfKeys } = comment;
    return {
      article_id: articleRef[belongs_to],
      username,
      ...restOfKeys
    };
  });
  return formattedComments;
};
