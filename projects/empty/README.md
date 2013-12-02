## Why is this app folder empty?

Ember app kit is now configured to generate the app folder from a series of grunt tasks.

You must run one of these commands first to bootstrap a project template.

### Purge app folder
Remove existing `app` project folder (make sure important files are in version control) 

```
grunt purge
```

### Specific project skeletons


#### empty
A project with nothing but a readme. You will have to create all folders and files.

```
grunt project:empty
```

#### minimum
The least files required for an ember application. This will start up application template only.

```
grunt project:minimum
```

#### startkit
A minimalist project the emulates the ember starter kit 
https://github.com/emberjs/starter-kit 

```
grunt project:starterkit
```
