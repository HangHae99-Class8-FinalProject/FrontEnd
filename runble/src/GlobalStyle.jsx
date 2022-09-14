import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`



/* height: calc(var(--vh, 1vh) * 100); */
/* width: calc(var(--vw, 1vw) * 100); */
:root{
  -webkit-text-size-adjust: none;
  --vh: 100%;
  --vw: 100%;
}

 html,body{
  margin: 0;
  padding: 0;
  font-family: "Noto Sans CJK KR";
 }


`;

export default GlobalStyle;
