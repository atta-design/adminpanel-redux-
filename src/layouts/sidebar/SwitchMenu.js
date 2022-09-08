import React,{useState,useEffect} from 'react';
import {Switch, Route,Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Countries from '../../pages/countries/countryList'
import Roles from '../../pages/role/Roles'


function SwitchMenu(){
    const {t}= useTranslation()
    var selectValue = localStorage.getItem('lng');
    if(null === selectValue)
{
    selectValue = 'fa';
}
    const[language,setLanguage]=useState('')

    useEffect(()=>{
      setLanguage(selectValue)
    },[t])
    
    
    return(
        <Switch>
            <Route exact path="/">
    <Redirect to={language} />
</Route>
           
            <Route path={'/'+language +'/Nations'} component={Countries} />
            <Route path={'/'+language +'/Roles'} component={Roles} />
            
        </Switch>
    )
}


export default SwitchMenu;