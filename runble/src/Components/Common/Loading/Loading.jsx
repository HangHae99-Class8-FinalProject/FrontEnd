import Lottie from "lottie-react";
import Loader from "./LoadingLottie.json";
import styled from "styled-components";

const Loading = ({ children }) => {
  return (
    <LottieWrap>
      <div>
        <Lottie animationData={Loader} />
        <LottieMsg>{children}</LottieMsg>
      </div>
    </LottieWrap>
  );
};

export default Loading;

const LottieWrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 500;
  background-color: white;
`;

const LottieMsg = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top: 35rem;
  font-size: 2.4rem;
  font-family: "Anton";
`;
