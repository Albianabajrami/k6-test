import { deleteUsers, getUsers, postUser, updateUsers } from "./api-users-test.js";
import { login } from "./api-auth-test.js";
import { deleteBooks, getBooks, postBooks, updateBooks } from "./api-books-test.js";
import { deletebookReviews, getBookReviews, postBookReviews, updateBookReviews } from "./api-bookreview-test.js";

export const options =  {
  stages: [
      { duration: '10s', target: 30 },
      { duration: '5s', target: 20 },
      { duration: '10s', target: 0 },
  ],

  thresholds: {
      http_req_duration: ['p(95)<5'],
      http_req_failed: ['rate<0.01'],
      checks: ['rate>0.99'],
  }
};

const endpoint: string = __ENV.ENDPOINT;
const group: string = __ENV.GROUP;

export default function () {

  if(group == 'users')
  {
    if (endpoint == "get") {
      getUsers();
    } else if (endpoint == "post") {
      postUser();
    } else if (endpoint == "update") {
      updateUsers();
    } else if (endpoint == "delete") {
      deleteUsers();
    }
  }

  if(group == 'auth')
  {
    if( endpoint == 'login'){
     login(); 
    }
  }

  if(group == 'books'){

    if (endpoint == "get") {
      getBooks();
    } else if (endpoint == "post") {
      postBooks();
    } else if (endpoint == "update") {
      updateBooks();
    } else if (endpoint == "delete") {
      deleteBooks();
    }
  
  }

  if(group == 'bookReviews'){

    if (endpoint == "get") {
      getBookReviews();
    } else if (endpoint == "post") {
      postBookReviews();
    } else if (endpoint == "update") {
      updateBookReviews();
    } else if (endpoint == "delete") {
      deletebookReviews();
    }
  
}

}