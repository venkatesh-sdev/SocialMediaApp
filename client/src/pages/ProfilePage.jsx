import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts } from "../context/authSlice";

import URL from "../constants/URLS";

const ProfilePage = () => {
  const { user, token, posts } = useSelector((state) => state.auth);
  console.log(user);
  console.log(token);
  console.log(posts);
  const dispatch = useDispatch();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const result = await axios.get("http://localhost:3001/post", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setPosts({ posts: result.data }));
  };
  return (
    <div>
      <h1>Profile Page</h1>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <img
              src={URL.getImageUrl(post.picturePath)}
              alt=""
              className="w-40 h-40 object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePage;
