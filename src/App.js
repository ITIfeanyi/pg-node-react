// import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Updatepage from "./components/Updatepage";
import DetailPage from "./components/DetailPage";
import RestaurantContext from "./context/RestaurantContext";

function App() {
  return (
    <RestaurantContext>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/restaurants/:id/update">
              <Updatepage />
            </Route>
            <Route path="/restaurants/:id">
              <DetailPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </RestaurantContext>
  );
}

export default App;
