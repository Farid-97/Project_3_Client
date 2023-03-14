import axios from 'axios';

class ExampleService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/examples
  addPost = async (requestBody) => {
    return this.api.post('/api/post', requestBody);
  }

  // GET /api/examples
  getAllPosts = async () => {
    return this.api.get('/api/post');
  }

  // GET /api/examples/:id
  getOnePost = async (id) => {
    return this.api.get(`/api/post/${id}`);
  }

  // PUT /api/examples/:id
  updateOnePost = async (id, requestBody) => {
    return this.api.put(`/api/editPost/${id}`, requestBody);
  }

  // DELETE /api/examples/:id
  deletePost = async (id) => {
    return this.api.delete(`/api/post/${id}`);
  } 


  uploadImage = async (file) => {
    const response = await this.api.post("/api/upload", file)
      return response.data
  };

  getUser = async () => {
    return this.api.get('/api/getUser');
  }

  addPostFavourites = async (id) => {
    return this.api.get(`/api/favourites/${id}`);
  }
}

// Create one instance of the service
const exampleService = new ExampleService();

export default exampleService;