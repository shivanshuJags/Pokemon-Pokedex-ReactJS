import { useRef, useState } from "react";
import PokemonTable from "./components/PokemonTable";
import "./styles.css";

export default function App() {
  const limit = useRef(null);
  const [apiLimit, setAPILimit] = useState(0);
  const limitHandler = (e) => {
    setAPILimit(limit.current.value);
  };
  return (
    <div className="App">
      <h1>Hello Pokemon Wikipedia</h1>
      <input placeholder="Enter Limit" ref={limit} />
      <button onClick={limitHandler}>Search</button>

      {apiLimit > 0 && <PokemonTable limit={apiLimit} />}
    </div>
  );
}
