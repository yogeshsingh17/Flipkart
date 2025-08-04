import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";


const Navbar = () => {

    const { cartItems } = useCart();

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">
            <Link to="/">Flipkart Clone</Link>
        </h1>
        <div className="flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/cart">
                Cart
                {cartItems.length > 0 && (
                    <span className="ml-1 bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                    {cartItems.length}
                    </span>
                )}
            </Link>
        </div>
        </nav>
    );
};

export default Navbar;