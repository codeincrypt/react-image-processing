import './App.css';
import React, { useState } from 'react'
import './boot.css';

import img1 from './assets/img1.svg'
import img2 from './assets/img2.svg'
import img3 from './assets/img3.svg'
import drgs from './assets/download.png'

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function App() {

  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState(null);

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const downloadImage = () => {

  }

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <>
      <div className="App col-lg-12 pt-5">
        <h3 class="mt-4">Resize, Crop & Compress your images.</h3>
        <p>Resize your images for free, either JPEG or PNG images. Serve high-quality images in the right size to reduce page weight and load time.</p>
        <p>Upload or drag n' drop the files you want to resize, crop and compress. Pick as many files as you want or go one by one.</p>

        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div className="row" id="leftdiv">
              <div className='col-6' id="leftdivcard">

                <input type="file" onChange={onChange} />

                <div class="text-center">
                  <Cropper
                    className="cropper"
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    src={image}
                    // viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                    guides={true}
                  />
                </div>

                <button type="button" className='btn btn-primary btn-lg mt-4' onClick={getCropData} id="leftbutton">
                  Crop Image
                </button>

              </div>
              <div className="col-6" id="rightdiv">
                <div id="itemdivcard">
                  {cropData ? (
                    <img style={{ width: "100%" }} src={cropData} alt="cropped" />
                  ) : (
                    <h1>Cropped image will apear here!</h1>
                  )}

                <button type="button" className='btn btn-primary btn-lg mt-4' onClick={downloadImage}>
                  Download
                </button>

                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <div class="hr-divider mt-5 mb-3">
                  <h3 class="hr-divider-content hr-divider-heading">HOW TO RESIZE & COMPRESS YOUR IMAGES</h3>
                </div>
              </div>
            </div>
            <div class="row info how">
              <div class="col-sm-4">
                <img src={img1} />
                <h4>Step 1</h4>
                <p>Drag and drop or browse all your images from your device</p>
              </div>
              <div class="col-sm-4">
                <img src={img3} />
                <h4>Step 2</h4>
                <p>Crop or resize, new width and height dimensions.</p>
              </div>
              <div class="col-sm-4">
                <img src={img2} />
                <h4>Step 3</h4>
                <p>Apply changes and enjoy your new high quality and dimension images.</p>
              </div>
            </div>


            <div class="row">
              <div class="col-12">
                <div class="hr-divider mt-5 mb-3">
                  <h3 class="hr-divider-content hr-divider-heading">WHY RESIZE AND CROP YOUR IMAGES</h3>
                </div>
              </div>
            </div>
            <div class="row info">
              <div class="col-sm-4">
                <h4>Compress Images</h4>
                <p>Reducing image file size means that image downloads will be faster but it'll help you maintain image quality.</p>
              </div>
              <div class="col-sm-4">
                <h4>Proper Image Size</h4>
                <p>Properly resize your images to improve rendering time for the browser and reduce image file size.</p>
              </div>
              <div class="col-sm-4">
                <h4>Crop Image</h4>
                <p>Crop image files online and for free. This image cropper allows you to crop your image in a custom way.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
