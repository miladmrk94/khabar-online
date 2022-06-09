import React from "react";
import styles from "../Styles/Header.module.scss";
import { RiBookmarkFill, RiHeartFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Header = ({ children }) => {
  const { data } = useSelector((state) => state.feed);

  const findFavorite = data.filter((i) => {
    return i.favorite === true;
  });
  const findLike = data.filter((i) => {
    return i.like === true;
  });
  return (
    <>
      <header className={styles.header}>
        <h2>Khabar Online</h2>
        <main>
          <ul>
            <li>
              <RiBookmarkFill size={"33px"} color={"azure"} />

              <span className={styles.badgeNumber}>{findFavorite.length}</span>
            </li>
            <li>
              <RiHeartFill size={"33px"} color={"azure"} />
              <span className={styles.badgeNumberLike}>{findLike.length}</span>
            </li>
          </ul>
        </main>
      </header>
      {children}
    </>
  );
};

export default Header;
