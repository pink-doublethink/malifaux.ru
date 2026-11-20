import { useSyncExternalStore } from "react";

// how to use
// const macOS = useOs()
// returns true/false

const subscribe = () => () => {};

const getSnapshot = () => navigator.platform.indexOf("Mac") > -1;
const getServerSnapshot = () => false;

const useOs = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useOs;
