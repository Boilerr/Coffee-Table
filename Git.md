# GIT RULES FOR THIS PROJECT

## PLAN
 * Commit messages
 * Git-Flow
 * GitHub

 * Day to day workflow
    * Local git


# GIT

## GIT COMMIT MESSAGE GUIDELINES
### Template

    Add, Fix, Change  50 chars or less summary: "If applied, this commit will <your subject line here>"

	Describe why a change is being made
    How does it address the issue?
    What effects does the patch have?

    The blank line separating the summary from the body is critical (unless you omit
    the body entirely)

    Further paragraphs come after blank lines

    - Bullet points are okay, too
    - Typically a hyphen or asterisk is used for the bullet, followed by a single space
    - Use a hanging indent
    - Wrap it to 72 characters


### Commit message
#### Subject line:
 * Capitalized
 * Use the imperative mood in the subject line: Add, Fix, Change. "Fix bug" and not "Fixed bug" or "Fixes bug."
 * A properly formed git commit subject line should be able to answer to questions:
   * If applied, this commit will <your subject line here>
   * What was the motivation for the change?
   * How does it differ from the previous implementation?
 * Short (50 chars or less)
 * Use a hanging indent

#### Separate subject from body with a blank line

#### Body:
 * Information in commit messages body:
   * Describe why a change is being made
   * How does it address the issue?
   * What effects does the patch have?
   * Describe any limitations of the current code

 * Do not assume the reviewer understands what the original problem was
 * Do not assume the code is self-evident/self-documenting
 * Read the commit message to see if it hints at improved code structure
 * The first commit line is the most important
 * Do not include patch set-specific comments

 * Bullet points are okay
 * Hyphen (-) is used for the bullet, followed by a single space
 * Use a hanging indent
 * Wrap lines at 72 characters


## GIT COMMIT BEST PRACTICES
### 1. Commit Related Messages
  A commit should be a wrapper for related changes.
  Small commits make it easier for other developers to understand the changes and roll them back if something went wrong.

### 2. Commit Often
  Committing often keeps your commits small and, again, helps you commit only related changes.
  Moreover, it allows you to share your code more frequently with others.
  That way it‘s easier for everyone to integrate changes regularly and avoid having merge conflicts.
  Having few large commits and sharing them rarely, in contrast, makes it hard to solve conflicts.

### 3. Don't Commit Half-Done Work

### 4. Test and Linter Your Code Before You Commit
  


# VERSIONING
Given a version number MAJOR.MINOR.PATCH, increment the:

* MAJOR version when you make incompatible API changes,  
* MINOR version when you add functionality in a backwards-compatible manner, and  
* PATCH version when you make backwards-compatible bug fixes.


# GIT-FOW FOR THIS PROJECT

## master branch
origin/master - HEAD always reflects a production-ready state of project

## develop branch
origin/develop -  HEAD always reflects a state with the latest delivered development changes for the next release.
When the source code in the develop branch reaches a stable point and is ready to be released, all of the changes 
should be `merged` back into master somehow and then `tagged` with a release number. 


## Feature branches (topic branches)
May branch off from: develop  
Must merge back into: develop

Branch naming convention:
`feature/foo-bar-3433`

Feature branches are used to develop new features for the upcoming or a distant future release. 
The essence of a feature branch is that it exists as long as the feature is in development, 
but will eventually be merged back into develop (to definitely add the new feature to the upcoming release) 
or discarded (in case of a disappointing experiment).

Feature branches exist in developer repos only, not in origin.

### Creating a feature branch 
When starting work on a new feature, create new feature/foo-bar-3433 branch from develop

```shell script
$ git checkout -b feature/foo-bar-3433 develop
Switched to a new branch "feature/foo-bar-3433"
```
Finished features merged into the `develop` branch to definitely add them to the upcoming release:
```shell script
$ git checkout develop
Switched to branch 'develop'
$ git pull --ff-only # update your develop
$ git merge --no-ff feature/foo-bar-3433 # merge completed work to develop
Updating esddj4a..jro56jf
$ git push origin develop # now fast push develop to origin/develop before is same
$ git branch -d feature/foo-bar-3433 # if push is successful, delete branch
Deleted branch feature/foo-bar-3433 (was 05e9557).
```
The --no-ff flag causes the merge to always create a new commit object, even if the merge could be performed with a fast-forward.   
This avoids losing information about the historical existence of a feature branch and groups together all commits that together added the feature. 


## Release branches 
May branch off from: develop  
Must merge back into: develop and master

Branch naming convention:
release/2.1

Release branches support preparation of a new production release. 
They allow for last-minute changing, minor bug fixes and preparing meta-data for a release (version number, build dates, etc.). 

### Creating a release branch 
```shell script
$ git checkout -b release-1.2 develop
Switched to a new branch "release-1.2"
# Change files for reflecting this release meta data
$ git commit -a -m "Bumped version number to 1.2"
```
This new branch may exist there for a while, until the release may be rolled out definitely. 
During that time, bug fixes may be applied in this branch.

### Finishing a release branch 

```shell script
$ git checkout master
Switched to branch 'master'
$ git merge --no-ff release-1.2 # Release branch is merged into master
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.2 # The release is now done, and tagged for future reference.
```

To keep the changes made in the release branch, we need to merge those back into develop, though. In Git:
```shell script
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff release-1.2
Merge made by recursive.
(Summary of changes)
# This step lead to a merge conflict fix it and commit.
```

```shell script
$ git branch -d release-1.2 # Remove release branch
Deleted branch release-1.2 (was ff452fe).
```

## Hotfix branches 
May branch off from: master  
Must merge back into: develop and master

Branch naming convention:
hotfix/some-details-9999

### Creating the hotfix branch 

```shell script
$ git checkout -b hotfix-1.2.1 master
Switched to a new branch "hotfix-1.2.1"
# Increase version in files
$ git commit -a -m "Bumped version number to 1.2.1" # Don’t forget to bump the version number after branching off!
[hotfix-1.2.1 43er1bb] Bumped version number to 1.2.1
1 files changed, 1 insertions(+), 1 deletions(-)
```
Then, fix the bug and commit the fix in one or more separate commits.
```shell script
$ git commit -m "Fixed severe production problem"
[hotfix-1.2.1 afre6d6] Fixed severe production problem
5 files changed, 32 insertions(+), 17 deletions(-)
```
### Finishing a hotfix branch 

```shell script
$ git checkout master
Switched to branch 'master'
$ git merge --no-ff hotfix-1.2.1
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.2.1
```

Next, include the bugfix in develop, too:
```shell script
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff hotfix-1.2.1
Merge made by recursive.
(Summary of changes)
```
```shell script
$ git branch -d hotfix-1.2.1
Deleted branch hotfix-1.2.1 (was abbe5d6).
```
