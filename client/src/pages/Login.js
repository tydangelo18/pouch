import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../utils/hooks";

function Login(props) {
  // Initial State and Hook
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div title="login" className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
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

        <Button type="submit" secondary>
          Login
        </Button>
      </Form>
    </div>
  );
}

// GraphQL Mutation
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      createdAt
      token
    }
  }
`;

export default Login;
