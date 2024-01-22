/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DropdownWithSearch from './components/DropdownWithSearch';
//import SearchableDropdown from './components/SearchPopup';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<TaskForm />} />
          <Route
          path="/popup"
          element={<DropdownWithSearch options={options} />}
        />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;