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

## Usage

### Step #1 - Update `book.json` file

In you gitbook's `book.json` file, add `simple-mind-map` to `plugins` list.

Here is simplest example :

```json
{
    "plugins": ["simple-mind-map"]
}
```

In addition, the supported configuration options are as follows : 

```json
"gitbook": {
    "properties": {
        "type": {
            "type": "string",
            "title": "Markdown or MindMup or Txtmap or Pandoc",
            "required": false,
            "default": "markdown"
        },
        "preset": {
            "type": "string",
            "title": "colorful or default",
            "required": false,
            "default": "colorful"
        },
        "linkShape": {
            "type": "string",
            "title": "diagonal or bracket",
            "required": false,
            "default": "diagonal"
        },
        "autoFit": {
            "type": "boolean",
            "title": "true or false",
            "required": false,
            "default": true
        },
        "style": {
            "type": "object",
            "title": "custom style",
            "required": false
        }
    }
}
```

### Step #2 - Use in markdown file

`simplemindmap` support `type`,`preset`,`linkShape`,`autoFit` and `style` options for generating mind map.

Here is basic grammar in your markdown file :

````
{% simplemindmap %}
```
simple mind map
```
{% endsimplemindmap %}
````

And there are some examples :


### Step #3 - Run gitbook commands

1. Run `gitbook install`. It will automatically install `simple-mind-map` gitbook plugin for your book. This is needed only once.

```bash
gitbook install
```

or you can run `npm install gitbook-plugin-simple-mind-map` to install locally.

```bash
npm install gitbook-plugin-simple-mind-map
```

2. Build your book (`gitbook build`) or serve (`gitbook serve`) as usual.

```bash
gitbook serve
```


## Example

- Official documentation configuration file

> [https://github.com/snowdreams1006/gitbook-plugin-simple-mind-map/blob/master/docs/book.json](https://github.com/snowdreams1006/gitbook-plugin-simple-mind-map/blob/master/docs/book.json)

```json
{
    "plugins": ["simple-mind-map"],
    "pluginsConfig": {
        "simple-mind-map": {
            "type": "markdown",
            "preset": "colorful",
            "linkShape": "diagonal"
        }
    }
}
```

- Official example configuration file

> [https://github.com/snowdreams1006/gitbook-plugin-simple-mind-map/blob/master/example/book.json](https://github.com/snowdreams1006/gitbook-plugin-simple-mind-map/blob/master/example/book.json)

```json
{
    "plugins": ["simple-mind-map"],
    "pluginsConfig": {
        "simple-mind-map": {
            "type": "markdown"
        }
    }
}
```

- Sample `book.json` file 

```json
{
    "plugins": ["simple-mind-map"]
}
```

or you can set `type` as your default language type:

```json
{
    "plugins": ["simple-mind-map"],
    "pluginsConfig": {
        "simple-mind-map": {
            "type": "markdown"
        }
    }
}
```

or you can set `preset` or `linkShape` and `autoFit` as your default settings:

```json
{
    "plugins": ["simple-mind-map"],
    "pluginsConfig": {
        "simple-mind-map": {
            "type": "markdown",
            "preset": "colorful",
            "linkShape": "diagonal",
            "autoFit": true
        }
    }
}
```

or you can add `style` to custom your style of mind map:

```json
{
    "plugins": ["simple-mind-map"],
    "pluginsConfig": {
        "simple-mind-map": {
            "type": "markdown",
            "preset": "colorful",
            "linkShape": "diagonal",
            "autoFit": true,
            "style": {
              "height":  "750px"
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