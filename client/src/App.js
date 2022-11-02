import {BrowserRouter as Router, Routes,Route} from 'react-router-dom' 
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Signup';
import VideoUpload from './pages/VideoUpload';

function App() {
  return (
    <>
    <Router>
      <div className="container">
        
        <Routes>

            <Route exact path='/' element={<Dashboard/>} />


            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path="/uploadVideo" element={<VideoUpload/>}/>

        </Routes>
      </div>   
    </Router>   

  </>
  );
}

export default App;
