import Home from './pages/Home';
import Login from './pages/Login';
import './style.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';



function App() {

  const {currentUser} = useContext(AuthContext);
  console.log('curUsAPP==', currentUser);
  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to='/login'/>;
    }
    return children;
  };

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />

        {/* <Route path='/' element={currentUser ? <Home/> : <Login/>} />
        <Route path='/login' element={<Login />} /> */}
      </Routes>
    </BrowserRouter>


  );
}

export default App;
