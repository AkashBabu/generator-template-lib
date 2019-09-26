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

    this.fs.copy(
      this.templatePath("benchmark"),
      this.destinationPath(`${library}/benchmark`)
    );

    this.fs.copy(
      this.templatePath("src"),
      this.destinationPath(`${library}/src`)
    );

    this.fs.copy(
      this.templatePath("test"),
      this.destinationPath(`${library}/test`)
    );

    this.fs.copy(
      this.templatePath("LICENSE"),
      this.destinationPath(`${library}/LICENSE`)
    );

    this.fs.write(
      this.destinationPath(`${library}/package.json`),
      templateEngine(this.templatePath("package.json"), this.props)
    );

    this.fs.write(
      this.destinationPath(`${library}/README.md`),
      templateEngine(this.templatePath("README.md"), this.props)
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
