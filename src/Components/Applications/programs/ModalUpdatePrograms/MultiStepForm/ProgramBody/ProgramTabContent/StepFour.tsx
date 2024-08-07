import React, { useState, useEffect } from 'react';
import { Button, Col, Label, Row, Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setEditFormValue } from '@/Redux/Reducers/programsSlice/programsSlice';
import { RequirementType } from '@/Types/Programs/ProgramsType';

const StepFour: React.FC = () => {
    const dispatch = useAppDispatch();
    const {EditFormValue} = useAppSelector((state) => state.programs);

    const [newRequirement, setNewRequirement] = useState<RequirementType>({ name: '', description: '' });

    const parseRequirements = (requirements: any): RequirementType[] => {
        if (Array.isArray(requirements)) {
            return requirements.map(req => {
                if (typeof req === 'string') {
                    return JSON.parse(req) as RequirementType;
                }
                return req as RequirementType;
            });
        }
        return [];
    };

    const [requirements, setRequirements] = useState<RequirementType[]>(parseRequirements(EditFormValue?.requirements));

    useEffect(() => {
        setRequirements(parseRequirements(EditFormValue?.requirements));
    }, [EditFormValue]);

    const handleAddRequirement = () => {
        if (newRequirement.name && newRequirement.description) {
            const updatedRequirements = [...requirements, newRequirement];
            setRequirements(updatedRequirements);
            dispatch(setEditFormValue({ field: 'requirements', value: JSON.stringify(updatedRequirements) }));
            setNewRequirement({ name: '', description: '' });
        }
    };

    const handleRemoveRequirement = (index: number) => {
        const updatedRequirements = requirements.filter((_, i) => i !== index);
        setRequirements(updatedRequirements);
        dispatch(setEditFormValue({ field: 'requirements', value: JSON.stringify(updatedRequirements) }));
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



