import React, { Dispatch, SetStateAction } from "react";
import {
  ChevronLeftIcon,
  PresentationChartBarIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import styles from "@/styles/ToggleButton.module.css";

interface ToggleButtonProps {
  openSidePanel: boolean;
  setOpenSidePanel: Dispatch<SetStateAction<boolean>>;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  setOpenSidePanel,
  openSidePanel,
}) => {
  return (
    <button
      className={styles.buttonTogglePanel}
      onClick={() => setOpenSidePanel(!openSidePanel)}
    >
      <div className={styles.buttonTogglePanelSecond}>
        {openSidePanel ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </div>

      {!openSidePanel && (
        <div className={styles.buttonTogglePanelMain}>
          <PresentationChartBarIcon />
        </div>
      )}
    </button>
  );
};
