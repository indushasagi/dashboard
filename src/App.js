import './styles/App.scss';
import Login from './components/Login';
import Dashoboard from './components/Dashboard';
import Signup from './components/Signup';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AppContextProvider from './context/AppContext';
import Header from './components/Header';

function App() {
  return (
    <>
      <AppContextProvider>
        <Header />
        <BrowserRouter>
          <Route exact path="/"><Login /></Route>
          <PrivateRoute path="/dashboard"><Dashoboard /></PrivateRoute>
          <Route path="/signup"><Signup /></Route>
        </BrowserRouter>
      </AppContextProvider>
    </>
  );
}

export default App;
