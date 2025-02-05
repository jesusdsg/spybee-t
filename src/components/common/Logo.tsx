import React from "react";
import Image from "next/image";
import logoImg from "@/assets/spybee_logo_black.png";
import styles from "@/styles/Logo.module.css";

interface LogoProps {
  size: "small" | "large" | "medium";
}

export const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  let selectedStyleClass = "";
  switch (size) {
    case "small":
      selectedStyleClass = styles.sm;
      break;
    case "medium":
      selectedStyleClass = styles.md;
      break;
    case "large":
      selectedStyleClass = styles.lg;
      break;
    default:
      selectedStyleClass = styles.md;
      break;
  }

  return <Image src={logoImg} alt="Logo" className={selectedStyleClass} />;
};
