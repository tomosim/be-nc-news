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

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
