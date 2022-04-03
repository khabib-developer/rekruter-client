import {BrowserRouter as Router } from "react-router-dom";
import { SwipeDrawer } from "./components/Drawer";
import {  BackgroundLoader } from "./components/pre-loader/BackDrop";
import { SnackbarError, SnackbarInfo, SnackbarSuccess, SnackbarWarning } from "./components/snackBar";
import { useRefresh } from "./hooks/refresh.hook";
import { Routess } from './routes';
function App() {
  // document.cookie = "username=John Doe";
  // const {connect} = useRefresh()

  // useEffect(() => {
  //   connect()
  // }, [connect])
  return (
    <>
      <Router>
        <SwipeDrawer />
        <SnackbarError />
        <SnackbarInfo />
        <SnackbarWarning />
        <SnackbarSuccess />
        <BackgroundLoader />
        <Routess />
      </Router>
    </>
  );
}

export default App;
