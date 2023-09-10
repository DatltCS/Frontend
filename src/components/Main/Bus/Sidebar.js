import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faBriefcase, faPaperPlane,faQuestion,faImage,faCopy} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./Sidebar.css";

import SubMenu from "./Submenu.js";

const Sidebar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Phần mềm quản lý nhà xe</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p>Dashboard</p>
        <SubMenu title="Quản lý" icon={faHome} items={submenus[0]} />
        <NavItem>
          <NavLink tag={Link} to={"/bus-information"}>
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Thông tin nhà xe
          </NavLink>
        </NavItem>
        <SubMenu title="Pages" icon={faCopy} items={submenus[1]} />
        <NavItem>
          <NavLink tag={Link} to={"/pages"}>
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Portfolio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/faq"}>
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            FAQ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/contact"}>
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Contact
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "Quản lý đặt vé",
      target: "bus-order-ticket",
    },
    {
      title: "Quản lý đơn hàng",
      target: "bus-orders",
    },
    {
      title: "Quản lý chuyến xe và tuyến xe",
      target: "bustrips-management",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];

export default Sidebar;
