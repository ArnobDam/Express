import "./About.css";
import "./AboutCSS/Kunju.css";
import "./AboutCSS/Daniel.css";
import "./AboutCSS/Chazz.css";
import "./AboutCSS/Arnob.css";

export function About() {
  return (
    <>
      <div className="about-title">
        <h1>About</h1>
      </div>
      <div className="main-about">
        <div className="about-team">
          w
        </div>
        <div className="about-page-div">
          <div id="scorecard" className="arnob-profile-div">arnob</div>
          <div id="scorecard" className="chazz-profile-div">chazz</div>
          <div id="scorecard" className="kunju-profile-div">kunju</div>
          <div id="scorecard" className="daniel-profile-div">daniel</div>
        </div>
      </div>
    </>
  );
}
