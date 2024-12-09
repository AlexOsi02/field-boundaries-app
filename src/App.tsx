import { FC } from "react";
import { MapWithTools } from "./components/MapWithTools/MapWithTools";
import { Header } from "./components/Header/Header.tsx";
import "./styles/global.scss";

const App: FC = () => {
  return (
    <>
      <Header />
      <MapWithTools />
    </>
  );
};

export default App;
