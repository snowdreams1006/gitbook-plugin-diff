# Welcome to gitbook-plugin-diff 👋

[![npm:version](https://img.shields.io/npm/v/gitbook-plugin-diff.svg)](https://www.npmjs.com/package/gitbook-plugin-diff)
[![npm:download](https://img.shields.io/npm/dt/gitbook-plugin-diff.svg)](https://www.npmjs.com/package/gitbook-plugin-diff)
[![npm:prerequisite](https://img.shields.io/badge/gitbook-*-blue.svg)](https://www.npmjs.com/package/gitbook-plugin-diff)
[![github:documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/snowdreams1006/gitbook-plugin-diff#readme)
[![github:maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/snowdreams1006/gitbook-plugin-diff/graphs/commit-activity)
[![npm:license](https://img.shields.io/npm/l/gitbook-plugin-diff.svg)](https://github.com/snowdreams1006/gitbook-plugin-diff/blob/master/LICENSE)
[![github:snodreams1006](https://img.shields.io/badge/github-snowdreams1006-brightgreen.svg)](https://github.com/snowdreams1006)
[![website:snodreams1006.tech](https://img.shields.io/badge/website-snowdreams1006.tech-brightgreen.svg)](https://snowdreams1006.tech/)
[![微信公众号:雪之梦技术驿站-brightgreen.svg](https://img.shields.io/badge/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7-%E9%9B%AA%E4%B9%8B%E6%A2%A6%E6%8A%80%E6%9C%AF%E9%A9%BF%E7%AB%99-brightgreen.svg)](https://snowdreams1006.github.io/snowdreams1006-wechat-public.jpeg)

> A gitbook plugin for showing the differences between the codes within markdown

[English](./README.md) | [中文](./README_zh.md)

### 🏠 [Homepage](https://github.com/snowdreams1006/gitbook-plugin-diff#readme)

- Github : [https://snowdreams1006.github.io/gitbook-plugin-diff/](https://snowdreams1006.github.io/gitbook-plugin-diff/)
- GitLab: [https://snowdreams1006.gitlab.io/gitbook-plugin-diff/](https://snowdreams1006.gitlab.io/gitbook-plugin-diff/)
- Gitee : [https://snowdreams1006.gitee.io/gitbook-plugin-diff/](https://snowdreams1006.gitee.io/gitbook-plugin-diff/)

## Screenshot

- usage

````markdown
{% diff method="diffJson" %}
```json
{
  "name": "gitbook-plugin-simple-mind-map",
  "version": "0.2.1",
  "description": "A gitBook plugin for generating and exporting mind map within markdown"
}
```
```json
{
  "name": "gitbook-plugin-diff",
  "version": "0.2.1",
  "description": "A gitbook plugin for showing the differences between the codes within markdown"
}
```
{% enddiff %}
````

- preview

```diff
{
-   "description": "A gitBook plugin for generating and exporting mind map within markdown",
-   "name": "gitbook-plugin-simple-mind-map",
+   "description": "A gitbook plugin for showing the differences between the codes within markdown",
+   "name": "gitbook-plugin-diff",
    "version": "0.2.1"
}
```

## Usage

### Step #1 - Update `book.json` file

In you gitbook's `book.json` file, add `diff` to `plugins` list.

Here is simplest example :

```json
{
    "plugins": ["diff"]
}
```

In addition, the supported configuration options are as follows : 

```json
"gitbook": {
    "properties": {
        "type": {
            "type": "string",
            "title": "render type",
            "required": false,
            "default": "markdown",
            "description": "some supported methods such as markdown or console or html"
        },
        "method": {
            "type": "string",
            "title": "jsdiff api method",
            "required": false,
            "default": "diffChars",
            "description": "some supported methods such as diffChars or diffWords or diffWordsWithSpace or diffLines or diffTrimmedLines or diffSentences or diffJson or diffArrays"
        },
        "options": {
            "type": "object",
            "title": "jsdiff api options",
            "required": false,
            "description": "some methods may not support options"
        }
    }
}
```

### Step #2 - Use in markdown file

`diff` support `method` and `options` for generating diff block code.

Here is basic grammar in your markdown file :

````
{% diff %}
```
old code
```
```
new code
```
{% enddiff %}
````

And there are some examples :

#### `Diff.diffChars(oldStr, newStr[, options])`

> diffs two blocks of text, comparing character by character.

**Return**

Returns a list of change objects (See below).

**Option**

- `ignoreCase`: `true` to ignore casing difference. Defaults to `false`.

**Examples**

- usage 

> set `method="diffChars"` to call `Diff.diffChars(oldStr, newStr[, options])` method

````markdown
{% diff method="diffChars" %}
```js
cat
```
```js
cap
```
{% enddiff %}
````

- preview 

```diff
  ca
- t
+ p
```

#### `Diff.diffWords(oldStr, newStr[, options])`

> diffs two blocks of text, comparing word by word, ignoring whitespace.

**Return**

Returns a list of change objects (See below).

**Option**

- `ignoreCase`: Same as in `diffChars`.

**Examples**

- usage 

> set `method="diffWords"` to call `Diff.diffWords(oldStr, newStr[, options])` method

````markdown
{% diff method="diffWords" %}
```bash
beep boop  
```
```bash
beep boob blah
```
{% enddiff %}
````

- preview 

```diff
  beep 
- boop
+ boob

+ blah
```

#### `Diff.diffWordsWithSpace(oldStr, newStr[, options])`

> diffs two blocks of text, comparing word by word, treating whitespace as significant.

**Return**

Returns a list of change objects (See below).

**Option**

- `ignoreCase`: Same as in `diffWords`.

**Examples**

- usage 

> set `method="diffWordsWithSpace"` to call `Diff.diffWordsWithSpace(oldStr, newStr[, options])` method

````markdown
{% diff method="diffWordsWithSpace" %}
```bash
beep boop  
```
```bash
beep boob blah
```
{% enddiff %}
````

- preview 

```diff
  beep 
- boop
+ boob blah
```

#### `Diff.diffLines(oldStr, newStr[, options])`

> diffs two blocks of text, comparing line by line.

**Return**

Returns a list of change objects (See below).

**Option**

- `ignoreWhitespace`: `true` to ignore leading and trailing whitespace. This is the same as `diffTrimmedLines`
- `newlineIsToken`: `true` to treat newline characters as separate tokens.  This allows for changes to the newline structure to occur independently of the line content and to be treated as such. In general this is the more human friendly form of `diffLines` and `diffLines` is better suited for patches and other computer friendly output.

**Examples**

- usage 

> set `method="diffLines"` to call `Diff.diffLines(oldStr, newStr[, options])` method

````markdown
{% diff method="diffLines",options={"newlineIsToken":true} %}
```bash
beep boop
the cat is palying with cap
what
```
```bash
beep boob blah
the cat is palying with cap
who
```
{% enddiff %}
````

- preview 

```diff
- beep boop

+ beep boob blah

  the cat is palying with cap

- what

+ who
```

#### `Diff.diffTrimmedLines(oldStr, newStr[, options])`

> diffs two blocks of text, comparing line by line, ignoring leading and trailing whitespace.

**Return**

Returns a list of change objects (See below).

**Option**

- `ignoreWhitespace`: Same as in `diffLines`.
- `newlineIsToken`: Same as in `diffLines`.

**Examples**

- usage 

> set `method="diffTrimmedLines"` to call `Diff.diffTrimmedLines(oldStr, newStr[, options])` method

````markdown
{% diff method="diffTrimmedLines",options={"newlineIsToken":true} %}
```bash
beep boop
the cat is palying with cap
what
```
```bash
beep boob blah
the cat is palying with cat
who
```
{% enddiff %}
````

- preview 

```diff
- beep boop
  the cat is palying with cap
  what

+ beep boob blah
  the cat is palying with cat
  who
```

#### `Diff.diffSentences(oldStr, newStr[, options])`

> diffs two blocks of text, comparing sentence by sentence.

**Return**

Returns a list of change objects (See below).

**Examples**

- usage 

> set `method="diffSentences"` to call `Diff.diffSentences(oldStr, newStr[, options])` method

````markdown
{% diff method="diffSentences" %}
```bash
beep boop
the cat is palying with cap
what
```
```bash
beep boob blah
the cat is palying with cat
who
```
{% enddiff %}
````

- preview 

```diff
- beep boop
  the cat is palying with cap
  what

+ beep boob blah
  the cat is palying with cat
  who
```

#### `Diff.diffJson(oldObj, newObj[, options])`

> diffs two JSON objects, comparing the fields defined on each. The order of fields, etc does not matter in this comparison.

**Return**

Returns a list of change objects (See below).

**Examples**

- usage 

> set `method="diffJson"` to call `Diff.diffJson(oldObj, newObj[, options])` method

````markdown
{% diff method="diffJson" %}
```json
{
  "name": "gitbook-plugin-simple-mind-map",
  "version": "0.2.1",
  "description": "A gitBook plugin for generating and exporting mind map within markdown"
}
```
```json
{
  "name": "gitbook-plugin-diff",
  "version": "0.2.1",
  "description": "A gitbook plugin for showing the differences between the codes within markdown"
}
```
{% enddiff %}
````

- preview 

```diff
{
-   "description": "A gitBook plugin for generating and exporting mind map within markdown",
-   "name": "gitbook-plugin-simple-mind-map",
+   "description": "A gitbook plugin for showing the differences between the codes within markdown",
+   "name": "gitbook-plugin-diff",
    "version": "0.2.1"
}
```

#### `Diff.diffArrays(oldArr, newArr[, options])`

> diffs two arrays, comparing each item for strict equality (===).

**Return**

Returns a list of change objects (See below).

**Options**

- `comparator`: `function(left, right)` for custom equality checks

**Examples**

- usage 

> set `method="diffArrays"` to call `Diff.diffArrays(oldArr, newArr[, options])` method

````markdown
{% diff method="diffArrays" %}
```json
[
    "Vue",
    "Python",
    "Java",
    "flutter",
    "springboot",
    "docker",
    "React",
    "小程序"
]
```
```json
[
    "Vuejs",
    "Nodejs",
    "Java",
    "flutter",
    "springboot",
    "docker",
    "React"
]
```
{% enddiff %}
````

- preview 

```diff
[
-   Vue
-   Python
+   Vuejs
+   Nodejs
    Java
    flutter
    springboot
    docker
    React
-   小程序
]
```

### Step #3 - Run gitbook commands

1. Run `gitbook install`. It will automatically install `diff` gitbook plugin for your book. This is needed only once.

```bash
gitbook install
```

or you can run `npm install gitbook-plugin-diff` to install locally.

```bash
npm install gitbook-plugin-diff
```

2. Build your book (`gitbook build`) or serve (`gitbook serve`) as usual.

```bash
gitbook serve
```

## Examples

- Official documentation configuration file

> [https://github.com/snowdreams1006/gitbook-plugin-diff/blob/master/docs/book.json](https://github.com/snowdreams1006/gitbook-plugin-diff/blob/master/docs/book.json)

```json
{
    "plugins": ["diff"],
    "pluginsConfig": {
        "diff": {
            "method": "diffJson"
        }
    }
}
```

- Official example configuration file

> [https://github.com/snowdreams1006/gitbook-plugin-diff/blob/master/example/book.json](https://github.com/snowdreams1006/gitbook-plugin-diff/blob/master/example/book.json)

```json
{
    "plugins": ["diff"],
    "pluginsConfig": {
        "diff": {
            "method": "diffJson"
        }
    }
}
```

- Sample `book.json` file 

```json
{
    "plugins": ["diff"]
}
```

or you can set `method` as your default method to compare between codes:

```json
{
    "plugins": ["diff"],
    "pluginsConfig": {
        "diff": {
            "method": "diffChars"
        }
    }
}
```

or you can set `options` as your default settings according to method:

```json
{
    "plugins": ["diff"],
    "pluginsConfig": {
        "diff": {
            "method": "diffChars",
            "options": {
              "ignoreCase": true
            }
        }
    }
}
```

**Note**: Above snippet can be used as complete `book.json` file, if your book doesn't have one yet.

## Thanks

- A javascript text differencing implementation. : [https://github.com/kpdecker/jsdiff](https://github.com/kpdecker/jsdiff)
- get colors in your node.js console : [https://github.com/Marak/colors.js](https://github.com/Marak/colors.js)
- GitBook CodeGroup Plugin : [https://github.com/lwhiteley/gitbook-plugin-codegroup](https://github.com/lwhiteley/gitbook-plugin-codegroup)

## Author

👤 **snowdreams1006**

- Website: [snowdreams1006.tech](https://snowdreams1006.tech/)
- Github: [@snowdreams1006](https://github.com/snowdreams1006)
- Email: [snowdreams1006@163.com](mailto:snowdreams1006@163.com)

## Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/snowdreams1006/gitbook-plugin-diff/issues).

## Show your support

Give a [Star](https://github.com/snowdreams1006/gitbook-plugin-diff) if this project helped you!

## Copyright

Copyright © 2019 [snowdreams1006](https://github.com/snowdreams1006).

This project is [MIT](https://github.com/snowdreams1006/gitbook-plugin-diff/blob/master/LICENSE) licensed.