let IS_PROD = false;
const server = IS_PROD ?
    "https://videocall-backend-pzvp.onrender.com" :

    "http://localhost:4000"


export default server;