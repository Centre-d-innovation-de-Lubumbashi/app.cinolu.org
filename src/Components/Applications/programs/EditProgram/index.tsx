import {Card, CardBody, Nav, NavItem, NavLink, Container, Row} from "reactstrap";
import React, {useState} from 'react'
import ProgramEditTabContent from "@/Components/Applications/programs/EditProgram/ProgramEditTabContent";
import BackButton from "@/CommonComponent/BackButton";

const EditProgramTabs = () => {

    const [activeTab, setActiveTab] = useState('1');

    return (
        <Container fluid>
            <BackButton link={'/programs'}/>
            <Row>
                <Card>
                    <CardBody>
                        <Nav tabs className={'border-tab border-0 mb-0 nav-primary'}>
                            <NavItem>
                                <NavItem>
                                    <NavLink href='#' className={`nav-border txt-secondary ${activeTab === "1" ? "active" : ""}`} onClick={() => setActiveTab("1")}>
                                        <i className="icofont icofont-files"></i>
                                        <span>Détail du programme</span>
                                    </NavLink>
                                </NavItem>
                            </NavItem>

                            <NavItem>
                                <NavItem>
                                    <NavLink href='#' className={`nav-border txt-secondary ${activeTab === "2" ? "active" : ""}`}
                                             onClick={() => setActiveTab("2")}>
                                        <i className="fa fa-file-image-o"></i>
                                        <span>Image de couverture</span>
                                    </NavLink>
                                </NavItem>
                            </NavItem>
                        </Nav>
                        <ProgramEditTabContent activeTab={activeTab}/>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    )
}

export default EditProgramTabs;