# NanoPlayer React Sample

## Version

1.2.0

## Copyright

(c) 2023, nanocosmos gmbh
<http://www.nanocosmos.de>
sales@nanocosmos.de

## Installation

### Install ESLint globally using

```bash
npm install -g eslint
```

### clone the repository and run

```bash
cd nanoplayer-react/
npm install
```

If you get an error regarding dependency peer, then run:

```bash
cd nanoplayer-react/

npm config set legacy-peer-deps true

npm install
```

Using yarn?, Run:

```bash
cd nanoplayer-react/
yarn
```

## Testing

In the project directory, you can run:

```bash
npm start
```

Using yarn?, Run:

```bash
yarn start
```

## Testing the Build version

In the project directory, you can run:

```bash
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port 3000

## Code Quality Check

NOTE: This is not obligetory but if you are adding to this project and you want to check you code with EsLint then; in your script in package.json add : "lint": "eslint src/\*_/_.jsx" . then Run:

```bash
cd nanoplayer-react/
eslint --fix --ext .jsx src
```

OR

```bash
cd nanoplayer-react/
npm run lint
```

Running this command will lint all .jsx files in the src directory.
