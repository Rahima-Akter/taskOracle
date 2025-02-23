import { useTheme } from './ThemeProvider';
import { CiLight } from 'react-icons/ci';
import { RxMoon } from 'react-icons/rx';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-Red/90 transition duration-300"
        >
            {theme === 'light' ? (
                <RxMoon />
            ) : (
                <CiLight />
            )}
        </button>
    );
};

export default ThemeToggleButton;