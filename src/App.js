import React, { Component } from 'react';
import MyDrawer from './Components/Views/MyDrawer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Powiadomiena from './Components/Directories/Powiadomienia'
import Numerki from './Components/Directories/Numerki'
import Home from './Components/Directories/Home'
import Users from './Components/Directories/Users';
// import background from './Files/images/image1.jpg'
import Particles from 'react-particles-js'
import particlesParams from './Files/json/particlesBG'

class App extends Component {

  render() {
    return (
      <div>

        {/* <section style={styles.bgCanvas}>
          <Particles
            params={particlesParams}
            style={{
              margin: "auto",
              position: "fixed"
              //  background: "rgba(255, 255, 255, 0)"
            }}
          /> */}
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

        {/* </section> */}

      </div>
    );
  }
}
const styles = {
  bgCanvas: {
    background: "linear-gradient(180deg, rgba(0,15,36,1) 0%, rgba(9,54,121,1) 90%, rgba(16,40,172,1) 100%)",
    minHeight: "100vh",
    height: "100%",
    width: "100%",
  },
}
export default App;
