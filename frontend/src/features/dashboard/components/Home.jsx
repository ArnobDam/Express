import { useSelector } from "react-redux";

export function Home() {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="Home">
      <div style={{ paddingTop: "106px" }}>
        <h1 style={{ fontSize: "20px" }}>
          Welcome back, {currentUser.username}!
        </h1>
      </div>
    </div>
  );
}
