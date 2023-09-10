import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import TicketManagement from "./TicketManagement";
import OrdersManagement from "./OrdersManagement";
import ClientBookTicketForm from "./ClientBookTicketForm";
import BusManagement from "./BusManagement";


const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >

    <Routes>
      <Route  path="/bustrips-management" element={<BusManagement/>}  />
      <Route path="/Pages" component={() => "Pages"} />
      <Route path="/faq" component={() => "FAQ"} />
      <Route path="/contact" component={() => "Contact"} />
      <Route path="/bus-order-ticket" element={<TicketManagement/>} />
      <Route  path="/bus-orders" element={<OrdersManagement/>}  />
      <Route path="/Home-3" component={() => "Home-3"} />
      <Route path="/Page-1" component={() => "Page-1"} />
      <Route path="/Page-2" component={() => "Page-2"} />
      <Route path="/page-1" component={() => "page-1"} />
      <Route path="/page-2" component={() => "page-2"} />
      <Route  path="/page-3" component={() => "page-3"} />
      <Route path="/page-4" component={() => "page-4"} />
      <Route path="/book-ticket-client" element={<ClientBookTicketForm/>} />
    </Routes>
  </Container>
);

export default Content;
