// BranchesTable.js
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import UiContent from "../../../Components/Common/UiContent";

const BranchesTable = ({ companyId }) => {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch(`http://localhost:4000/branches?company_id=${companyId}`);
                const data = await response.json();
                setBranches(data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        if (companyId) {
            fetchBranches();
        }
    }, [companyId]);

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody className="card-body">
                                    <BreadCrumb pageTitle="Branches Table" />
                                    <h5 className="mb-4">List of Branches for Company ID: {companyId}</h5>
                                    <div className="live-preview">
                                        <div className="table-responsive table-card">
                                            <Table className="table align-middle table-nowrap table-striped-columns mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">Branch Name</th>
                                                        <th scope="col">Branch Address</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Contact No</th>
                                                        <th scope="col">Webpage</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {branches.length > 0 ? (
                                                        branches.map(branch => (
                                                            <tr key={branch.id}>
                                                                <td>{branch.branch_name}</td>
                                                                <td>{branch.branch_address}</td>
                                                                <td>{branch.email_address}</td>
                                                                <td>{branch.contact_no}</td>
                                                                <td>
                                                                    <a href={branch.webpage} target="_blank" rel="noopener noreferrer">{branch.webpage}</a>
                                                                </td>
                                                                <td>
                                                                    <td>
                                                                        <Link to={`/edit-branch/${branch.id}`} className="btn btn-primary mt-2">Edit</Link>
                                                                    </td>

                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="7" className="text-center">No branches found for this company.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BranchesTable;
