import Axios from 'axios';
import ApiConstants from './ApiConstants.json';


export const apiCall = async(methodType, endPoint, body, queryParams) => {
  //console.log('Query Params:',queryParams)
  var response;

    try{
      switch (methodType) {
        case ApiConstants.methods.GET:
          response = await Axios.get(`${ApiConstants.baseUrl}${endPoint}`
          //   params:{
          //     page: pageNo
          //   }
          // }
          );
          return response;
  
        case ApiConstants.methods.POST:
          response = await Axios.post(`${ApiConstants.baseUrl}${endPoint}`, body);
          return response;
  
        case ApiConstants.methods.PUT:
          response = await Axios.put(`${ApiConstants.baseUrl}${endPoint}`, body);
          return response
      }
    }
    catch(error){
      console.log('Axios Error:',error.response.data)
      return error
    }
};