import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { MyUserContext } from "../../App";



import './Navbar.css';


function Navbar() {
  const [user, dispatch] = useContext(MyUserContext);

  console.log(user);
  const logout = () => {
    dispatch({
      "type": "logout"
    })
  }

  return (
    <header className="custom-header">
      <div className="logo">
      {
           user !== null && user.userRole === 'ROLE_BUSCOMPANY' ? <> <li><a href="#">Quản lý đơn hàng</a></li></> : <>
           <Link to="/home" className="logo-link">
          <img src="/bus-stop.png" alt="Logo" />
          <span className="logo-text">CheapTicket</span>
        </Link>
           </>
        }
      </div>
      <nav className="nav-menu">
        <ul>
          {user === null  ? <>
            <li><Link to="/bus-registration">Đăng ký mở bán vé trên CheapTicket</Link></li>
            <li><Link to="/sign-in"><button className="login-button">Đăng nhập</button></Link></li>
            <li><Link to="/register"><button className="login-button">Đăng ký</button></Link></li>
          </> : <>

            <Link className="nav-link text-danger" to="/">Chào {user.username}!</Link>
            <li><Link to="/chat-window">Chat</Link></li>
            
            <li><button className="login-button" onClick={logout}>Đăng xuất</button></li>
          </>}
        </ul>
      </nav>

    </header>

  );
}

export default Navbar;