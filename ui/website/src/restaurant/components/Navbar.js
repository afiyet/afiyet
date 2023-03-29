import { Link } from "react-router-dom"

import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="navbar-container">
          <nav className="navbar">
            <h1>AFİYET</h1>
            <div className="links">
              <Link to="/edit-menu">Menü Düzenleme</Link>
              <Link to="/generate-qr">QR Üretme</Link>
              <Link to="/add-table">Masa Ekleme</Link>
            </div>
          </nav>
        </div>      
    );
  }
   
  export default Navbar;