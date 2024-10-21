import {useEffect, useState} from "react";
import { Col, Form, Label, Row, InputGroup, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setEditFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import Calendar from "react-calendar";
// @ts-ignore
import { Value } from 'react-calendar/dist/cjs/shared/types';

const StepTwo = () => {

    const { EditFormValue, selectedProgram } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();

    const [startDate, setStartDate] = useState<Date | null>(EditFormValue?.start_at ? new Date(EditFormValue.start_at) : null);
    const [endDate, setEndDate] = useState<Date | null>(EditFormValue?.end_at ? new Date(EditFormValue.end_at) : null);

    useEffect(() => {
        if(selectedProgram){
            if(selectedProgram.start_at){
                setStartDate(new Date(selectedProgram.start_at));
            }
            if(selectedProgram.end_at){
                setEndDate(new Date(selectedProgram.end_at))
            }
        }
    }, [selectedProgram]);

    const handleStartDateChange = (value: Value) => {
        if (value instanceof Date) {
            setStartDate(value);
            dispatch(setEditFormValue({ field: 'start_at', value: value.toISOString().split("T")[0] }));
        }
    };

    const handleEndDateChange = (value: Value) => {
        if (value instanceof Date) {
            setEndDate(value);
            dispatch(setEditFormValue({ field: 'end_at', value: value.toISOString().split("T")[0] }));
        }
    };

    return (
        <div className="sidebar-body">
            <Form>
                <Row className="g-2">
                    <Col xs="12">
                        <Label className="m-0" check>Date de début <span className="txt-danger"> *</span></Label>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody className="card-wrapper">
                                <InputGroup className="main-inline-calender">
                                    <Calendar
                                        onChange={handleStartDateChange}
                                        value={startDate}
                                        className="w-100"
                                    />
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12">
                        <Label className="m-0" check>Date de fin <span className="txt-danger"> *</span></Label>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody className="card-wrapper">
                                <InputGroup className="main-inline-calender">
                                    <Calendar
                                        onChange={handleEndDateChange}
                                        value={endDate}
                                        className="w-100"
                                    />
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default StepTwo;
