exports.formatUsers = list => {
  const formattedList = list.map(user => {
    const { likedArticles, ...remainingKeys } = user;
    return remainingKeys;
  });

  return formattedList;
};

exports.formatDates = list => {};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
