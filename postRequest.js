import axios from 'axios';

const data = {
    name: "John Doe",
    phoneNumber: "1234567890",
    email: "john.doe@example.com",
    isFavourite: true,
    contactType: "work"
};

axios.post('http://localhost:3000/api/contacts', data)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
