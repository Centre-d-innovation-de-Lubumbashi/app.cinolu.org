import React, {useState} from "react";
import {Button, Col} from "reactstrap";
import PhaseLeftSidebar from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase/PhaseSideBar/PhaseLeftSidebar";
import {PhaseSideBarProps} from "@/Types/Programs/PhasesType";

const PhaseSideBar: React.FC<PhaseSideBarProps> = ({navId, setNavId}) => {

    const [show, setShow] = useState(false);

    return (
        <Col xxl={'3'} xl={'4'} className={'box-col-12'}>
            <div className="md-sidebar">
                <Button color="primary" className="md-sidebar-toggle" >{''}</Button>
                <div className={`md-sidebar-aside job-left-aside custom-scrollbar`}>
                    <PhaseLeftSidebar navId={navId} setNavId={setNavId}/>
                </div>
            </div>
        </Col>
    )
}

export default PhaseSideBar