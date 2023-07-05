import { NavLink } from "react-router-dom";
import { navigation } from "@/lib";
import { PrimaryOutlineButton } from "@/components";
import { ReactComponent as LogoutIcon } from "@/assets/images/svg/logout.svg";
import { useToken } from "@/hooks";
import { AuthContext } from "@/context";
import { useContext } from "react";

export function Navigation() {
    const { setAuthentication } = useContext(AuthContext);
    const { removeTokens } = useToken();

    function handleLogoutClick(): void {
        removeTokens();
        setAuthentication({ isAuthenticated: false });
    }

    return (
        <nav className="flex h-[calc(100vh-5rem)] w-[16.5rem] flex-col justify-between border-r border-sgray-500">
            <div>
                {navigation.map(x => {
                    return (
                        <NavLink
                            key={x.id}
                            to={x.path}
                            className={({ isActive }) =>
                                `mx-3 mb-1 flex rounded-md p-3 text-sblue-900 transition-colors duration-500 ease-in-out first:mt-3 hover:bg-sgray-300  ${
                                    isActive
                                        ? "bg-syellow-500 font-medium text-sblue-900 hover:bg-syellow-500"
                                        : "group bg-transparent font-normal text-sgray-700 [&>svg]:opacity-60"
                                }`
                            }
                        >
                            <x.icon className="transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
                            <span className="ml-3 ">{x.name}</span>
                        </NavLink>
                    );
                })}
            </div>

            <div className="mx-3 p-3">
                <PrimaryOutlineButton text="Log out" icon={<LogoutIcon />} onClick={handleLogoutClick} />
            </div>
        </nav>
    );
}
