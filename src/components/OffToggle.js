import React from "react";

const OffToggle = ({ onClick, onToggle }) => {
  return (
    <div style={styles.switch} onClick={onToggle || onClick}>
      <div style={styles.thumb}></div>
    </div>
  );
};

const styles = {
  switch: {
    width: "32px",
    height: "18px",
    backgroundColor: "#ffcdd2", // OFF light red (danger)
    borderRadius: "9px",
    position: "relative",
    boxShadow: "inset 0 0 3px rgba(0,0,0,0.2)",
    cursor: "pointer",
  },
  thumb: {
    width: "14px",
    height: "14px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    left: "2px", // LEFT = OFF
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
    pointerEvents: "none",
  },
};

export default OffToggle;

