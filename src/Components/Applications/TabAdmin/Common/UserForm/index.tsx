import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Container, Row, Col, CardHeader } from "reactstrap";
import Body from "@/Components/Applications/TabAdmin/Common/UserForm/Body";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createUser, updateUser, setFormValue } from "@/Redux/Reducers/userSlice/UserSlice";
import { toast, ToastContainer, Flip } from "react-toastify";
import { useRouter } from "next/navigation";

interface UserFormProps {
    mode: "create" | "edit";
    initialData?: any;
}

const UserForm: React.FC<UserFormProps> = ({ mode, initialData }) => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { formValue } = useAppSelector((state) => state.users);

    const handleSubmit = () => {
        if (isFormValid && formValue) {
            try {
                if (mode === "create") {
                    dispatch(createUser(formValue));
                    toast.success("Utilisateur créé avec succès", { autoClose: 5000, transition: Flip, theme: "colored" });
                } else {
                    dispatch(updateUser({ id: initialData.id, ...formValue }));
                    toast.success("Utilisateur modifié avec succès", { autoClose: 5000, transition: Flip, theme: "colored" });
                }
                router.push('/users/admin/list');
            } catch (error) {
                toast.error("Erreur lors de l'opération", { autoClose: 5000, transition: Flip, theme: "colored" });
            }
        }
    };

    // Pré-remplir les champs du formulaire avec initialData
    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach((key) => {
                if (key === "roles" && Array.isArray(initialData.roles)) {
                    // Extraire uniquement les IDs des rôles
                    const roleIds = initialData.roles.map((role: any) => role.id);
                    dispatch(setFormValue({ name: key, value: roleIds }));
                } else if (Object.keys(formValue).includes(key)) {
                    // Ne mettre à jour que les clés existantes dans formValue
                    dispatch(setFormValue({ name: key, value: initialData[key] }));
                }
            });
        }
    }, [initialData, dispatch]);

    // Validation du formulaire
    useEffect(() => {
        const validateForm = () => {
            const isValid =
                formValue?.email &&
                formValue?.first_name &&
                formValue?.last_name &&
                formValue?.name &&
                formValue?.phone_number &&
                formValue?.address &&
                formValue?.roles?.length > 0;
            setIsFormValid(Boolean(isValid));
        };
        validateForm();
    }, [formValue]);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <h4 className={'ms-3'}>
                                {mode === "create" ? "Créer un utilisateur" : "Modifier l'utilisateur"}
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <Body />
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col className={'d-flex justify-content-end'}>
                                    <button
                                        className={'btn btn-outline-primary'}
                                        onClick={handleSubmit}
                                        disabled={!isFormValid}
                                    >
                                        <i className="bi bi-save"></i>
                                        {mode === "create" ? "Créer l'utilisateur" : "Modifier l'utilisateur"}
                                    </button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default UserForm;
