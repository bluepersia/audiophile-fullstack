import type { JSX } from "react/jsx-runtime";
import "./App.scss";

function App(): JSX.Element {
  return (
    <div className="container">
      <h1 className="h1">Hello World</h1>
      <p className="overline">Some lorem ipsum text</p>
    </div>
  );
}

export default App;
