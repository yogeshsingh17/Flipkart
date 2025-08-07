import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";


const Navbar = () => {

    const { cartItems } = useCart();

    return (
        <nav className="flex items-center justify-between p-4 border-b shadow bg-base-100 text-base-content">
            {/* Logo */}
            <h1 className="text-xl font-bold">
                <Link to="/">
                    <img 
                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" 
                        width="160" 
                        height="40" 
                        title="Flipkart"
                    >
                    </img>
                </Link>
            </h1>
            <div className="flex items-center gap-4">
                {/* Cart logo */}
                <div>
                    <Link to="/cart">
                        <span className="flex items-center">
                            <img 
                                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg" 
                                alt="Cart" 
                                class="_1XmrCc" 
                                width="28" 
                                height="28"
                                // className="bg-base-100 text-base-content"
                            />
                            <span className="relative right-4 bottom-3">
                                {cartItems.length > 0 && (
                                    <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-400 border border-white rounded-full">
                                        {cartItems.length}
                                    </span>
                                )}
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;