import React, {useCallback, useState} from "react";
import {Container} from "reactstrap";
import UserProfile from './UserProfile/UserProfile';
import {useAppSelector} from "@/Redux/Hooks";
import UserProfilTabContent from "@/Components/Applications/TabAdmin/UsersList/UserDetail/UserProfilContext";
import UpdateCoachModal from "@/Components/Applications/TabAdmin/UsersList/UserDetail/UpdateCoachModal";


const UserDetailContainer = () => {

    const [activeTab, setActiveTab] = useState(1);
    const {selectedCoach} = useAppSelector(state=>state.users)
    const callback = useCallback((tab: number) => {
        setActiveTab(tab);
    }, []);


    return (
        <Container fluid>
            <div className="user-profile social-app-profile">
                <UserProfile callback={callback} user={selectedCoach}/>
                <UserProfilTabContent basicTab={activeTab}  user={selectedCoach}/>
                <UpdateCoachModal/>
            </div>
        </Container>
    );
}

export default UserDetailContainer