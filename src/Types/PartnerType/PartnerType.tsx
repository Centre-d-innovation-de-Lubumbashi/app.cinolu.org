

export interface PartnerType{
    id: string;
    name: string;
    description: string;
    profile: string;
    created_at: string;
    updated_at: string;
}

export interface InitialStatePatnerType {
    partnerData: PartnerType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    filterToggle: boolean;
    error: string | null;
    isOpenModalCreatePartner: boolean;
    isOpenModalEditPartner: boolean;
    isOpenModalDeletePartner: boolean;
    selectedPartner: PartnerType | null;
    navId: number;
    tabId: number;
    formValue: any
}

export interface CreatePartnerType {
    name: string;
    description: string;
    profile: string;
    partnership: string[]
}