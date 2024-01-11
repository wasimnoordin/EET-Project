import './App.css';
import Login from './login.js';
import CapgeminiName from './CapgeminiName';


function App() {
  return (
    <>
      <div className="CapApp">
        <header className="header">
          <CapgeminiName
            src="./CapgeminiName.png"
            alt="Capgemini Name"
              />
            <Login />
          </header>
      </div>
    </>
  );
}

export default App;