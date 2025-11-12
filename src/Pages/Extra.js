 {/* --- Image Previews --- */}
        {/* Top Left */}
        <div className="absolute top-20 left-10 flex flex-col gap-6 z-10">
          {[images[0]].map((img, i) => (
            <div
              key={i}
              className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-500  ${currentBg === img ? "border-white scale-110" : "border-transparent hover:scale-105"
                }`}
              onClick={() => setCurrentBg(img)}
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              }}
            >
              <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover shadow-2xl " />
              {currentBg === img && <div className="absolute inset-0 bg-white/10 "></div>}
            </div>
          ))}
        </div>

        {/* Top Right */}
        <div className="absolute top-20 right-10 flex flex-col gap-6 z-10">
          {[images[1]].map((img, i) => (
            <div
              key={i}
              className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-500 ${currentBg === img ? "border-white scale-110" : "border-transparent hover:scale-105"
                }`}
              onClick={() => setCurrentBg(img)}
            >
              <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
              {currentBg === img && <div className="absolute inset-0 bg-white/10 "></div>}
            </div>
          ))}
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-20 left-10 flex flex-col gap-6 z-10">
          {[images[2]].map((img, i) => (
            <div
              key={i + 2}
              className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-500 ${currentBg === img ? "border-white scale-110" : "border-transparent hover:scale-105"
                }`}
              onClick={() => setCurrentBg(img)}
            >
              <img src={img} alt={`Preview ${i + 2}`} className="w-full h-full object-cover" />
              {currentBg === img && <div className="absolute inset-0 bg-white/10 "></div>}
            </div>
          ))}
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-20 right-10 flex flex-col gap-6 z-10">
          {[images[3]].map((img, i) => (
            <div
              key={i + 2}
              className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-500 ${currentBg === img ? "border-white scale-110" : "border-transparent hover:scale-105"
                }`}
              onClick={() => setCurrentBg(img)}
            >
              <img src={img} alt={`Preview ${i + 2}`} className="w-full h-full object-cover" />
              {currentBg === img && <div className="absolute inset-0 bg-white/10 "></div>}
            </div>
          ))}
        </div>