import { useEffect, useState } from "react";
import axios from "axios";

const ImgGen = ({ setPicture }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    console.log("Input Changed", inputText);
  };

  const generateImage = () => {
    setPicture("");
    getPicture();
  };

  const getPicture = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("inputs", inputText);
      const data = params.toString();

      const config = {
        method: "post",
        url: "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
        responseType: "blob",
      };

      const response = await axios(config);
      const url = URL.createObjectURL(response.data);

      setPicture(url);
      setError(false);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Input Text:", inputText);
  }, [inputText]);

  return (
    <>
      <div className="flex gap-8 justify-center items-center relative">
        {/* <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          className="btn w-1/4 border border-black border-r"
        /> */}
        {/* <button onClick={generateImage} className="btn btn-success">
          Generate
        </button> */}
        <input type="search" 
               value={inputText}
               onChange={handleInputChange} 
               className = " w-1/3 block p-4 pl-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               placeholder="Write a Prompt..." 
        />
            <button type="submit" onClick={generateImage} className=  " text-white  bottom-2.5  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Generate!
            </button>
      </div>
      <div className="flex justify-center h-12 items-center">
        {loading && (
          <span className="loading loading-spinner loading-lg"></span>
        )}
        {error && (
          <p className="text-red-500 text-xl text-center font-bold py-4">
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default ImgGen;