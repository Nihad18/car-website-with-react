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
import {
  setBrands,
  setModels,
  setBrandValue,
  setModelValue,
  setValues,
  setData,
} from "../../redux/reducers/searchSlice";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { useNavigate } from "react-router";
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

  const posts = useSelector((state) => state.post.posts);
  const brands = useSelector((state) => state.search.brands);
  const models = useSelector((state) => state.search.models);
  const brandValue = useSelector((state) => state.search.brandValue);
  const modelValue = useSelector((state) => state.search.modelValue);
  const values = useSelector((state) => state.search.values);
  const data = useSelector((state) => state.search.data);

  const getBrands = async (id) => {
    const { data } = await axios.get(`${url}/api/post/choices/`);
    dispatch(
      setBrands(data?.brand?.map((n) => ({ value: n.id, label: n.name })))
    );
    dispatch(
      setData({
        fuels: data?.fuel_type?.map((n) => ({ value: n.id, label: n.name })),
        gears: data?.gear?.map((n) => ({ value: n.id, label: n.name })),
        category: data?.category?.map((n) => ({ value: n.id, label: n.name })),
        transmission: data?.transmission?.map((n) => ({
          value: n.id,
          label: n.name,
        })),
        year: data?.year?.map((n) => ({ value: n.id, label: n.year })),
        color: data?.color?.map((n) => ({ value: n.id, label: n.name })),
        engineVolume: data?.engine_volume?.map((n) => ({
          value: n.id,
          label: n.volume,
        })),
        priorOwnerCount: data?.prior_owners_count?.map((n) => ({
          value: n.id,
          label: n.name,
        })),
        market: data?.market?.map((n) => ({ value: n.id, label: n.name })),
        city: data?.city?.map((n) => ({ value: n.id, label: n.name })),
        seatsCount: data?.seats_count?.map((n) => ({
          value: n.id,
          label: n.count,
        })),
        extraBooleanFields: data.extra_boolean_fields.map((n) => n.name),
        priceType: data?.price_type?.map((n) => ({ value: n.id, label: n.name })),
        mileageType: data?.mileage_type?.map((n) => n.name),
      })
    );
    // when the brand is selected, get the models
    if (brandValue !== null) {
      const models = `${url}/api/post/models-choices/?brand=${id}`;
      const modelsData = await axios.get(models);
      dispatch(
        setModels(
          modelsData?.data?.map((n) => ({ value: n.id, label: n.name }))
        )
      );
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
    brand: brandValue?.value || "",
    model: modelValue?.value || "",
    city: values?.cityValue?.map((item) => item?.value) || "",
    min_year: values?.minYearValue?.label || "",
    max_year: values?.maxYearValue?.label || "",
    min_price: values?.minPriceValue || "",
    max_price: values?.maxPriceValue || "",
    price_type: values?.priceTypeValue?.value || "",
    loan: values?.loanValue || "",
    barterValue: values?.barterValue || "",
  };
  const handleChange = (e) => {
    dispatch(setIsLoading(true));
    e.preventDefault();
    navigate("/" + query + "&page=" + activePage);
    axios.get(`${url}/api/post/list${query}`).then((res) => {
      if (res.status === 200) {
        dispatch(setPosts(res.data));
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
    dispatch(setBrandValue(null));
    dispatch(setModelValue(null));
    const res=Object.keys(values).reduce((initial, key) => {
      initial[key] = null
      return initial
    },{})
    dispatch(setValues({...res}));

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
          dispatch(setPosts(res.data));
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

  // when nothing is selected ,button is disabled
  const enabled = Object.values(filterObject).every(stringChechker);
  function stringChechker(value) {
    if (value === "" || value.length === 0) return true;
    else return false;
  }

  console.log("values : ",values)
  // const customStyles = {
  //   singleValue: (base) => ({ ...base, color: "white" }),
  //   valueContainer: (base) => ({
  //     ...base,
  //     background: "#1C1C1E",
  //   }),
  //   indicatorsContainer: (base) => ({
  //     ...base,
  //     background: "#1C1C1E",
  //     color: "#fff",
  //   }),
  //   option: (base) => ({
  //     ...base,
  //     background: "#1C1C1E",
  //     color: "#fff",
  //     "--custom-color": "#3C3F53",
  //     cursor: "pointer",
  //   }),
  // };
  // const theme = (theme) => ({
  //   ...theme,
  //   borderRadius: 0,
  //   colors: {
  //     ...theme.colors,
  //     primary: "#212123",
  //   },
  // });
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
      <div className='flex justify-between lg:mb-4'>
        <Select
          className='lg:w-[270px] xl:w-[300px] rounded '
          isClearable
          placeholder='Marka'
          options={brands}
          value={brandValue}
          onChange={(e) => dispatch(setBrandValue(e))}
          // styles={customStyles}
          // theme={theme}
        />
        <Select
          className='lg:w-[270px] xl:w-[300px] rounded '
          isClearable
          placeholder='Model'
          options={models}
          value={modelValue}
          onChange={(e) => dispatch(setModelValue(e))}
          isDisabled={!brandValue}
          // styles={customStyles}
          // theme={theme}
        />
        <Select
          className='lg:w-[270px] xl:w-[300px]  rounded '
          isClearable
          isMulti
          placeholder='Şəhər'
          options={data.city}
          value={data.cityValue}
          onChange={(e) => dispatch(setValues({ ...values, cityValue: e }))}
        />
      </div>
      <div className='flex justify-between'>
        <div className='flex'>
          <Select
            className='lg:w-[135px] xl:w-[150px]'
            isClearable
            options={data?.year}
            placeholder='İl,min'
            value={data?.yearsValue}
            onChange={(e) =>
              dispatch(setValues({ ...values, minYearValue: e }))
            }
          />
          <Select
            className='lg:w-[135px] xl:w-[150px]'
            isClearable
            options={data?.year}
            placeholder='İl,max'
            value={data?.yearsValue}
            onChange={(e) =>
              dispatch(setValues({ ...values, maxYearValue: e }))
            }
          />
        </div>
        <div className='flex '>
          <input
            value={values?.priceValue}
            onChange={(e) =>
              dispatch(setValues({ ...values, minPriceValue: e.target.value }))
            }
            type='number'
            placeholder='Qiymət,min'
            min='0'
            step='500'
            className='lg:w-[135px] xl:w-[150px] px-2 bg-white text-black border-gray-400 border rounded flex items-center min-h-[38px] outline-none'
          />
          <input
            value={values?.priceValue}
            onChange={(e) =>
              dispatch(setValues({ ...values, maxPriceValue: e.target.value }))
            }
            type='number'
            placeholder='Qiymət,max'
            min='0'
            step='500'
            className='lg:w-[135px] xl:w-[150px] px-2 bg-white text-black border-gray-400 border rounded flex items-center min-h-[38px] outline-none'
          />
        </div>
        <div className='flex justify-between lg:w-[270px] xl:w-[300px] '>
          <Select
            className=' rounded'
            isClearable
            placeholder='Azn'
            options={data?.priceType}
            value={data?.priceTypeValue}
            onChange={(e) =>
              dispatch(setValues({ ...values, priceTypeValue: e }))
            }
          />
          <input
            className='hidden'
            onChange={(e) =>
              dispatch(setValues({ ...values, loanValue: e.target.checked }))
            }
            type='checkbox'
            id='checkbox3'
          />
          <label
            htmlFor='checkbox3'
            className={`${
              values?.loanValue && "bg-red-200"
            } mx-1 border border-red-500 px-2 py-1 rounded cursor-pointer`}
          >
            Kredit
          </label>
          <input
            type='checkbox'
            id='checkbox4'
            className='hidden'
            onChange={(e) =>
              dispatch(setValues({ ...values, barterValue: e.target.checked }))
            }
          />
          <label
            htmlFor='checkbox4'
            className={`${
              values?.barterValue && "bg-red-200"
            } mx-1 border border-red-500 px-2 py-1 rounded cursor-pointer`}
          >
            Barter
          </label>
        </div>
      </div>
      <div className='flex lg:mt-2 justify-end'>
        <div className='bg-slate-500 text-white flex items-center justify-center rounded w-full lg:w-[170px] h-[34px] lg:mt-2 mr-4'>
          <span>{posts?.count} Elan</span>
        </div>
        <button
          onClick={reset}
          className='border border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center rounded w-full lg:w-[170px] h-[34px] lg:mt-2 mr-4'
        >
          <RiArrowGoBackFill className='mr-1 text-lg' />
          <span>Sıfırla</span>
        </button>
        <button
          disabled={enabled === true}
          onClick={handleChange}
          className={`${
            enabled === true ? "bg-green-300" : "bg-green-500"
          } text-white flex items-center justify-center rounded w-full lg:w-[170px] h-[34px] lg:mt-2`}
        >
          <AiOutlineSearch className='mr-1 text-lg' />
          <span>Axtar</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
