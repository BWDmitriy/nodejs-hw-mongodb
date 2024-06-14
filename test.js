import axios from "axios";

axios.get('http://localhost:3000/contacts')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
