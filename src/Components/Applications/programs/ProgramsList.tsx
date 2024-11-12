import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFilterToggle } from "@/Redux/Reducers/programsSlice/programsSlice";
import { Filter } from "react-feather";
import Link from 'next/link';

export const ProgramsHeader = () => {

    const dispatch = useAppDispatch();
    const {filterToggle } = useAppSelector((state) => state.programs);

    return (
        <div>
            <div className={'light-box'} onClick={()=>dispatch(setFilterToggle())}>
                <a>
                    <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
                    <i className={`icon-close filter-close ${filterToggle ? "show" : "hide"}`} />
                </a>
            </div>
            <Link
                className="btn btn-outline-primary"
                href={'/programs/new'}
            >
                <i className="fa fa-plus" />
                Ajouter un programme
            </Link>
        </div>
    );
};
