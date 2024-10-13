import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavigationPage from './bean/NavigationPage';


const GamePage = lazy(() => import('./pages/game_page'))
const HistoryPage = lazy(() => import('./pages/history_page'))

function App() {

  const [currentPage, setCurrentPage] = useState(NavigationPage.Home)

  const navigator = useNavigate()

  useEffect(() => {
    navigator(currentPage.path)
  }, [currentPage])

  return (
    <div className="App">
      <div>
        <NavigationBar 
          currentPage={currentPage}
          changePage={setCurrentPage}/>
          <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path={NavigationPage.Home.path} element={<GamePage />}/>
                <Route path={NavigationPage.History.path} element={<HistoryPage />}/>
              </Routes>
          </Suspense>
      </div>
    </div>
  );
}

export default App;
