
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-18 md:pt-22 ">
    
      {/* Hero Section */}
      <section  className="flex flex-col items-center justify-center text-center py-24 bg-[#2C4953] text-white">
        <h2 className="text-4xl font-bold mb-4 ">You Dream, We Design</h2>
        <p className="max-w-xl text-lg mb-8 ">
          Creating timeless spaces through architecture, interior design, and civil work.
        </p>
        <a
          href="#contact"
          className="bg-white text-[#2C4953] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Get in Touch
        </a>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-16">
        <h3 className="text-3xl font-semibold text-center text-[#2C4953] mb-8">About Us</h3>
        <p className="text-center max-w-3xl mx-auto text-gray-700 leading-relaxed">
          At AAxiero Design Studio, we blend creativity with functionality to deliver innovative architectural and interior design solutions.
          Our team is passionate about turning your dream spaces into reality — from concept to completion.
        </p>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-16">
        <h3 className="text-3xl font-semibold text-center text-[#2C4953] mb-12">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg p-6 rounded-2xl text-center">
            <h4 className="text-xl font-semibold mb-3 text-[#2C4953]">Architecture Design</h4>
            <p>Creative and sustainable architectural solutions for residential and commercial projects.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-2xl text-center">
            <h4 className="text-xl font-semibold mb-3 text-[#2C4953]">Interior Design</h4>
            <p>Transforming interiors into beautiful, functional, and inspiring spaces tailored to you.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-2xl text-center">
            <h4 className="text-xl font-semibold mb-3 text-[#2C4953]">Civil Work</h4>
            <p>Reliable construction and project execution ensuring quality and durability.</p>
          </div>
        </div>
      </section>

     

      
    </div>
  );
}
