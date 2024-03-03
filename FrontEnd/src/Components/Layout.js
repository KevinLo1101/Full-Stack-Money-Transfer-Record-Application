import { Outlet, Link } from "react-router-dom";
import "./CSS/Layout.css"

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="Choice">
          <li className="Choice">
            <Link to="/">Transaction History</Link>
          </li>
          <li className="Choice">
            <Link to="/AddressPage">Address</Link>
          </li>
          <li className="Choice">
            <Link to="/Transfer">Transfer</Link>
          </li>
          <li className="Choice">
            <Link to="/MyWallet">My Wallet</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;