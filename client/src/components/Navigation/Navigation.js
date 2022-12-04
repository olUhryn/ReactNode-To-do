import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css'
import { Link } from "react-router-dom";

function Navigation(props) {
  const { routes } = props
  return (
    <div className="navigation-root w-100 d-flex align-items-center">
      <Container className="h-100">
        <Row className="h-100">
          {routes.map(link =>
            link.displayOnNav && <Col key={link.name + 'NavLink'} className="navigation-link">
              <Link to={link.path} className="h-100 w-100 text-bold text-decoration-none d-flex justify-content-center align-items-center">{link.name}</Link>
            </Col>)}
        </Row>
      </Container>
    </div>
  );
}

export default Navigation;
