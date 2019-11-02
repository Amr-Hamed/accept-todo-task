import React, { Component } from "react";
import Logo from "../../assets/images/logo.png";
import "./Home.css";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Spring } from "react-spring/renderprops";

class Home extends Component {
  state = {
    todos: this.props.todos,
    status: "All",
    newTodo: {
      id: "",
      name: "",
      description: "",
      completed: false,
      createdAt: ""
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      if (nextProps.filteredTodos.length > 0) {
        this.setState({
          todos: nextProps.filteredTodos
        });
      } else {
        this.setState({
          todos: nextProps.todos
        });
      }
    }
  }

  //search todos
  filterTodos = async e => {
    this.props.filterTodos(e.target.value);
    if (e.target.value) {
      const x = await setTimeout(() => {}, 100);
      if (this.props.filteredTodos.length > 0) {
        this.setState({
          todos: this.props.filteredTodos
        });
      } else {
        this.setState({
          todos: []
        });
      }
    } else {
      this.setState({
        todos: this.props.todos
      });
    }
  };

  //input add todo
  inputTodo = (field, e) => {
    let newTodo = this.state.newTodo;
    newTodo[field] = e.target.value;
    this.setState({
      newTodo
    });
  };

  //add todo
  addTodo = e => {
    e.preventDefault();
    let today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      dateTime = date + " " + time,
      newTodo = this.state.newTodo;
    newTodo.id = Math.random();
    newTodo.createdAt = dateTime;
    this.props.addTodo(newTodo);
    this.setState({
      newTodo: {
        id: "",
        name: "",
        description: "",
        completed: false,
        createdAt: ""
      }
    });
    axios
      .post("http://demo8354958.mockable.io/accept-todo-task/add-todo", newTodo)
      .then(
        response => {
          if (response.status === 200) {
            console.log("New Todo Request sent succesfully!");
          }
        },
        error => {
          console.log(`Error : ${error}`);
        }
      );
  };

  render() {
    let displayedTodos = [];
    if (this.state.todos.length > 0 && this.props.language === "EN") {
      displayedTodos = this.state.todos.map((todo, index) => {
        return (
          <Container key={todo.id}>
            <Row>
              {todo.completed ? (
                <Spring
                  from={{ opacity: 0, transition: "opacity .5s ease" }}
                  to={{ opacity: 1, transition: "opacity .5s ease" }}
                  leave={{ opacity: 0, transition: "opacity 2s ease" }}
                  config={{ duration: 500 }}
                >
                  {props => (
                    <Col xs={12} className="todo completed" style={props}>
                      <Form.Control
                        type="checkbox"
                        onChange={() => this.props.changeCompletedStatus(index)}
                        checked={todo.completed}
                        className="todo-checkbox"
                      />

                      <Link
                        to="/todo"
                        onClick={() => this.props.selectTodo(index)}
                        className="todo-data"
                        style={props}
                      >
                        <h3>{todo.name}</h3>
                        <p>{todo.description}</p>
                        <p>{todo.createdAt}</p>
                      </Link>
                      <button onClick={() => this.props.removeTodo(index)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </Col>
                  )}
                </Spring>
              ) : (
                <Spring
                  from={{ opacity: 0, transition: "opacity .5s ease" }}
                  to={{ opacity: 1, transition: "opacity .5s ease" }}
                  leave={{ opacity: 0, transition: "opacity 2s ease" }}
                  config={{ duration: 500 }}
                >
                  {props => (
                    <Col xs={12} className="todo unCompleted" style={props}>
                      <Form.Control
                        type="checkbox"
                        onChange={() => this.props.changeCompletedStatus(index)}
                        checked={todo.completed}
                        className="todo-checkbox"
                      />
                      <Link
                        to="/todo"
                        onClick={() => this.props.selectTodo(index)}
                        className="todo-data"
                      >
                        <h3>{todo.name}</h3>
                        <p>{todo.description}</p>
                        <p>{todo.createdAt}</p>
                      </Link>
                      <button onClick={() => this.props.removeTodo(index)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </Col>
                  )}
                </Spring>
              )}
            </Row>
          </Container>
        );
      });
    } else if (this.state.todos.length > 0 && this.props.language === "ع") {
      displayedTodos = this.state.todos.map((todo, index) => {
        return (
          <Container key={todo.id}>
            <Row>
              {todo.completed ? (
                <Spring
                  config={{ duration: 500 }}
                  from={{ opacity: 0, transition: "opacity .5s ease" }}
                  to={{ opacity: 1, transition: "opacity .5s ease" }}
                  leave={{ opacity: 0, transition: "opacity 2s ease" }}
                >
                  {props => (
                    <Col xs={12} className="todo completed" style={props}>
                      <button onClick={() => this.props.removeTodo(index)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                      <Link
                        to="/todo"
                        onClick={() => this.props.selectTodo(index)}
                        className="todo-data"
                        style={props}
                      >
                        <h3 style={{ textAlign: "right" }}>{todo.name}</h3>
                        <p style={{ textAlign: "right" }}>{todo.description}</p>
                        <p style={{ textAlign: "right" }}>{todo.createdAt}</p>
                      </Link>
                      <Form.Control
                        type="checkbox"
                        onChange={() => this.props.changeCompletedStatus(index)}
                        checked={todo.completed}
                        className="todo-checkbox"
                      />
                    </Col>
                  )}
                </Spring>
              ) : (
                <Spring
                  from={{ opacity: 0, transition: "opacity .5s ease" }}
                  to={{ opacity: 1, transition: "opacity .5s ease" }}
                  leave={{ opacity: 0, transition: "opacity 2s ease" }}
                  config={{ duration: 500 }}
                >
                  {props => (
                    <Col xs={12} className="todo unCompleted" style={props}>
                      <button onClick={() => this.props.removeTodo(index)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                      <Link
                        to="/todo"
                        onClick={() => this.props.selectTodo(index)}
                        className="todo-data"
                      >
                        <h3 style={{ textAlign: "right" }}>{todo.name}</h3>
                        <p style={{ textAlign: "right" }}>{todo.description}</p>
                        <p style={{ textAlign: "right" }}>{todo.createdAt}</p>
                      </Link>
                      <Form.Control
                        type="checkbox"
                        onChange={() => this.props.changeCompletedStatus(index)}
                        checked={todo.completed}
                        className="todo-checkbox"
                      />
                    </Col>
                  )}
                </Spring>
              )}
            </Row>
          </Container>
        );
      });
    }

    return this.props.language === "EN" ? (
      <div className="home">
        <Row className="header">
          <Col xs={4}>
            <img src={Logo} className="header-logo" />
          </Col>
          <Col xs={4} className="header-title">
            Todo App
          </Col>
          <Col xs={4} className="header-language">
            {this.props.language === "ع" ? (
              <button
                className="language-button active"
                onClick={() => this.props.changeLanguage("ع")}
              >
                ع
              </button>
            ) : (
              <button
                className="language-button"
                onClick={() => this.props.changeLanguage("ع")}
              >
                ع
              </button>
            )}
            {this.props.language === "EN" ? (
              <button
                className="language-button active"
                onClick={() => this.props.changeLanguage("EN")}
              >
                EN
              </button>
            ) : (
              <button
                className="language-button"
                onClick={() => this.props.changeLanguage("EN")}
              >
                EN
              </button>
            )}
          </Col>
        </Row>

        <div className="search-filter">
          <Row className="search-container">
            <Col xs={5}>
              <Row>
                <Col xs={12}>
                  <Form.Control
                    type="text"
                    onChange={this.filterTodos}
                    value={this.state.filterText}
                    placeholder="Search Todos"
                    className="search-bar"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p className="search-hint">
                    By Name like : 'feed the dog'<br></br>or by creation time
                    like : '2019-11-1 20:29:33'
                  </p>
                </Col>
              </Row>
            </Col>
            <Col xs={7}></Col>
          </Row>
        </div>
        <Container>
          <Row className="add-todo-container">
            <Col xs={4} className="add-todo-item">
              <Form.Control
                onChange={e => this.inputTodo("name", e)}
                value={this.state.newTodo.name}
                placeholder="Todo"
              />
            </Col>
            <Col xs={4} className="add-todo-item">
              <Form.Control
                onChange={e => this.inputTodo("description", e)}
                value={this.state.newTodo.description}
                placeholder="description"
              />
            </Col>
            <Col xs={4} className="add-todo-item">
              <Button
                variant="primary"
                type="submit"
                onClick={e => this.addTodo(e)}
              >
                Add Todo
              </Button>
            </Col>
          </Row>
        </Container>

        <div className="todos">
          <h2 className="my-todos-title">My Todos</h2>
          {displayedTodos}
        </div>
      </div>
    ) : (
      <div className="home">
        <Row className="header">
          <Col xs={4} className="header-language">
            {this.props.language === "ع" ? (
              <button
                className="language-button active"
                onClick={() => this.props.changeLanguage("ع")}
              >
                ع
              </button>
            ) : (
              <button
                className="language-button"
                onClick={() => this.props.changeLanguage("ع")}
              >
                ع
              </button>
            )}
            {this.props.language === "EN" ? (
              <button
                className="language-button active"
                onClick={() => this.props.changeLanguage("EN")}
              >
                EN
              </button>
            ) : (
              <button
                className="language-button"
                onClick={() => this.props.changeLanguage("EN")}
              >
                EN
              </button>
            )}
          </Col>
          <Col xs={4} className="header-title">
            مهام اليوم
          </Col>
          <Col xs={4}>
            <img src={Logo} className="header-logo" />
          </Col>
        </Row>

        <div className="search-filter">
          <Row className="search-container">
            <Col xs={7}></Col>
            <Col xs={5}>
              <Row>
                <Col xs={12}>
                  <Form.Control
                    type="text"
                    onChange={this.filterTodos}
                    value={this.state.filterText}
                    placeholder="ابحت"
                    className="search-bar"
                    style={{ textAlign: "right" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p className="search-hint" style={{ textAlign: "right" }}>
                    البحث بالاسم : "اطعم الكلب" <br></br>
                    او البحث بالتاريخ : '2019-11-1 20:29:33'
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Container>
          <Row className="add-todo-container">
            <Col xs={4} className="add-todo-item">
              <Button
                variant="primary"
                type="submit"
                onClick={e => this.addTodo(e)}
              >
                أضف مهمة
              </Button>
            </Col>

            <Col xs={4} className="add-todo-item">
              <Form.Control
                onChange={e => this.inputTodo("description", e)}
                value={this.state.newTodo.description}
                placeholder="الوصف"
                style={{ textAlign: "right" }}
              />
            </Col>

            <Col xs={4} className="add-todo-item">
              <Form.Control
                onChange={e => this.inputTodo("name", e)}
                value={this.state.newTodo.name}
                placeholder="المهمة"
                style={{ textAlign: "right" }}
              />
            </Col>
          </Row>
        </Container>

        <div className="todos">
          <h2 className="my-todos-title" style={{ textAlign: "right" }}>
            مهامي
          </h2>
          {displayedTodos}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    todos: store.todos,
    filteredTodos: store.filteredTodos,
    language: store.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: language =>
      dispatch({
        type: "CHANGE_LANGUAGE",
        payload: language
      }),
    addTodo: newTodo =>
      dispatch({
        type: "ADD_TODO",
        payload: newTodo
      }),
    removeTodo: index =>
      dispatch({
        type: "REMOVE_TODO",
        payload: index
      }),
    selectTodo: index =>
      dispatch({
        type: "SELECT_TODO",
        payload: index
      }),
    changeCompletedStatus: index =>
      dispatch({
        type: "CHANGE_COMPLETED_STATUS",
        payload: index
      }),
    filterTodos: filter =>
      dispatch({
        type: "FILTER_TODOS",
        payload: filter
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
