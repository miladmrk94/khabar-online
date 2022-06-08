import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedComponent from "../components/FeedComponent";
import styles from "../Styles/HomePage.module.scss";
import { asyncFeed, comment, favorite, like } from "../Features/Feed/FeedSlice";
import toast, { Toaster } from "react-hot-toast";
import {
  RiBookmarkLine,
  RiBookmarkFill,
  RiHeartLine,
  RiHeartFill,
} from "react-icons/ri";

function HomePage() {
  const refData = useRef();
  const [state, setState] = useState();
  const { data, loading, err } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  console.log(data);
  const likeHandler = (id) => {
    dispatch(like(id));
  };

  const favoriteHandler = (id) => {
    dispatch(favorite(id));
  };

  const inputHandler = (id, e) => {
    console.log(id);
    setState(e.target.value);
  };

  const submitHandler = (id, e) => {
    e.preventDefault();
    if (state) {
      dispatch(comment({ state: state, id: id }));
      setState("");
    } else {
      toast.error("لطفا دیدگاه خود را وارد کنید");
    }

    console.log(state);
  };
  useEffect(() => {
    dispatch(asyncFeed());
  }, []);

  const dataHandler = () => {
    if (data && !loading) {
      return data.map((i) => {
        return (
          <div>
            <FeedComponent
              categories={i.categories}
              pubDate={i.pubDate}
              altImg={i.title}
              srcImg={i.enclosure.link}
              title={i.title}
              description={i.description}
              key={i.id}
              likeHandler={() => likeHandler(i.id)}
              favoriteHandler={() => favoriteHandler(i.id)}
              iconFavorite={
                i.favorite ? <RiBookmarkFill /> : <RiBookmarkLine />
              }
              iconLike={i.like ? <RiHeartFill /> : <RiHeartLine />}
              inputHandler={(e) => inputHandler(i.id, e)}
              inputName={i.id}
              ref={refData}
              value={state}
              submitHandler={(e) => submitHandler(i.id, e)}
              comment={i.comments.map((i) => {
                return <p>{i}</p>;
              })}
            />
            <Toaster />
          </div>
        );
      });
    }
    if (loading && !err) {
      return <h3>Loading...</h3>;
    }
    if (err) {
      return <h1>Error....</h1>;
    }
  };

  return <div className={styles.continuer}>{dataHandler()}</div>;
}
export default HomePage;
