import React from 'react'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const LinkHeader = () => {
  return (
    <Form className="py-3">
      <Form.Group className="entry" as={Row}>
        <Col xs={4}>
          <Form.Text></Form.Text>
        </Col>
        <Col xs={2}>
          <Form.Text>&theta;</Form.Text>
        </Col>
        <Col xs={2}>
          <Form.Text>r</Form.Text>
        </Col>
        <Col xs={2}>
          <Form.Text>d</Form.Text>
        </Col>
        <Col xs={2}>
          <Form.Text>&alpha;</Form.Text>
        </Col>
      </Form.Group>
    </Form>
  )
};

export default LinkHeader;