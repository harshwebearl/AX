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
          <Route path="projectlist" element={<ProjectList />} />
          <Route path="manage-images/:id" element={<ManageImages />} />
          <Route path="add-subcategory" element={<AddSubCategory />} />
          <Route path="edit-subcategory/:id" element={<EditSubCategory />} />

          <Route path="gallerylist" element={<GalleryList />} />
          <Route path="gallery/:categoryId" element={<GalleryImages />} />
          <Route path="add-gallery" element={<AddGallery />} />
          <Route path="edit-gallery/:id" element={<EditGallery />} />

   {/* PRODUCT ROUTES */}
          <Route path="servicelist" element={<ServiceList />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="edit-service/:id" element={<EditService />} />

        </Route>


      </Routes>