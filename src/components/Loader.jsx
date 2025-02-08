import { Html } from "@react-three/drei";
import "./loader.css";

function Loader() {
  return (
    <Html>
      <div className="flex justify-center items-center">
        <div class="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Html>
  );
}

export default Loader;
