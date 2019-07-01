# gitbook-plugin-summary
Gitbook plugin to auto-generate SUMMARY.md

## Introduction

This plugin was created out of the frustration of not having a way to auto-generate a SUMMARY.md file, out of a basic tree structure. The outcome is that you install this plugin and it just works, on top of your current `book.json` file. No custom configurations required.

## Installation

First you need to install the package using

```shell
$ npm i gitbook-plugin-summary --save
```

 afterwards, you need to add to your `book.json` the plugin, like this

```json
{
  "plugins": [
    "summary"
  ]
}
```

and finally run the command

```shell
$ gitbook serve
```

## Rules

### Names

* **README.md**: Taken from their directory name
* **File**: Taken from the first first-header (ex: `# title`) of the file
* **Directory**: Name of the directory

### Entry Types

#### Directory at the root of the gitbook

* With a README first level in it, it will be shown as a normal link
* If it doesn't, it will be shown as a section

#### Nested Directories

* With a README first level in it, it will be shown as a normal link
* If it doesn't, it will be shown as a label (or disabled link, if you will)

#### Files

* Only markdown files are shown

## Example

Let's assume that your source tree is done like this way:

```shell
$ tree .
.
├── 1-Getting Started
│   ├── 0-README.md
│   └── 1-TEST.md
├── 2-Reference
│   └── 0-README.md
├── README.md
└── SUMMARY.md
```

your **SUMMARY.md** file will look like this:

```markdown
- [Getting Started](1-Getting Started/0-README.md)
    - [Test](1-Getting Started/1-TEST.md)
- [Reference](2-Reference/0-README.md)
```

and this is how it will be shown inside your Gitbook:

![](example.png)

## Troubleshooting

* Code span (with the back ticks) won't be recognize. So better avoid until someone find it
  important enough to fix that :P

* If it seems like it's not rerendering, save again. Changes are taken into account on the second
  server restart.

* `unexpected token function`: This is caused by the only async-await in the code. 2 ways of fixing
  it. First, install Node 7.6+. Second, pull request it. It's only a 2-3 lines change :)

## License

See [LICENSE](LICENSE)
