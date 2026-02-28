import React from "react";

const ToggleMode = ({ isOn, onToggle }) => {
  return (
    <div 
      style={{
        ...styles.switch,
        backgroundColor: isOn ? "#d1391aff" : "#ffcdd2",
        cursor: "pointer"
      }} 
      onClick={onToggle}
    >
      <div 
        style={{
          ...styles.thumb,
          left: isOn ? "16px" : "2px"
        }}
      ></div>
    </div>
  );
};

const styles = {
  switch: {
    width: "32px",
    height: "18px",
    borderRadius: "9px",
    position: "relative",
    boxShadow: "inset 0 0 3px rgba(0,0,0,0.2)",
    transition: "background-color 0.2s ease"
  },
  thumb: {
    width: "14px",
    height: "14px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
    pointerEvents: "none",
    transition: "left 0.2s ease"
  },
};

export default ToggleMode;

