import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';

//import Components
import UpgradeAccountNotise from './UpgradeAccountNotise';
import UsersByDevice from './UsersByDevice';
import Widget from './Widget';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import AudiencesMetrics from './AudiencesMetrics';
import AudiencesSessions from './AudiencesSessions';
import LiveUsers from './LiveUsers';
import TopReferrals from './TopReferrals';
import TopPages from './TopPages';


const DashboardAnalytics = () => {
    document.title="USER Dashboard";

    const [user,setUser] = useState("");
    
    useEffect(()=>{
      const user = sessionStorage.getItem("getSession");    
      if (!user) {
        return null;
      } else {
        setUser(JSON.parse(user));
        console.log(JSON.parse(user));
        }
      },[])
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={user.username} pageTitle="Dashboards" />
                    <Row>
                        <Col xxl={5}>
                            <UpgradeAccountNotise />
                            <Widget />
                        </Col>
                        <LiveUsers />
                    </Row>
                    <Row>
                        <AudiencesMetrics />
                        <AudiencesSessions />
                    </Row>
                    <Row>
                        <UsersByDevice />
                        <TopReferrals />
                        <TopPages />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DashboardAnalytics;