import { useEffect } from "react";
import axios from "axios";
// React Redux
import { useSelector, useDispatch } from "react-redux";
import { setBrands, setModels, setModelValue, setData,} from "../../redux/reducers/searchSlice";
const FetchData = () => {
  const url = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.search.brands);
  const brandValue = useSelector((state) => state.search.brandValue);
  const fetchData = async (id) => {
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
        priceType: data?.price_type?.map((n) => ({
          value: n.id,
          label: n.name,
        })),
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
    dispatch(setModelValue(null));
  }, [brandValue]);
  useEffect(() => {
    let id = brands.indexOf(brandValue) + 1;
    fetchData(id);
  }, [brandValue]);
  return fetchData
  
};

export default FetchData;
