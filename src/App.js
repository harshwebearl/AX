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
import RequireAuth from './admin/RequireAuth';
import GalleryList from './admin/gallery/GalleryList';
import AddGallery from './admin/gallery/AddGallery';
import EditGallery from './admin/gallery/EditGallery';
import Login from './admin/Login';
import ManageImages from './admin/projects/ManageImages';
import AddSubCategory from './admin/projects/AddSubCategory';
import EditSubCategory from './admin/projects/EditSubCategory';
import GalleryImages from './admin/gallery/GalleryImages';
import ServiceList from './admin/services/ServiceList';
import AddService from './admin/services/AddService';
import EditService from './admin/services/EditService';
import EditVideo from './admin/gallery/EditVideo';



function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>

          <Route index element={<AdminDashboard />} />

          {/* PROJECT ROUTES */}
          <Route path="projectlist" element={<ProjectList />} />
          <Route path="manage-images/:id" element={<ManageImages />} />
          <Route path="add-subcategory" element={<AddSubCategory />} />
          <Route path="edit-subcategory/:id" element={<EditSubCategory />} />

          {/* GALLERY ROUTES */}
          <Route path="gallerylist" element={<GalleryList />} />
          <Route path="gallery/:categoryId" element={<GalleryImages />} />
          <Route path="add-gallery" element={<AddGallery />} />
          <Route path="edit-gallery/:id" element={<EditGallery />} />
          <Route path="edit-video/:id" element={<EditVideo />} />
          {/* SERVICE ROUTES */}
          <Route path="servicelist" element={<ServiceList />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="edit-service/:id" element={<EditService />} />

          {/* CATEGORIES ROUTES */}
          {/* <Route path="categories" element={<CategoriesList />} />
          <Route path="add-categories" element={<Addcategories />} />
          <Route path="edit-categories/:id" element={<Editcategories />} /> */}

        </Route>


        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
