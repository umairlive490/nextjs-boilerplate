import React, { FunctionComponent, MouseEvent } from "react";
import { Menu, MenuItem } from "@mui/material";

type NavbarHelpingMenuProps = {
  anchor?: Element;
  onClose: (event: MouseEvent<Element>) => void;
};

export const NavbarHelpingMenu: FunctionComponent<NavbarHelpingMenuProps> = ({
  anchor,
  onClose,
}) => {
  const handleKnowledgeBase = (event: MouseEvent<Element>) => {
    window.open("https://support.movley.com/en", "_blank");
    onClose(event);
  };

  const handleMailService = (event: MouseEvent<Element>) => {
    window.location.href = "mailto:service@movley.com";
    onClose(event);
  };

  return (
    <Menu
      open={!!anchor}
      anchorEl={anchor}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={(event: MouseEvent<Element>) => handleKnowledgeBase(event)}
      >
        Knowledge Base
      </MenuItem>
      <MenuItem
        onClick={(event: MouseEvent<Element>) => handleMailService(event)}
      >
        Contact Support
      </MenuItem>
    </Menu>
  );
};
