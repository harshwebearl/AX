import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BASEURL } from "../BASEURL";

export default function GalleryVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${BASEURL}/videos`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data.videos || data); // Assuming the API returns { videos: [...] } or directly the array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-[#f7f9f9]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xl text-[#2C4953]">Loading videos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-[#f7f9f9]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xl text-[#2C4953]">Error loading videos: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#f7f9f9]">
      {/* Title */}
      <h2 className="text-center text-5xl md:text-6xl font-[Vollkorn] text-[#2C4953] font-bold mb-12">
        Project <span className="text-[#6b8c9a]">Videos</span>
      </h2>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* YouTube Embed */}
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Title */}
            <div className="p-4 text-center">
              <h3 className="font-[Vollkorn] text-[#2C4953] text-xl font-semibold">
                {video.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
