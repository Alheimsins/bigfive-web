# Deploy to Zeit/Now

This is the step by step howto for deploying your own version of this solution.

# Prerequisites

On your local machine you'll need
- Node.js/npm
- A texteditor
- now-cli
- a local copy of this repo

On the web you'll need
- a paid now account
- hosted MongoDB like compose og mlab
- an available url to use as alias

# Step 1 - Setup a database

Go to your database provider and setup a database and add a user.
Take a note of the database connection string. Usually it looks like something like this

```
mongodb://<dbuser>:<dbpassword>@testbase.mlab.com:27634/b5base
```

`<dbuser>` and `<dbpassword>` are hopefully something else :-)

# Step 2 - Pick an alias at Now

If you use the Now nameservers and have your domain connected to Now you can basically do whatever you want.
If not you have to be sure that whatever you pick are free at *.now.sh. For this example i'll use myb5test.now.sh.

# Step 3 - Add the secrets to Now

You'll need a added to the now account you are going to use.

- b5_db_connection - this is the MongoDB connection string from step 1

in you cli add the secrets

```
$ now secrets add b5_db_connection "mongodb://<dbuser>:<dbpassword>@testbase.mlab.com:27634/b5base"
```

You can use another name for your secret and even don't add it but then you'll have to handle it in the next step

# Step 4 - configure your production environment

Open production.env in your text-editor and change the following
```
DB_CONNECTION=@b5_db_connection # unless you chose another name leave this or add the connection string
DB_COLLECTION=results # You can leave this as is
URL=https://myb5test.now.sh # This is the url from step 2
```

# Step 5 - configure your now environment

With your favorite editor open now.json and change `alias` to what you've selected (for my part it would be myb5test.now.sh)

# Step 6 - deploy

Run the deploymentscript in your terminal

```
$ npm run deploy
```

# Step 7 - celebrate

You're finished and your own big five test should be up and running

