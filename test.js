import axios from "axios";

// axios.get('http://localhost:3000/contacts')
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

axios.get('http://localhost:3000/contacts/666bf52764b73a53690bbd52')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
