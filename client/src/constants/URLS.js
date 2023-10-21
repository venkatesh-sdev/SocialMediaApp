const baseUrl = "http://localhost:3001/"

export default {
    // Post URlS
    getFeedPost: baseUrl + "post",
    getUserPost: (id) => baseUrl + "post/" + id + "/posts",
    updateLike: (id) => baseUrl + "post/" + id + "/like",
    // User URLS
    getUser: (id) => baseUrl + "user/" + id,
    getUserFriends: (id) => baseUrl + "user/" + id + "/friends",
    updateFriend: (userId, friendId) => baseUrl + "user/" + userId + "/" + friendId,
    // Auth URLSl
    loginUrl: baseUrl + "auth/login",
    registerUrl: baseUrl + "auth/register",
    getImageUrl: (name) => baseUrl + "assets/" + name
}