const { default: axios } = require("axios");


export const BASE_URL="http://localhost:9090"
//ek instance create kar diya hai 
const clientServer=axios.create({
    baseURL:BASE_URL
})

export default clientServer;