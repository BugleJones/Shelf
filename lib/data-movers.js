"use strict";

const bcrypt = require("bcrypt");

//Creating helper functions to bridge data to the website
module.exports = function makeDataMovers(knex) {
  function getAllResources() {
    return knex("resources")
      .select("name")
      .join("resource_tags", "resources.id", "resource_tag.resource_id")
      .join("tags", "tags.id", "resource_tags.tag_id");
  }

  function getResourcesById(id) {
    return knex("resources")
      .where({ id })
      .limit(1)
      .then(([resource]) => resource);
  }

  ///Login-Registration

  //Find ID of user on login
  function findId(id) {
    return knex("users")
      .select("*")
      .where({ id })
      .limit(1)
      .then(([user]) => user);
  }

  //Find email of user on login
  function findByEmail(email) {
    return knex("users")
      .where({ email })
      .limit(1)
      .then(([user]) => user);
  }

  //Check if email is unique to database on register
  function checkEmailUnique(email) {
    return findByEmail(email).then(user => {
      if (!user) {
        return false;
        return email;
      }
    });
  }

  //Authenticate our user for login - email and password fields
  function authenticateUser(email, password) {
    return findByEmail(email).then(user => {
      if (!user) return false;
      return bcrypt.compare(password, user.password).then(matches => {
        if (!matches) return false;
        return user;
      });
    });
  }

  //Add new user on register
  function addUser(first_name, last_name, email, username, password) {
    return checkEmailUnique(email) //Is email unique?
      .then(() => bcrypt.hash(password, 10))
      .then((passwordDigest) => {
        return knex('users').insert({
          first_name: first_name,
          last_name: last_name,
          email: email,
          username: username,
          password: passwordDigest,
        }).returning('id')
        .then((id)=>{
          return id;
        });
      })
      .catch(error => console.log("Invalid register", error));
  }

  //Update User Credentials
  function updateUser(
    id,
    newFirst,
    newLast,
    newEmail,
    newUsername,
    newPassword
  ) {
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
    return Promise.all(promises).then(userCombined => {
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
      return knex("users")
        .update(updatedUser)
        .where({ id: id });
    });
  }

  //Given a resource id and user id, insert a record into Likes table
  function likeHandler(resource_id, user_id) {
    if (!request.session) {
      return;
    }
    const isLiked = knex("likes").where({
        resource_id: resource_id,
        user_id: user_id
      });
    if (isLiked) {
      return knex("likes").where({
        resource_id: resource_id,
        user_id: user_id
      }).del();
    } else {
      return knex("likes").insert({
        resource_id: resource_id,
        user_id: user_id
      });
    }
  }

  function sumLikes(resource_id) {
    return knex("likes").count(resource_id).where("resource_id", resource_id);
  }

  return {
    findId,
    findByEmail,
    checkEmailUnique,
    authenticateUser,
    addUser,
    updateUser,
    likeHandler,
    sumLikes
  };
};
