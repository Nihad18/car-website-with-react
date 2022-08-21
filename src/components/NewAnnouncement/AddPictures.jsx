import { useState } from "react";
const AddPictures = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const onSelectFile = (event) => {
    event.preventDefault();
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray))

    // FOR BUG IN CHROME
    // event.target.value = "";
  };
  function deleteHandler(event,image) {
    event.preventDefault();
    setSelectedImages(selectedImages.filter((e) => e !== image));
    // URL.revokeObjectURL(image);
  }
  return (
    <div className='px-2 flex flex-wrap'>
      <div className="flex flex-wrap px-2">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div className="px-2" key={index}>
                <img src={image}  alt="upload" className={`w-[100px] h-[100px] bg-cover bg-center rounded`} />
                {/* <p>{index + 1}</p> */}
                <button className="bg-red-500 rounded p-1 mt-1" onClick={()=>deleteHandler(image)}>
                 delete image
               </button>
              </div>
            );
          })}
      </div>
     
      <label className="select-none w-[100px] h-[100px] cursor-pointer border border-gray-400 hover:border-blue-400 ">
        + Add Images
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          className="hidden"
          accept="image/*"
        />
      </label>
    </div>
  );
};
export default AddPictures;
