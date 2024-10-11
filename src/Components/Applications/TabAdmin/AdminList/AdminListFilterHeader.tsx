import { AddProduct } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFilterToggle } from "@/Redux/Reducers/userSlice/AdminSlice";
import { Filter } from "react-feather";
import {Button} from "reactstrap";
import {setModalCreateUser} from "@/Redux/Reducers/userSlice/UserSlice";

export const AdminListFilterHeader = () => {
  
  const { filterToggle } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const {isOpenModalCreateUser} = useAppSelector((state)=>state.users)

  return (
    <div>
      <div className="light-box" onClick={() => dispatch(setFilterToggle())}>
        <a>
          <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
          <i className={`icon-close filter-close ${filterToggle ? "show" : "hide"}`} />
        </a>
      </div>
      <Button className="btn btn-primary" onClick={()=>dispatch(setModalCreateUser({isOpen: !isOpenModalCreateUser}))}>
        <i className="fa fa-plus" />
        {"Ajouter un utilisateur"}
      </Button>
    </div>

  );
};
