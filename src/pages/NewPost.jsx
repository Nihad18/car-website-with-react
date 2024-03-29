import { useState, useEffect } from "react";
import FetchData from "../components/Home/FetchData";
import Input from "../components/Select/Input";
import Picture from "../components/NewPost/Picture";
import MobileNewAnnouncement from "../components/NewPost/MobileNewAnnouncement";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setBrandVals,
  setModelVals,
  setExtraBooleanFieldsValue,
  setVals,
} from "../redux/reducers/newPostSlice";
import Select from ".././components/Select/Select";
const NewPost = () => {
  const url = process.env.REACT_APP_API_URL;
  const brandValue = useSelector((state) => state.newPost.brandValue);
  const modelValue = useSelector((state) => state.newPost.modelValue);
  const values = useSelector((state) => state.newPost.values);
  const brands = useSelector((state) => state.data.brands);
  const models = useSelector((state) => state.data.models);
  const data = useSelector((state) => state.data.data);
  const selectedImages = useSelector((state) => state.selectedImages.value);

  //------------------------------------------------------------
  // const handleChange = (e) => {
  //   // Destructuring
  //   const { value, checked } = e.target;
  //   // Case 1 : The user checks the box

  //   if (checked) {
  //     setExtraBoolen([...extraBoolen, value]);
  //   }

  //   // Case 2  : The user unchecks the box
  //   else {
  //     setExtraBoolen(extraBoolen.filter((e) => e !== value));
  //   }
  // };
  //------------------------------------------------------------
  // const files = useSelector((state) => state.file.value);
  // var filesArray = Object.keys(files).map(function (key) {
  //   return files[key];
  // });
  // let formData = new FormData();
  // for (var key in filesArray) {
  //   formData.append("uploaded_images", filesArray[key]);
  // }
  // formData.append("mileage", values?.mileageValue);
  // formData.append("price", values.priceValue);
  // for (let i = 0; i < extraBoolen?.length; i++) {
  //   formData.append("extra_fields", extraBoolen[i]);
  //   console.log("value : ", extraBoolen[i]);
  // }
  // formData.append("crashed", values?.loanValue);
  // formData.append("loan", values?.loanValue);
  // formData.append("painted", values?.loanValue);
  // formData.append("description", values.descriptionValue);
  // formData.append("brand", brandValue?.value);
  // formData.append("auto_model", modelValue?.value);
  // formData.append("phone_number", values?.phoneNumberValue);
  // formData.append("category", values?.categoryValue?.value);
  // formData.append("mileage_type", values.mileageTypeValue);
  // formData.append("color", values?.colorValue?.value);
  // formData.append("price_type", values?.priceTypeValue);
  // formData.append("prior_owners_count", values?.priorOwnerCountValue?.value);
  // formData.append("seats_count", values?.seatsCountValue?.value);
  // formData.append("fuel_type", values?.fuelValue?.value);
  // formData.append("gear", values?.gearValue?.value);
  // formData.append("transmission", values?.transmissionValue?.value);
  // formData.append("year", values?.yearValue?.value);
  // formData.append("engine_volume", values?.engineVolumeValue?.value);
  // formData.append("engine_power", values?.enginePowerValue);
  // formData.append("market", values?.marketValue?.value);
  // formData.append("city", values?.cityValue?.value);

  // const token = useSelector((state) => state.auth.value);
  // const postCarData = async (e) => {
  //   e.preventDefault();
  //   const post = await axios.post(`${url}/api/post/create/`, formData, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-type": "multipart/form-data",
  //     },
  //   });
  // };
  //---------------------------------------------------------------------------------------------
  // const [inputValue, setInputValue] = useState("");
  // const handleInput = (e) => {
  //   const formattedPhoneNumber = formatPhoneNumber(e.target.value);
  //   setInputValue(formattedPhoneNumber);
  //   setValues({
  //     ...values,
  //     phoneNumberValue: e.target.value.replace(/[^\d]/gm, ""),
  //   });
  // };

  function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/gm, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }
  //----------------------------------------------------------------------------------------------
  console.log(brandValue)
  console.log(values);
  return (
    <>
      <FetchData />
      <MobileNewAnnouncement />
      <div
        className='hidden lg:flex flex-col min-h-screen w-full sm:w-[540px] pt-6 pl-6 pr-6 mx-auto
    bg-white dark:bg-[#1c1c1e] text-black dark:text-white lg:min-w-[960px] xl:min-w-[1250px]'
      >
        <div className=''>Yeni elan yerləşdirin</div>
        <div className='md:grid lg:grid-cols-3 xl:grid-cols-4 justify-between'>
          <Select options={brands} placeHolder='Marka' postBrand={true} />
          <Select
            options={models}
            placeHolder='Model'
            postModel={true}
            isDisabled={!brandValue}
          />
          <Select
            options={data?.fuels}
            placeHolder='Yanacaq növü'
            type={"fuelValue"}
            postModel={true}
            ID={true}
          />
          <Select
            options={data?.gears}
            placeHolder='Ötürücü'
            type={"gearValue"}
            newPost={true}
            ID={true}
          />
          <Select
            options={data?.category}
            type={"categoryValue"}
            placeHolder='Ban növü'
            newPost={true}
            ID={true}
          />
          <Select
            options={data?.transmission}
            placeHolder='Sürətlər qutusu'
            type={"transmissionValue"}
            newPost={true}
            ID={true}
          />
          <Input
            placeHolder={"Yürüş"}
            type={"mileageValue"}
            inputValueLength={7}
            newPost={true}
            containerClassName={"w-[140px] mr-2"}
          />
          <Select
            options={data?.gears}
            placeHolder='Ötürücü'
            type={"gearValue"}
            newPost={true}
            ID={true}
          />
          <Select
            options={data?.gears}
            placeHolder='Ötürücü'
            type={"gearValue"}
            newPost={true}
            ID={true}
          />
          {/* <Input
            name={"Yanacaq növü : "}
            options={data.fuels}
            value={values.fuelValue}
            onChange={(e) => setValues({ ...values, fuelValue: e })}
            placeholder={"Yanacaq növü"}
          />
          <Input
            name={"Ötürücü : "}
            options={data.gears}
            value={values.gearValue}
            onChange={(e) => setValues({ ...values, gearValue: e })}
            placeholder={"Ötürücü"}
          />
          <Input
            name={"Ban növü : "}
            options={data.category}
            value={values.categoryValue}
            onChange={(e) => setValues({ ...values, categoryValue: e })}
            placeholder={"Ban növü"}
          />
          <Input
            name={"Sürətlər qutusu : "}
            options={data.transmission}
            value={values.transmissionValue}
            onChange={(e) => setValues({ ...values, transmissionValue: e })}
            placeholder={"Sürətlər qutusu"}
          /> */}

          {/* MILEAGE */}
          {/* <div className=' pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5'>Yürüş :</div>

            <div className='w-[250px] flex items-center'>
              <input
                value={values.mileageValue}
                onChange={(e) =>
                  setValues({ ...values, mileageValue: e.target.value })
                }
                type='number'
                placeholder='0'
                min='0'
                step='10000'
                className='max-w-[110px] px-2 bg-white text-black border-gray-400 border rounded flex items-center min-h-[38px] outline-none'
              />
              {data?.mileageType?.map((item, index) => {
                return (
                  <div key={index} className='w-[50px] flex ml-3'>
                    <input
                      type='radio'
                      defaultChecked={index === 0}
                      value={index + 1}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          mileageTypeValue: e.target.value,
                        })
                      }
                      name='mileage'
                      id={`${item}`}
                      className=''
                    />{" "}
                    <label name='mileage' htmlFor={`${item}`} className='ml-1'>
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div> */}
          {/* -------------------- */}
          {/* <Input
            name={"İl : "}
            options={data.year}
            value={values.yearValue}
            onChange={(e) => setValues({ ...values, yearValue: e })}
            placeholder={"İl"}
          />
          <Input
            name={"Rəng : "}
            options={data.color}
            value={values.colorValue}
            onChange={(e) => setValues({ ...values, colorValue: e })}
            placeholder={"Rəng"}
          />
          <Input
            name={"Mühərrikin həcmi,sm"}
            sup={"3"}
            options={data.engineVolume}
            value={values.engineVolumeValue}
            onChange={(e) => setValues({ ...values, engineVolumeValue: e })}
            placeholder={"Mühərrikin həcmi,sm"}
          /> */}
          {/* PRICE */}
          {/* <div className=' pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5'>Qiymət :</div>

            <div className='w-[250px] flex items-center'>
              <input
                value={values?.priceValue}
                onChange={(e) =>
                  setValues({ ...values, priceValue: e.target.value })
                }
                type='number'
                placeholder='0'
                min='0'
                step='500'
                className='max-w-[110px] px-2 bg-white text-black border-gray-400 border rounded flex items-center min-h-[38px] outline-none'
              />

              {data?.priceType?.map((item, index) => {
                return (
                  <div key={index} className='w-[200px] flex'>
                    <input
                      type='radio'
                      defaultChecked={index === 0}
                      value={index + 1}
                      onChange={(e) =>
                        setValues({ ...values, priceTypeValue: e.target.value })
                      }
                      name='price'
                      id={`${item}`}
                      className='ml-1'
                    />{" "}
                    <label name='price' htmlFor={`${item}`} className='ml-1'>
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div> */}
          {/* -------------------- */}

          {/* <div className='py-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5 '>Mühərrikin gücü, a . g :</div>

            <div className='w-[250px] flex items-center'>
              <input
                value={values?.enginePowerValue}
                onChange={(e) =>
                  setValues({ ...values, enginePowerValue: e.target.value })
                }
                type='number'
                placeholder='0'
                min='0'
                className='w-[110px] px-2 bg-white text-black border-gray-400 border rounded flex items-center min-h-[38px] outline-none'
              />
            </div>
          </div>
          <Input
            name={"Neçənci sahibisiniz ?"}
            options={data.priorOwnerCount}
            value={values.priorOwnerCountValue}
            onChange={(e) => setValues({ ...values, priorOwnerCountValue: e })}
            placeholder={"Neçənci sahibisiniz ?"}
          />
          <Input
            name={"Hansı bazar üçün yığılıb"}
            options={data.market}
            value={values.marketValue}
            onChange={(e) => setValues({ ...values, marketValue: e })}
            placeholder={"Hansı bazar üçün yığılıb"}
          />
          <Input
            name={"Şəhər"}
            options={data.city}
            value={values.cityValue}
            onChange={(e) => setValues({ ...values, cityValue: e })}
            placeholder={"Şəhər"}
          />
          <Input
            name={"Yerlərin sayı"}
            options={data.seatsCount}
            value={values.seatsCountValue}
            onChange={(e) => setValues({ ...values, seatsCountValue: e })}
            placeholder={"Yerlərin sayı"}
          /> */}
          {/* ---SITUATION--- */}
          {/* <div className=' pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5'>Vəziyyəti :</div>

            <div className='w-[250px] flex items-center'>
              <input
                onChange={(e) =>
                  setValues({ ...values, crashedValue: e.target.checked })
                }
                type='checkbox'
                id='checkbox1'
              />
              <label htmlFor='checkbox1' className='mx-2'>
                Vuruğu var
              </label>
              <input
                onChange={(e) =>
                  setValues({ ...values, paintedValue: e.target.checked })
                }
                type='checkbox'
                id='checkbox2'
              />
              <label htmlFor='checkbox2' className='ml-2'>
                Rənglənib
              </label>
            </div>
          </div> */}
          {/* -------------------- */}
          {/* <div className=' pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5'>Kredit :</div>

            <div className='w-[250px] flex items-center'>
              <input
                onChange={(e) =>
                  setValues({ ...values, loanValue: e.target.checked })
                }
                type='checkbox'
                id='checkbox3'
              />
              <label htmlFor='checkbox3' className='mx-1'>
                Kreditədir
              </label>
              <input type='checkbox' id='checkbox4' />
              <label htmlFor='checkbox4' className='ml-1'>
                Barter mümkündür
              </label>
            </div> */}
          {/* </div> */}
          {/* -------------------- */}
          {/*TEXT AREA */}
          {/* <div className=' pt-2 pb-2 w-full rounded flex justify-between'>
            <div className='mr-5'>Əlavə məlumat :</div>

            <div className='w-4/5  rounded text-sm '>
              <textarea
                value={values.descriptionValue}
                onChange={(e) =>
                  setValues({ ...values, descriptionValue: e.target.value })
                }
                className='w-full min-h-16 border rounded border-gray-400 outline-none px-3 py-1'
              ></textarea>
              <div>Telefon nömrələri qeyd etmək qadağandır!</div>
            </div>
          </div> */}
          {/*-------PHONE NUMBER---------*/}
          {/* <div className=' pt-2 pb-2 w-full rounded flex justify-between items-center'>
            <div className='mr-5'>Əlavə məlumat :</div>

            <div className='w-4/5  rounded text-sm '>
              <input
                value={inputValue}
                maxLength='14'
                onChange={handleInput}
                type='tel'
                placeholder='(000) 000-00-00'
                className='w-[200px] px-2 bg-white text-black border-gray-400 border rounded flex items-center h-[30px] outline-none'
              />
            </div>
          </div> */}
          {/* CAR PROPERTIES */}
          {/* <div className='flex flex-col w-full'>
            <div className='font-semibold text-xl'>Avtomobilin təchizatı</div>
            <div className='flex flex-wrap items-center justify-between'>
              {data.extraBooleanFields.map((item, index) => {
                return (
                  <div key={index} className='min-w-[200px] p-1'>
                    <input
                      onChange={handleChange}
                      value={index + 1}
                      type='checkbox'
                      id={index + 1}
                    />{" "}
                    <label htmlFor={index + 1}>{item}</label>
                  </div>
                );
              })}
            </div>
          </div> */}
          {/*-----------------------  */}

          {/* PICTURES */}
          {/* <div className='font-semibold text-xl'>Şəkillər</div>
          <div className='border border-gray-400 w-full min-h-[170px] flex items-center'> */}
          {/* RULES */}
          {/* <div
              className={`${
                selectedImages.length > 3 ? "hidden" : ""
              } w-2/5 text-sm px-4`}
            >
              <div>
                - Minimum – 3 şəkil (ön, arxa və bütöv ön panelin görüntüsü
                mütləqdir).
              </div>
              <div>- Maksimum – 21 şəkil.</div>
              <div>- Optimal ölçü – 1024x768 piksel.</div>
            </div>
            <Picture />
          </div> */}
        </div>
        <button
          // onClick={postCarData}
          className={`p-1 bg-red-500`}
        >
          Elanı paylaş
        </button>
      </div>
    </>
  );
};

export default NewPost;
