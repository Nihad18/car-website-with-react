import { useState, useEffect, useRef } from "react";
import Input from "./Input";
import Picture from "../Picture";
import MobileNewAnnouncement from "../Mobile/MobileNewAnnouncement";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";

import { setSelectedImages } from "../../../redux/reducers/imageSlice";

const NewAnnouncement = () => {
  const api = "http://207.154.251.70";
  const [brandValue, setBrandValue] = useState(null);
  const [modelValue, setModelValue] = useState(null);

  const [values, setValues] = useState({
    gearValue: null,
    fuelValue: null,
    categoryValue: null,
    yearValue: null,
    colorValue: null,
    transmissionValue: null,
    milageValue: null,
    engineVolumeValue: null,
    enginePowerValue: null,
    priorOwnerCountValue: null,
    marketValue: null,
    cityValue: null,
    seatsCountValue: null,
    priceValue: null,
    descriptionValue: null,
    extraBoolenFieldsValue: [],
  });
  const [priceTypeValue,setPriceTypeValue] = useState()

  const selectedImages = useSelector((state) => state.selectedImages.value);

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const [data, setData] = useState({
    fuels: null,
    gears: null,
    category: null,
    transmission: null,
    year: null,
    color: null,
    engineVolume: null,
    priorOwnerCount: null,
    market: null,
    city: null,
    seatsCount: null,
    priceType: null,
    extraBooleanFields: [],
  });
  const getBrands = async (id) => {
    const url = `${api}/api/post/choices/`;
    const { data } = await axios.get(url);
    setBrands(data.brand.map((n) => ({ value: n.id, label: n.name })));
    setData({
      fuels: data.fuel_type.map((n) => ({ value: n.id, label: n.name })),
      gears: data.gear.map((n) => ({ value: n.id, label: n.name })),
      category: data.category.map((n) => ({ value: n.id, label: n.name })),
      transmission: data.transmission.map((n) => ({value: n.id, label: n.name,})),
      year: data.year.map((n) => ({ value: n.id, label: n.year })),
      color: data.color.map((n) => ({ value: n.id, label: n.name })),
      engineVolume: data.engine_volume.map((n) => ({value: n.id, label: n.volume,})),
      priorOwnerCount: data.prior_owners_count.map((n) => ({value: n.id, label: n.name,})),
      market: data.market.map((n) => ({ value: n.id, label: n.name })),
      city: data.city.map((n) => ({ value: n.id, label: n.name })),
      seatsCount: data.seats_count.map((n) => ({value: n.id, label: n.count,})),
      extraBooleanFields: data.extra_boolean_fields.map((n) => n.name),
      priceType: data.price_type.map((n) => n.name),
    });

    // when the brand is selected, get the models
    if (brandValue !== null) {
      const models = `${api}/api/post/models-choices/?brand=${id}`;
      const modelsData = await axios.get(models);
      setModels(modelsData.data.map((n) => ({ value: n.id, label: n.name })));
    }
  };
  useEffect(() => {
    setModelValue(null);
  }, [brandValue]);
  useEffect(() => {
    let id = brands.indexOf(brandValue) + 1;
    getBrands(id);
  }, [brandValue]);

  const files = useSelector((state) => state.file.value);
  var filesArray = Object.keys(files).map(function (key) {
    return files[key];
  });
  let formData = new FormData();
  for (var key in filesArray) {
    formData.append("uploaded_images", filesArray[key]);
  }
  formData.append("mileage", values?.milageValue);
  formData.append("price", values.priceValue);
  formData.append("engine_power", 1);
  const extraFields = [1, 2];
  for (let i = 0; i < extraFields.length; i++) {
    formData.append("extra_fields", extraFields[i]);
  }
  formData.append("crashed", false);
  formData.append("loan", false);
  formData.append("painted", false);
  formData.append("description", values.descriptionValue);
  formData.append("brand", brandValue?.value);
  formData.append("auto_model", modelValue?.value);
  formData.append("category", values?.categoryValue?.value);
  formData.append("mileage_type", 1);
  formData.append("color", values?.colorValue?.value);
  formData.append("price_type",1);
  formData.append("prior_owners_count", values?.priorOwnerCountValue?.value);
  formData.append("seats_count", values?.seatsCountValue?.value);
  formData.append("fuel_type", values?.fuelValue?.value);
  formData.append("gear", values?.gearValue?.value);
  formData.append("transmission", values?.transmissionValue?.value);
  formData.append("year", values?.yearValue?.value);
  formData.append("engine_volume", values?.engineVolumeValue?.value);
  formData.append("engine_power", values?.enginePowerValue);
  formData.append("market", values?.marketValue?.value);
  formData.append("city", values?.cityValue?.value);

  const token = localStorage.getItem("token");
  const postCarData = (e) => {
    e.preventDefault();
    const url = `${api}/api/post/create/`;
    const post = axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "multipart/form-data",
      },
    });
    console.log("post : ", post);
  };
  console.log("values : ", values)
  return (
    <>
      <MobileNewAnnouncement />
      <div
        className='hidden lg:flex flex-col min-h-screen w-full sm:w-[540px] pt-6 pl-6 pr-6 mx-auto
    bg-white dark:bg-[#1c1c1e] text-black dark:text-white lg:min-w-[960px]'
      >
        <div className=''>Yeni elan yerləşdirin</div>
        <form
          onSubmit={postCarData}
          className=' flex w-full justify-between flex-wrap'
        >
          <Input
            name={"Marka :"}
            options={brands}
            placeholder={"Marka"}
            value={brandValue}
            onChange={setBrandValue}
          />
          <Input
            name={"Model : "}
            options={models}
            placeholder={"Model"}
            value={modelValue}
            isDisabled={brandValue === null}
            onChange={setModelValue}
          />
          <Input
            name={"Yanacaq növü : "}
            options={data.fuels}
            value={values.fuelValue}
            onChange={(e) => setValues({...values, fuelValue: e })}
            placeholder={"Yanacaq növü"}
          />
          <Input
            name={"Ötürücü : "}
            options={data.gears}
            value={values.gearValue}
            onChange={(e) => setValues({...values, gearValue: e })}
            placeholder={"Ötürücü"}
          />
          <Input
            name={"Ban növü : "}
            options={data.category}
            value={values.categoryValue}
            onChange={(e) => setValues({...values, categoryValue: e })}
            placeholder={"Ban növü"}
          />
          <Input
            name={"Sürətlər qutusu : "}
            options={data.transmission}
            value={values.transmissionValue}
            onChange={(e) => setValues({...values, transmissionValue: e })}
            placeholder={"Sürətlər qutusu"}
          />

          {/* MILEAGE */}
          <div className=' pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5'>Yürüş :</div>

            <div className='w-[250px] flex items-center'>
              <input
                value={values.milageValue}
                onChange={(e) => setValues({...values, milageValue: e.target.value })}
                type='number'
                placeholder='0'
                min='0'
                step='10000'
                className='max-w-[110px] px-2 bg-white text-black border-gray-400 border rounded flex items-center min-h-[38px] outline-none'
              />

              <input
                type='radio'
                name='mileage'
                defaultChecked
                id='km'
                className='ml-2'
              />
              <label htmlFor='km' className=' mr-2'>
                Km
              </label>
              <input type='radio' name='mileage' id='mil' />
              <label htmlFor='mil'>Mil</label>
            </div>
          </div>
          {/* -------------------- */}
          <Input
            name={"İl : "}
            options={data.year}
            value={values.yearValue}
            onChange={(e)=>setValues({...values,yearValue: e})}
            placeholder={"İl"}
          />
          <Input 
          name={"Rəng : "} 
          options={data.color} 
          value={values.colorValue}
          onChange={(e)=>setValues({...values,colorValue: e})} 
          placeholder={"Rəng"} />
          <Input
            name={"Mühərrikin həcmi,sm"}
            sup={"3"}
            options={data.engineVolume}
            value={values.engineVolumeValue}
            onChange={(e)=>setValues({...values,engineVolumeValue: e})}
            placeholder={"Mühərrikin həcmi,sm"}
          />
          {/* PRICE */}
          <div className=' pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5'>Qiymət :</div>

            <div className='w-[250px] flex items-center'>
              <input
                value={values?.priceValue}
                onChange={(e) => setValues({...values, priceValue: e.target.value })}
                type='number'
                placeholder='0'
                min='0'
                step='500'
                className='max-w-[110px] px-2 bg-white text-black border-gray-400 border rounded flex items-center min-h-[38px] outline-none'
              />

              {data?.priceType?.map((item, index) => {
                return (
                  <div key={index} className='w-[200px] flex'>
                    <input  type='radio' value={`${item}`} defaultChecked={item[0]} onChange={(e) => setPriceTypeValue(e.target.value)}
                      name='price' id={`${item}`} className='ml-1'/>{" "}
                    <label name='price' htmlFor={`${item}`} className='ml-1'>{item}</label>
                  </div>
                );
              })}
            {/* --------------------------------------------------------------------------------------------------------------------- */}
              {/* <div  className='w-[200px] flex'>
                    <input type='radio' value='azn' defaultChecked onChange={(e) => setPriceTypeValue(e.target.value)}
                      name='price' id={'azn'}className='ml-1'/>{" "}
                    <label name='price' htmlFor={'azn'} className='ml-1'>{'azn'}</label>

                    <input type='radio' value='usd' onChange={(e) => setPriceTypeValue(e.target.value)}
                      name='price' id={'usd'}className='ml-1'/>{" "}
                    <label name='price' htmlFor={'usd'} className='ml-1'>{'usd'}</label>
                  </div> */}
            </div>
          </div>
          {/* -------------------- */}
          
           <div className='py-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5 '>Mühərrikin gücü, a . g :</div>

            <div className='w-[250px] flex items-center'>
              <input
                value={values?.enginePowerValue}
                onChange={(e) => setValues({ ...values,enginePowerValue: e.target.value })}
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
            onChange={(e)=>setValues({...values,priorOwnerCountValue: e})}
            placeholder={"Neçənci sahibisiniz ?"}
          />
          <Input
            name={"Hansı bazar üçün yığılıb"}
            options={data.market}
            value={values.marketValue}
            onChange={(e)=>setValues({...values,marketValue: e})}
            placeholder={"Hansı bazar üçün yığılıb"}
          />
          <Input
            name={"Şəhər"}
            options={data.city}
            value={values.cityValue}
            onChange={(e) => setValues({...values, cityValue: e })}
            placeholder={"Şəhər"}
          />
          <Input
            name={"Yerlərin sayı"}
            options={data.seatsCount}
            value={values.seatsCountValue}
            onChange={(e) => setValues({...values, seatsCountValue: e })}
            placeholder={"Yerlərin sayı"}
          />
          {/* ------ */}
          <div className=' pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5'>Vəziyyəti :</div>

            <div className='w-[250px] flex items-center'>
              <input type='checkbox' id='checkbox1' />
              <label htmlFor='checkbox1' className='mx-2'>
                Vuruğu var
              </label>
              <input type='checkbox' id='checkbox2' />
              <label htmlFor='checkbox2' className='ml-2'>
                Rənglənib
              </label>
            </div>
          </div>
          {/* -------------------- */}
          {/* ------ */}
          <div className=' pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
            <div className='mr-5'>Kredit :</div>

            <div className='w-[250px] flex items-center'>
              <input type='checkbox' id='checkbox3' />
              <label htmlFor='checkbox3' className='mx-1'>
                Kreditədir
              </label>
              <input type='checkbox' id='checkbox4' />
              <label htmlFor='checkbox4' className='ml-1'>
                Barter mümkündür
              </label>
            </div>
          </div>
          {/* -------------------- */}
          {/*TEXT AREA */}
          <div className=' pt-2 pb-2 w-full rounded flex justify-between'>
            <div className='mr-5'>Əlavə məlumat :</div>

            <div className='w-4/5  rounded text-sm '>
              <textarea
                value={values.descriptionValue}
                onChange={(e) =>
                  setValues({ ...values,descriptionValue: e.target.value })
                }
                className='w-full min-h-16 border rounded border-gray-400 outline-none px-3 py-1'
              ></textarea>
              <div>Telefon nömrələri qeyd etmək qadağandır!</div>
            </div>
          </div>
          {/* -------------------- */}

          {/* CAR PROPERTIES */}
          <div className='flex flex-col w-full'>
            <div className='font-semibold text-xl'>Avtomobilin təchizatı</div>
            <div className='flex items-center justify-between'>
              {data.extraBooleanFields.map((item, index) => {
                return (
                  <div key={index} className='w-[200px]'>
                    <input type='checkbox' id={item} />{" "}
                    <label htmlFor={item}>{item}</label>
                  </div>
                );
              })}
            </div>
          </div>
          {/*-----------------------  */}

          {/* PICTURES */}
          <div className='font-semibold text-xl'>Şəkillər</div>
          <div className='border border-gray-400 w-full min-h-[170px] flex items-center'>
            {/* RULES */}
            <div
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
            {/* add pictures */}
            <Picture />
            {/* <div >  */}
            {/* <AddPictures/> */}
            {/* </div> */}
          </div>
          {/* ------------------- */}
          <button className={`p-1 bg-red-500`}>Elanı paylaş</button>
        </form>
      </div>
    </>
  );
};

export default NewAnnouncement;
