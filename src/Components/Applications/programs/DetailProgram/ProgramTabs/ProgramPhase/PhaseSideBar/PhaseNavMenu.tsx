import {Badge, Nav, NavItem, NavLink} from "reactstrap";
import React from "react";
import {useAppSelector} from "@/Redux/Hooks";
import {PhasesSidebar} from "@/Data/Application/Phases";
import SVG from "@/CommonComponent/SVG";

interface PhaseNavMenuProps {
    navId: string;
    setNav: (id: string) => void;
}

const PhaseNavMenu: React.FC<PhaseNavMenuProps> = ({navId, setNav}) => {


    return(
        <Nav pills tabs className={'main-menu email-category border-0'}>
            {PhasesSidebar.map((phase, index) => (
                <NavItem key={index}>
                    <NavLink
                        className={navId === phase.id ? "active" : ""}
                        onClick={() => setNav(phase.id)}
                    >
                        <SVG className={`stroke-icon ${phase.color ? `stroke-${phase.color}` : ""}`} iconId={phase.icon} />
                        <div>
                            {phase.title}
                            {phase.badge && <Badge color="danger" pill className="ml-2">3</Badge>}
                        </div>
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    )
}

export default PhaseNavMenu