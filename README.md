<h1 align="center">
  Test automation for assets management
</h1>
 
> Note: To see a more readable view, by using VSC, right click on the tab title and select "Open preview".
<hr>

<div align="center">
  <h2><a href="https://github.com/vict01/Cypress_Cucumber_Assets-Mngt">
  Relevant information about the framework and the tests</a></h2> 
</div>
<hr />

<p align="left" style="font-size: 1.2rem; color: orange;">
  This framework is made up of the following tools
</p>

```
1. Cypress: Framework used to automate the actions in the browser and locate elements.
2. Cucumber: BDD Framework that allows behaviors to be specified in a logical and understandable language.
3. Cucumber-html-reporter: HTML reports generator based on cucumber feature files test results.
4. Mocha: Testing framework that provides a BDD/TDD and easy-to-read syntax.
5. Chai: BDD/TDD assertion library that allows apply assertion over the test.
6. Node.js: The Runtime environment that allows packaging and manage the dependencies.
7. ReactJS application: Which will be the UI application under test.
8. Python flask application: Corresponding the Back-end and api side.
```

<p align="left" style="font-size: 1.2rem; color: orange;"> Framework Structure </p>

##
The relevant framework files are included in the following folders.

1. test strategy and defect report: Contain the test strategy along with the bugs report.
2. cypress\fixtures, plugins and support: Contain constants, configuration and methods tha support the tests.
3. cypress\integration: Contains the test and feature files that encompases the steps and scenarios to be executed.
4. cypress\reports\cucumber-htmlreport.html: Contains the test result report in HTML format.
##

<p align="left" style="font-size: 1.2rem; color: orange;"> Requirements to run the test </p>

- Open a terminal console and make sure you are in the root path of the project, and run the command below to install dependencies.
  - `npm i`

- Besides the dependencies installed running the command above, it's necessary to install
  - python (recommended 3.10 version)
  - flask (`pip install pysqlite3`)
  - pysqlite3 (`pip install flask`)

- Since this test was prepared in Windows, take into account next changes were made in the start-api script in the package.json:
  - `It was changed export by set`
  - `It was added "python -m" before " flask run"`

<p align="left" style="font-size: 1.2rem; color: orange;"> How to run the test </p>
 
- To start the the api services, build the app and start it, run:
  - `npm run start-api`
  - `npm run build`
  - `npm run start`

- To run all the tests in headed mode (opening the web browser), so that run one after the other, with no pause, run
  - `npm run cy:run`

- To run the test by opening the Cypress UI and handle the test run at will, run
  - `npx cypress open`
  - Click on `Run 2 integration specs` option to run all tests and see the results

- If you want to omit any scenario before running test, just write @ignore on the top of the scenario word

> Note (After running the tests):

- Test results are visible in the Cypress UI panel, when you run test using the Cypress UI
- Test results are visible as well in the VSC terminal console
- Test result report in HTML format can be found in: `reports\cucumber-htmlreport.html\index.html`

For further information about the author, please consult
[Victor Caminero LinkedIn profile](https://www.linkedin.com/in/victor-caminero/)
