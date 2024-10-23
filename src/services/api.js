import axios from 'axios';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

const fetchTickets = async () =>{
    try{
        const resposnse = await axios.get(API_URL); //fetching json data from the api url.
        return resposnse.data; //returning the response data
    } catch(error){
        console.error("Error fetching tickets - Error details :", error); //displaying the error message
        return []; //returning empty array of objects , if error occurs.
    }
}

export default fetchTickets;