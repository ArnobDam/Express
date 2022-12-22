import "./About.css";
import "./AboutCSS/Kunju.css";
import "./AboutCSS/Daniel.css";
import "./AboutCSS/Chazz.css";
import "./AboutCSS/Arnob.css";
import { useState } from "react";

export function About() {
  const [profileSelector, setProfileSelector] = useState(0);

  return (
    <>
      <div className="about-title">
        {profileSelector === 0 && <h1>About</h1>}
        {profileSelector !== 0 && (
          <div className="back-to-about-main">
            <div
              className="back-button-to-about"
              onClick={(e) => setProfileSelector(0)}
            >
              Back
            </div>
          </div>
        )}
      </div>
      <div className="main-about">
        <div className="about-team">
          {profileSelector === 0 && (
            <div className="motto-team-about">
              Hello! from the ExpressPOS team.
            </div>
          )}
          {profileSelector === 1 && <div className="arnob-about-me">a</div>}
          {profileSelector === 2 && <div className="chazz-about-me">c</div>}
          {profileSelector === 3 && <div className="kunju-about-me">k</div>}
          {profileSelector === 4 && <div className="daniel-about-me">d</div>}
        </div>
        <div className="about-page-div">
          <div
            id="scorecard"
            className="arnob-profile-div"
            onClick={(e) => setProfileSelector(1)}
          >
            Arnob
          </div>
          <div
            id="scorecard"
            className="chazz-profile-div"
            onClick={(e) => setProfileSelector(2)}
          >
            Chazz
          </div>
          <div
            id="scorecard"
            className="kunju-profile-div"
            onClick={(e) => setProfileSelector(3)}
          >
            Kunju
          </div>
          <div
            id="scorecard"
            className="daniel-profile-div"
            onClick={(e) => setProfileSelector(4)}
          >
            Daniel
          </div>
        </div>
      </div>
    </>
  );
}
