import actionTypes from './actionTypes';
import {getAllCodeService, createNewUserService,
        getAllUsers, deleteUserService, editUserService,
        getTopDoctorHome, getAllDoctors, saveDetailDoctorService,
        getAllSpecialty, getAllClinic
    } from '../../services/userService';
import { toast } from "react-toastify";


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart =  () => {
    return async (dispatch, getState) =>{
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data));
            }else{
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error: ',e);
        }
    }
    
}
export const fetchPositionStart =  () => {
    return async (dispatch, getState) =>{
        try {
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            }else{
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed error: ',e);
        }
    }
    
}
export const fetchRoleStart =  () => {
    return async (dispatch, getState) =>{
        try {
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed error: ',e);
        }
    }
    
}
export const createNewUser = (data) =>{
    return async (dispatch, getState) =>{
        try {
            let res = await createNewUserService(data) ;
            if(res && res.errCode === 0){
                toast.success("Create a new user succeed!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Create the user error!");
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error("Create the user error!");
            dispatch(saveUserFailed());
            console.log('saveUserFailed error: ',e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})

export const editAUser = (data) =>{
    return async (dispatch, getState) =>{
        try {
            let res = await editUserService(data) ;
            if(res && res.errCode === 0){
                toast.success("Update the user succeed!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Update the user error!");
                dispatch(editUserFailed());
                console.log(res)
            }
        } catch (e) {
            toast.error("Update the user error!");
            dispatch(editUserFailed());
            console.log('EditUserFailed error: ',e);
        }
    }
}

export const editUserSuccess = () =>({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () =>({
    type: actionTypes.EDIT_USER_FAILED
})


export const deleteAUser = (userId) =>{
    return async (dispatch, getState) =>{
        try {
            let res = await deleteUserService(userId) ;
            if(res && res.errCode === 0){
                toast.success("Delete the user succeed!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error!");
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error: ',e);
        }
    }
}

export const deleteUserSuccess = () =>({
    type: actionTypes.DELETE_USER_SUCCESS,

})
export const deleteUserFailed = () =>({
    type: actionTypes.DELETE_USER_FAILED,

})

export const fetchAllUserStart =  () => {
    return async (dispatch, getState) =>{
        try {
            let res = await getAllUsers("ALL");
            let res1 = await getTopDoctorHome('4');
             console.log('check res1: ', res1)
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }else{
                toast.error("Fetch all users error!");  
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all users error!");
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error: ',e);
        }
    }
}
export const fetchAllUsersSuccess = (data) =>({
    type: 'FETCH_ALL_USERS_SUCCESS',
    users: data,
})
export const fetchAllUsersFailed = () =>({
    type: 'FETCH_ALL_USERS_FAILED',
    
})


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED,
})

export const fetchPositionSuccess = (PositionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: PositionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})

export const fetchTopDoctor = () =>{
    return async (dispatch, getState) =>{
        try{
            let res = await getTopDoctorHome('');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }else{
               
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
                
                  
            }
          //  console.log('check res from fetchTopdoctor: ', res)
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED: ', e)
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
        }
}
}

export const fetchAllDoctors = () =>{
    return async (dispatch, getState) =>{
        try{
            let res = await getAllDoctors();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            }else{
               
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
                
                  
            }
           // console.log('check res from fetchAlldoctor: ', res)
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED: ', e)
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
        }
}
}

export const saveDetailDoctor = (data) =>{
    return async (dispatch, getState) =>{
        try{
            let res = await saveDetailDoctorService(data);
            if(res && res.errCode === 0){
                toast.success("Save InforDetail Doctor succeed!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                })
            }else{
                console.log('check res error: ',res)
                toast.error("Save InforDetail Doctor error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
                })
                
                  
            }
           // console.log('check res from fetchAlldoctor: ', res)
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTORS_FAILED: ', e)
            toast.error("Save InforDetail Doctor error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
                })
        }
}
}

export const fetchAllScheduleTime = () =>{
    return async (dispatch, getState) =>{
        try{
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else{
               
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
                
                  
            }
           // console.log('check res from fetchAlldoctor: ', res)
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e)
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
        }
}
}

export const getRequiredDoctorInfor =  () => {
    return async (dispatch, getState) =>{
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if(resPrice && resPrice.errCode === 0
             &&   resPayment && resPayment.errCode === 0
             &&   resProvince && resProvince.errCode === 0
             &&   resSpecialty && resSpecialty.errCode === 0
             &&   resClinic && resClinic.errCode === 0
             ){
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            }else{
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchRequiredDoctorInforFailed error: ',e);
        }
    }
    
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED,
})





