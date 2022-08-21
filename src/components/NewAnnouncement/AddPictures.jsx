import { useState } from "react";
const AddPictures = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray))

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }
  
  return (
    <div className='px-2'>
     
      <label className="select-none flex flex-col items-center justify-center cursor-pointer border border-gray-400 hover:border-blue-400 ">
        + Add Images
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          className="hidden"
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <div className="flex flex-wrap">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <>
              <div key={index}>
                <img src={image} alt="upload" className="w-[100px] h-[100px] bg-cover bg-center rounded" />
                <p>{index + 1}</p>
                <button className="bg-red-500 rounded p-1" onClick={() => deleteHandler(image)}>
                  delete image
                </button>
              </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default AddPictures;
