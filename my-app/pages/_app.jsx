import Header from "../components/Header";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          margin: 0;
          font-family: Noto Sans KR, Noto Sans;
        }
      `}</style>
    </>
  );
};
export default MyApp;
