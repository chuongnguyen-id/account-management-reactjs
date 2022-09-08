import { useState, useEffect } from "react";

function useScrollHook() {
  const headerStyle = {
    zIndex: 1,
    width: "100%",
    height: "40px",
    color: "white",
    position: "fixed",
    transition: "transform 900ms",
    justifyContent: "center",
    borderRadius: "0 0 50% 50%",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
    background:
      "linear-gradient(310deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.2))",
  };

  const [style, setStyle] = useState(headerStyle);

  useEffect(() => {
    const handleChangeHeaderStyle = () => {
      if (document.body.getBoundingClientRect().top > scrollPos) {
        setStyle(headerStyle);
      } else {
        setStyle({
          ...headerStyle,
          transform: "translateY(-100%)",
        });
      }
      scrollPos = document.body.getBoundingClientRect().top;
    };

    let scrollPos = 0;
    window.addEventListener("scroll", handleChangeHeaderStyle);

    return () => {
      window.removeEventListener("scroll", handleChangeHeaderStyle);
    };
  }, []);

  return style;
}

export default useScrollHook;
