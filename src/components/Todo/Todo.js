import React, { Component } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { connect } from "react-redux";

class Todo extends Component {
  state = {
    todo: this.props.selectedTodo
  };

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        todo: nextProps.selectedTodo
      });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h3>Todo: {this.state.todo.name}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Description: {this.state.todo.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Creation time: {this.state.todo.createdAt}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>completed: {this.state.todo.completed.toString()}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedTodo: state.selectedTodo
  };
};

export default connect(mapStateToProps)(Todo);

