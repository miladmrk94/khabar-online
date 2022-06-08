import React from "react";
import styles from "../Styles/FeedComponent.module.scss";

const FeedComponent = ({
  title,
  altImg,
  srcImg,
  description,
  categories,
  pubDate,
  favoriteHandler,
  likeHandler,
  iconFavorite,
  iconLike,
  inputHandler,
  submitHandler,
  inputName,
  comment,
  value,
  ref,
}) => {
  return (
    <div className={styles.continuer}>
      <div className={styles.dateBox}>
        <span>{categories}</span>
        <span>{pubDate}</span>
      </div>
      <div className={styles.imageBox}>
        <img className={styles.image} src={srcImg} alt={altImg} />
      </div>
      <div className={styles.icons}>
        <p onClick={favoriteHandler}>{iconFavorite}</p>

        <p onClick={likeHandler}>{iconLike}</p>
      </div>
      <div className={styles.descriptionBox}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.commentBox}>
        <hr />
        <p>:نظرات کاربران</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {comment}
        </div>
        <form onSubmit={submitHandler}>
          <textarea
            type="text"
            name={inputName}
            onChange={inputHandler}
            value={value}
            ref={ref}
          />
          <button type="submit">ارسال نظر</button>
        </form>
      </div>
    </div>
  );
};

export default FeedComponent;
