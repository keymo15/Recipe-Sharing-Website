import "./header.css";

export default function Header() {
  const serverPublic = "http://localhost:5000/images/"
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Mini Project</span>
        <span className="headerTitleLg">Recipes</span>
      </div>
      <img
        className="headerImg"
        src={serverPublic + "header-image-4.jpg"}
        // src={"../../../public/images/spice.jpg"}        
        alt=""
      />
    </div>
  );
}
