import axios from "axios";
import { FC, useEffect, useState } from "react";

const App: FC = () => {
  const [count, setCount] = useState(undefined);

  const load = async () => {
    if (window.localStorage.getItem("visited") != "yaas") {
      await axios.post(`https://counter.kram.lol/visit`);
      window.localStorage.setItem("visited", "yaas");
    }

    await axios
      .get<{ count: number }>(`https://counter.kram.lol/`)
      .then((r) => setCount(r.data.count));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Nothing to see here 👻</h1>
        <h2>This site is currently under construction 🚧</h2>

        <div className="space" />

        <p>
          <code>{count ?? "0"}</code> other 👽 have seen this
        </p>
      </div>
    </div>
  );
};

export default App;
