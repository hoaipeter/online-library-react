import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './pages/sign-up/Signup';
import Login from './pages/sign-in/Login';
import Logout from './pages/sign-out/Logout';
import Library from './pages/library/Library';
import AdminDashboard from './pages/admin/admin-dashboard/AdminDashboard';
import UserDashboard from './pages/user/user-dashboard/UserDashboard';
import IssuedBooks from './pages/issued-book/IssuedBooks';
import BookDetails from './pages/book/book-details/BookDetails';
import UserBooks from './pages/user/user-books/UserBooks';
import AdminBooks from './pages/admin/admin-books/AdminBooks';
import BookSection from './pages/book/book-section/BookSection';
import UserSection from './pages/user/user-section/UserSection';
import EditUser from './pages/edit-user/EditUser';
import NotFound from './pages/not-found/NotFound';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/library">
            <Library />
          </Route>

          <Route path="/logout">
            <Logout />
          </Route>

          <Route path="/admin-dashboard">
            <AdminDashboard />
          </Route>

          <Route path="/user-dashboard">
            <UserDashboard />
          </Route>

          <Route path="/issued-books">
            <IssuedBooks />
          </Route>

          <Route path="/user-books">
            <UserBooks />
          </Route>

          <Route path="/admin-books">
            <AdminBooks />
          </Route>

          <Route path="/books/:id">
            <BookDetails />
          </Route>

          <Route path="/book-section">
            <BookSection />
          </Route>

          <Route path="/user-section">
            <UserSection />
          </Route>

          <Route path="/edit-user/:id">
            <EditUser />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
