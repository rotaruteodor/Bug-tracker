import './App.css';
import { LoginPage } from './components/LoginPage';
import { AllProjectsPage } from './components/AllProjectsPage';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SeeProjectDetails, seeProjectDetails } from './components/SeeProjectDetails';



function App() {

  return (
    <div className="AppDiv">

      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/allProjects" element={<AllProjectsPage/>} />
          <Route exact path="/allProjects/currentSelectedProject" element={<SeeProjectDetails/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

