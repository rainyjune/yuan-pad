export async function getUserInfo() {
  const response = await fetch('index.php?controller=user&action=getUserInfo');
  const result = await response.json();
  return result.response;
};

export async function createUser(userData: any) {
  const urlEncodedData = new URLSearchParams(userData).toString();

  const serverResponse = await fetch('index.php?controller=user&action=create', {
    method: 'POST', // Specify the request method as POST
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // Specify the content type
    },
    body: urlEncodedData // Convert the data object to a JSON string
  });
  return await serverResponse.json();
}

export async function updateUser(userData: any) {
  const urlEncodedData = new URLSearchParams(userData).toString();

  const serverResponse = await fetch('index.php?controller=user&action=update', {
    method: 'POST', // Specify the request method as POST
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // Specify the content type
    },
    body: urlEncodedData // Convert the data object to a JSON string
  });
  return await serverResponse.json();
}

export async function logoutUser() {
  const response = await fetch('index.php?controller=user&action=logout', {
    method: 'POST', // Specify the request method as POST
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
  return await response.json();
}

export async function loginUser(formData: any) {
  const urlEncodedData = new URLSearchParams(formData).toString();

  const serverResponse = await fetch('index.php?controller=user&action=login', {
    method: 'POST', // Specify the request method as POST
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // Specify the content type
    },
    body: urlEncodedData // Convert the data object to a JSON string
  });
  return await serverResponse.json();
};

export async function getAllPosts() {
  const response = await fetch('index.php?controller=post&action=all');
  const result = await response.json();
  return result;
}

export async function getPosts() {
  const response = await fetch('index.php?controller=post&action=list');
  const result = await response.json();
  return result;
};

export async function createPost(postData: any) {
  const urlEncodedData = new URLSearchParams(postData).toString();

  const serverResponse = await fetch('index.php?controller=post&action=create', {
    method: 'POST', // Specify the request method as POST
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // Specify the content type
    },
    body: urlEncodedData // Convert the data object to a JSON string
  });
  return await serverResponse.json();
};

export async function getSystemInformation() {
  const response = await fetch('index.php?controller=site&action=getSystemInformation');
  const result = await response.json();
  return result;
}