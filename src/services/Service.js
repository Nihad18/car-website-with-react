import axios from "axios" 
import {useDispatch } from "react-redux";
import { setPosts } from "../redux/reducers/serviceSlice"

const Service = () => {
    const dispatch=useDispatch()
   const postLists=()=>{
            axios.get("/api/post/list/")
              .then((response) => {
                dispatch(setPosts(response?.data?.results));
                // setPostId(response?.data?.result?.id);
              })
              .catch((error) => console.log(error))
    }
    const postDetail=()=>{
        axios.get(`/api/post/detail/${10}`)
        .then(response =>console.log(response))
        .catch((error) => console.log(error))
    }
}

export default Service

