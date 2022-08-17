import { useState, useEffect } from "react";
import Input from "./Input";
import axios from "axios";
const NewAnnouncement = () => {
  const api='http://207.154.251.70'
  const [brandValue, setBrandValue] = useState(null);
  const [modelValue, setModelValue] = useState(null);
  useEffect(() => {
    setModelValue(null);
  }, [brandValue]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const getBrands = async (id) => {
    const url = `${api}/api/post/choices/`;
    const {data} = await axios.get(url);
    setBrands(data.brand.map(n => ({ value: n.id, label: n.name })));

    const models=`${api}/api/post/models-choices/?brand=${id}`
    const modelsData =await axios.get(models)
    setModels(modelsData.data.map(n => ({ value: n.id, label: n.name })));
    console.log(data)
    console.log(modelsData)
  } 
  useEffect(() => {
    console.log(brandValue)
    let id=brands.indexOf(brandValue)+1
    getBrands(id)
  },[brandValue])
  return (
    <div
    className='flex flex-col h-full w-full sm:w-[540px] pl-6 pr-6 mx-auto
    bg-white dark:bg-[#1c1c1e] text-black dark:text-white lg:min-w-[960px]'
    >
      <div className=''>Yeni elan yerləşdirin</div>

      <form className=' flex w-full justify-around flex-wrap'>
        <Input
          name={"Marka : "}
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
          onChange={setModelValue}
        />
        {/* <Input
          name={"Yanacaq növü : "}
          options={oils}
          placeholder={"Model"}
          value={modelValue}
          onChange={setModelValue}
        /> */}
      </form>
    </div>
  );
};

export default NewAnnouncement;
