"use client";
import { useState } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

const Home = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    if (scanData && scanData !== "") {
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);

      try {
        // Request the backend to save the data and return the file
        const response = await axios.post(
          "/api/saveData",
          { data: scanData },
          {
            responseType: "blob", // Ensure the response is treated as a blob (binary data)
          }
        );

        // Create a blob object from the response
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Create a link element, set the download URL and trigger it
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "data.xlsx"); // Name of the file
        document.body.appendChild(link);
        link.click();
        link.remove(); // Remove the link from DOM after download

        console.log("Data saved and file downloaded successfully");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>
      {startScan && (
        <>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "300px" }}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== "" && <p>{data}</p>}
    </div>
  );
};

export default Home;

// "use client";
// import { useState } from "react";
// import QrReader from "react-qr-reader";

// const Home = () => {
//   const [selected, setSelected] = useState("environment");
//   const [startScan, setStartScan] = useState(false);
//   const [loadingScan, setLoadingScan] = useState(false);
//   const [data, setData] = useState("");

//   const handleScan = async (scanData) => {
//     setLoadingScan(true);
//     console.log(`loaded data data`, scanData);
//     if (scanData && scanData !== "") {
//       console.log(`loaded >>>`, scanData);
//       setData(scanData);
//       setStartScan(false);
//       setLoadingScan(false);
//       // setPrecScan(scanData);
//     }
//   };
//   const handleError = (err) => {
//     console.error(err);
//   };
//   return (
//     <div className="App">

//       <button
//         onClick={() => {
//           setStartScan(!startScan);
//         }}
//       >
//         {startScan ? "Stop Scan" : "Start Scan"}
//       </button>
//       {startScan && (
//         <>
//           <select onChange={(e) => setSelected(e.target.value)}>
//             <option value={"environment"}>Back Camera</option>
//             <option value={"user"}>Front Camera</option>
//           </select>
//           <QrReader
//             facingMode={selected}
//             delay={1000}
//             onError={handleError}
//             onScan={handleScan}
//             // chooseDeviceId={()=>selected}
//             style={{ width: "300px" }}
//           />
//         </>
//       )}
//       {loadingScan && <p>Loading</p>}
//       {data !== "" && <p>{data}</p>}
//     </div>
//   );
// };

// export default Home;
