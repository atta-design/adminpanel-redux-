import React, { useEffect, useState, createContext } from "react";
import Pagination from "../../components/paging/Pagination";
import { ButtonConfig as AddRuleButtonConfig } from './AddRuleButtonConfig';
import {default as Button} from '../../components/button/Button';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
// components
import Rolelist from "./Rolelist";
//utiles
import { useToast } from "../../utils/toast/useToast";
import getStatusMessage from "../../utils/statusHandler";
import { TableListConfig } from "./configs/tableListConfig";
import RoleEditModal from "../../components/modal/RoleEditModal";
import { fetchRoledata } from "../../redux/reducers/getDataReducer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../layouts/common/Loading";
export const DataContext = createContext({
  dataListView: [],
  setDataListView: () => {},
  setDataCount: () => {},
  currentPage: [],
  setCurrentPage: () => {},
  searchValue: "",
  setSearchValue: () => {},
  filterStatusValue: "",
  setFilterStatusValue: () => {},
  sortValue: "",
  setSortValue: () => {},
  isLoading: false,
  setIsLoading: () => {},
  uid: false,
  setUid: () => {},
});

function Roles2() {
  const reduxdata = useSelector((state) => state.getData.roleRequest);
  const history = useHistory();
  const dispatch = useDispatch();
  const pageList =5;
  const { showMessage } = useToast();
  const [uid, setUid] = useState("");
  const [dataCount, setDataCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [dataListView, setDataListView] = useState([]);
const{t}=useTranslation()
  const value = {
    dataListView,
    setDataListView,
    searchValue,
    setSearchValue,
    currentPage,
    setCurrentPage,
    isLoading,
    setIsLoading,
    uid,
    setUid,
  };

  async function getLoadData(e) {
    dispatch(fetchRoledata(`/Role/List?From=${0}&Count=${pageList}`));
    try {
      if (reduxdata.length !== 0) {
        if (reduxdata.status === 1) {
          setDataCount(reduxdata.content.count);
        setIsLoading(false);


          setDataListView(reduxdata.content.items);
        } else {
          showMessage(true, getStatusMessage(reduxdata.status), "error");
        }
      }
    } catch (e) {
      showMessage(true, "خطایی در واکشی داده رخ داده است", "error");
    }
  }

  useEffect(() => {
    getLoadData();
  }, [reduxdata.status]);
  
  var selectValue = localStorage.getItem('lng');
    if(null === selectValue)
{
    selectValue = 'fa';
}
 let dir
selectValue==='en'?dir="ltr":dir="rtl"
  return (
    <DataContext.Provider value={value}>
   {isLoading?<Loading/>:   <div dir={dir} className=" post d-flex flex-column-fluid" >
        <div id="  kt_content_container" >
          <div className="border border-2 border border-secondary card mx-3 mb-5 mb-xl-8">
            <div className="card mb-5 mb-xl-8">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bolder fs-1 mb-1">
                   {t('roleList')}
                  </span>
                </h3>
               
              </div> 
              <div className="card-toolbar">
                <div className="d-flex justify-content-end px-10">
              <Button 
              
                                    config={AddRuleButtonConfig}
                                    onClick={() => {
                                        history.replace("/role/add")
                                    }}
                                /></div>
                                </div>
              <div dir='rtl' className="card-body py-3">
                {reduxdata.length !== 0 && (
                  <div>
                    {" "}
                      <Rolelist
                      config={TableListConfig}
                      dataContext={DataContext}
                      modal={{ obj: RoleEditModal, title: t('roleEdit')} }
                    />
                  
                  <Pagination
                      dataCount={dataCount}
                      pageList={pageList}
                      pageURL={"role/list"}
                      dataContext={DataContext}
                    />
                  
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>}
     
    </DataContext.Provider>
  );
}

export default Roles2;
