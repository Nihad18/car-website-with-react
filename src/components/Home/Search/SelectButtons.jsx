import { AiOutlineSearch } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveButton,
  setSearchActiveButton,
  setDetailedSearchToggle,
} from "../../../redux/reducers/searchSlice";

const SelectButtons = () => {
  const dispatch = useDispatch();
  const types = [" Bütün", "Yeni", "İşlənmiş"];
  const searchTypes = ["Sadə axtarış", "Ətraflı axtarış"];
  const active = useSelector((state) => state.search.activeButton);
  const searchActive = useSelector((state) => state.search.searchActiveButton);
  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex-col lg:flex-row w-full flex justify-between text-red-500'>
        <div className='flex mb-4'>
          {types.map((type) => (
            <button
              className={`w-full lg:min-w-[140px] h-[34px] px-3  mr-4 rounded hover:bg-red-100 dark:hover:bg-slate-500 border border-red-500  dark:border-slate-500 dark:text-white flex justify-center items-center
        ${
          active === type &&
          "bg-red-500 text-white hover:bg-red-500 dark:bg-white dark:text-black dark:hover:bg-white"
        } `}
              key={type}
              active={active === type}
              onClick={() => dispatch(setActiveButton(type))}
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
          "bg-red-500 text-white hover:bg-red-500 dark:bg-white dark:text-black dark:hover:bg-white"
        } `}
              key={type}
              active={searchActive === type}
              onClick={() => {dispatch(setSearchActiveButton(type));
              type===searchTypes[1] && dispatch(setDetailedSearchToggle(true));
              type===searchTypes[0] && dispatch(setDetailedSearchToggle(false));
              }}
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
  );
};

export default SelectButtons;
