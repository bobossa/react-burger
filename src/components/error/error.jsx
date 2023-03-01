import React from "react";

import styles from "./error.module.css";

const Error = () => {
  return (
    <div className={styles.error}>
      <span>Произошла ошибка</span>
    </div>
  );
};

export default Error;
