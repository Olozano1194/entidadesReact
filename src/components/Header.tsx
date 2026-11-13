//Components
import NavHeader from "./headerNav/NavHeader";

const Header = () => {
    return (
        <header className=" md:h-[10vh] bg-white/90 border-b border-slate-200 backdrop-blur-md flex font-medium items-center justify-end h-[7vh] p-8 shadow-sm  sticky top-0 w-full z-40">
            <NavHeader />
        </header>
    );

};
export default Header;