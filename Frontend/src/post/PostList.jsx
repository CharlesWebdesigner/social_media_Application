import propTypes from "prop-types";
import Post from "./Post.jsx";
export default function PostList(props) {
  console.log("postList props ", props);
  return (
    <div style={{ marginTop: "24px" }}>
      {props.posts.map((item, i) => {
        return <Post post={item} key={i} onRemove={props.removeUpdate} />;
      })}
    </div>
  );
}
PostList.propTypes = {
  posts: propTypes.array.isRequired,
  removeUpdate: propTypes.func.isRequired,
};
