import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Home} from './Pages/Home';
import {NotFound404} from "./Pages/Messages/NotFound404";
import {LoggedOut} from "./Pages/Messages/LoggedOut";
import {Login} from "./Pages/Login";
import './App.css';
import './input.css';
import DataProvider from "./GlobalState/DataProvider";
import {TailwindUi} from "./Pages/Experiments/TailwindUi";
import {OrderReceived} from "./Pages/Messages/OrderReceived";

function App() {

    const setupGlobalData = () => {
        return {
            userData: null
        };
    };

    return (
        <DataProvider value={setupGlobalData()}>
            <div className="App h-screen w-screen">

                <Router>
                    <Routes>
                        <Route path="/" exact element={<Home menuItemSelected={1} />}/>
                        <Route path="/orderreceived" element={<OrderReceived />}/>
                        <Route path="/experiment" element={<TailwindUi/>} />
                        <Route path="/checkout" element={<Home menuItemSelected={2} />} />
                        <Route path="/terms" element={<Home menuItemSelected={5}/>} />
                        <Route path="/loggedout" element={<LoggedOut/>} />
                        <Route path="/login" element={<Login/>} />
                        {/*<Route path="/login/:q" element={<Login/>} />*/}
                        <Route path="*" element={<NotFound404/>} />
                    </Routes>
                </Router>

            </div>
        </DataProvider>
    );
}

export default App;
