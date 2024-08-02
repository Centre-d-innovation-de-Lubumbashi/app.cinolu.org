import React, { useEffect, useState } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateProgram, createProgram, setFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import AddProgramContainer from "./MultiStepForm";
import { toast, Flip } from "react-toastify";

const ModalCreatePrograms = () => {
    const dispatch = useAppDispatch();
    const { isOpenModalCreateProgram, formValue, programStatus } = useAppSelector(state => state.programs);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const validateForm = () => {
            return formValue.name && formValue.description && formValue.start_at && formValue.end_at && formValue.types.length > 0 && formValue.requirements.length > 0;
        };
        setIsFormValid(validateForm());
    }, [formValue]);

    const handleSubmit = async () => {
        if (isFormValid) {
            await dispatch(createProgram(formValue));
            if (programStatus === 'failed') {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du programme"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            } else {
                dispatch(setModalCreateProgram({ isOpen: false }));
            }
        } else {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Veuillez remplir tous les champs obligatoires"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
    };

    console.log(formValue)

    return (
        <Col xs="12">
            <Modal isOpen={isOpenModalCreateProgram} toggle={() => dispatch(setModalCreateProgram({ isOpen: false }))} size="xl">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter un programme"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateProgram({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <AddProgramContainer />
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={() => dispatch(setModalCreateProgram({ isOpen: false }))}>
                        {"Annuler"}
                    </Button>
                    <Button color="primary" onClick={handleSubmit} >
                        {"Créer"}
                    </Button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};

export default ModalCreatePrograms;

