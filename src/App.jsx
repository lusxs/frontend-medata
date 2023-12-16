import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Loading from "./components/common/loading/Loading";
import Statistics from "./pages/admin/Statistics";
import Account from "./pages/admin/account/Account";
import DetailAccount from "./pages/admin/account/DetailAccount";
import Purposes from "./pages/admin/Purposes";
import Report from "./pages/admin/Report";
import Visitors from "./pages/visitor/Visitors";
import VisitorsCompleted from "./pages/visitor/VisitorsCompleted";
import VisitorsCanceled from "./pages/visitor/VisitorsCanceled";
import DetailVisitor from "./pages/visitor/DetailVisitor";
import VisitorsNotCompleted from "./pages/visitor/VisitorsNotCompleted";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Form = lazy(() => import("./pages/Form"));
const DashboardSecretary = lazy(() =>
  import("./pages/secretary/DashboardSecretary")
);
const DashboardDivision = lazy(() =>
  import("./pages/division/DashboardDivision")
);

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Form />
              </Suspense>
            }
          /> */}
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Form />
              </Suspense>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          {/* Admin */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/statistics"
            element={
              <Suspense fallback={<Loading />}>
                <Statistics />
              </Suspense>
            }
          />
          <Route
            path="/users"
            element={
              <Suspense fallback={<Loading />}>
                <Account />
              </Suspense>
            }
          />
          <Route
            path="/user/detail/:id"
            element={
              <Suspense fallback={<Loading />}>
                <DetailAccount />
              </Suspense>
            }
          />
          <Route
            path="/purposes"
            element={
              <Suspense fallback={<Loading />}>
                <Purposes />
              </Suspense>
            }
          />
          <Route
            path="/visitors/all"
            element={
              <Suspense fallback={<Loading />}>
                <Visitors />
              </Suspense>
            }
          />
          <Route
            path="/visitors/not-completed"
            element={
              <Suspense fallback={<Loading />}>
                <VisitorsNotCompleted />
              </Suspense>
            }
          />
          <Route
            path="/visitors/canceled"
            element={
              <Suspense fallback={<Loading />}>
                <VisitorsCanceled />
              </Suspense>
            }
          />
          <Route
            path="/visitors/completed"
            element={
              <Suspense fallback={<Loading />}>
                <VisitorsCompleted />
              </Suspense>
            }
          />
          <Route
            path="/visitor/detail/:id"
            element={
              <Suspense fallback={<Loading />}>
                <DetailVisitor />
              </Suspense>
            }
          />
          <Route
            path="/report"
            element={
              <Suspense fallback={<Loading />}>
                <Report />
              </Suspense>
            }
          />
          {/* Secretary */}
          <Route
            path="/secretary/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <DashboardSecretary />
              </Suspense>
            }
          />
          {/* Division */}
          <Route
            path="/division/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <DashboardDivision />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
