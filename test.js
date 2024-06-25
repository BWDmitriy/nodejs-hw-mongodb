import axios from "axios";

// node src/index.js

// Get all contacts
// node test.js

axios.get('http://localhost:3000/contacts')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

//Get contact by sample id
//node test.js

// axios.get('http://localhost:3000/contacts/666bf52764b73a53690bbd52')
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
