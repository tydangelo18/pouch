import { render } from "@testing-library/react";

import Register from "./Register";

// Component Test
it("Renders Register Component Correctly", () => {
  // Find certain elements in that component
  const { queryByTitle } = render(<Register />);
  const div = queryByTitle("register");
  // Check if component was rendered
  expect(div).toBeTruthy();
});
