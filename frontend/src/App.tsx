import { MainPage } from "./pages/MainPage";
import { Login } from "./pages/LoginPage";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);
  return size;
}

function App() {
  const [height, width] = useWindowSize();
  return (
    <>
      height: {height}, width: {width}
      {/* <MainPage /> */}
      <div>
        <div>
          <h1></h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default App;
