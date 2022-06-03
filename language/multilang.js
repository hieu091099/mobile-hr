import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vi } from './lang_vi';
import { tw } from './lang_cn';
import { mm } from './lang_mm';
import { en } from './lang_en';

export const multilang={
           
        vi,
         en,
        tw,  
         mm    
 }
// export const multilang = ()=>{
//         const { lang } = useSelector(state => state.UserReducer);
//         return {vi,en,tw,mm}[lang];
// }
