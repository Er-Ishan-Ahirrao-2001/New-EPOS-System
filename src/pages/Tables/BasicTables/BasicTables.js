import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row, Table, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import UiContent from "../../../Components/Common/UiContent";

const BasicTables = () => {
    document.title = "Company List";

    // State to hold the company data
    const [companies, setCompanies] = useState([]);

    // Fetch data from the API
    useEffect(() => {
        fetch('http://localhost:4000/company')  // Update with your backend URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse JSON
            })
            .then(data => setCompanies(data))  // Update state
            .catch(error => console.error('Error fetching companies:', error));  // Handle errors
    }, []);

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Company Tables" pageTitle="Tables" />
                    <Row>
                        <Col xl={12}>
                            <div className="d-flex justify-content-center mb-3">
                                <Link to="/forms-elements" className="btn btn-primary">
                                    Add Company <b>+</b>
                                </Link>
                            </div>
                            <Card className="mt-4">
                                <PreviewCardHeader title="Company List" />
                                <CardBody className="p-4">
                                    <div className="live-preview">
                                        <div className="table-responsive">
                                            <Table className="align-middle table-nowrap mb-0 table-striped-columns">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th></th>
                                                        <th scope="col">Company Name</th>
                                                        <th scope="col">Logo</th>
                                                        <th scope="col">Registration No</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Contact</th>
                                                        <th scope="col">Website</th>
                                                        <th scope="col">Country</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {companies.map((company) => (
                                                        <tr key={company.id}>
                                                            <td>{company.id}</td>
                                                            <td>
                                                                <Link to={`/branch-reg`} state={{ companyId: company.id }} className="btn btn-primary">
                                                                    Add Branches
                                                                </Link>
                                                            </td>
                                                            <td>{company.company_name}</td>
                                                            <td><img src={company.logo} alt="Logo" style={{ width: '50px', height: '50px' }} /></td>
                                                            <td>{company.company_registration_number}</td>
                                                            <td>{company.company_registered_email}</td>
                                                            <td>{company.company_contact_no}</td>
                                                            <td>
                                                                <a href={company.company_website} target="_blank" rel="noopener noreferrer">{company.company_website}</a>
                                                            </td>
                                                            <td>{company.default_country}</td>
                                                        </tr>
                                                    ))}
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

export default BasicTables;
