const axios = require('axios');

axios.post('http://localhost:3001/add_users_to_wages')
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
