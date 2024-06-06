import React, { useContext } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/Store/auth-context';




function App() {
  const ctx = useContext(AuthContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const isUserLoggedIn = localStorage.getItem('isLoggedIn');

  //   if(isUserLoggedIn === '1'){
  //     setIsLoggedIn(true);
  //   }
  // }, [])

  // const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    // setIsLoggedIn(true);
  //   localStorage.setItem('isLoggedIn','1');
  // };

  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem('isLoggedIn');
  // };



  return (
    <>
      <React.Fragment>
        <MainHeader />
        <main>
          {!ctx.isLoggedIn && <Login />}
          {ctx.isLoggedIn && <Home />}
        </main>
      </React.Fragment >
    </>  
  );
}

export default App;
