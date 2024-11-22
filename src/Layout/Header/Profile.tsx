import { Href, Logout, ImagePath } from "@/Constant";
import { useEffect, useState } from "react";
import { UserProfileData } from "@/Data/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "react-feather";
import { selectAuth, logout, loadUserFromStorage } from "@/Redux/Reducers/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { imageBaseUrl } from "@/services/axios";
import { AppDispatch } from "@/Redux/Store";

export const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user, isAuthenticated } = useSelector(selectAuth);

    const [localUser, setLocalUser] = useState(user);

    useEffect(() => {
        const storedUser = localStorage.getItem("user_profile");
        if (storedUser) {
            setLocalUser(JSON.parse(storedUser));
        } else if (isAuthenticated && user) {
            localStorage.setItem("user_profile", JSON.stringify(user));
            setLocalUser(user);
        }
    }, [user, isAuthenticated]);

    const LogOutUser = async () => {
        await dispatch(logout());
        localStorage.removeItem("user_profile");
        router.push(process.env.NEXT_PUBLIC_HOST_CLIENT as string);
    };

    useEffect(() => {
        dispatch(loadUserFromStorage());
    }, [dispatch]);

    return (
        <li className="profile-nav onhover-dropdown px-0 py-0">
            <div className="d-flex profile-media align-items-center">
                <img
                    className="profile-img"
                    src={
                        localUser?.profile
                            ? `${imageBaseUrl}/profiles/${localUser.profile}`
                            : `${ImagePath}/avtar/avatar.jpg`
                    }
                    alt="profile utilisateur"
                />
                <div className="flex-grow-1">
                    <span>{localUser ? localUser.name : "Utilisateur"}</span>
                    <p className="mb-0 font-outfit">
                        {localUser?.roles && Array.isArray(localUser.roles) ? (
                            localUser.roles.map((role, index) => (
                                <span key={index} className=" me-1">{role}</span>
                            ))
                        ) : (
                            <span>Aucun rôle</span>
                        )}
                        <i className="ms-2 fa fa-angle-down"></i>
                    </p>
                </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
                {UserProfileData.map((item, index) => (
                    <li key={index}>
                        <Link href={`/${item.link}`}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
                <li onClick={LogOutUser}>
                    <Link href={Href} scroll={false}>
                        <LogOut />
                        <span>{Logout}</span>
                    </Link>
                </li>
            </ul>
        </li>
    );
};

export default Profile;


