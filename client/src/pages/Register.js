import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

function Register(props) {
  // Initial State and Hook
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Form Methods
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result);
      console.log(props);
    },
    variables: values,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div title="register" className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={onChange}
          type="text"
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={onChange}
          type="password"
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          type="password"
        />
        <Button type="submit" secondary>
          Register
        </Button>
      </Form>
    </div>
  );
}

// GraphQL Mutation
const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      createdAt
      token
    }
  }
`;

export default Register;
