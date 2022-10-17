import axios from "axios";
import { FC, useEffect, useState } from "react";

const App: FC = () => {
  const [count, setCount] = useState<{ visitors: number; views: number }>(
    undefined
  );

  const load = async () => {
    if (window.localStorage.getItem("visited") != "yaas") {
      await axios.post(`https://counter.kram.lol/visit`);
      window.localStorage.setItem("visited", "yaas");
    }

    await axios
      .get<{ visitors: number; views: number }>(`https://counter.kram.lol/`)
      .then((r) => setCount(r.data));
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
          {count ? (
            <code>{count.visitors}</code>
          ) : (
            <span className="spinner"></span>
          )}{" "}
          other 👽 have seen this
        </p>
        <p>
          {count ? (
            <code>{count.views}</code>
          ) : (
            <span className="spinner"></span>
          )}{" "}
          👀 in total
        </p>
      </div>
    </div>
  );
};

export default App;
