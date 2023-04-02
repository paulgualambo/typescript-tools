# TYPESCRIPT-TOOL

## PULL PROJECT

References

```sh
#Configure install nvm node typescript
https://github.com/nvm-sh/nvm

#Configure ssh in github
<https://stackoverflow.com/questions/600079/how-do-i-clone-a-subdirectory-only-of-a-git-repository/73587479#73587479>
mkdir <repo>
cd <repo>
git init
git remote add -f origin git@github.com:paulgualambo/typescript-tool.git

git config core.sparseCheckout true

echo "some/dir/" >> .git/info/sparse-checkout
echo "another/sub/tree" >> .git/info/sparse-checkout

git pull origin <branch>
```
