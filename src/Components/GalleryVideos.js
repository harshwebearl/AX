import React from "react";
import { motion } from "framer-motion";

export default function GalleryVideos() {
  const videos = [
    {
      id: 1,
      title: "Luxury Villa Walkthrough",
      youtubeId: "m8la0UGly3Q",
    },
    {
      id: 2,
      title: "Modern Interior Design",
      youtubeId: "XbsGeheuuV0",
    },
    {
      id: 3,
      title: "Luxury Villa Walkthrough",
      youtubeId: "m8la0UGly3Q",
    },
    {
      id: 4,
      title: "Modern Interior Design",
      youtubeId: "XbsGeheuuV0",
    },
    {
      id: 5,
      title: "Luxury Villa Walkthrough",
      youtubeId: "m8la0UGly3Q",
    },
    {
      id: 6,
      title: "Modern Interior Design",
      youtubeId: "XbsGeheuuV0",
    },
  ];

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
