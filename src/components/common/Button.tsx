// src/components/Button.tsx
import styles from "@/styles/Button.module.css";
import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  type: "submit" | "button" | "reset";
  classType: "main" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type,
  classType,
}) => {
  let selectedClassStyle = "";
  switch (classType) {
    case "main":
      selectedClassStyle = styles.main;
      break;
    default:
      selectedClassStyle = styles.main;
      break;
  }
  return (
    <button
      type={type}
      className={styles.button + " " + selectedClassStyle}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
