import React, { Component } from 'react';
import MyDrawer from './Components/Views/MyDrawer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Powiadomiena from './Components/Directories/Powiadomienia'
import Numerki from './Components/Directories/Numerki'
import Home from './Components/Directories/Home'
import Users from './Components/Directories/Users';


class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <MyDrawer>

              <Switch>
                <Route path="/glowna" component={Home} />
                <Route path="/powiadomienia" component={Powiadomiena} />
                <Route path="/numerki" component={Numerki} />
                <Route path="/dyzury" render={() => <div>dyzury</div>} />
                <Route path="/users" component={Users} />
              </Switch>
            </MyDrawer>
          </div>
        </BrowserRouter>


      </div>
    );
  }
}

export default App;
