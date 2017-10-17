# Shelf

By Spencer Hamilton (BugleJones), Scott Hagan (prescottie), Kevin More (kevinmore80) and Jeff Fitzgerald (j33ff)

## Features

1. Users can view the Library main page to find new and interesting resources
2. Users can use the search bar to filter results to more specific resources
3. Creating resources is customizable
  - Users can provide the original link, a title, a description and a custom tag
4. While users must register/sign in to publish a resource - this is all possible through the main Library page
5. Resources can be liked
6. Resources can be commented on from the resource-specific pages

## Captures

![Shelf Library: Home Page](https://github.com/BugleJones/Shelf/blob/master/docs/TheLibrary.png)
![Add to Your Shelf](https://github.com/BugleJones/Shelf/blob/master/docs/AddToShelf.png)
![Resource From the Main Library](https://github.com/BugleJones/Shelf/blob/master/docs/ResourcePage.png)

## Starting Up Shelf

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

7. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
8. Update the .env file with your correct local information
9. Install dependencies: `npm i`
10. Fix to binaries for sass: `npm rebuild node-sass`
11. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
12. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
13. Run the server: `npm run local`
14. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
