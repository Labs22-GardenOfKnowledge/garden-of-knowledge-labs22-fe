const productionURL = `https://garden-of-knowledge-labs22.herokuapp.com`;
const localhost = `http://localhost:4000`;


const API_URL = (process.env.REACT_APP_NODE_ENV === 'production') ? productionURL : localhost;

export default API_URL;
