import "./App.css";
import React, { useState } from "react";
import "./boot.css";

import img1 from "./assets/img1.svg";
import img2 from "./assets/img2.svg";
import img3 from "./assets/img3.svg";

import imageCompression from 'browser-image-compression';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function App() {
  const [image1, setImage1] = useState("");
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [imageData, setImageData] = useState({size : "", extension : ""});
  const [cropper, setCropper] = useState(null);
  const [compressImage, setCompressImage] = useState("");
  const [outputFileName, setOutputFileName] = useState("");

  const [tab, setTab] = useState(1);
  // const [activeBtn, setActiveBtn] = useState(1);

  // ---------------------------- COMPRESS IMAGE ----------------------------
  const onChangeCompress = (e) => {
    const imageFile = e.target.files[0];
    compressImageUpload(e);
    setImage1(URL.createObjectURL(e.target.files[0]));
    setOutputFileName(imageFile.name);
  }

  const compressImageUpload = async (event) => {
    const imageFile = event.target.files[0];
  
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    }

    try {
      const compressedFile = await imageCompression(imageFile, options);
      setImageData({
        size : (compressedFile.size / 1024).toFixed(2) + " KB",
        extension : compressedFile.type.replace('image/',''),
      })
      setCompressImage(URL.createObjectURL(compressedFile))
    } catch (error) {
      console.log(error);
    }
  }

  // ---------------------------- CROP IMAGE ----------------------------
  const downloadImage = async () => {
    var canvas = document.getElementById("croppedImage");
    var dataUrl = canvas.src;
    let fileNames = document.getElementById("inputIf").value;
    const extension = fileNames.substring(
      fileNames.lastIndexOf(".") + 1,
      fileNames.length
    );
    var fileName = "github-codeincrypt-" + Math.floor(Date.now() / 1000) + "." + extension;
    var byteString = atob(dataUrl.split(",")[1]);
    var mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);

    setImage("");
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const onChange = (e) => {
    const uploadedFile = e.target.files[0];
    validateImageUpload(uploadedFile);
    function validateImageUpload(file) {
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
      if (allowedMimeTypes.includes(file.type)) {
        console.log("Image upload is valid.");
      } else {
        return alert(
          "Invalid image upload. Please choose a JPEG, PNG, or GIF file."
        );
      }
    }

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
        <h6 className="mt-4">
          Created by Kartik Swarnkar -
          <a target="_blank" href="https://www.linkedin.com/in/codeincrypt/"> LinkedIn</a>
          <a target="_blank" href="https://github.com/codeincrypt/"> Github</a>
        </h6>
        <h2 className="mt-3 mb-4">Resize, Crop & Compress your images.</h2>
        <p className="mb-1">
          Resize your images, either JPEG or PNG images. Serve high-quality
          images in the right size to reduce page weight and load time.
        </p>
        <p>
          Upload or drag n' drop the files you want to resize, crop and
          compress.
        </p>

        <div className="row justify-content-center mt-4">
          <div className="col-lg-8">
            <div className="row mb-5 justify-content-center">
              <div className="col-lg-4 col-4">
                <button type="button" className={`btn btn-block btn-lg py-3 btn-brand ${tab === 1?"btn-active":""}`} onClick={(e) => setTab(1)}
                >Compress Image</button>
              </div>
              <div className="col-lg-4 col-4">
                <button type="button" className={`btn btn-block btn-lg py-3 btn-brand ${tab === 2?"btn-active":""}`} onClick={(e) => setTab(2)}>
                  Crop Image</button>
              </div>
              <div className="col-lg-4 col-4">
                <button type="button" className={`btn btn-block btn-lg py-3 btn-brand ${tab === 3?"btn-active":""}`} onClick={(e) => setTab(3)}>
                  Resize Image</button>
              </div>
            </div>

            {tab === 1 ? (
              <div className="row" id="leftdiv">
                <div className="col-6" id="leftdivcard">
                  <h2 className="mb-3">Select Image to Compress size</h2>
                  <div className="row mb-3">
                    <div className="col-8">
                      <input
                        className="form-control"
                        type="file"
                        id="inputIf1"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={onChangeCompress}
                      />
                      {image1 ? (
                        <img
                            style={{ width: "100%" }}
                            src={image1}
                            alt="compress"
                          /> 
                      ): null}
                    </div>
                    <div className="col-4">
                    </div>
                  </div>
                  <div className="text-center"></div>
                </div>
                <div className="col-6" id="rightdiv">
                  <div id="itemdivcard">
                    <h2 className="mb-3">Compressed image will apear here!</h2>
                    <table>
                      <tr>
                        <td>
                          <h5>SIZE : </h5>  
                        </td>
                        <td>
                          <h5>{imageData.size} </h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h5>EXTENSION : </h5>  
                        </td>
                        <td>
                          <h5>{imageData.extension} </h5>
                        </td>
                      </tr>
                    </table>
                    {compressImage ? (
                      <>
                        <img
                          style={{ width: "100%" }}
                          src={compressImage}
                          alt="compress"
                          id="compressimage"
                        />
                        <a
                          href={compressImage}
                          download={outputFileName}
                          className="mt-2 btn btn-primary w-75"
                        >
                          Download Compressed Image
                        </a>
                      </>
                    ) : (
                      <>
                        <button
                          style={{ cursor: "not-allowed" }}
                          type="button"
                          className="btn btn-primary btn-lg"
                          disabled
                        >
                          Download Image
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : tab === 2 ? (
              <div className="row" id="leftdiv">
                <div className="col-6" id="leftdivcard">
                  <h2 className="mb-3">Select Image to Crop</h2>
                  <div className="row mb-3">
                    <div className="col-8">
                      <input
                        className="form-control"
                        type="file"
                        id="inputIf"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={getCropData}
                        id="leftbutton"
                      >
                        Crop Image
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <Cropper
                      className="cropper"
                      // zoomTo={0.5}
                      initialAspectRatio={1}
                      src={image}
                      viewMode={1}
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
                </div>
                <div className="col-6" id="rightdiv">
                  <div id="itemdivcard">
                    <h2 className="mb-3">Cropped image will apear here!</h2>
                    {cropData ? (
                      <>
                        <img
                          style={{ width: "100%" }}
                          src={cropData}
                          alt="cropping"
                          id="croppedImage"
                        />
                        <button
                          type="button"
                          className="btn btn-primary btn-lg mt-3"
                          onClick={downloadImage}
                        >
                          Download Image
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          style={{ cursor: "not-allowed" }}
                          type="button"
                          className="btn btn-primary btn-lg"
                          disabled
                        >
                          Download Image
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="row" id="leftdiv">
                <div className="col-12 text-center" id="leftdivcard">
                  <h4 className="mt-5 mb-5 text-center">Coming Soon...</h4>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-12">
                <div className="hr-divider mt-5 mb-3">
                  <h3 className="hr-divider-content hr-divider-heading">
                    HOW TO RESIZE & COMPRESS YOUR IMAGES
                  </h3>
                </div>
              </div>
            </div>
            <div className="row info how">
              <div className="col-sm-4">
                <img alt="Drag" src={img1} />
                <h4>Step 1</h4>
                <p>Drag and drop or browse all your images from your device</p>
              </div>
              <div className="col-sm-4">
                <img alt="Crop" src={img3} />
                <h4>Step 2</h4>
                <p>Crop or resize, new width and height dimensions.</p>
              </div>
              <div className="col-sm-4">
                <img alt="quality" src={img2} />
                <h4>Step 3</h4>
                <p>
                  Apply changes and enjoy your new high quality and dimension
                  images.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="hr-divider mt-5 mb-3">
                  <h3 className="hr-divider-content hr-divider-heading">
                    WHY RESIZE AND CROP YOUR IMAGES
                  </h3>
                </div>
              </div>
            </div>
            <div className="row info">
              <div className="col-sm-4">
                <h4>Compress Images</h4>
                <p>
                  Reducing image file size means that image downloads will be
                  faster but it'll help you maintain image quality.
                </p>
              </div>
              <div className="col-sm-4">
                <h4>Proper Image Size</h4>
                <p>
                  Properly resize your images to improve rendering time for the
                  browser and reduce image file size.
                </p>
              </div>
              <div className="col-sm-4">
                <h4>Crop Image</h4>
                <p>
                  Crop image files online and for free. This image cropper
                  allows you to crop your image in a custom way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
