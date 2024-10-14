import React, { useState } from 'react';
import { Card, CardBody, Col, Container, Row, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import BranchesTable from '../../Tables/BasicTables/BranchesTable';

const BranchesRegistration = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { companyId } = location.state || {};

    const [formData, setFormData] = useState({
        company_id: companyId || '',
        branch_name: '',
        branch_address: '',
        email_address: '',
        contact_no: '',
        doc_path: '',
        webpage: '',
        branch_type: '',
        verified: '',
        status: false,
    });

    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? e.target.files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.branch_name || !formData.branch_address || !formData.email_address) {
            alert('Please fill all required fields.');
            return;
        }

        const data = new FormData();
        data.append('company_id', formData.company_id);
        data.append('branch_name', formData.branch_name);
        data.append('branch_address', formData.branch_address);
        data.append('email_address', formData.email_address);
        data.append('contact_no', formData.contact_no);
        data.append('doc_path', formData.doc_path);
        data.append('webpage', formData.webpage);
        data.append('branch_type', formData.branch_type);
        data.append('verified', formData.verified || '');
        data.append('status', formData.status ? '1' : '0');

        try {
            const response = await axios.post('http://localhost:4000/register-branch', data);
            if (response.data?.message) {
                alert(response.data.message);
                navigate('/branch-table');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            alert(errorMessage);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody className="card-body">
                                    <h5 className="mb-3">Company ID: {formData.company_id}</h5>
                                    <form onSubmit={handleSubmit}>
                                        <Row className="gy-4">
                                            <Col xxl={4} md={6}>
                                                <Label htmlFor="nameInput" className="form-label">Branch Name</Label>
                                                <Input name='branch_name' type="text" className="form-control" id="nameInput" value={formData.branch_name} onChange={handleInputChange} required />
                                            </Col>
                                            <Col xxl={4} md={6}>
                                                <Label htmlFor="addressInput" className="form-label">Branch Address</Label>
                                                <Input name='branch_address' type="text" className="form-control" id="addressInput" value={formData.branch_address} onChange={handleInputChange} required />
                                            </Col>
                                            <Col xxl={4} md={6}>
                                                <Label htmlFor="emailInput" className="form-label">Branch Email</Label>
                                                <Input name='email_address' type="email" className="form-control" id="emailInput" value={formData.email_address} onChange={handleInputChange} required />
                                            </Col>
                                            <Col xxl={4} md={6}>
                                                <Label htmlFor="contactInput" className="form-label">Branch Contact No</Label>
                                                <Input name='contact_no' type="text" className="form-control" id="contactInput" value={formData.contact_no} onChange={handleInputChange} required />
                                            </Col>
                                            <Col xxl={4} md={6}>
                                                <Label htmlFor="docPathInput" className="form-label">Document</Label>
                                                <Input name='doc_path' type="file" className="form-control" id="docPathInput" onChange={handleInputChange} />
                                            </Col>
                                            <Col xxl={4} md={6}>
                                                <Label htmlFor="webpageInput" className="form-label">Webpage</Label>
                                                <Input name='webpage' type="text" className="form-control" id="webpageInput" value={formData.webpage} onChange={handleInputChange} required />
                                            </Col>
                                            <Col xxl={4} md={6}>
                                                <Label htmlFor="branchTypeInput" className="form-label">Branch Type</Label>
                                                <Input name='branch_type' type="text" className="form-control" id="branchTypeInput" value={formData.branch_type} onChange={handleInputChange} required />
                                            </Col>
                                            <Col xxl={4} md={6}>
                                                <Label htmlFor="verifiedInput" className="form-label">Verified</Label>
                                                <Input name='verified' type="text" className="form-control" id="verifiedInput" value={formData.verified} onChange={handleInputChange} />
                                            </Col>
                                            <Col xxl={4} md={6}>
                                                <Label htmlFor="statusInput" className="form-label">Status</Label>
                                                <Input name='status' type="checkbox" className="form-check-input" id="statusInput" checked={formData.status} onChange={handleInputChange} />
                                            </Col>
                                            <Col xxl={12}>
                                                <Button type="submit" color="primary">Submit</Button>
                                            </Col>
                                        </Row>
                                    </form>
                                    <BranchesTable companyId={formData.company_id} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BranchesRegistration;
