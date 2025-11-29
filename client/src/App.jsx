import "./App.css"

// component Imports
import Navbar from "./components/Navbar"
import UploadSection from "./components/UploadSection";


export default function App() {
  return (
    <div className="flex flex-col bg-[#0A0A0A] text-[#EDEDED] font-Questrial">
      <Navbar />
      <UploadSection />
    </div>
  );
}