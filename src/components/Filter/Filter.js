import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";

import { connect } from "react-redux";

import "./Filter.css";

class Filter extends Component {
  render() {
    console.log(this.props.language);
    return this.props.language === "EN" ? (
      <div>
        <Row className="filter-container">
          <Col xs={3}>
            <Button
              className="filter-button"
              onClick={() => this.props.selectFilter("All")}
            >
              All
            </Button>
          </Col>
          <Col xs={3}>
            <Button
              className="filter-button"
              onClick={() => this.props.selectFilter("Completed")}
              variant="success"
            >
              Completed
            </Button>
          </Col>
          <Col xs={3}>
            <Button
              className="filter-button"
              onClick={() => this.props.selectFilter("Not Completed")}
              variant="danger"
            >
              Uncompleted
            </Button>
          </Col>
        </Row>
      </div>
    ) : (
      <div>
        <Row className="filter-container">
          <Col xs={3}>
            <Button
              className="filter-button"
              onClick={() => this.props.selectFilter("Not Completed")}
              variant="danger"
            >
              غير مكتمله
            </Button>
          </Col>
          <Col xs={3}>
            <Button
              className="filter-button"
              onClick={() => this.props.selectFilter("Completed")}
              variant="success"
            >
              مكتمله
            </Button>
          </Col>

          <Col xs={3}>
            <Button
              className="filter-button"
              onClick={() => this.props.selectFilter("All")}
            >
              الكل
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectFilter: status =>
      dispatch({
        type: "SELECT_FILTER",
        payload: status
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
