import { Row } from "reactstrap";

import ProgramLeftSidebar from "./ProgramLeftSideBar";
import ProgramTabContent from "./ProgramTabContent";


const ProgramBody = () => {
    return (
        <Row className="g-xl-5 g-3">
            <ProgramLeftSidebar />
            <ProgramTabContent />
        </Row>
    );
};

export default ProgramBody;