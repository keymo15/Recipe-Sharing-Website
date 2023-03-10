import { useContext, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
// import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import "./home.css";
import axios from "axios";
// import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { dispatch} = useContext(Context);
  // const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch({ type: "RETREIVING_START" });
      try {
        const res = await axios.get("/posts")
        console.log("Retrieved Posts: ",res);
        dispatch({ type: "RETREIVING_SUCCESS", payload: res.data });
        setPosts(res.data);
      } catch (err) {
        dispatch({ type: "RETREIVING_FAIL" });
      }
    };
    fetchPosts();
  },[dispatch]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        {/* <Sidebar /> */}
      </div>
    </>
  );
}