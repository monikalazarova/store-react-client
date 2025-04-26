import { Link } from 'react-router-dom';
import "../styles/Navbar.css"

function Navbar() {
    return (
        <nav className="navbar">
            <div className='app-name'>
                <h1>Store App</h1>
            </div>
            <div className="links">
                <Link to="/">Home</Link>
            </div>     
        </nav>
    );
}

export default Navbar;