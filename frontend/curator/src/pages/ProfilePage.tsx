import React, { MouseEvent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Button } from "@material-ui/core";
import { ArticleProps } from "lib/interfaces";
import { makeStyles, Theme } from "@material-ui/core";
import ArticleContainer from "@profiles/container/ArticleContainer";
import axios from "axios";
import { USER_CHECK_URL } from "@lib/constants";
import ProfileDrawer from "@profiles/components/ProfileDrawer";
import { FOLLOW_URL } from "@lib/constants";
import { UNFOLLOW_URL } from "@lib/constants";
import defaultProfileImage from "@static/images/default-profile.jpg";
import defaultBG from "@static/images/default-bg.png";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingBottom: "10%",
    marginBottom: "10%",
  },
  imgContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  backgroundImg: {
    // borderRadius: "7% 7% 0 0",
    [theme.breakpoints.between("xs", "sm")]: {
      height: "200px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: "400px",
    },
    [theme.breakpoints.between("md", "lg")]: {
      height: "450px",
    },
    [theme.breakpoints.up("lg")]: {
      height: "500px",
    },
    objectFit: "cover",
  },
  profileImg: {
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    top: "65%",
    borderRadius: "50%",
    [theme.breakpoints.between("xs", "sm")]: {
      width: "64px",
      height: "64px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "120px",
      height: "120px",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "160px",
      height: "160px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "172px",
      height: "172px",
    },
  },
  followBtn: {
    "& span": {
      fontSize: "1rem",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      width: "120px",
      height: "48px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "148px",
      height: "64px",
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: "164px",
      height: "82px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "186px",
      height: "70px",
    },
  },
  whiteTip: {
    position: "absolute",
    top: "80%",
    width: "100%",
    height: "20%",
    backgroundColor: theme.palette.common.white,
    borderTopLeftRadius: "130px",
    borderTopRightRadius: "130px",
    border: "none",
    borderBottom: 0,
  },
  contextArea: {
    backgroundColor: theme.palette.common.white,
    width: "100%",
  },
  infoArea: {
    display: "flex",
    padding: "5% 0",
    justifyContent: "space-around",
  },
  infoText: {
    textAlign: "center",
    padding: "5% 5%",
    margin: "-1% 0%",
  },
  buttonArea: {
    display: "flex",
    padding: "5% 0",
    justifyContent: "space-around",
  },
  articleArea: {
    padding: "0% 5%",
  },
  title: {
    color: theme.palette.primary.main,
  },
}));

interface paramsProps {
  nickname: string;
}
const Profile: React.FC<RouteComponentProps<paramsProps>> = ({ match }) => {
  const nickname = match.params.nickname;
  const PROFILE_URL = `http://i5c207.p.ssafy.io:9000/curation/userInfo/${nickname}`;
  const [currentUserNickname, setCurrentUserNickname] = useState<string>("");
  const [isFollowing, setIsFollowing] = useState<Boolean>(false);

  interface UserData {
    profileImg: any;
    bgImg: any;
    followers: [string] | [];
    followings: [string] | [];
    introduction: string;
    myPagePostDtos: Array<[ArticleProps]>;
  }
  const [fetchedUserData, setFetchedUserData] = useState<UserData>({
    profileImg: null,
    bgImg: null,
    followers: [],
    followings: [],
    introduction: "",
    myPagePostDtos: [],
  });

  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await axios.get(PROFILE_URL);
        const {
          bgImg,
          followers,
          followings,
          introduction,
          myPagePostDtos,
          profileImg,
        } = res.data;
        setFetchedUserData({
          bgImg,
          followers,
          followings,
          introduction,
          myPagePostDtos,
          profileImg,
        });
        setIsFollowing(Boolean(followers.includes(nickname)));
      } catch (err) {
        console.log(err.response); // ????????? ????????? ????????? ????????? 404 ???????????? ????????? ?????????
      }
    };
    const currentUser = async () => {
      const res = await axios.get(`${USER_CHECK_URL}`, {
        withCredentials: true,
      });
      const {
        data: { nickname },
      } = res;

      setCurrentUserNickname(nickname);
    };
    userInfo();
    currentUser();
  }, [PROFILE_URL, nickname]); // ?????? deps ?????? ??????. ???????????? fetchedUserData ????????? ?????? ?????? ??????, ?????? ???????????? ???????????? ????????? ????????????

  console.log("fetchedUserData", fetchedUserData);
  const onClickFollow = (e: MouseEvent) => {
    const data = {};
    const config = {
      params: {
        nickname,
      },
      withCredentials: true,
    };
    axios.post(FOLLOW_URL(nickname), data, config);
    /* ?????? ????????? ?????? ????????? ?????? ??????????????????, fetch???????????? ?????? ??????????????? ????????????, ?????? ????????? ????????? ??? ????????? follow ?????? ?????? */
    setIsFollowing(!isFollowing);
  };

  const onClickUnfollow = (e: MouseEvent) => {
    const config = {
      params: {
        nickname,
      },
      withCredentials: true,
    };
    axios.delete(UNFOLLOW_URL(nickname), config);
    setIsFollowing(!isFollowing);
  };

  const classes = useStyles();
  return (
    <section className={classes.container}>
      <div className={classes.imgContainer}>
        <div className={classes.whiteTip}></div>
        <div>
          <img
            className={classes.profileImg}
            src={
              fetchedUserData.profileImg
                ? fetchedUserData.profileImg
                : defaultProfileImage
            }
            alt="profileImg"
          ></img>
        </div>
        <div>
          <img
            className={classes.backgroundImg}
            width="100%"
            src={fetchedUserData.bgImg ? fetchedUserData.bgImg : defaultBG}
            alt="backgroundImg"
          ></img>
        </div>
      </div>
      <div className={classes.contextArea}>
        <div>
          <div className={classes.infoText}>
            <h1>{nickname}</h1>
            <h3>
              {fetchedUserData.introduction
                ? fetchedUserData.introduction
                : "?????? ????????? ?????????"}
            </h3>
          </div>
        </div>
        <div className={classes.buttonArea}>
          {currentUserNickname === nickname ? (
            <ProfileDrawer
              nickname={nickname}
              profileImg={fetchedUserData.profileImg}
              introduction={
                fetchedUserData.introduction ? fetchedUserData.introduction : ""
              }
              bgImg={fetchedUserData.bgImg}
            />
          ) : isFollowing ? (
            <Button
              className={classes.followBtn}
              variant="outlined"
              color="primary"
              onClick={onClickUnfollow}
            >
              ????????????
            </Button>
          ) : (
            <Button
              className={classes.followBtn}
              variant="outlined"
              color="secondary"
              onClick={onClickFollow}
            >
              ?????????
            </Button>
          )}
        </div>
        <div className={classes.infoArea}>
          <div className={classes.infoText}>
            <h4>{fetchedUserData.myPagePostDtos.length}</h4>
            <p>?????????</p>
          </div>
          <div className={classes.infoText}>
            <h4>{fetchedUserData.followers.length}</h4>
            <p>?????????</p>
          </div>
          <div className={classes.infoText}>
            <h4>{fetchedUserData.followings.length}</h4>
            <p>?????????</p>
          </div>
        </div>
        <hr style={{ width: "90%" }}></hr>
        <div className={classes.articleArea}>
          <h2 className={classes.title}>?????????</h2>
          <ArticleContainer
            fetchedMypagePostDtos={fetchedUserData.myPagePostDtos}
          ></ArticleContainer>
        </div>
      </div>
    </section>
  );
};

export default Profile;
