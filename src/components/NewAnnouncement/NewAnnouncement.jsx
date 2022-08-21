import { useState, useEffect,useRef } from "react";
import Input from "./Input";
import axios from "axios";
import Picture from "./Picture";
import AddPictures from "./AddPictures";
import photo from '../../images/profileImg.png'
const NewAnnouncement = () => {
  const api='http://207.154.251.70'
  const [brandValue, setBrandValue] = useState(null);
  const [modelValue, setModelValue] = useState(null);

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const [data,setData]=useState({
    fuels:null,
    gears:null,
    category:null,
    transmission:null,
    year:null,
    color:null,
    engineVolume:null,
    priorOwnerCount:null,
    market:null,
    city:null,
    seatsCount:null,
    extraBooleanFields:[], 
   })
  const getBrands = async (id) => {
    const url = `${api}/api/post/choices/`;
    const {data} = await axios.get(url);
    setBrands(data.brand.map(n => ({ value: n.id, label: n.name })))
    setData({
      fuels:data.fuel_type.map(n => ({ value: n.id, label: n.name })),
      gears:data.gear.map(n => ({ value: n.id, label: n.name })),  
      category:data.category.map(n => ({ value: n.id, label: n.name })),
      transmission:data.transmission.map(n => ({ value: n.id, label: n.name })),
      year:data.year.map(n => ({ value: n.id, label: n.year })),
      color:data.color.map(n => ({ value: n.id, label: n.name })),
      engineVolume:data.engine_volume.map(n => ({ value: n.id, label: n.volume })),
      priorOwnerCount:data.prior_owners_count.map(n => ({ value: n.id, label: n.name })),
      market:data.market.map(n => ({ value: n.id, label: n.name })),
      city:data.city.map(n => ({ value: n.id, label: n.name })),
      seatsCount:data.seats_count.map(n => ({ value: n.id, label: n.count })),
      extraBooleanFields:data.extra_boolean_fields.map(n => n.name ),
    })

    // when the brand is selected, get the models
    if(brandValue!==null){
      const models=`${api}/api/post/models-choices/?brand=${id}`
      const modelsData =await axios.get(models)
      setModels(modelsData.data.map(n => ({ value: n.id, label: n.name })));
    }
    
  } 
  useEffect(() => {
    setModelValue(null);
  }, [brandValue]);
  useEffect(() => {
    let id=brands.indexOf(brandValue)+1; 
    getBrands(id)
  },[brandValue])

 
  return (
    <div
    className='flex flex-col min-h-screen w-full sm:w-[540px] pt-6 pl-6 pr-6 mx-auto
    bg-white dark:bg-[#1c1c1e] text-black dark:text-white lg:min-w-[960px]'
    >
      <div className=''>Yeni elan yerləşdirin</div>

      <form className=' flex w-full justify-between flex-wrap'>
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
          isDisabled={brandValue===null}
          onChange={setModelValue}
        />
        <Input
          name={"Yanacaq növü : "}
          options={data.fuels}
          placeholder={"Yanacaq növü"}
        />
        <Input
          name={"Ötürücü : "}
          options={data.gears}
          placeholder={"Ötürücü"}
        />
        <Input
          name={"Ban növü : "}
          options={data.category}
          placeholder={"Ban növü"}
        />
        <Input
          name={"Sürətlər qutusu : "}
          options={data.transmission}
          placeholder={"Sürətlər qutusu"}
        />

    {/* MILEAGE */}
      <div className='px-1 pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
          <div className='mr-5'>Yürüş :</div>
         
          <div className="w-[250px] flex items-center">
          <input type="number" placeholder="0" min="0" step="10000" className="max-w-[110px] px-2 bg-white text-black border-gray-400 border rounded flex items-center min-h-[38px] outline-none"/>
         
         <input type="radio" name="mileage" defaultChecked id='km' className="ml-2"/>
         <label htmlFor="km" className=" mr-2">Km</label>
         <input type="radio" name="mileage" id='mil' />
         <label htmlFor="mil">Mil</label>
          </div>
        </div> 
      {/* -------------------- */}
        <Input
          name={"İl : "}
          options={data.year}
          placeholder={"İl"}
        />
        <Input
          name={"Rəng : "}
          options={data.color}
          placeholder={"Rəng"}
        />
        <Input
          name={"Mühərrikin həcmi,sm"}
          sup={"3"}
          options={data.engineVolume}
          placeholder={"Mühərrikin həcmi,sm"}
        />
        {/* PRICE */}
      <div className='px-1 pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
          <div className='mr-5'>Qiymət :</div>
         
          <div className="w-[250px] flex items-center">
          <input type="number" placeholder="0" min="0" step="500" className="max-w-[110px] px-2 bg-white text-black border-gray-400 border rounded flex items-center min-h-[38px] outline-none"/>
         
         <input type="radio" name="price" defaultChecked id='azn' className="ml-1"/>
         <label htmlFor="azn">AZN</label>
         <input type="radio" name="price" id='USD' className="ml-1"/>
         <label htmlFor="usd">USD</label>
         <input type="radio" name="price" id='eur' className="ml-1"/>
         <label htmlFor="eur">EUR</label>
          </div>
        </div> 
      {/* -------------------- */}
      <Input
          name={"Mühərrikin gücü,a . g"}
          options={data.gears}
          placeholder={"Mühərrikin gücü,a . g"}
        />
      <Input
          name={"Neçənci sahibisiniz ?"}
          options={data.priorOwnerCount}
          placeholder={"Neçənci sahibisiniz ?"}
        />
      <Input
          name={"Hansı bazar üçün yığılıb"}
          options={data.market}
          placeholder={"Hansı bazar üçün yığılıb"}
        />
      <Input
          name={"Şəhər"}
          options={data.city}
          placeholder={"Şəhər"}
        />
      <Input
          name={"Yerlərin sayı"}
          options={data.seatsCount}
          placeholder={"Yerlərin sayı"}
        />
      {/* ------ */}
      <div className='px-1 pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
          <div className='mr-5'>Vəziyyəti :</div>
         
          <div className="w-[250px] flex items-center">
         <input type="checkbox" id="checkbox1"/>
         <label htmlFor="checkbox1" className="mx-2">Vuruğu var</label>
          <input type="checkbox" id="checkbox2"/>
          <label htmlFor="checkbox2" className="ml-2">Rənglənib</label>
          </div>
        </div> 
      {/* -------------------- */}
      {/* ------ */}
      <div className='px-1 pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
          <div className='mr-5'>Kredit :</div>
         
          <div className="w-[250px] flex items-center">
         <input type="checkbox" id="checkbox3"/>
         <label htmlFor="checkbox3" className="mx-1">Kreditədir</label>
          <input type="checkbox" id="checkbox4"/>
          <label htmlFor="checkbox4" className="ml-1">Barter mümkündür</label>
          </div>
        </div> 
      {/* -------------------- */}
      {/*TEXT AREA */}
      <div className='px-1 pt-2 pb-2 w-full rounded flex justify-between'>
          <div className='mr-5'>Əlavə məlumat :</div>
         
          <div className="w-4/5  rounded text-sm ">
         <textarea className="w-full min-h-16 border rounded border-gray-400 outline-none px-3 py-1"></textarea>
         <div>Telefon nömrələri qeyd etmək qadağandır!</div>
          </div>
        </div> 
      {/* -------------------- */}

      {/* CAR PROPERTIES */}
      <div className="flex flex-col w-full">
      <div className="font-semibold text-xl">
      Avtomobilin təchizatı
      </div>
      <div className="flex items-center justify-between">
      {
        data.extraBooleanFields.map((item,index)=>{
          return(
            <div key={index} className="w-[200px]"><input type="checkbox" id={item}/> <label htmlFor={item}>{item}</label></div>
          )
      } )}
      </div>
      </div>
      {/*-----------------------  */}

      {/* PICTURES */}
      <div className="font-semibold text-xl">
      Şəkillər
      </div>
      <div className="border border-gray-400 w-full min-h-[170px] flex items-center">
      {/* RULES */}
      <div className="w-2/5 text-sm px-4">
        <div>- Minimum – 3 şəkil (ön, arxa və bütöv ön panelin görüntüsü mütləqdir).</div>
        <div>- Maksimum – 21 şəkil.</div>
        <div>- Optimal ölçü – 1024x768 piksel.</div>
      </div>
      {/* add pictures */}
      <Picture/>
      {/* <div >  */}
      {/* <AddPictures/> */}
      {/* </div> */}
      
      </div>
      {/* ------------------- */}
      </form>
    </div>
  );
};

export default NewAnnouncement;
