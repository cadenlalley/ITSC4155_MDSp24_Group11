# ITSC4155_MDSp24_Group11
# Sweat Rivals

* Current Lofi Prototype:
    * [Figma](https://www.figma.com/file/OS5jemh1gPtQJ20cy4WhP0/Sweat-Rivals-Lofi?type=design&node-id=0-1&mode=design&t=ATiqHcLSGq3mepPC-0)


* How the Repository is Organized
   * We used MVC architecture for our application and so its organized with each layer being a folder. We have a controller folder for all the controller files for each of the features, a routes folder for all of the routes used for each feature, a views folder that holds all of the ejs files, and finally a models folder that holds all of our schemas. Outside of the MVC layer folders there is one for middleware that we created(validators and authenticators), there is also a public folder that holds images used(the logo), and custom code for deleting a flash message. The last folder is the docs folder that holds the current and previous versions of diagrams, user stories, and the design document. The package json file is for the all the packages we used, and the config.sample file is used to connect to the mongoDB database. The last thing is the app file that is used to run the application.

* Git Command Help:
    * `git checkout -b <branch>` to create and switch to new branch
    * `git add .` to stage all edited files
    * `git push -u origin <branch>` to push staged files to the specified branch
    * `git pull` pull changes from current branch
      
* Prerequisite Installation Instructions:
   * [nodejs](https://nodejs.org/en/download) 
   * [nodemon](https://www.npmjs.com/package/nodemon)

* Installation Instructions: 
    * If using Git Bash or something similar
       * cd to the folder you want to save the cloned repository in
       * Clone the repository onto your computer by running `git clone https://github.com/cadenlalley/ITSC4155_MDSp24_Group11.git`
    * If using Studio Visual Code or another coding software that is connected with GitHub
       * Open the Source Control tab and enter `https://github.com/cadenlalley/ITSC4155_MDSp24_Group11.git`
    * Once the repository is cloned
       * Copy `config.sample.js` into `config.js` and add required fields
       * Type `npm install` in Git Bash or terminal if using VSCode, to install dependencies
       * Then type `node app` if you are just using node or `nodemon app` if you are using nodemon to run the server
       * In a browsing window enter `http://localhost:3000`
