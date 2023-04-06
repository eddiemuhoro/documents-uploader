import logo from './logo.svg';
import './App.css';
import Post from './components/fileUploads/post/PostPowerpoint';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/nav/Nav';
import './App.css'
import DisplayPowerpoint from './components/Posts/DisplayPowerpoint';
import Single from './components/Posts/Single';
import FileDisplay from './components/display/FileDisplay';
import PostWord from './components/fileUploads/post/PostWord';
import DisplayWord from './components/Posts/DisplayWord';
import SingleWord from './components/Posts/SingleWord';
import Home from './components/HOME/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/pptx" element={<Post />} />
      <Route path='posts/pptx' element={<DisplayPowerpoint />} />
      <Route path='posts/word' element={<DisplayWord />} />
      <Route path='word' element={<PostWord /> } />
      <Route path='test' element={<FileDisplay />} />
      <Route path='display/pptx/:id' element={<Single />} />
      <Route path='display/word/:id' element={<SingleWord />} />
      </Routes>
    
    </div>
  );
}

export default App;
