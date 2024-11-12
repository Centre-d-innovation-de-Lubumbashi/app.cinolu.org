import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFilterToggle } from "@/Redux/Reducers/userSlice/UserSlice";
import { Filter } from "react-feather";
import Link from 'next/link';
import React from "react";
import AddButton from "@/CommonComponent/AddButton";

export const AdminListFilterHeader = () => {
  
  const { filterToggle } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const handleFilterToggle = () => {
    dispatch(setFilterToggle());
  }

  return (
    <div>
      <div className="light-box" onClick={handleFilterToggle}>
        <a>
          <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
          <i className={`icon-close filter-close ${filterToggle ? "show" : "hide"}`} />
        </a>
      </div>
        <AddButton link={'/users/admin/add_user'} name={'Créer un utilisateur'} />
    </div>

  );
};
