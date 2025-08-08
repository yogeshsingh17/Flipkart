import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

const ThemeToggle = () => {

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme])

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }, [])

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    }

    return (
        <>
            <button 
                onClick={toggleTheme}
            >
                {theme === 
                    "light" ? 
                        <FaMoon className="text-xl" />
                        : 
                        <IoSunnyOutline className="text-xl" />
                }
            </button>
        </>
    )
}

export default ThemeToggle;