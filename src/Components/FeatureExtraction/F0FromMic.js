import {useEffect} from "react";
import {Energy, TrimBuffer, F0FromBuffer} from "./index";

const energyThreshold = 0.5;

export default () => {
   const [recording, toggle, e, buffer, sampleRate] = Energy();
   const bTrimmed = TrimBuffer({buffer: buffer, energy: e, energyThreshold: energyThreshold});
   const [f0, t] = F0FromBuffer({buffer: bTrimmed, sampleRate: sampleRate, scaleAxes: true});

   useEffect(() => {
      if(f0.length > 1)console.log(f0);
   }, [f0]);

   return [recording, toggle, f0, t];
}