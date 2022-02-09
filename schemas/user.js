function userLikes(userData, numberoflikes) {
  return {
    username: userData.name,
    total_likes: numberoflikes,
  };
}
function userNumberOfLikes(userData) {
  return {
    user_id: userData.source_user_id,
    total_likes: userData.numberoflikes,
  };
}
module.exports = { userLikes, userNumberOfLikes };
