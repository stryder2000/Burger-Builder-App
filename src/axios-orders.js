import axios from 'axios';

const instance  = axios.create({
    baseURL: 'https://react-burger-builder-3d148-default-rtdb.firebaseio.com/'
});

export default instance;
