import { ImagePath, Send } from '@/Constant';
import { NotificationPropsType} from "@/Types/Notifications/NotificationType";
import React, { LegacyRef} from "react";
import { ChevronDown} from "react-feather";
import { Button} from "reactstrap";
import InboxOption from './InboxOption';
import UserFooter from './UserFooter';
import UserNotificationBody from './UserNotificationBody';
import { useAppSelector } from '@/Redux/Hooks';
import FormInterview from './FormInterview';

const InterviewNotificationBody = React.forwardRef(({handlerPrintData}:NotificationPropsType, ref:LegacyRef<HTMLDivElement> | undefined) => {

    const { selectedUser } = useAppSelector(state=>state.notifications);


    return (
        <div ref={ref} >
            <div className="mail-body-wrapper">
                <div className="user-mail-wrapper">
                    <div className="user-title">
                        <div>
                            <div className="rounded-border">
                                <img className="img-fluid" src={`${ImagePath}/user/20.jpg`} alt="user"/>
                            </div>
                            <div className="dropdown-subtitle">
                                <p>{selectedUser?.name}</p>
                            </div>
                        </div>
                    </div>
                    <FormInterview/>
                    <div className="send-btn">
                        <Button color="primary">{Send}<i className="fa fa-paper-plane" /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
});

export default InterviewNotificationBody