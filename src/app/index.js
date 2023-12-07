import {useCallback, useContext, useEffect, useState} from 'react';
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import HomePage from "../pages/HomePage/index.js"
import {Route, Routes} from 'react-router-dom'
import AboutPage from '../pages/AboutPage/index.js';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {



  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about/:id' element={<AboutPage/>}/>
    </Routes>
  );
}

export default App;
