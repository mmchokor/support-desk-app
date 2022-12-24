import axios from 'axios';
import { useState } from "react";

const myState = () => {
   const [isLoading, setIsLoading] = useState("");

   setIsLoading(true);

   console.log(isLoading)

}

const API_URL = 'http://localhost:3000/api/users/'

// Register user
const register = async (usereData) => {
   const response = await axios.post(API_URL, usereData)

   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
   }
   return response.data
}

// Login user
const login = async (usereData) => {
   const LOGIN = 'login'
   const API_URL_LOGIN = API_URL.concat(LOGIN)

   const response = await axios.post(API_URL_LOGIN, usereData)

   if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
   }
   return response.data
}

// Logout user
const logout = () => {
   localStorage.removeItem('user')
}

const authService = {
   register,
   logout,
   login,
}

export default authService
