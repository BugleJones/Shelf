"use strict";

var bcrypt = require('bcrypt');

//Creating helper functions to bridge data to the website
module.exports = function makeDataMovers(knex) {
  return {
    getAllUserData: () => {
      return knex
        .select('*')
        .from('users')
        .join('resources', 'resources.user_id', 'users.id');
    },
  }

  //Find ID of user on login
  function findId(id) {
    return new Promise((resolve, reject) => {
      knex('users')
      .select('*')
      .where({id: id})
      .limit(1)
      .then((rows) => {
        let user = rows[0];
        if (user) {
          return resolve(user);
        } else {
          return reject();
        }
      })
      .catch((error) = reject(error));
    })
  }
  //Find email of user on login
  function findByEmail(email) {
    return new Promise((resolve, reject) => {
      knex('users')
      .select('*')
      .where({email: email})
      .limit(1)
      .then((rows) => {
        let user = rows[0];
        if (user) {
          return resolve(user);
        } else {
          reject(email);
        }
      })
      .catch((error) => reject(error));
    })
  }
  //Check if email is unique to database on register
  function checkEmailUnique(email) {
    return new Promise((resolve, reject) => {
      findByEmail(email)
      .then((user) => {
        if (user) {
          return reject({
            type: 409,
            message: 'This email cannot be used'
          });
        } else {
          return resolve(email);
        }
      })
      .catch((email) => resolve(email))
    })
  }

  //Authenticate our user for login - email and password fields
  function authenticateUser(email, password) {
    let rejection = {
      type: 409,
      message: 'Invalid login, please try again'
    };
    return findByEmail(email)
      .then((user) => {
        if(!user) return Promise.reject(rejection);
        return bcrypt.compare(password, user.password)
          .then(matches => {
            if(matches) return user;
            return Promise.reject(rejection);
          })
      })
  }

  //Add new user on register
  function addUser(first_name, last_name, email, username, password) {
    return (
      checkEmailUnique(email) //Is email unique?
      .then(() => bcrypt.hash(password, 10);)
      .then((passwordDigest) => {
        return knex('users').insert({
          first_name: first_name,
          last_name: last_name,
          email: email,
          username: username,
          password: passwordDigest,
        }).returning('id');
      })
      .catch((error) => console.log("Invalid register, try again", error))
    )
  }

  //Update User Credentials
  function updateUser(id, newFirst, newLast, newEmail, newUsername, newPassword) {
    let updatePromises = [];

    if (newEmail) {
      updatePromises.push(checkEmailUnique(newEmail));
    } else {
      updatePromises.push(Promise.resolve(false));
    }

    if (newPassword) {
      promises.push(bcrypt.hash(newPassword, 10));
    } else {
      promises.push(Promise.resolve(false));
    }

  return Promise.all(promises).then((userCombined) => {
    const first_name = userCombined[0];
    const last_name = userCombined[1];
    const email = userCombined[2];
    const username = userCombined[3];
    const password = userCombined[4];

    const updatedUser = {};
    if (email) {
      updatedUser.email = email;
    }

    if (password) {
      updatedUser.password = password;
    }

    return knex ('users')
    .update(updatedUser)
    .where({id: id});
  })
}

  return {
    findId: findId,
    findByEmail: findByEmail,
    checkEmailUnique: checkEmailUnique,
    authenticateUser: authenticateUser,
    addUser: addUser,
    updateUser: updateUser
  };
}
