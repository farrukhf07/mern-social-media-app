import React, { useRef, useState } from 'react'

function Uploading() {
    const host = "http://172.16.3.228:5000";
    
    const imageInputRef = useRef(null)
    const videoInputRef = useRef(null)
    const [caption, setCaption] = useState("");
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoadig] = useState(false);
    const [error, setError] = useState("");

    const createPost = async (formData)=>{
        try{
          setLoadig(true);
          setError("")
            // API Call
            const respose = await fetch(`${host}/api/posts/createPosts`,{
                method: 'POST',
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                    // Authoization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk3MWQ2NWNlMGU1ZTI0OWQ2N2IwNTVhIn0sImlhdCI6MTc2OTE2ODA5NX0.07a-kr0Uad1ENUhQ8PYN3u5FxUhCI8XBVYIuQl4rCro`
                },
                body: formData
            });
            const data = await respose.json();
            console.log("Post Created: ", data);
            
            // Reset
            setCaption("");
            setImages([]);
            setVideos([]);
            imageInputRef.current.value = "";
            videoInputRef.current.value = "";
        }catch(error){
            console.error("Upload Failed: ", error)
        }finally{
          setLoadig(false);
        }
    }

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }

    setImages(files);
  };

  const handleVideosChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("You can upload a maximum of 3 videos.");
      return;
    }

    setVideos(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!caption && images.length === 0 && videos.length === 0) {
      alert("Please add a caption, image, or video.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);

    images.forEach((file) => {
      formData.append("images", file);
    });

    videos.forEach((file) => {
      formData.append("videos", file);
    });

    createPost(formData); // Call API

    console.log("Caption:", caption);
    console.log("Images:", images);
    console.log("Videos:", videos);
  };

  return (
    <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-sm rounded-3">
          <div className="card-body">
            {}
          {error && (
                <div className="alert alert-danger py-2">{error}</div>
              )}

            {/* Caption */}
            <textarea
              className="form-control border-0"
              rows="3"
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={{ resize: "none" }}
            />

            <hr />

            {/* Action Buttons */}
            <div className="d-flex justify-content-between align-items-center">

              <div className="d-flex gap-3">
                {/* Image Button */}
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => imageInputRef.current.click()}
                >
                  🖼️ Photo
                </button>

                {/* Video Button */}
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => videoInputRef.current.click()}
                >
                  🎥 Video
                </button>
              </div>

              {/* Submit */}
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>

            {/* Hidden Inputs */}
            <input
              type="file"
              accept="image/*"
              multiple
              ref={imageInputRef}
              hidden
              onChange={(e) => setImages(Array.from(e.target.files))}
            />

            <input
              type="file"
              accept="video/*"
              multiple
              ref={videoInputRef}
              hidden
              onChange={(e) => setVideos(Array.from(e.target.files))}
            />

            {/* Preview Info */}
            {(images.length > 0 || videos.length > 0) && (
              <div className="mt-3 text-muted small">
                {images.length > 0 && <div>🖼️ {images.length} image(s) selected</div>}
                {videos.length > 0 && <div>🎥 {videos.length} video(s) selected</div>}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Uploading