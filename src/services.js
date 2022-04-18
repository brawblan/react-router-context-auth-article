class User {
  constructor() {
    // this would be where you create the User data to utilize later
    this.isLoggedIn = false
  }

  setIsLoggedIn(loggedIn) { this.isLoggedIn = loggedIn }
}
// ^^^ We could use this file above to set anything specific 
// to the user that is logging in. Keeping our files and classes 
// separated like have been allows for the separation of concerns. 
// We can keep our code clutter free by separating different actions and objects.

export class AuthService extends User {
  constructor() {
    super()
    // we won't be using this, but this is where you would extend   any other properties you'd like
    this.authToken = ''
    this.bearerHeader = {}
  }
  
  // #setAuthToken(token) { this.authToken = token }
  // #setBearerHeader(token) { 
  //   this.bearerHeader = {
  //     'Content-Type': 'application/json',
  //     'Authorization': `bearer ${token}`
  //   }
  // }
  // getBearerHeader = () => this.bearerHeader
  
  loginUser(word) {
    if (word === 'true') {
      this.setIsLoggedIn(true)
    }
  }
  
  logoutUser() {
    this.setIsLoggedIn(false)
  }


  // async loginUser(email, password) {
  // database endpoint logic to login user
  // }

}
