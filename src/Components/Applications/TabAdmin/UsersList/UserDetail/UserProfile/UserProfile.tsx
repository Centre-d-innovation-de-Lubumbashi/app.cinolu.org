import { ImagePath } from "@/Constant";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import { Card, Row, Col, CardHeader, Button,  } from "reactstrap";
import {setModalUpdateCoach} from "@/Redux/Reducers/userSlice/UserSlice";
import {useAppDispatch} from "@/Redux/Hooks";
import {imageBaseUrl} from "@/services/axios";



const UserProfile: React.FC<{user: any}> = ({ user }) => {

    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user) router.push('/users/admin/coachs');
    }, []);


    return (
        <>
            <Row className="mb-4">
                <Col className="d-flex justify-content-end">
                    <Link href="/users/admin/coachs" className='btn btn-outline-primary'>
                        <i className="bi bi-arrow-left"></i> Retour
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className="mx-auto">
                    <Card className="shadow-sm">
                        <CardHeader className="text-center py-5 position-relative bg-gradient shadow-sm rounded-top">
                            <div className="position-relative d-inline-block ">
                                <img
                                    className="rounded-circle border border-3 border-light shadow-lg"
                                    src={user?.profile ? `${imageBaseUrl}/profiles/user.profile` : `${ImagePath}/avtar/avatar.jpg` }
                                    alt="Profile Image"
                                    width="120" height="120"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <h5 className="mt-3 text-uppercase font-weight-bold" style={{ color: '#343a40', letterSpacing: '1px' }}>
                                {user?.name}
                            </h5>
                            <p className="text-muted mb-2">
                                {user?.roles.map((role: any) => role.name).join(', ')}
                            </p>

                            <div className="d-flex justify-content-center mb-3">
                                <span className="border border-light rounded-pill" style={{ width: '40px' }}></span>
                            </div>

                            <Button
                                color="primary" outline className="mt-3 rounded-pill shadow-sm"
                                style={{ padding: '5px 20px' }}
                                onClick={()=>dispatch(setModalUpdateCoach({isOpen: true, user}))}
                            >
                                Modifier le rôle
                            </Button>
                        </CardHeader>

                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default UserProfile;
