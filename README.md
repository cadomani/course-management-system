# Course Management System (COMP3700)

## Tools
- **Development Environment**
  + IDE &rarr; [Visual Studio Code](https://code.visualstudio.com/)
<br></br>
- **Tooling**
  + Windows (Preferred)
    + [Overview](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl) (covers everything below)
    + [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab)
    + [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
    + [Ubuntu on WSL](https://ubuntu.com/wsl)
    + [VSCode (Needed for Ubuntu remote, installed in setup)]()
    + Node.js
        ```sh
        # Run within Ubuntu on WSL
        > curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
        > sudo apt-get install -y nodejs

        # Then test (major versions 16 for node and 7 for npm should be the same but others can change)
        > node --version
        v16.9.1
        > npm --version
        7.23.0
        ```
 
  + Windows (Alternative)
    + [Node.js](https://nodejs.org/en/download/current/) (choose current v16.9.x)
    + [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab) (optional)
    + [git-scm](https://gitforwindows.org/)
  
  + OSX
    + [Node.js](https://nodejs.org/en/download/current/) (choose current v16.9.x)
    + [Hyper](https://hyper.is/) (Better terminal for mac, not required)

- **Application / Database Design**
  + Software UML Design &rarr; [Lucidchart](https://lucid.app/lucidchart/invitations/accept/inv_c5fecb92-6aba-4db5-a2cf-bbb834c1133a)

<br></br>
## Setup
### Configure git ###
  + Generate SSH Key - [Reference](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)
    ```sh
    # 1. Start ssh-agent if it is not running
    > eval "$(ssh-agent -s)"
    Agent pid XX
    
    # 2. Verify it is running, if you get "Could not open a connection to your authentication agent.", try last step again
    > ssh-add -l
    The agent has no identities.
    
    # 3. Generate a new SSH key
    > ssh-keygen -t ed25519 -C "github_account@email.com"
    Generating public/private ed25519 key pair.
    Enter file in which to save the key (/home/YOUR_ACCOUNT/.ssh/id_ed25519):
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /home/YOUR_ACCOUNT/.ssh/id_ed25519
    Your public key has been saved in id_ed25519.pub
    The key fingerprint is:
    SHA256:XXXXX github_account@email.com
    The keys randomart image is:
    XXXXX
    
    # 4. Navigate to the directory where the key was saved and add SSH Key to agent
    > cd /home/YOUR_ACCOUNT/.ssh/
    > ssh-add id_ed25519
    Identity added: /home/YOUR_ACCOUNT/.ssh/id_ed25519 (github_account@email.com)
    
    # 5. Enable access to github with your public key
    > cat id_ed25519.pub
    ssh-ed25519 XXXXX github_account@email.com
    
    # 6. Copy this key and save it for the next step
    # 7. Keep in mind you may need to repeat steps 1, 2, and 4 every time you relaunch the terminal (google "bashrc set ssh-agent" to automatically configure this)
    ```
  + Open your personal GitHub and follow [these steps](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) with the public key you copied earlier
  + Add important global defaults to your git terminal ([more info](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup))
    ```sh
    # Set username, password, init branch, and other configuration
    > git config --global user.name "John Doe"
    > git config --global user.email johndoe@example.com
    > git config --global init.defaultbranch main
    > git config --global fetch.prune true
    ```
- **Set up environment**
  + Clone repository
    ```sh
    # Navigate to where the repository should be cloned
    > git clone git@github.com:cadomani/course-management-system.git
    GIT CLONE XXXX
    
    # Navigate inside the newly cloned git repository
    > cd course-management-system
    
    # Run vscode remote from this directory (this will install it on WSL if it wasn't already and load the workspace)
    # (if this doesn't work, check that it is installed from tools, otherwise open it within windows and use Ctrl + Shift + P
    # to bring up the menu, and select Remote-WSL: Open folder in WSL...
    # You may get a dialog that a workspace was found, allow it to open that.
    > code workspace.code-workspace
    ```
  ### IMPORTANT! **Allow VSCode to install all recommended extensions and open up the workspace, this is so we can run the server/client and be able to use debug configurations**
<br></br>
### Initialize and Run ###
  + Initialize, install, and launch React and Express
    - Install and run Express
        ```sh
        # Navigate to the backend folder and install dependencies (ignore warnings)
        > cd backend
        > npm install
        ```        
    - Add environment values for backend
        + Create a new file inside the backend folder (AKA Express Server inside VSCode) and call it *.env* (the dot is required). Fill in these values:
          ```sh
          # BACKEND
          NODE_ENV=development
          PORT=5070
          CORS_ORIGIN=http://localhost:5080

          # DATABASE 
          MONGODB_USERNAME=YOUR_MONGODB_USERNAME
          MONGODB_PASSWORD=YOUR_MONGODB_PASSWORD
          MONGODB_DATABASE=cms
          MONGODB_SERVER=cms-db.dv0vb.mongodb.net
          MONGODB_URL=mongodb+srv://YOUR_MONGODB_USERNAME:YOUR_MONGODB_PASSWORD@cms-db.dv0vb.mongodb.net/cms?retryWrites=true&w=majority
          ```
        + Run react app
          ```sh
          # Navigate to the backend folder and try to launch server (don't close terminal after this)
          > npm run dev
          ```
        + You should get a screen like this:
        ![image](https://user-images.githubusercontent.com/7801988/134072431-ba52c755-63d8-46e6-bdd4-5470d9bbaa59.png)
        + Open up a browser and browse to [http://localhost:5070](http://localhost:5070)
        + The Express Server is up and running, type Ctrl + C to shut it down or close the terminal *(IMPORTANT)*
     - Install and run React
        ```sh
        # Navigate to the frontend folder and install dependencies (ignore warnings)
        > cd frontend
        > npm install
        ```
      - Add environment values for frontend
        + Repeat the same steps for creating a file for the frontend folder (AKA React Client inside VSCode) and call it *.env* (the dot is required). Fill in these values:
          ```sh
          # FRONTEND
          NODE_ENV=development
          PORT=5080
          REACT_APP_SERVER_URL=http://localhost:5070
          ```
        + Run react app
          ```sh
          # Navigate to the frontend folder and try to launch client (don't close terminal after this)
          > npm start
          ```
        + You should get a screen like this:
          -![image](https://user-images.githubusercontent.com/7801988/134072360-48896642-1c54-4efa-b2b4-e0b3bcf0ab29.png)
        + Open up a browser and browse to [http://localhost:5080](http://localhost:5080)
        + The React Client is being served by Node.js, type Ctrl + C to shut it down or close the terminal *(IMPORTANT)*
  + Run program from within VSCode to test hot-reloading
    - Run debugger from within VSCode by clicking Ctrl + Shift + D and selecting *Debug Server, Client, and Launch Browser*
      + A browser window should open up (Chrome most likely) and show the React homepage.
    - Make small changes in either the **App.jsx** or **index.js** file (change something that won't break) and verify that the page changed after the changes were made without restarting.
<br></br>
## Standards
- Create and checkout a new branch before working on any code, never commit to main (it will fail). The main branch will be used for CI and production code so we can merge or squash commits to it after reviewing all code. 
  + When creating branches name them however you like but preferably keep them short and add a tag for what was worked on. i.e. if we added a login system, your branch can be called *loginform* or *auth*
- Commit often and add don't just commit everything without a message. Instead, stage files that correspond to work that was done and make multiple commits with descriptive messages.
- Avoid pushing unfinished code. If you need to switch gears, stash code using VSCode or git and commit it at a later time. If unfinished code must be pushed, indicate as such or commit to a throwaway local branch.
- Never hardcode credentials in code (sensitive data should originate from .env file) or commit any files that contain any credentials. Any other sensitive information like emails should be excluded from commits by selectively choosing lines to commit or by changing the information.
<br></br>
## References
+ **[Branching/Merging](https://www.varonis.com/blog/git-branching/)**
  
<br></br>
## Problem Statement

- **Introduction**

    Student Management System is software which is helpful for students as well as the school authorities. Our Student Management System deals with the various activities related to the students. The main objective of the project is to facilitate the interaction between students and instructors related to the presentation of projects, tasks, thesis and allows instructors to give feedback to students.

    This application will host three modules, the first for (1) administrators, the second for (2) students, and lastly for (3) instructors.

    (1) The administrator module will allow admins to manage functions related to creating accounts for students and instructors, creating course curriculums and class subjects, managing the employees and payroll. 

    (2) The student module will allow students to log into their accounts to view their coursework, submit their projects, and receive feedback from instructors.

    (3) Lastly, the instructor module is designed for instructors to log in to their accounts and check assignments submitted by their students as well as being able to give feedback.

- **10 use cases to incorporate**
    1. Login/Logout functionality 
    2. Administrators can access registration flow for faculty and students
    3. Faculty/Staff can assign students to class by name/email
    4. Instructors can grade assignments and provide feedback
    5. Instructors can add/remove students 
    6. Instructors can post announcements, discussions, and upload files.
    7. Students can submit projects (upload files)
    8. Students can work on quizzes and assignments 
    9. Students can drop/withdraw from classes 
    10. Students can view coursework/grades

### Hierarchy

**Universal**

- Login
- Logout

**Administrators**

- Register Faculty
- Register Staff

**Instructors/Faculy**

- Grade assignments
- Add/remove students
- Post announcements, discussions, and assignments

**Students**

- Submit assignments (file upload)
- Take quizzes and exams
- View coursework (grades)
- Drop/Withdraw courses
