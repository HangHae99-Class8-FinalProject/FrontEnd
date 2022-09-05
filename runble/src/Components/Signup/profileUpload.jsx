import { useState } from "react"
import styled from "styled-components";

function ProfileUpload() {
    // useState 훅을 이용하여 Image element의 src의 상태를 변경시켜준다.
   const [fileUrl, setFileUrl] = useState(null);
  
   //인풋이 onChange 될 때
   const chgPreview = (e) => {
   //현재 이미지 파일
   const imageFile = e.targe.files[0];
   //선택한 이미지 파일의 url
   const imageUrl = URL.createObjectURL(imageFile);

   setFileUrl(imageFile)
   }

 return(
    <>
      <label for="imgFIle">
         {
            !fileUrl ?
            <Grid>
               
            </Grid>:
               <Image src={fileUrl}/>

         }
      </label>
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
const Image = styled.img`
   width: 374px;
   height: 236px;
   margin: 3% auto";
`


