import React from "react"
import ContentLoader from "react-content-loader"

const PostLoader = ({cards}) => (
    Array(cards).fill(0).map((_,i)=>(
  <ContentLoader 
    key={i}
    speed={2}
    width={220}
    height={270}
    viewBox="0 0 220 270"
    style={{margin:"8px"}}
    backgroundColor="#d4d4d4"
    foregroundColor="#e8e8e8"
  >
    <rect x="-13" y="0" rx="0" ry="0" width="243" height="114" /> 
    <rect x="508" y="116" rx="0" ry="0" width="52" height="41" /> 
    <rect x="2" y="124" rx="0" ry="0" width="91" height="18" /> 
    <rect x="206" y="140" rx="0" ry="0" width="1" height="0" /> 
    <rect x="1" y="155" rx="0" ry="0" width="91" height="16" /> 
    <rect x="1" y="179" rx="0" ry="0" width="133" height="16" /> 
    <rect x="0" y="203" rx="0" ry="0" width="132" height="14" /> 
    <rect x="1" y="223" rx="0" ry="0" width="189" height="16" />
  </ContentLoader>
    ))
)

export default PostLoader