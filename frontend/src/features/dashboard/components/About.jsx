import "./About.css";
import "./AboutCSS/Kunju.css";
import "./AboutCSS/Daniel.css";
import "./AboutCSS/Chazz.css";
import "./AboutCSS/Arnob.css";
import { useState } from "react";

export function About() {
  const [profileSelector, setProfileSelector] = useState(0);

  return (
    <div className="center-main-about-me">
      <div className="about-title">
        {/* <div className="about-line"></div> */}
        {profileSelector === 0 && (
          <div className="about-express">About Express</div>
        )}
        {profileSelector !== 0 && (
          <div className="back-to-about-main">
            <div
              className="back-button-to-about"
              onClick={(e) => setProfileSelector(0)}
            >
              Back
            </div>
            {/* <div className="about-line"></div> */}
          </div>
        )}
      </div>
      <div className="main-about">
        <div className="about-team">
          <div className="about-team-flex">
          {profileSelector === 0 && (
            <>
            <div className="motto-team-about">
              Express is a POS System built upon efficiency, ease of access and
              sleek visuals. We created Express in order to upgrade existing
              restaurant owners’ technologies. Besides seamless checkout
              technology, user’s are also able to view data visualizations of
              their business’ sales.
            </div>
            <div className="aboutFlex">
          <div className="circle-border">
                  <img
                    alt="arnob"
                    className="profile-pic1"
                    src="https://media.licdn.com/dms/image/C4D03AQEvbYVuaaEkEg/profile-displayphoto-shrink_800_800/0/1607486966851?e=1677110400&v=beta&t=epkurBoMNSnA13BOztde8kLmi1zwQX31XZQLLYPasyE"
                  />
                </div>
                <div className="circle-border">
                  <img
                    alt="chazz"
                    className="profile-pic1"
                    src="https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png"
                  />
                </div>
                <div className="circle-border">
                  <img
                    alt="kunju"
                    className="profile-pic1"
                    src="https://secure.gravatar.com/avatar/a867c078843d21095e8b49a46af573d1?secure=true&size=300"
                  />
                </div>
                <div className="circle-border">
                  <img
                    alt="daniel"
                    className="profile-pic1"
                    src="https://secure.gravatar.com/avatar/00b58fe109a8a8d4756e6cd8d4cc09a4?secure=true&size=300"
                  />
                </div>
                </div>
            </>
          )}
          
                </div>

          {profileSelector === 1 && (
            <div className="main-about-me-element">
              <div className="arnob-about-me">
                <div className="circle-border-spin">
                  <img
                    alt="arnob"
                    className="profile-pic"
                    src="https://media.licdn.com/dms/image/C4D03AQEvbYVuaaEkEg/profile-displayphoto-shrink_800_800/0/1607486966851?e=1677110400&v=beta&t=epkurBoMNSnA13BOztde8kLmi1zwQX31XZQLLYPasyE"
                  />
                </div>
                <div className="name-profile">
                  <p className="full-name">Arnob Dam</p>
                  <p className="role">Project Lead</p>
                </div>
              </div>
              <div className="arnob-about-me-body">
                <span className="text-body">
                  <p className="main-text-body">
                    Hey! Welcome to our application, Express, our custom
                    Point-of-Sale system. As project lead, I contributed to both
                    the front- and back-end of our system (which utilizes the
                    MERN Stack). I further led our team meetings and set the
                    team's daily objectives. I hope you enjoy using Express!
                  </p>
                </span>
                
              </div>


              <div className="arnob-about-me-body-links">
                <span className="text-body">
                  <div className="link-to">
                    <a id="logo" href="https://github.com/ArnobDam">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a id="logo" href="https://www.linkedin.com/in/arnobdam/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#0077B5"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        xmlSpace="preserve"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a id="logo" href="https://symphonify.onrender.com/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 234.3 234.3"
                      >
                        <g
                          xmlns="http://www.w3.org/2000/svg"
                          id="Group_2766"
                          transform="translate(-15853 -8503)"
                        >
                          <g>
                            <polygon
                              className="st0"
                              points="15998,8534.7 15996,8534.7 15996,8536.7 15996,8555.2 15996,8557.2 15998,8557.2 16016.6,8557.2     16018.6,8557.2 16018.6,8555.2 16018.6,8536.7 16018.6,8534.7 16016.6,8534.7   "
                            />
                            <path
                              className="st0"
                              d="M15938.2,8534.7c-7.2,0-14.2,1.4-20.8,4.2c-6.4,2.7-12.1,6.6-17,11.5s-8.8,10.6-11.5,17    c-2.8,6.6-4.2,13.6-4.2,20.8v78.4v2h2h18.6h2v-2v-78.7c0.4-8.1,3.8-15.7,9.5-21.3c5.8-5.7,13.4-9,21.5-9.3h41.2h2v-2v-18.6v-2h-2    H15938.2z"
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8608.9 16033.1,8608.9 16033.1,8610.9 16033.1,8629.5 16033.1,8631.5 16035.1,8631.5     16053.7,8631.5 16055.7,8631.5 16055.7,8629.5 16055.7,8610.9 16055.7,8608.9 16053.7,8608.9   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8571.8 16033.1,8571.8 16033.1,8573.8 16033.1,8592.4 16033.1,8594.4 16035.1,8594.4     16053.7,8594.4 16055.7,8594.4 16055.7,8592.4 16055.7,8573.8 16055.7,8571.8 16053.7,8571.8   "
                            />
                            <polygon
                              className="st0"
                              points="16053.7,8534.7 16035.1,8534.7 16033.1,8534.7 16033.1,8536.7 16033.1,8555.2 16033.1,8557.2     16035.1,8557.2 16053.7,8557.2 16055.7,8557.2 16055.7,8555.2 16055.7,8536.7 16055.7,8534.7   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8646 16033.1,8646 16033.1,8648 16033.1,8666.6 16033.1,8668.6 16035.1,8668.6     16053.7,8668.6 16055.7,8668.6 16055.7,8666.6 16055.7,8648 16055.7,8646 16053.7,8646   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8683.1 16033.1,8683.1 16033.1,8685.1 16033.1,8703.7 16033.1,8705.7 16035.1,8705.7     16053.7,8705.7 16055.7,8705.7 16055.7,8703.7 16055.7,8685.1 16055.7,8683.1 16053.7,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15998,8683.1 15996,8683.1 15996,8685.1 15996,8703.7 15996,8705.7 15998,8705.7 16016.6,8705.7     16018.6,8705.7 16018.6,8703.7 16018.6,8685.1 16018.6,8683.1 16016.6,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15960.9,8683.1 15958.9,8683.1 15958.9,8685.1 15958.9,8703.7 15958.9,8705.7 15960.9,8705.7     15979.5,8705.7 15981.5,8705.7 15981.5,8703.7 15981.5,8685.1 15981.5,8683.1 15979.5,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15923.8,8683.1 15921.8,8683.1 15921.8,8685.1 15921.8,8703.7 15921.8,8705.7 15923.8,8705.7     15942.4,8705.7 15944.4,8705.7 15944.4,8703.7 15944.4,8685.1 15944.4,8683.1 15942.4,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15886.7,8683.1 15884.7,8683.1 15884.7,8685.1 15884.7,8703.7 15884.7,8705.7 15886.7,8705.7     15905.2,8705.7 15907.2,8705.7 15907.2,8703.7 15907.2,8685.1 15907.2,8683.1 15905.2,8683.1   "
                            />
                          </g>
                        </g>
                      </svg>
                    </a>
                    <a id="logo" href="https://arnobdam.github.io/Gorillas/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 630 630"
                        width="36"
                        height="36"
                      >
                        <rect width="630" height="630" fill="#f7df1e" />
                        <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
                      </svg>
                    </a>
                  </div>
                </span>
              </div>
            </div>
          )}
          {profileSelector === 2 && (
            <div className="main-about-me-element">
              <div className="chazz-about-me">
                <div className="circle-border-spin">
                  <img
                    alt="chazz"
                    className="profile-pic"
                    src="https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png"
                  />
                </div>
                <div className="name-profile">
                  <p className="full-name">Chazz Lee</p>
                  <p className="role">Project Flex</p>
                </div>
              </div>
              <div className="chazz-about-me-body">
                <span className="text-body">
                  <p className="main-text-body">
                    Heavily involved in the full-stack development of our
                    system, using his expertise in all parts of the MERN Stack.
                    Truly a team player.
                  </p>
                </span>
              </div>
              <div className="chazz-about-me-body-links">
                <span className="text-body">
                  <div className="link-to">
                    <a id="logo" href="https://github.com/chazzlee">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a id="logo" href="https://www.linkedin.com/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#0077B5"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        xmlSpace="preserve"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a id="logo" href="https://soundkloud-rails.onrender.com/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 234.3 234.3"
                      >
                        <g
                          xmlns="http://www.w3.org/2000/svg"
                          id="Group_2766"
                          transform="translate(-15853 -8503)"
                        >
                          <g>
                            <polygon
                              className="st0"
                              points="15998,8534.7 15996,8534.7 15996,8536.7 15996,8555.2 15996,8557.2 15998,8557.2 16016.6,8557.2     16018.6,8557.2 16018.6,8555.2 16018.6,8536.7 16018.6,8534.7 16016.6,8534.7   "
                            />
                            <path
                              className="st0"
                              d="M15938.2,8534.7c-7.2,0-14.2,1.4-20.8,4.2c-6.4,2.7-12.1,6.6-17,11.5s-8.8,10.6-11.5,17    c-2.8,6.6-4.2,13.6-4.2,20.8v78.4v2h2h18.6h2v-2v-78.7c0.4-8.1,3.8-15.7,9.5-21.3c5.8-5.7,13.4-9,21.5-9.3h41.2h2v-2v-18.6v-2h-2    H15938.2z"
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8608.9 16033.1,8608.9 16033.1,8610.9 16033.1,8629.5 16033.1,8631.5 16035.1,8631.5     16053.7,8631.5 16055.7,8631.5 16055.7,8629.5 16055.7,8610.9 16055.7,8608.9 16053.7,8608.9   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8571.8 16033.1,8571.8 16033.1,8573.8 16033.1,8592.4 16033.1,8594.4 16035.1,8594.4     16053.7,8594.4 16055.7,8594.4 16055.7,8592.4 16055.7,8573.8 16055.7,8571.8 16053.7,8571.8   "
                            />
                            <polygon
                              className="st0"
                              points="16053.7,8534.7 16035.1,8534.7 16033.1,8534.7 16033.1,8536.7 16033.1,8555.2 16033.1,8557.2     16035.1,8557.2 16053.7,8557.2 16055.7,8557.2 16055.7,8555.2 16055.7,8536.7 16055.7,8534.7   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8646 16033.1,8646 16033.1,8648 16033.1,8666.6 16033.1,8668.6 16035.1,8668.6     16053.7,8668.6 16055.7,8668.6 16055.7,8666.6 16055.7,8648 16055.7,8646 16053.7,8646   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8683.1 16033.1,8683.1 16033.1,8685.1 16033.1,8703.7 16033.1,8705.7 16035.1,8705.7     16053.7,8705.7 16055.7,8705.7 16055.7,8703.7 16055.7,8685.1 16055.7,8683.1 16053.7,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15998,8683.1 15996,8683.1 15996,8685.1 15996,8703.7 15996,8705.7 15998,8705.7 16016.6,8705.7     16018.6,8705.7 16018.6,8703.7 16018.6,8685.1 16018.6,8683.1 16016.6,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15960.9,8683.1 15958.9,8683.1 15958.9,8685.1 15958.9,8703.7 15958.9,8705.7 15960.9,8705.7     15979.5,8705.7 15981.5,8705.7 15981.5,8703.7 15981.5,8685.1 15981.5,8683.1 15979.5,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15923.8,8683.1 15921.8,8683.1 15921.8,8685.1 15921.8,8703.7 15921.8,8705.7 15923.8,8705.7     15942.4,8705.7 15944.4,8705.7 15944.4,8703.7 15944.4,8685.1 15944.4,8683.1 15942.4,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15886.7,8683.1 15884.7,8683.1 15884.7,8685.1 15884.7,8703.7 15884.7,8705.7 15886.7,8705.7     15905.2,8705.7 15907.2,8705.7 15907.2,8703.7 15907.2,8685.1 15907.2,8683.1 15905.2,8683.1   "
                            />
                          </g>
                        </g>
                      </svg>
                    </a>
                    <a id="logo" href="https://chazzlee.github.io/js_stepper/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 630 630"
                        width="36"
                        height="36"
                      >
                        <rect width="630" height="630" fill="#f7df1e" />
                        <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
                      </svg>
                    </a>
                  </div>
                </span>
              </div>
            </div>
          )}
          {profileSelector === 3 && (
            <div className="main-about-me-element">
              <div className="kunju-about-me">
                <div className="circle-border-spin">
                  <img
                    alt="kunju"
                    className="profile-pic"
                    src="https://secure.gravatar.com/avatar/a867c078843d21095e8b49a46af573d1?secure=true&size=300"
                  />
                </div>
                <div className="name-profile">
                  <p className="full-name">Kunju Kim</p>
                  <p className="role">Project Frontend Lead</p>
                </div>
              </div>
              <div className="kunju-about-me-body">
                <span className="text-body">
                  <p className="main-text-body">
                    Hi everyone, welcome to Express! <br></br>My name is Kunju Kim and I
                    headed the front-end development of the UI / UX of our POS
                    System via React, and heavily contributed styling the
                    front-end via HTML / CSS. <br></br>I hope you enjoy your experience
                    using Express and feel free to reach out with any questions!
                  </p>
                </span>
              </div>
              <div className="kunju-about-me-body-links">
                <span className="text-body">
                  <div className="link-to">
                    <a id="logo" href="https://github.com/kkj2010">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      id="logo"
                      href="https://www.linkedin.com/in/kunjukim/"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#0077B5"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        xmlSpace="preserve"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a id="logo" href="https://shoppy-1asz.onrender.com/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 234.3 234.3"
                      >
                        <g
                          xmlns="http://www.w3.org/2000/svg"
                          id="Group_2766"
                          transform="translate(-15853 -8503)"
                        >
                          <g>
                            <polygon
                              className="st0"
                              points="15998,8534.7 15996,8534.7 15996,8536.7 15996,8555.2 15996,8557.2 15998,8557.2 16016.6,8557.2     16018.6,8557.2 16018.6,8555.2 16018.6,8536.7 16018.6,8534.7 16016.6,8534.7   "
                            />
                            <path
                              className="st0"
                              d="M15938.2,8534.7c-7.2,0-14.2,1.4-20.8,4.2c-6.4,2.7-12.1,6.6-17,11.5s-8.8,10.6-11.5,17    c-2.8,6.6-4.2,13.6-4.2,20.8v78.4v2h2h18.6h2v-2v-78.7c0.4-8.1,3.8-15.7,9.5-21.3c5.8-5.7,13.4-9,21.5-9.3h41.2h2v-2v-18.6v-2h-2    H15938.2z"
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8608.9 16033.1,8608.9 16033.1,8610.9 16033.1,8629.5 16033.1,8631.5 16035.1,8631.5     16053.7,8631.5 16055.7,8631.5 16055.7,8629.5 16055.7,8610.9 16055.7,8608.9 16053.7,8608.9   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8571.8 16033.1,8571.8 16033.1,8573.8 16033.1,8592.4 16033.1,8594.4 16035.1,8594.4     16053.7,8594.4 16055.7,8594.4 16055.7,8592.4 16055.7,8573.8 16055.7,8571.8 16053.7,8571.8   "
                            />
                            <polygon
                              className="st0"
                              points="16053.7,8534.7 16035.1,8534.7 16033.1,8534.7 16033.1,8536.7 16033.1,8555.2 16033.1,8557.2     16035.1,8557.2 16053.7,8557.2 16055.7,8557.2 16055.7,8555.2 16055.7,8536.7 16055.7,8534.7   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8646 16033.1,8646 16033.1,8648 16033.1,8666.6 16033.1,8668.6 16035.1,8668.6     16053.7,8668.6 16055.7,8668.6 16055.7,8666.6 16055.7,8648 16055.7,8646 16053.7,8646   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8683.1 16033.1,8683.1 16033.1,8685.1 16033.1,8703.7 16033.1,8705.7 16035.1,8705.7     16053.7,8705.7 16055.7,8705.7 16055.7,8703.7 16055.7,8685.1 16055.7,8683.1 16053.7,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15998,8683.1 15996,8683.1 15996,8685.1 15996,8703.7 15996,8705.7 15998,8705.7 16016.6,8705.7     16018.6,8705.7 16018.6,8703.7 16018.6,8685.1 16018.6,8683.1 16016.6,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15960.9,8683.1 15958.9,8683.1 15958.9,8685.1 15958.9,8703.7 15958.9,8705.7 15960.9,8705.7     15979.5,8705.7 15981.5,8705.7 15981.5,8703.7 15981.5,8685.1 15981.5,8683.1 15979.5,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15923.8,8683.1 15921.8,8683.1 15921.8,8685.1 15921.8,8703.7 15921.8,8705.7 15923.8,8705.7     15942.4,8705.7 15944.4,8705.7 15944.4,8703.7 15944.4,8685.1 15944.4,8683.1 15942.4,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15886.7,8683.1 15884.7,8683.1 15884.7,8685.1 15884.7,8703.7 15884.7,8705.7 15886.7,8705.7     15905.2,8705.7 15907.2,8705.7 15907.2,8703.7 15907.2,8685.1 15907.2,8683.1 15905.2,8683.1   "
                            />
                          </g>
                        </g>
                      </svg>
                    </a>
                    <a
                      id="logo"
                      href="https://kkj2010.github.io/Mugunghwa/"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 630 630"
                        width="36"
                        height="36"
                      >
                        <rect width="630" height="630" fill="#f7df1e" />
                        <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
                      </svg>
                    </a>
                  </div>
                </span>
              </div>
            </div>
          )}
          {profileSelector === 4 && (
            <div className="main-about-me-element">
              <div className="daniel-about-me">
                <div className="circle-border-spin">
                  <img
                    alt="daniel"
                    className="profile-pic"
                    src="https://secure.gravatar.com/avatar/00b58fe109a8a8d4756e6cd8d4cc09a4?secure=true&size=300"
                  />
                </div>
                <div className="name-profile">
                  <p className="full-name">Daniel Kim</p>
                  <p className="role">Project Backend Lead</p>
                </div>
              </div>
              <div className="daniel-about-me-body">
                <span className="text-body">
                  <p className="main-text-body">
                    Headed back-end development of our system via expertise in
                    MongoDB and Express, and served as the team's Git Master as
                    well.
                  </p>
                </span>
              </div>
              <div className="daniel-about-me-body-links">
                <span className="text-body">
                  <div className="link-to">
                    <a id="logo" href="https://github.com/Spiro-001">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      id="logo"
                      href="https://www.linkedin.com/in/yong-kim-645902178/"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#0077B5"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        xmlSpace="preserve"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a id="logo" href="https://coffee-chat.onrender.com/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 234.3 234.3"
                      >
                        <g
                          xmlns="http://www.w3.org/2000/svg"
                          id="Group_2766"
                          transform="translate(-15853 -8503)"
                        >
                          <g>
                            <polygon
                              className="st0"
                              points="15998,8534.7 15996,8534.7 15996,8536.7 15996,8555.2 15996,8557.2 15998,8557.2 16016.6,8557.2     16018.6,8557.2 16018.6,8555.2 16018.6,8536.7 16018.6,8534.7 16016.6,8534.7   "
                            />
                            <path
                              className="st0"
                              d="M15938.2,8534.7c-7.2,0-14.2,1.4-20.8,4.2c-6.4,2.7-12.1,6.6-17,11.5s-8.8,10.6-11.5,17    c-2.8,6.6-4.2,13.6-4.2,20.8v78.4v2h2h18.6h2v-2v-78.7c0.4-8.1,3.8-15.7,9.5-21.3c5.8-5.7,13.4-9,21.5-9.3h41.2h2v-2v-18.6v-2h-2    H15938.2z"
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8608.9 16033.1,8608.9 16033.1,8610.9 16033.1,8629.5 16033.1,8631.5 16035.1,8631.5     16053.7,8631.5 16055.7,8631.5 16055.7,8629.5 16055.7,8610.9 16055.7,8608.9 16053.7,8608.9   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8571.8 16033.1,8571.8 16033.1,8573.8 16033.1,8592.4 16033.1,8594.4 16035.1,8594.4     16053.7,8594.4 16055.7,8594.4 16055.7,8592.4 16055.7,8573.8 16055.7,8571.8 16053.7,8571.8   "
                            />
                            <polygon
                              className="st0"
                              points="16053.7,8534.7 16035.1,8534.7 16033.1,8534.7 16033.1,8536.7 16033.1,8555.2 16033.1,8557.2     16035.1,8557.2 16053.7,8557.2 16055.7,8557.2 16055.7,8555.2 16055.7,8536.7 16055.7,8534.7   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8646 16033.1,8646 16033.1,8648 16033.1,8666.6 16033.1,8668.6 16035.1,8668.6     16053.7,8668.6 16055.7,8668.6 16055.7,8666.6 16055.7,8648 16055.7,8646 16053.7,8646   "
                            />
                            <polygon
                              className="st0"
                              points="16035.1,8683.1 16033.1,8683.1 16033.1,8685.1 16033.1,8703.7 16033.1,8705.7 16035.1,8705.7     16053.7,8705.7 16055.7,8705.7 16055.7,8703.7 16055.7,8685.1 16055.7,8683.1 16053.7,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15998,8683.1 15996,8683.1 15996,8685.1 15996,8703.7 15996,8705.7 15998,8705.7 16016.6,8705.7     16018.6,8705.7 16018.6,8703.7 16018.6,8685.1 16018.6,8683.1 16016.6,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15960.9,8683.1 15958.9,8683.1 15958.9,8685.1 15958.9,8703.7 15958.9,8705.7 15960.9,8705.7     15979.5,8705.7 15981.5,8705.7 15981.5,8703.7 15981.5,8685.1 15981.5,8683.1 15979.5,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15923.8,8683.1 15921.8,8683.1 15921.8,8685.1 15921.8,8703.7 15921.8,8705.7 15923.8,8705.7     15942.4,8705.7 15944.4,8705.7 15944.4,8703.7 15944.4,8685.1 15944.4,8683.1 15942.4,8683.1   "
                            />
                            <polygon
                              className="st0"
                              points="15886.7,8683.1 15884.7,8683.1 15884.7,8685.1 15884.7,8703.7 15884.7,8705.7 15886.7,8705.7     15905.2,8705.7 15907.2,8705.7 15907.2,8703.7 15907.2,8685.1 15907.2,8683.1 15905.2,8683.1   "
                            />
                          </g>
                        </g>
                      </svg>
                    </a>
                    <a
                      id="logo"
                      href="https://spiro-001.github.io/Zero-Visualizer/"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 630 630"
                        width="36"
                        height="36"
                      >
                        <rect width="630" height="630" fill="#f7df1e" />
                        <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
                      </svg>
                    </a>
                  </div>
                </span>
              </div>
            </div>
          )}
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
    </div>
  );
}
