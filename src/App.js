import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Projects from './Pages/Projects';
import Gallery from './Pages/Gallery';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop ';
import Services from './Pages/Services';

import AdminDashboard from './admin/AdminDashboard';
import ProjectList from './admin/projects/ProjectList';
import AdminLayout from './admin/AdminLayout';
import GalleryList from './admin/gallery/GalleryList';
import AddGallery from './admin/gallery/AddGallery';
import EditGallery from './admin/gallery/EditGallery';
import Login from './admin/Login';
import ManageImages from './admin/projects/ManageImages';
import AddSubCategory from './admin/projects/AddSubCategory';
import EditSubCategory from './admin/projects/EditSubCategory';
import GalleryImages from './admin/gallery/GalleryImages';


function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<Home />} />


        <Route path="login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>

          {/* DEFAULT ADMIN PAGE */}
          <Route index element={<AdminDashboard />} />


          {/* PRODUCT ROUTES */}
          <Route path="ProjectList" element={<ProjectList />} />
          <Route path="manage-images/:id" element={<ManageImages />} />
          <Route path="add-subcategory" element={<AddSubCategory />} />
          <Route path="edit-subcategory/:id" element={<EditSubCategory />} />

          <Route path="gallerylist" element={<GalleryList />} />
          <Route path="/admin/gallery/:categoryId" element={<GalleryImages />} />
          <Route path="add-gallery" element={<AddGallery />} />
          <Route path="edit-gallery/:id" element={<EditGallery />} />

        </Route>


      </Routes>
      <Footer />
    </>
  );
}

export default App;
