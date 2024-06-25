import axios from "axios";

// node src/index.js

// Get all contacts
// node test.js

// axios.get('http://localhost:3000/api/contacts')
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

//Get contact by sample id
//node test.js

// axios.get('http://localhost:3000/api/contacts/666bf52764b73a53690bbd52')
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// Add (post) contact with { data }
//node test.js

// const data = {
//     name: "John Doe",
//     phoneNumber: "1234567890",
//     email: "john.doe@example.com",
//     isFavourite: true,
//     contactType: "work"
// };

// axios.post('http://localhost:3000/api/contacts', data)
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });


// Update contact by sample id
// const contactId = '666bf52764b73a53690bbd52'; // Replace with a valid contact ID
// const updateData = {
//     name: "Jhane Joe",
//     phoneNumber: "0987654321",
//     email: "jane.doe@example.com",
//     isFavourite: false,
//     contactType: "home"
// };

// axios.patch(`http://localhost:3000/api/contacts/${contactId}`, updateData)
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
