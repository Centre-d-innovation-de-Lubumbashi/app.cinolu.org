export interface UserType {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    name: string;
    password: string;
    phone_number: string;
    address: string;
    google_image: string;
    profile: string;
    verified_at: string;
    created_at: string;
    updated_at: string;
    roles: any [];
}

export interface StaffMemberType extends UserType{}

export interface CoachsType extends  UserType{}

export interface InitialStateUserType {
    usersData: UserType[];
    coachsData: CoachsType[];
    staffMemberData: StaffMemberType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filterToggle: boolean;
    error: string | null;
    isOpenModalCreateUser: boolean;
    isOpenModalEditUser: boolean;
    isOpenModalDeleteUser: boolean;
    selectedUser: UserType | null;
    navId: number;
    tabId: number;
    formValue: any;
}

export interface CreateUserType {
    email: string;
    first_name?: string;
    last_name?: string;
    name: string;
    password: string;
    phone_number: string;
    address: string;
    roles: string[];
}

export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}

export interface UsersListTableColumnType extends UserType {}

