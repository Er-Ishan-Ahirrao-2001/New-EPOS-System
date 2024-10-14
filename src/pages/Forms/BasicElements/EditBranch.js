import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Container, Card, CardBody } from 'reactstrap';

const EditBranch = () => {
    const { id } = useParams(); // Fetch branch ID from URL params
    const [branchData, setBranchData] = useState({
        branch_name: '',
        branch_address: '',
        email_address: '',
        contact_no: '',
        webpage: ''
    });
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        const fetchBranch = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/branches/${id}`);
                setBranchData(response.data);
            } catch (error) {
                console.error('Error fetching branch data:', error);
            }
        };

        fetchBranch();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBranchData({
            ...branchData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/edit-branch/${id}`, branchData);
            alert('Branch updated successfully');
            navigate(`/branches/${branchData.company_id}`); // Use navigate instead of history.push
        } catch (error) {
            console.error('Error updating branch:', error);
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '500px' }}>
                <CardBody>
                    <h3 className="text-center">Edit Branch</h3>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="branch_name">Branch Name</Label>
                            <Input 
                                type="text" 
                                id="branch_name" 
                                name="branch_name" 
                                value={branchData.branch_name}
                                onChange={handleInputChange} 
                                required 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="branch_address">Branch Address</Label>
                            <Input 
                                type="text" 
                                id="branch_address" 
                                name="branch_address" 
                                value={branchData.branch_address}
                                onChange={handleInputChange} 
                                required 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email_address">Email Address</Label>
                            <Input 
                                type="email" 
                                id="email_address" 
                                name="email_address" 
                                value={branchData.email_address}
                                onChange={handleInputChange} 
                                required 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="contact_no">Contact Number</Label>
                            <Input 
                                type="text" 
                                id="contact_no" 
                                name="contact_no" 
                                value={branchData.contact_no}
                                onChange={handleInputChange} 
                                required 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="webpage">Webpage</Label>
                            <Input 
                                type="text" 
                                id="webpage" 
                                name="webpage" 
                                value={branchData.webpage}
                                onChange={handleInputChange} 
                            />
                        </FormGroup>
                        <Button type="submit" color="primary" className="w-100">Update Branch</Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default EditBranch;
