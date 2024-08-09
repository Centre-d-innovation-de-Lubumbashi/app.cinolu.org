import { Col, Form, Input, Label, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setEditFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";

const StepTwo = () => {

    const { EditFormValue } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEditFormValue({ field: 'start_at', value: e.target.value }));
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEditFormValue({ field: 'end_at', value: e.target.value }));
    };

    return (
        <div className="sidebar-body">
            <Form>
                <Row className="g-2">
                    <Col xs="12">
                        <Label className="m-0" check>{"Date de début"} <span className="txt-danger"> *</span></Label>
                    </Col>
                    <Col xs="12">
                        <div className="custom-input">
                            <Input
                                className={EditFormValue?.start_at !== "" ? "valid" : "is-invalid"}
                                type="date"
                                required
                                name="start_at"
                                value={EditFormValue?.start_at || ""}
                                onChange={handleStartDateChange}
                            />
                        </div>
                    </Col>
                    <Col xs="12">
                        <Label className="m-0" check>{"Date de fin"} <span className="txt-danger"> *</span></Label>
                    </Col>
                    <Col xs="12">
                        <div className="custom-input">
                            <Input
                                className={EditFormValue?.end_at !== "" ? "valid" : "is-invalid"}
                                type="date"
                                required
                                name="end_at"
                                value={EditFormValue?.end_at || ""}
                                onChange={handleEndDateChange}
                            />
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default StepTwo;
