import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setPosts,
  setQuery,
  setPageCount,
  setActivePage,
  setIsLoading,
  setPageNotLoading,
} from "../../redux/reducers/postSlice";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { useNavigate } from "react-router";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select1 from "@mui/material/Select";

const Search = () => {
  const url = process.env.REACT_APP_API_URL;
  const activePage = useSelector((state) => state.post.activePage);
  const query = useSelector((state) => state.post.query);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const types = [" Bütün", "Yeni", "İşlənmiş"];
  const searchTypes = ["Sadə axtarış", "Ətraflı axtarış"];
  const [active, setActive] = useState(types[0]);
  const [searchActive, setSearchActive] = useState(searchTypes[0]);

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [brandValue, setBrandValue] = useState(null);
  const [modelValue, setModelValue] = useState(null);
  const [values, setValues] = useState({
    gearValue: null,
    fuelValue: null,
    categoryValue: null,
    yearValue: null,
    colorValue: null,
    transmissionValue: null,
    mileageValue: null,
    engineVolumeValue: null,
    enginePowerValue: null,
    priorOwnerCountValue: null,
    marketValue: null,
    cityValue: [],
    seatsCountValue: null,
    priceValue: null,
    priceTypeValue: 1,
    mileageTypeValue: 1,
    phoneNumberValue: null,
    descriptionValue: null,
    crashedValue: null,
    paintedValue: null,
    loanValue: null,
  });
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
    mileageType: null,
    extraBooleanFields: [],
  });

  const getBrands = async (id) => {
    const { data } = await axios.get(`${url}/api/post/choices/`);
    setBrands(data.brand.map((n) => ({ value: n.id, label: n.name })));
    setData({
      fuels: data.fuel_type.map((n) => ({ value: n.id, label: n.name })),
      gears: data.gear.map((n) => ({ value: n.id, label: n.name })),
      category: data.category.map((n) => ({ value: n.id, label: n.name })),
      transmission: data.transmission.map((n) => ({
        value: n.id,
        label: n.name,
      })),
      year: data.year.map((n) => ({ value: n.id, label: n.year })),
      color: data.color.map((n) => ({ value: n.id, label: n.name })),
      engineVolume: data.engine_volume.map((n) => ({
        value: n.id,
        label: n.volume,
      })),
      priorOwnerCount: data.prior_owners_count.map((n) => ({
        value: n.id,
        label: n.name,
      })),
      market: data.market.map((n) => ({ value: n.id, label: n.name })),
      city: data.city.map((n) => ({ value: n.id, label: n.name })),
      seatsCount: data.seats_count.map((n) => ({
        value: n.id,
        label: n.count,
      })),
      extraBooleanFields: data.extra_boolean_fields.map((n) => n.name),
      priceType: data.price_type.map((n) => n.name),
      mileageType: data.mileage_type.map((n) => n.name),
    });
    // when the brand is selected, get the models
    if (brandValue !== null) {
      const models = `${url}/api/post/models-choices/?brand=${id}`;
      const modelsData = await axios.get(models);
      setModels(modelsData?.data?.map((n) => ({ value: n.id, label: n.name })));
    }
  };
  useEffect(() => {
    setModelValue(null);
  }, [brandValue]);
  useEffect(() => {
    let id = brands.indexOf(brandValue) + 1;
    getBrands(id);
  }, [brandValue]);

  const filterObject = {
    brand: brandValue || "",
    model: modelValue?.value || "",
    city: values?.cityValue?.map((item) => item?.value) || "",
  };
  const handleChange = (e) => {
    dispatch(setIsLoading(true));
    e.preventDefault();
    navigate("/" + query + "&page=" + activePage);
    axios.get(`${url}/api/post/list${query}`).then((res) => {
      if (res.status === 200) {
        dispatch(setPosts(res.data.results));
        dispatch(setPageCount(Math.ceil(res.data?.count / 20)));
        dispatch(setActivePage(1));
        dispatch(setIsLoading(false));
        dispatch(setPageNotLoading(false));
      } else {
        dispatch(setIsLoading(true));
        dispatch(setPageNotLoading(true));
      }
    });
  };
  //!---------MAKE URL------------------------------------------------------------
  useEffect(() => {
    const makeUrl = () => {
      const queryParams = Object.keys(filterObject).reduce((initial, key) => {
        if (filterObject[key] !== "") {
          if (initial.length > 0) {
            const queryParam = `&${key}=${filterObject[key]}`;
            initial.push(queryParam);
          } else {
            const queryParam = `?${key}=${filterObject[key]}`;
            initial.push(queryParam);
          }
        }
        return initial;
      }, []);
      dispatch(setQuery(queryParams.join("")));
      return;
    };
    makeUrl();
  }, [filterObject, query]);
  // ------------------------------------------------------
  const reset = (e) => {
    e.preventDefault();
    setBrandValue(null);
    setModelValue(null);
    dispatch(setIsLoading(true));
    navigate("/");
    axios
      .get(
        `${url}/api/post/list/?page=${1}`,
        token && {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(setPosts(res.data.results));
          dispatch(setPageCount(Math.ceil(res.data?.count / 20)));
          dispatch(setActivePage(1));
          dispatch(setIsLoading(false));
          dispatch(setPageNotLoading(false));
        } else {
          dispatch(setIsLoading(true));
          dispatch(setPageNotLoading(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const customStyles = {
    singleValue: (base) => ({ ...base, color: "white" }),
    valueContainer: (base) => ({
      ...base,
      background: "#1C1C1E",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      background: "#1C1C1E",
      color: "#fff",
    }),
    option: (base) => ({
      ...base,
      background: "#1C1C1E",
      color: "#fff",
      "--custom-color": "#3C3F53",
      cursor: "pointer",
    }),
  };
  const theme = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary: "#212123",
    },
  });
  console.log(
    "values : ",
    values?.cityValue?.map((item) => item?.value)
  );
  console.log(
    "brands",
    brands?.map((item) => item?.label)
  );
  return (
    <div className='min-h-[250px] w-full sm:w-[540px] lg:w-[910px] xl:min-w-[1170px] rounded p-6 mx-auto bg-white dark:bg-[#242426] '>
      <div className='flex items-center justify-between w-full'>
        <div className='flex-col lg:flex-row w-full flex justify-between text-red-500'>
          <div className='flex mb-4'>
            {types.map((type) => (
              <button
                className={`w-full lg:min-w-[140px] h-[34px] px-3  mr-4 rounded hover:bg-red-100 dark:hover:bg-slate-500 border border-red-500  dark:border-slate-500 dark:text-white flex justify-center items-center
        ${
          active === type &&
          "!bg-red-500 !text-white hover:!bg-red-500 dark:!bg-white dark:!text-black dark:hover:!bg-white"
        } `}
                key={type}
                active={active === type}
                onClick={() => setActive(type)}
              >
                {type}
              </button>
            ))}
          </div>
          {/* --------------------------------------------------------------------------------------------------------------------------------------------- */}
          <div className='flex mb-4'>
            {searchTypes.map((type) => (
              <button
                className={`w-full lg:min-w-[170px] h-[34px] px-3  mr-4 rounded hover:bg-red-100 dark:hover:bg-slate-500 border border-red-500  dark:border-slate-500 dark:text-white flex justify-center items-center
        ${
          searchActive === type &&
          "!bg-red-500 !text-white hover:!bg-red-500 dark:!bg-white dark:!text-black dark:hover:!bg-white"
        } `}
                key={type}
                active={searchActive === type}
                onClick={() => setSearchActive(type)}
              >
                {type === searchTypes[0] ? (
                  <AiOutlineSearch className='mr-1 text-lg' />
                ) : (
                  <VscSettings className='mr-1 text-lg' />
                )}

                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <Box sx={{ minWidth: 120}}>
          <FormControl size="small">
            <InputLabel id='demo-simple-select-label'>Marka</InputLabel>
            <Select1
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={brandValue}
              label='Marka'
              className='min-w-[150px] '
              onChange={(e) => {
                setBrandValue(e.target.value);
              }}
            >
              <MenuItem value=''>
                <em>Heçbiri</em>
              </MenuItem>
              {brands?.map((brand) => (
                <MenuItem value={brand?.value}>{brand?.label}</MenuItem>
              ))}
              {/* <MenuItem value={brands?.map((item)=>item?.value)}>{brands?.map((item)=>item?.label)}</MenuItem> */}
              {/* {[1,2,3].map((item)=>(
                <MenuItem value={item.id}>{item}</MenuItem>
              ))} */}
            </Select1>
          </FormControl>
        </Box>
        
        {/* <Select
            className='lg:w-[300px] rounded '
            isClearable
            placeholder='Marka'
            options={brands}
            value={brandValue}
            onChange={setBrandValue}
            styles={customStyles}
            theme={theme}
          />
          <Select
            className='lg:w-[300px]  rounded '
            isClearable
            placeholder='Model'
            options={models}
            value={modelValue}
            onChange={setModelValue}
            isDisabled={!brandValue}
            styles={customStyles}
            theme={theme}
          />
          <Select
            className='lg:w-[300px]  rounded '
            isClearable
            isMulti
            placeholder='Şəhər'
            options={data.city}
            value={data.cityValue}
            onChange={(e) => setValues({...values, cityValue: e })}
            styles={customStyles}
            theme={theme}
          /> */}
      </div>
      {/* <div className='flex'>
        <Select
          className='w-[150px] z-50'
          isClearable
          options={data?.year}
          placeholder='İl,min'
          value={data?.yearsValue}
          onChange={(e) => setValues({ ...values, yearValue: e })}
        />
        <Select
          className='w-[150px] z-50'
          isClearable
          options={data?.year}
          placeholder='İl,max'
          value={data?.yearsValue}
          onChange={(e) => setValues({ ...values, yearValue: e })}
        />
      </div> */}
      <div className='flex'>
        <button
          onClick={reset}
          className='border border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center rounded w-full lg:w-[170px] h-[34px] lg:mt-2 mr-4'
        >
          <RiArrowGoBackFill className='mr-1 text-lg' />
          <span>Sıfırla</span>
        </button>
        <button
          onClick={handleChange}
          className='bg-green-500 text-white flex items-center justify-center rounded w-full lg:w-[170px] h-[34px] lg:mt-2'
        >
          <AiOutlineSearch className='mr-1 text-lg' />
          <span>Axtar</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
