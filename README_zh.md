# 欢迎访问 gitbook-plugin-diff 官网 👋

[![npm:version](https://img.shields.io/npm/v/gitbook-plugin-diff.svg)](https://www.npmjs.com/package/gitbook-plugin-diff)
[![npm:download](https://img.shields.io/npm/dt/gitbook-plugin-diff.svg)](https://www.npmjs.com/package/gitbook-plugin-diff)
[![npm:prerequisite](https://img.shields.io/badge/gitbook-*-blue.svg)](https://www.npmjs.com/package/gitbook-plugin-diff)
[![github:documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/snowdreams1006/gitbook-plugin-diff#readme)
[![github:maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/snowdreams1006/gitbook-plugin-diff/graphs/commit-activity)
[![npm:license](https://img.shields.io/npm/l/gitbook-plugin-diff.svg)](https://github.com/snowdreams1006/gitbook-plugin-diff/blob/master/LICENSE)
[![github:snodreams1006](https://img.shields.io/badge/github-snowdreams1006-brightgreen.svg)](https://github.com/snowdreams1006)
[![website:snodreams1006.tech](https://img.shields.io/badge/website-snowdreams1006.tech-brightgreen.svg)](https://snowdreams1006.tech/)
[![微信公众号:雪之梦技术驿站-brightgreen.svg](https://img.shields.io/badge/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7-%E9%9B%AA%E4%B9%8B%E6%A2%A6%E6%8A%80%E6%9C%AF%E9%A9%BF%E7%AB%99-brightgreen.svg)](https://snowdreams1006.github.io/snowdreams1006-wechat-public.jpeg)

> 在 markdown 文档中显示代码之间的差异的 Gitbook 插件

[English](./README.md) | [中文](./README_zh.md)

### 🏠 [主页](https://github.com/snowdreams1006/gitbook-plugin-diff#readme)

- Github : [https://snowdreams1006.github.io/gitbook-plugin-diff/](https://snowdreams1006.github.io/gitbook-plugin-diff/)
- GitLab: [https://snowdreams1006.gitlab.io/gitbook-plugin-diff/](https://snowdreams1006.gitlab.io/gitbook-plugin-diff/)
- Gitee : [https://snowdreams1006.gitee.io/gitbook-plugin-diff/](https://snowdreams1006.gitee.io/gitbook-plugin-diff/)

## 屏幕截图

- 用法

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

- 预览

```diff
{
-   "description": "A gitBook plugin for generating and exporting mind map within markdown",
-   "name": "gitbook-plugin-simple-mind-map",
+   "description": "A gitbook plugin for showing the differences between the codes within markdown",
+   "name": "gitbook-plugin-diff",
    "version": "0.2.1"
}
```

## 用法

### 步骤＃1-更新 `book.json` 文件

在您的 `gitbook` 的 `book.json` 文件中,将 `diff` 添加到 `plugins` 列表中.

这是最简单的示例: 

```json
{
    "plugins": ["diff"]
}
```

此外,受支持的配置选项如下:

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

### 步骤＃2- 使用 `markdown` 语法

`diff` 插件支持 `method` 和 `options` 等选项生成差异代码块.

这是在 `markdown` 文件中基本使用语法:

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

下面有一些基本示例:

#### `Diff.diffChars(oldStr, newStr[, options])`

> 区分两个文本块，逐个字符比较。

**返回**

返回更改对象列表（请参见下文）。

**选项**

- `ignoreCase` ： `true`忽略大小写差异。默认为`false` 。

**示例**

- 用法

> 设置`method="diffChars"`以调用`Diff.diffChars(oldStr, newStr[, options])`方法

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

- 预览

```diff
  ca
- t
+ p
```

#### `Diff.diffWords(oldStr, newStr[, options])`

> 区分两个文本块，逐字比较，忽略空格。

**返回**

返回更改对象列表（请参见下文）。

**选项**

- `ignoreCase` ：与`diffChars`相同。

**示例**

- 用法

> 设置`method="diffWords"`来调用`Diff.diffWords(oldStr, newStr[, options])`方法

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

- 预览

```diff
  beep 
- boop
+ boob

+ blah
```

#### `Diff.diffWordsWithSpace(oldStr, newStr[, options])`

> 区分两个文本块，逐字比较，将空白视为有效。

**返回**

返回更改对象列表（请参见下文）。

**选项**

- `ignoreCase` ：与`diffWords`相同。

**示例**

- 用法

> 设置`method="diffWordsWithSpace"`以调用`Diff.diffWordsWithSpace(oldStr, newStr[, options])`方法

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

- 预览

```diff
  beep 
- boop
+ boob blah
```

#### `Diff.diffLines(oldStr, newStr[, options])`

> 比较两个文本块，逐行比较。

**返回**

返回更改对象列表（请参见下文）。

**选项**

- `ignoreWhitespace` ： `true`忽略前导和尾随空白。这与`diffTrimmedLines`相同
- `newlineIsToken` ： `true` `newlineIsToken`换行符视为单独的标记。这允许换行结构的更改独立于行内容而发生，并照此处理。通常，这是`diffLines`更加人性化的形式，并且`diffLines`更适合于补丁和其他计算机友好的输出。

**示例**

- 用法

> 设置`method="diffLines"`以调用`Diff.diffLines(oldStr, newStr[, options])`方法

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

- 预览

```diff
- beep boop

+ beep boob blah

  the cat is palying with cap

- what

+ who
```

#### `Diff.diffTrimmedLines(oldStr, newStr[, options])`

> 区分两个文本块，逐行比较，忽略前导和尾随空格。

**返回**

返回更改对象列表（请参见下文）。

**选项**

- `ignoreWhitespace` ：与`diffLines`相同。
- `newlineIsToken` ：同`diffLines` 。

**示例**

- 用法

> 设置`method="diffTrimmedLines"`来调用`Diff.diffTrimmedLines(oldStr, newStr[, options])`方法

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

- 预览

```diff
- beep boop
  the cat is palying with cap
  what

+ beep boob blah
  the cat is palying with cat
  who
```

#### `Diff.diffSentences(oldStr, newStr[, options])`

> 区分两个文本块，逐句比较。

**返回**

返回更改对象列表（请参见下文）。

**示例**

- 用法

> 设置`method="diffSentences"`来调用`Diff.diffSentences(oldStr, newStr[, options])`方法

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

- 预览

```diff
- beep boop
  the cat is palying with cap
  what

+ beep boob blah
  the cat is palying with cat
  who
```

#### `Diff.diffJson(oldObj, newObj[, options])`

> 比较两个JSON对象，比较每个对象上定义的字段。在此比较中，字段的顺序等并不重要。

**返回**

返回更改对象列表（请参见下文）。

**示例**

- 用法

> 设置`method="diffJson"`来调用`Diff.diffJson(oldObj, newObj[, options])`方法

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

- 预览

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

> 比较两个数组，比较每个项目是否严格相等（===）。

**返回**

返回更改对象列表（请参见下文）。

**选件**

- `comparator` ：用于自定义相等性检查的`function(left, right)`

**示例**

- 用法

> 设置`method="diffArrays"`以调用`Diff.diffArrays(oldArr, newArr[, options])`方法

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

- 预览

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

### 步骤＃3- 运行 `gitbook` 命令

1. 运行 `gitbook install` .它将自动为您的 `gitbook` 安装 `diff` 插件.

> 该步骤仅需要允许一次即可.

```bash
gitbook install
```

或者您可以运行 `npm install gitbook-plugin-diff` 命令本地安装 `gitbook-plugin-diff` 插件.

```bash
npm install gitbook-plugin-diff
```

2. 像往常一样构建您的书（ `gitbook build` ）或服务（ `gitbook serve` ）.

```bash
gitbook serve
```

## 示例

- 官方文档配置文件

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

- 官方示例配置文件

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

- 示例`book.json`文件

```json
{
    "plugins": ["diff"]
}
```

或者您可以将 `method` 设置为默认方法用于代码之间进行比较方式：

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

或者您可以根据方法将 `options` 设置为默认选项.

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

**注意** ：如果您的书还没有创建,以上代码段可以用作完整的 `book.json` 文件.

## 致谢

- A javascript text differencing implementation. : [https://github.com/kpdecker/jsdiff](https://github.com/kpdecker/jsdiff)
- get colors in your node.js console : [https://github.com/Marak/colors.js](https://github.com/Marak/colors.js)
- GitBook CodeGroup Plugin : [https://github.com/lwhiteley/gitbook-plugin-codegroup](https://github.com/lwhiteley/gitbook-plugin-codegroup)

## 作者

👤 **snowdreams1006**

- 网站 : [snowdreams1006.tech](https://snowdreams1006.tech/)
- GitHub :  [@snowdreams1006](https://github.com/snowdreams1006)
- 电子邮件 : [snowdreams1006@163.com](mailto:snowdreams1006@163.com)

## 贡献

欢迎贡献，问题和功能要求！随时检查[问题页面](https://github.com/snowdreams1006/gitbook-plugin-diff/issues) 。

## 支持

如果这个项目对您有帮助，请给个[星星](https://github.com/snowdreams1006/gitbook-plugin-diff) ！

## 版权

版权所有©2019 [snowdreams1006](https://github.com/snowdreams1006) 。

该项目是[MIT](https://github.com/snowdreams1006/gitbook-plugin-diff/blob/master/LICENSE)许可的。