import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function ProfileUpload() {
    // useState 훅을 이용하여 Image element의 src의 상태를 변경시켜준다.
   const [fileUrl, setFileUrl] = useState(null);
   const fileUpload =useRef(null)

   const location = useLocation();
   const navigate = useNavigate();
  
   //인풋이 onChange 될 때
   const chgPreview = (e) => {
   //현재 이미지 파일
   const imageFile = e.target.files[0];
   //선택한 이미지 파일의 url
   const imageUrl = URL.createObjectURL(imageFile);

   setFileUrl(imageUrl)
   }

   
  
 return(
    <>
      <form >
      <label htmlFor="imgFile">
         {
            !fileUrl ?
            <Grid>
               <DefaultImg src={`${process.env.PUBLIC_URL}/img/userprofile.png`}/>
            </Grid>:
               
               <Image src={fileUrl}/>
            
         }
      </label>
            <FileBox type="file" accept="image/*" name="profile_Img" ref={fileUpload} onChange={chgPreview} id="imgFile"/>
            <NicInput name="profile_Nic"/>
         <JoinBtn >JOIN US</JoinBtn>
            
       </form>
    </>
 )
}

export default ProfileUpload

const Grid = styled.div`
   background: '#eee';
   width:"374px";
   height: "236px";
   margin: "23px auto";
   border-radius: "44px";
   padding: "15% 30%";
`
const DefaultImg = styled.img`
   width:200px;
   display: block;
  margin:100px auto;`

const Image = styled.img`
   width: 200px;
   height: 236px;
   display: block;
  margin:100px auto;
`
const FileBox = styled.input`
display: none;
`
const NicInput = styled.input`
  display: block;
  margin:0 auto;
`
const JoinBtn = styled.div`
   width: 100%;
   height:100px;
   color: white;
   font-size: 80px;
   background-color:black;
   text-align: center;
   margin-top:450px;
`

