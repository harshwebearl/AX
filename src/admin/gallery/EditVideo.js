import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASEURL } from "../../BASEURL";

export default function EditVideo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");

  /* 🔹 Fetch video data from API */
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`${BASEURL}/admin/videos/${id}`);
        if (!res.ok) {
          console.error("Failed to fetch video");
          return;
        }
        const data = await res.json();
        const video = data.video || data;
        setTitle(video.title || "");
        setYoutubeId(video.youtubeId || "");
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };
    if (id) fetchVideo();
  }, [id]);

  /* SAVE HANDLER */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedVideo = {
      title,
      youtubeId,
    };

    try {
      const res = await fetch(`${BASEURL}/admin/videos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVideo),
      });
      if (!res.ok) {
        console.error("Failed to update video");
        return;
      }
      console.log("Video updated successfully");
      navigate("/admin/gallerylist");
    } catch (err) {
      console.error("Error updating video:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-['Vollkorn'] font-bold text-[#2C4953]">
          Edit Video
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="text-[#2C4953] text-2xl"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#2C4953]/30 rounded-xl shadow-md p-6 space-y-6"
      >

        {/* VIDEO TITLE */}
        <div>
          <label className="block text-[#2C4953] font-['Vollkorn'] mb-2">
            Video Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#2C4953]"
          />
        </div>

        {/* YOUTUBE ID */}
        <div>
          <label className="block text-[#2C4953] font-['Vollkorn'] mb-2">
            YouTube Video ID
          </label>
          <input
            type="text"
            value={youtubeId}
            onChange={(e) => setYoutubeId(e.target.value)}
            required
            placeholder="Example: dQw4w9WgXcQ"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#2C4953]"
          />
        </div>

        {/* VIDEO PREVIEW */}
        {youtubeId && (
          <div>
            <p className="mb-2 font-['Vollkorn'] text-[#2C4953]">
              Preview
            </p>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              className="w-full aspect-video rounded-xl border"
              allowFullScreen
              title="Video Preview"
            ></iframe>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-[#2C4953] text-[#2C4953] rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-[#2C4953] text-white rounded-lg hover:bg-[#476772] transition"
          >
            Update Video
          </button>
        </div>

      </form>
    </div>
  );
}
