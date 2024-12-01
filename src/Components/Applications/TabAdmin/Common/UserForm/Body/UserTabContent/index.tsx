import { Col, TabContent, TabPane } from "reactstrap";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useAppSelector } from "@/Redux/Hooks";

const UserTabContent = () => {

    const {navId} = useAppSelector((state)=> state.users);

    return (
        <>
            <Col xxl="8" xl="8" className="box-col-8 position-relative">
                <TabContent activeTab={navId}>
                    <TabPane tabId={1}>
                        <StepTwo />
                    </TabPane>
                    <TabPane tabId={2}>
                        <StepThree />
                    </TabPane>
                </TabContent>

            </Col>
        </>
    );
}

export default UserTabContent