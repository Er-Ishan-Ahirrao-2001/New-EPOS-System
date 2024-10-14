import React, { useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BasicElements = () => {
    document.title = "Company Registration";

    const [formData, setFormData] = useState({
        company_name: '',
        company_registration_number: '',
        company_registered_address: '',
        company_registered_email: '',
        company_contact_no: '',
        company_website: '',
        company_slogan: '',
        default_currency: '',
        default_country: '',
        phone_code: '',
        default_currency_symbol: '',
        currency_short_code: '',
        default_language: '',
        status: false,
        auth_token: '',
        tokenstatus: ''
    });

    const [logo, setLogo] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (logo) data.append('logo', logo);

        try {
            const response = await axios.post('http://localhost:4000/register-company', data);
            const successMessage = response?.data?.message || response?.message;
            if (successMessage) {
                alert(successMessage);
                navigate('/tables-basic');
            } else {
                console.error('Unexpected response format:', response);
                alert('An unexpected error occurred during registration.');
            }
        } catch (error) {
            console.error('Error details:', error);
            if (error.response) {
                console.error('Server Error:', error.response.data);
                alert(error.response.data.message || 'Registration failed due to a server error.');
            } else if (error.request) {
                console.error('No response received:', error.request);
                alert('No response from the server. Please try again later.');
            } else {
                console.error('Error in request setup:', error.message);
                alert('Registration failed. Please try again.');
            }
        }
    };

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={'Add New Company'} pageTitle="Forms" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Company Details" />
                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <form onSubmit={handleSubmit}>
                                            <Row className="gy-4">
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="nameInput" className="form-label">Registered Company Name</Label>
                                                        <Input name='company_name' type="text" className="form-control" id="nameInput" value={formData.company_name} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="logoInput" className="form-label">Company Logo</Label>
                                                        <Input name='logo' type="file" className="form-control" id="logoInput" onChange={handleLogoChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="sloganInput" className="form-label">Company Registration Number</Label>
                                                        <Input name='company_registration_number' type="text" className="form-control" id="sloganInput" value={formData.company_registration_number} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="regNumberInput" className="form-label">Company Registered Address</Label>
                                                        <Input name='company_registered_address' type="text" className="form-control" id="regNumberInput" value={formData.company_registered_address} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="addressInput" className="form-label">Company Registered Email</Label>
                                                        <Input name='company_registered_email' type="email" className="form-control" id="addressInput" value={formData.company_registered_email} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="mailInput" className="form-label">Contact No</Label>
                                                        <Input name='company_contact_no' type="text" className="form-control" id="mailInput" value={formData.company_contact_no} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="contactInput" className="form-label">Company Website</Label>
                                                        <Input name='company_website' type="text" className="form-control" id="contactInput" value={formData.company_website} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="websiteInput" className="form-label">Company Slogan</Label>
                                                        <Input name='company_slogan' type="text" className="form-control" id="websiteInput" value={formData.company_slogan} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="currencyInput" className="form-label">Company Currency</Label>
                                                        <Input name='default_currency' type="text" className="form-control" id="currencyInput" value={formData.default_currency} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="countryInput" className="form-label">Company Country</Label>
                                                        <Input name='default_country' type="text" className="form-control" id="countryInput" value={formData.default_country} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="phoneCodeInput" className="form-label">Phone Code</Label>
                                                        <Input name='phone_code' type="text" className="form-control" id="phoneCodeInput" value={formData.phone_code} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="currencySymbolInput" className="form-label">Currency Symbol</Label>
                                                        <Input name='default_currency_symbol' type="text" className="form-control" id="currencySymbolInput" value={formData.default_currency_symbol} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="currencyShortCodeInput" className="form-label">Currency Short Code</Label>
                                                        <Input name='currency_short_code' type="text" className="form-control" id="currencyShortCodeInput" value={formData.currency_short_code} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="languageInput" className="form-label">Company Language</Label>
                                                        <Input name='default_language' type="text" className="form-control" id="languageInput" value={formData.default_language} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="authTokenInput" className="form-label">Auth Token</Label>
                                                        <Input name='auth_token' type="text" className="form-control" id="authTokenInput" value={formData.auth_token} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor="statusInput" className="form-label">Status</Label>
                                                        <Input name='status' type="checkbox" className="form-check-input" id="statusInput" checked={formData.status} onChange={handleInputChange} />
                                                    </div>
                                                </Col>
                                                <Col lg={12}>
                                                    <div className="hstack gap-2 justify-content-end">
                                                        <Button type="submit" color="primary">Submit</Button>
                                                        <Button type="reset" color="light">Reset</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </form>
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

export default BasicElements;
