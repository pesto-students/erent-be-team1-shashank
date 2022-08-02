[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Process to run in development mode

```
Create config folder in root folder
inside of this folder, create dev.env file

npm i

npm run dev

PS: By default sever will use 8080 PORT, if you want to change,
use .env file and change PORT value

You'll get API Details in home(/) route
```

### How to use commitizen

```sh
git add .
npx cz
```

---

### About commit messages

We're following [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/#specification)
to write proper commit messages.

---

### To be note

Before commit `husky` will check `linting` and `commit messages convention`
