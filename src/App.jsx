import { Route, Routes } from "react-router-dom";
// styles
import "./App.css";
// components
import SignIn from "./components/auth/SignIn";
import NavigationBar from "./components/navs/NavigationBar";
import SchoolsNav from "./components/navs/SchoolsNav";
import CreateSchoolForm from "./components/forms/CreateSchoolForm";
import OnboardedSchoolsTable from "./components/tables/OnboardedSchoolsTable";
import SchoolDetails from "./components/display_cards/SchoolDetails";
import AgentDashboard from "./components/dashboard";
import RequireAuth from "./components/utilities/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        {" "}
        <Route path="/" element={<SignIn />} />
        <Route element={<RequireAuth />}>
          <Route path="sales" element={<NavigationBar />}>
            <Route index element={<AgentDashboard />} />
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="schools" element={<SchoolsNav homepage={"sales"} />}>
              <Route index element={<OnboardedSchoolsTable />} />
              <Route path="enrol" element={<CreateSchoolForm />} />
              <Route path="view" element={<SchoolDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
