# Popoeshnick.club

Start your adventure in alhogolizm world!
Features:
- join popoeshnick club
- start your own Popoyka
- drink Buhlishko and add it to your Popoyka's params
- complete your current Popoyka and be in competition with over Alkashs in lygryls competition

## File structure:
```
  front/ - web interface
    src/ - source code
      components/ - react silly components
      constants/
      routes/ - routes
      utils/
    stub/ - local mock server
  dummy/ - backend mock server
```

## Tech

Popoeshnick uses a number of open source projects to work properly:

* [ReactJS]
* [node.js]
* [Express]
* ...

### Installation

**Frontend**

Popoeshnick requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd popoeshnick/front
$ npm i
$ npm run dev
```


**Backend**



The steps below are provided for venv, however any other virtual environment manager can be used. Python version is 3.7.8.

0. Set up local database server:


- download and install PostgreSQL 12 - https://www.postgresql.org/download/

- create a db and corresponding user:

```
postgres=# create database mydb;
postgres=# create user myuser with encrypted password 'mypass';
postgres=# grant all privileges on database mydb to myuser;
```

1. Create virtual environment:
python -m venv <env_name>

2. Activate the environment:

- Windows:    
\<env_name>\Scripts\Activate.ps1

Activate.ps1 is the activation script for PowerShell. In cmd, use .bat one.

- Linux: 
source <env_name>/bin/activate

3. Install the dependencies:
pip install -r requirements.txt 

4. Set environment variables SECRET_KEY and DB_URI:

- Windows (PowerShell):
$env:DB_URI="postgresql://db_user:db_password@host:port/db_name"
$env:SECRET_KEY="value"

- Linux:
export DB_URI="postgresql://db_user:db_password@host:port/db_name"
export SECRET_KEY="value"

5. Run the app:
python app.py 



License
----

MIT
