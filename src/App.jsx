import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
function App() {
  // now we need conditional rendering 
  // because we are fetching data from server 
  //we can do loading state according to that

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().then(
      (userData)=>{
        if(userData){ 
          dispatch(login({userData}))
        }else{
          dispatch(logout( ))
        }
      }
    ).finally(()=>setLoading(false))
    
  }, []);
 
  return !loading ?(

    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block bg-red-500'>

        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>

  ):null
}

export default App