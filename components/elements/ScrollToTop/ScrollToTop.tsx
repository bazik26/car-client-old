import { useEffect, useState } from "react";
import BrandSliderArrowSvg from "../BrandsSliderArrow/BrandsSliderArrow";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomPosition, setBottomPosition] = useState("20px");

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
      const scrolledFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      setBottomPosition(scrolledFromBottom < 500 ? "500px" : "20px");
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
        style={{
          position: "fixed",
          bottom: bottomPosition || "100px",
          left: "30px",
          zIndex: 997,
          transition: "bottom 0.3s ease-in-out",
          display: isVisible ? "block" : "none",
        }}
      >
      <button
        onClick={scrollToTop}
        style={{
          width: "45px",
          height: "45px",
          backgroundColor: "#FF3030",
          color: "white",
          fill: "white",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D32F2F")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF3030")}
      >
        <BrandSliderArrowSvg/>
      </button>
    </div>
  );
};

export default ScrollToTop;
