import { useState } from "react";
import "./App.css";
import ImgGen from "./Img-gen";

function App() {
  const [picture, setPicture] = useState("");
  return (
    <div className="App">
      <div className="font-bold text-4xl uppercase  text-cyan-50 justify-center flex mb-8 py-4 bg-gradient-to-r from-teal-400 to-yellow-200">
        AI-Image Generator
      </div>
      <ImgGen 
        setPicture={setPicture}
      />
      <div className="h-[50vh] flex justify-center items-center mt-8">
        <img src={picture} alt="" className="h-full rounded-md" />
      </div>
    </div>
  );
}

export default App;