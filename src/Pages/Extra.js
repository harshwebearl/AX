 <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden bg-[url(/images/project/6.jpg)] bg-cover bg-center">
        {/* Animated Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index]}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[index]})` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{
              duration: 1.9,
              ease: [0.77, 0, 0.175, 1], // smooth "spread" feel
            }}
            transformOrigin="center"
          />
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            key={index + "-heading"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-7xl font-bold font-[Vollkorn] tracking-wide drop-shadow-md"
          >
            Building Dreams, <br /> Designing Reality
          </motion.h1>
          <motion.p
            key={index + "-para"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide"
          >
            We design refined spaces with precision and creativity, blending function and form to create elegant, innovative environments.
          </motion.p>

          <Link
            to="/projects"
            className="inline-block bg-white text-[#2C4953] mt-10 px-8 py-3 rounded-full font-semibold tracking-wider uppercase hover:bg-[#2C4953] hover:text-white transition duration-300"
          >
            Explore Projects
          </Link>

        </div>
        {/* Decorative Line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-white opacity-50"></div>
      </section>