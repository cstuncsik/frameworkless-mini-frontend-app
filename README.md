# frameworkless-mini-frontend-app
A minimal experimental MV* frontend app without libs and frameworks, just vanilla javascript

## Nodejs

**Install dependencies**
```
npm i
```

**Start development**
```
npm run dev
```

*By default the dev server starts at port 8080, if it is in use you can set another from param*

```
npm run dev -- --port 3000
```

**Build production**

```
npm run build
```

**Static code analysis (linting)**
```
npm run lint
```

**Single run unit tests (in PhantomJS)**

```
npm test
```

**Run unit tests in Chrome and watch (rerun on code change)**

```
npm run watch:test
```

*You can change browser from param*

```
npm run watch:test -- --browsers Firefox
```

```
npm run watch:test -- --browsers PhantomJS
```

```
npm run watch:test -- --browsers Chrome,Firefox
```
