import Axios from 'axios';
import ApiConstants from './ApiConstants.json';


export const apiCall = async(methodType, endPoint, body) => {

  var response;

  // switch (methodType) {
  //     case ApiConstants.methods.GET:
  //       response = await Axios.get(`${ApiConstants.baseUrl}${endPoint}`);
  //       return response;

  //     case ApiConstants.methods.POST:
  //       response = await Axios.post(`${ApiConstants.baseUrl}${endPoint}`, body);
  //       return response;

  //     case ApiConstants.methods.PUT:
  //       response = await Axios.put(`${ApiConstants.baseUrl}${endPoint}`, body);
  //       return response
  //   }

    try{
      switch (methodType) {
        case ApiConstants.methods.GET:
          response = await Axios.get(`${ApiConstants.baseUrl}${endPoint}`);
          return response;
  
        case ApiConstants.methods.POST:
          response = await Axios.post(`${ApiConstants.baseUrl}${endPoint}`, body);
          //{headers: {"Content-Type": "multipart/form-data"}});
          return response;
  
        case ApiConstants.methods.PUT:
          response = await Axios.put(`${ApiConstants.baseUrl}${endPoint}`, body);
          return response
      }
    }
    catch(error){
      //console.log('Axios Error:',error.response.data)
      return error
    }
};