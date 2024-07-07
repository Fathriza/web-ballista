// MockupDesign.jsx

import React from "react";
import Image from "next/image";

const MockupDesign = ({ imageUrl, color }) => {
  const overlayStyle = {
    position: "relative",
    width: "300px",
    height: "300px",
    display: "inline-block",
    verticalAlign: "middle",
  };

  const imageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  const overlayColorStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    mixBlendMode: "color", // Mode blend untuk mengubah warna sesuai dengan elemen overlay
    backgroundColor: color,
  };

  return (
    <div style={overlayStyle}>
      <div
        style={{ position: "relative", width: "100%", paddingBottom: "100%" }}
      >
        <Image src={imageUrl} alt="Mockup" layout="fill" objectFit="contain" />
        <div style={overlayColorStyle}></div>
      </div>
    </div>
  );
};

export default MockupDesign;
