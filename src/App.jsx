import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import UserDetails from './components/UserDetails'
import NotFound from './components/NotFound'

const App = () =>(

  <BrowserRouter>
   <Routes>
    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="referrals/:id" element={<ProtectedRoute><UserDetails/></ProtectedRoute>}/>
    <Route path="*" element={<NotFound/>}/>
   </Routes>

  </BrowserRouter>
)


export default App