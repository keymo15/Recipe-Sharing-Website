import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      ingredients,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    await axios
      .post("/posts", newPost)
      .then((res) => {
        console.log(res);
        navigate(`/post/${res.data._id}`, {replace: true});
        // window.location.replace("/post/" + res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Add Recipe Name"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="ingredients"
            type="text"
            className="writeInput"
            style={{ fontSize: "20px", resize: "none" }}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your Secret..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
