import React, { useState, useEffect } from 'react';
import { Button, Col, Label, Row, Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setFormValue } from '@/Redux/Reducers/programsSlice/programsSlice';
import { Requirement } from '@/Types/Programs/ProgramsType';

const StepFour: React.FC = () => {

    const dispatch = useAppDispatch();
    const formValue = useAppSelector((state) => state.programs.formValue);

    const [newRequirement, setNewRequirement] = useState<Requirement>({ name: '', description: '' });
    const [requirements, setRequirements] = useState<Requirement[]>(formValue?.requirements || []);

    useEffect(() => {
        setRequirements(formValue?.requirements || []);
    }, [formValue]);

    const handleAddRequirement = () => {
        if (newRequirement.name && newRequirement.description) {
            const updatedRequirements = [...requirements, newRequirement];
            setRequirements(updatedRequirements);
            dispatch(setFormValue({ field: 'requirements', value: updatedRequirements }));
            setNewRequirement({ name: '', description: '' });
        }
    };

    const handleRemoveRequirement = (index: number) => {
        const updatedRequirements = requirements.filter((_, i) => i !== index);
        setRequirements(updatedRequirements);
        dispatch(setFormValue({ field: 'requirements', value: updatedRequirements }));
    };

    return (
        <div>
            <h3>Ajouter une exigence</h3>
            <Row>
                <Col md="5">
                    <Label className="mb-2" check>
                        {"Nom de l'exigence"}
                    </Label>
                    <input
                        className="form-control mb-2"
                        name="requirementName"
                        type="text"
                        placeholder="Nom de l'exigence"
                        value={newRequirement.name}
                        onChange={(e) => setNewRequirement({ ...newRequirement, name: e.target.value })}
                    />
                </Col>
                <Col md="5">
                    <Label className="mb-2" check>
                        {"Description de l'exigence"}
                    </Label>
                    <input
                        className="form-control mb-2"
                        name="requirementDescription"
                        type="text"
                        placeholder="Description de l'exigence"
                        value={newRequirement.description}
                        onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                    />
                </Col>
                <Col md="2">
                    <Button color="secondary" onClick={handleAddRequirement} className="mt-4">
                        {"Ajouter"}
                    </Button>
                </Col>
            </Row>
            <Table striped className="mt-3">
                <thead>
                <tr>
                    <th>Nom de l'exigence</th>
                    <th>Description de l'exigence</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {requirements.map((req, index) => (
                    <tr key={index}>
                        <td>{req.name}</td>
                        <td>{req.description}</td>
                        <td>
                            <Button color="danger" size="sm" onClick={() => handleRemoveRequirement(index)}>
                                {"Supprimer"}
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default StepFour;

