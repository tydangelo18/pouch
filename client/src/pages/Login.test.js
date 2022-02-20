import { render } from "@testing-library/react";

import Login from "./Login";

// Component Test
it("Renders Login Component Correctly", () => {
  // Find certain elements in that component
  const { queryByTitle } = render(<Login />);
  const div = queryByTitle("login");
  // Check if component was rendered
  expect(div).toBeTruthy();
});
