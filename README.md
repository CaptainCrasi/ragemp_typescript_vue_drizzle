
## ragemp_typescript_vue_drizzle
 Boilerplate project for RageMP.
 #### Advantages of using this boilerplate:
 * Adds Typescript for type safety.
 * Adds VueJS (through Vite) to easily create CEF UI's
 * Adds DrizzleORM for database management.
 * Adds Event Handlers for the server side, client side, and CEF.
	 * Reduces formatting errors (everything is through JSON)
	 * Increases efficiency (ex; can directly call server->CEF instead or server->client->CEF).

## Prerequisites
* [NodeJS 16+](https://nodejs.org/en/download/current/)
* [GIT](https://git-scm.com/downloads)
## Usage
### 0. Clone The Repository
- Ensure the prerequisites are installed
- Open the folder where you want the project.	
- Clone the repository:
```git clone https://github.com/CaptainCrasi/ragemp_typescript_vue_drizzle.git```
### 1. Setup The Database
- **Open a new terminal**
	```
	cd ragemp-typescript 
	npm install
	```
- **Rename .envexample to .env and change the Database URL to match your server**  
<sub>*The project uses MySQL. If you want to change it you'll have to change the settings in /ragemp-typescript/\_drizzle/ and /ragemp-typescript/drizzle.config.ts*</sub>

- **Push the test _accounts_ table to your database**  
	```
	npm run db:generate
	npm run db:migrate
	```  
You should now see the new table on your database.
* **[SKIP] Test the database connection in game**  
	* _Skip this test and continue the rest of the setup, come back when connected in game_
	* Type ```/acc [username] [email] [password]``` in chat 
You should see a new entry under the _accounts_ table in your database
>#### Make your own tables
>- Add a new table under /_ragemp-typescript/\_drizzle/schema/_ (ex: characters.ts).
>- Export the table in /_ragemp-typescript/\_drizzle/schema/index.ts_
>- Push the new schema to your database again



**Important:** Reference the function for the ``/acc`` command in _/ragemp-typescript/src/server/commands/playercommands.ts_ for more detail on how to refence the _db_ and _schema_ variables to perform queries.

### 2. Setup VueJS
All VueJS components are stored under _/myvite/_. In fact, VueJS is under a completely different project and must be recompiled everytime there is a change, and we only move the _/myvite/dist/_ folder into our ragemp distribution.
* **Open a new terminal**
* **Build the project**
	```
 	cd myvite
	npm install
	npm run build
	```
* **Push the changes to RageMP**  
	```
	cd ../ragemp-typescript
	npm run build
	```

That's it. There is already a precompiled project with TailwindCSS and Pinia Store. You are free build on top of it or switch the VueJS setup to your liking.
>#### Current VueJS Setup Breakdown
>The current VueJS setup consists of:
>- A _Main.vue_ file containing the default UI, for now it is only a logo but you can add more UI elements to it (ex: money balance, speedometer, etc...)
>- An empty _Authenticator.vue_ file in _/myvite/src/pages/_, for now only displays 'auth' on the top left, but you can build a login/signup UI on it.
>#### Add a new display component (page)
>- Add a new Vue file anywhere under _/myvite/src/_
>- Register it in _/myvite/src/main.ts_
>**Note** that a display component is a component that will be displayed on the whole page. You do not need to register your custom < Header1 /> component, but should register a Character Creator page that will take up the full screen.
>#### Switch displaying between display components
>- You can use the Display Store in _/myvite/src/store/DisplayStore.ts_
>or ```setDisplay [displayName]``` command in game. 
>**Important:** the displayName string is case sensitive and must match the registered name for the component. The current ones are 'Main' and 'Authentication'. You should only use the function to familiarize yourself on how to call the display store from the server.

### 3. Setup the RageMP server
After having setup your database and VueJS, the last step is to setup the server to connect to in-game.
- **Build the project (again if you've already done it in Step 2)**
	- Open a new terminal
	- 	```
		cd ragemp-typescript
		npm run build
		```
	
* **Get Necessary Server Files**
	* Open your RageMP launcher installation path
	* Open _config.xml_ and change _prerelease_ to _prerelease\_server_
	* Run _updater.exe_
	* Open _config.xml_ again and change _prerelease\_server_ back to _prerelease_
	* Open _/server-files/_ and copy all files (except _/client_packages/_ and _/packages/_) and paste them in _/ragemp-typescript/dist/_
* **Run the server**
Open _/ragemp-typescript/dist/ragemp-server.exe_.
* **Connect in game**
Open your RageMP Launcher and direct connect to your server

**Optional:** Return to Step 1 and finish testing your database connection
## Features
* Vite (VueJS)  
* DrizzleORM

**To Do**  
Need to add documentation:  
 - Custom addCommand() function  
 - Eventhandler (add function documentation) -> (CEF to Client bugged)
## References
I would like to recognize and thank everyone who's works I have used and referenced to make this project possible.
### Referenced Works  
- [LeonardSSH](https://github.com/leonardssh/) for their [ragemp-typescript](https://github.com/leonardssh/ragemp-typescript) template. This boilerplate is mainly built on top of his foundation.
- [Pichalomo](https://rage.mp/profile/140321-pichalomo/ "Go to pichalomo's profile") for their [advanced chat](https://rage.mp/files/file/421-advanced-chat-dependency-free). A much better looking chat.
- [Root-cause](https://github.com/root-cause/ragemp-improved-commands/commits?author=root-cause) for their [improved-commands](https://github.com/root-cause/ragemp-improved-commands). Improves command handling.
- [Drizzle-team](https://github.com/drizzle-team) for their [drizzle-orm](https://github.com/drizzle-team/drizzle-orm).
- [Vuejs](https://github.com/vuejs) team for [VueJS](https://github.com/vuejs/core).
- [Vitejs](https://github.com/vitejs) team for [Vite](https://github.com/vitejs/vite).
