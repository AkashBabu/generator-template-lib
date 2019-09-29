"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const templateEngine = (path, ctx) => {
  return eval(require("fs").readFileSync(path, "utf-8"));
};

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the classy ${chalk.red(
          "generator-template-lib"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "library",
        message: "What's the name of the library"
      },
      {
        type: "input",
        name: "description",
        message: "Description for your library",
        default: "Bootstrapped with generator-template-lib"
      },
      {
        type: "input",
        name: "version",
        message: "Version",
        store: true
      },
      {
        type: "input",
        name: "repository",
        message: "Git repo (from browser url)"
      },
      {
        type: "input",
        name: "homePage",
        message: "Library Home Page"
      },
      {
        type: "input",
        name: "author",
        message: "author",
        store: true
      },
      {
        type: "input",
        name: "license",
        message: "License",
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { library } = this.props;

    this.destinationRoot(library);

    this.fs.copy(
      this.templatePath("benchmark"),
      this.destinationPath(`benchmark`)
    );

    this.fs.copy(this.templatePath("src"), this.destinationPath("src"));

    this.fs.copy(this.templatePath("test"), this.destinationPath("test"));

    this.fs.copy(
      this.templatePath(".babelrc"),
      this.destinationPath(".babelrc")
    );

    this.fs.copy(
      this.templatePath(".codeclimate.yml"),
      this.destinationPath(".codeclimate.yml")
    );

    this.fs.copy(
      this.templatePath(".eslintignore"),
      this.destinationPath(".eslintignore")
    );

    this.fs.copy(
      this.templatePath(".eslintrc"),
      this.destinationPath(".eslintrc")
    );

    this.fs.copy(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );

    this.fs.copy(
      this.templatePath(".npmignore"),
      this.destinationPath(".npmignore")
    );

    this.fs.copy(
      this.templatePath(".travis.yml"),
      this.destinationPath(".travis.yml")
    );

    this.fs.copy(
      this.templatePath(".yo-rc.json"),
      this.destinationPath(".yo-rc.json")
    );

    this.fs.copy(this.templatePath("LICENSE"), this.destinationPath("LICENSE"));

    this.fs.write(
      this.destinationPath("package.json"),
      templateEngine(this.templatePath("package.json"), this.props)
    );

    this.fs.write(
      this.destinationPath("README.md"),
      templateEngine(this.templatePath("README.md"), this.props)
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
