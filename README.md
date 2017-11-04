**Pratik Mukherjee** <br />
**Unity ID: pmukher** <br />
**Masters in Computer Science** <br />
**North Carolina State University** <br />

The repository consits of the following: 
* main.js: The node js script that auto generates the test cases and writes it to the test.js file to test the myster.js file or the subject.js file. <br/> 
* test.js: The node js file that contains the auto generates test cases. It is written into by the man.js file.<br />
* subject.js: One of the node js files whose code needs to be tested. <br />
4. mystery.js: One of the node js files whose code needs to be tested.<br />
5. package.json: The package.json file that contains the dependencies on external modules required for executing the script.  <br />

We need to generate sufficient test cases to chieve 100% branch coverage and 100% statement coverage. Both the mystery.js and the subject.js contains functions with paramaeters and the calls to the functions. 
In oder to generate all possible test cases, for all the paramaters of the functions (or other local variables) used in the branches, we need to geenrate all possible combinations of the corresponding values associated with these parameters used in the expression of the branches. 

For generating these values we used the functions allPossibleCases(arr). I referred to the following link for the logic of the function: http://stackoverflow.com/questions/4331092/finding-all-combinations-of-javascript-array-values

The function *constraints(filepath)* is responsible for generating a constraint object for each function he subject.js/mystery.js file and each of this constraint is idented with the name of the parameter and has a certain value pushed into it. The value is based upon the expression in which the paramater is used in a certain branch inside the function. The constraint object has also the name of the function for which the object is generated. All of these function constraints for every function is pushed into an object called *functionConstraints*. 

Now in the *generateTestCases()* function there is a loop which iterated over each function name in the *functionConstraints* object. It creates a *params* object for each function that is keyed with the ident names of the constraints of the particular function and each key contains the corresponding constraint values. This *params* object is now used to extract the values of each of the respective keys into an argument *args* and this was paseed to the function *allPossibleCases(arr)* to generate all posiible combinations of the values of the parameters of an object. Once that list of combinations were received, a test case was created for each combination that contained the function name and the values of the combination as arguments to the function. Each such test case was written into the file *test.js* which would be run by the instanbul tool to generate the test report. 

Coverage Report: 
 ![Alt text](https://github.ncsu.edu/pmukher/HW2/blob/master/CoverageReport%20.png)
