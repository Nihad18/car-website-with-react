import { useEffect } from "react";
import axios from "axios";
// Custom Components
import Input from "../Select/Input";
import Select from "../Select/Select";
import CheckBox from "../../components/Select/CheckBox";
import SimpleSelect from "../Select/SimpleSelect";
import MobileSelect from "../Select/MobileSelect";
import SelectedButtons from "./Search/SelectButtons";
import DetailedSearch from "./Search/DetailedSearch";
// React Redux
import { useSelector, useDispatch } from "react-redux";
import {
  setPosts,
  setQuery,
  setPageCount,
  setActivePage,
  setIsLoading,
  setPageNotLoading,
} from "../../redux/reducers/postSlice";
import { setResetToggle } from "../../redux/reducers/toggleSlice";
import {
  setBrandValue,
  setModelValue,
  setValues,
} from "../../redux/reducers/searchSlice";
// React icons
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import FetchData from "./FetchData";
import { useNavigate } from "react-router";
const Search = () => {
  const url = process.env.REACT_APP_API_URL;
  const activePage = useSelector((state) => state.post.activePage);
  const query = useSelector((state) => state.post.query);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.post.posts);
  const brands = useSelector((state) => state.data.brands);
  const models = useSelector((state) => state.data.models);
  const brandValue = useSelector((state) => state.search.brandValue);
  const modelValue = useSelector((state) => state.search.modelValue);
  const values = useSelector((state) => state.search.values);
  const extraBooleanFields = useSelector(
    (state) => state.search.extraBooleanFieldsValue
  );
  const data = useSelector((state) => state.data.data);
  const resetToggle = useSelector((state) => state.toggle.resetToggle);
  const filterObject = {
    brand: brandValue || "",
    model: modelValue || "",
    city: values?.cityValue || "",
    min_year: values?.minYearValue || "",
    max_year: values?.maxYearValue || "",
    min_price: values?.minPriceValue || "",
    max_price: values?.maxPriceValue || "",
    price_type: values?.priceTypeValue?.value || "",
    loan: values?.loanValue || "",
    barterValue: values?.barterValue || "",
    color: values?.colorValue || "",
    fuel: values?.fuelValue || "",
    gear: values?.gearValue || "",
    transmission: values?.transmissionValue || "",
    min_engine_volume: values?.minEngineVolumeValue || "",
    max_engine_volume: values?.maxEngineVolumeValue || "",
    min_engine_power: values?.minEnginePowerValue || "",
    max_engine_power: values?.maxEnginePowerValue || "",
    min_mileage: values?.minMileageValue || "",
    max_mileage: values?.maxMileageValue || "",
    prior_owners_count: values?.priorOwnerCountValue || "",
    seats_count: values?.priorOwnerCountValue || "",
    crashed: values?.crashedValue || "",
    painted: values?.paintedValue || "",
    market: values?.marketValue || "",
    extra_fields: extraBooleanFields || "",
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
    dispatch(setBrandValue(""));
    dispatch(setModelValue(""));
    const res = Object.keys(filterObject).reduce((initial, key) => {
      initial[key] = "";
      return initial;
    }, {});
    dispatch(setValues({ ...res }));
    dispatch(setQuery(""));
    dispatch(setIsLoading(true));
    dispatch(setResetToggle(false));
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
  useEffect(() => {
    dispatch(setBrandValue(""));
    dispatch(setModelValue(""));
    const res = Object.keys(filterObject).reduce((initial, key) => {
      initial[key] = "";
      return initial;
    }, {});
    dispatch(setValues({ ...res }));
  }, [resetToggle]);
  // when nothing is selected ,button is disabled
  const disabled = Object.values(filterObject).every(stringChechker);
  function stringChechker(value) {
    if (value === "" || value.length === 0) return true;
    else return false;
  }

  console.log("brand : ",brandValue)
  console.log("model : ",modelValue)
  console.log("value :",values)
  return (
    <div className='min-h-[250px] w-full sm:w-[540px] lg:w-[960px] xl:min-w-[1250px] rounded p-6 mx-auto bg-white dark:bg-[#242426] '>
      <FetchData />
      <SelectedButtons />
      <div className='hidden lg:grid lg:grid-cols-3 xl:grid-cols-4'>
        <Select options={brands} placeHolder='Marka' brand={true} />
        <Select
          options={models}
          placeHolder='Model'
          model={true}
          isDisabled={!brandValue}
        />
        <Select
          options={data?.city}
          type={"cityValue"}
          placeHolder='Şəhər'
          isMulti={true}
          ID={true}
        />
        <div className='flex'>
          <Select
            options={data?.year}
            placeHolder='Il,min'
            type={"minYearValue"}
            containerClassName={"w-[120px] mr-2"}
          />
          <Select
            options={data?.year}
            placeHolder='Il,max'
            type={"maxYearValue"}
            containerClassName={"w-[120px]"}
          />
        </div>
        <div className='flex'>
          <Input
            placeHolder={"Qiymet,min"}
            type={"minPriceValue"}
            inputValueLength={9}
            containerClassName={"w-[116px] mr-2"}
          />
          <Input
            placeHolder={"Qiymet,max"}
            type={"maxPriceValue"}
            inputValueLength={9}
            containerClassName={"w-[116px]"}
          />
        </div>
        <div className='flex max-h-[46px]'>
          <SimpleSelect
            options={data?.priceType}
            type={"priceTypeValue"}
            defaultValue={"AZN"}
            containerClassName={"w-[85px]"}
            inputClassName={"h-[46px]"}
          />
          <CheckBox
            placeHolder={"Kredit"}
            inputClassName={"ml-2 px-2 py-1"}
            onChangeType={true}
            type={"loanValue"}
          />
          <CheckBox
            placeHolder={"Barter"}
            inputClassName={"ml-3 px-2 py-1"}
            onChangeType={true}
            type={"barterValue"}
          />
        </div>
        <Select
          options={data?.category}
          type={"categoryValue"}
          placeHolder='Ban növü'
          isMulti={true}
          ID={true}
        />
        <Select
          options={data?.color}
          type={"colorValue"}
          placeHolder='Rəng'
          isMulti={true}
          ID={true}
        />
      </div>
      <DetailedSearch />
      {/* =============== MOBILE SEARCH START ======================================== */}
      <div className='grid grid-cols-2 lg:hidden'>
        <MobileSelect placeholder={"Marka"} Id={true} brand={true} single={true} options={brands} />
        <MobileSelect placeholder={"Model"} Id={true} model={true} isDisabled={!brandValue} single={true} options={models} />
        <MobileSelect placeholder={"İl"} options={data?.year} type={"minYearValue"} secondType={"maxYearValue"} />
        <MobileSelect placeholder={"İl"} options={data?.year} type={"minYearValue"} secondType={"maxYearValue"} />
        <MobileSelect placeholder={"İl"} options={data?.year} type={"minYearValue"} secondType={"maxYearValue"} />
      </div>
      {/* =============== MOBILE SEARCH END ======================================== */}

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
          disabled={disabled === true}
          onClick={handleChange}
          className={`${
            disabled === true ? "bg-green-300" : "bg-green-500"
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
