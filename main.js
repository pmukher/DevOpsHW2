var esprima = require("esprima");
var options = {tokens:true, tolerant: true, loc: true, range: true };
var faker = require("faker");
var fs = require("fs");
faker.locale = "en";
var mock = require('mock-fs');
var _ = require('underscore');
var Random = require('random-js');
function main()
{
	var args = process.argv.slice(2);
	if( args.length == 0 )
	{
		args = ["mystery.js"];
	}
	var filePath = args[0];
	constraints(filePath);
	generateTestCases()

}
var engine = Random.engines.mt19937().autoSeed();
function createConcreteIntegerValue( greaterThan, constraintValue )
{
	if( greaterThan )
		return Random.integer(constraintValue,constraintValue+10)(engine);
	else
		return Random.integer(constraintValue-10,constraintValue)(engine);
}
function Constraint(properties)
{
	this.ident = properties.ident;
	this.expression = properties.expression;
	this.operator = properties.operator;
	this.value = properties.value;
	this.funcName = properties.funcName;
	this.kind = properties.kind;
}
function fakeDemo()
{
	console.log( faker.phone.phoneNumber() );
	console.log( faker.phone.phoneNumberFormat() );
	console.log( faker.phone.phoneFormats() );
}
var functionConstraints =
{
}
var mockFileLibrary = 
{
	pathExists:
	{
		'path/fileExists': {
				
  				fileWithContent: ''
		},
		'path/fileDoesnotExist': {
		}		
	},
	fileWithContent:
	{
		pathContent: 
		{	
  			fileWithContent: 'Hello World',
  			fileWithoutContent: ''

		}
	}
};
function generateTestCases()
{
	var content = "var subject = require('./mystery.js')\nvar mock = require('mock-fs');\n";
	for ( var funcName in functionConstraints )
	{
		var params = {};
		// initialize params
		for (var i =0; i < functionConstraints[funcName].params.length; i++ )
		{
			var paramName = functionConstraints[funcName].params[i];
			//params[paramName] = '\'' + faker.phone.phoneNumber()+'\'';
			params[paramName] = [];
		}
		// update parameter values based on known constraints.
		var constraints = functionConstraints[funcName].constraints;
		// Handle global constraints...
		var fileWithContent = _.some(constraints, {kind: 'fileWithContent' });
		var pathExists      = _.some(constraints, {kind: 'fileExists' });
		// plug-in values for parameters
		for( var c = 0; c < constraints.length; c++ )
		{
			var constraint = constraints[c];
			if( params.hasOwnProperty(constraint.ident) )
			{
				params[constraint.ident].push(constraint.value);
			}
		}
		// Prepare function arguments.
		var args = Object.keys(params).map( function(k) {return params[k]; });
		console.log("FUNCTION NAME:", funcName, "ARGS: ", args)
		var allCases = []
		allCases = allPossibleCases(args);
		randomNumber = "919"
		parameters = [];
		if (allCases.length == 0){
			for(var i=0; i<Object.keys(params).length; i++){
				randomNumber+=randomNumber; 
				parameters.push('"'+randomNumber+'"'); 
				
			}
			content+="subject.{0}({1});\n".format(funcName, parameters);
		}
			if( pathExists || fileWithContent )
			{
				for(var i=0; i<allCases.length;i++){
				content += generateMockFsTestCases(pathExists,fileWithContent,funcName, allCases[i]);
				// Bonus...generate constraint variations test cases....
				content += generateMockFsTestCases(!pathExists,fileWithContent,funcName, allCases[i]);
				content += generateMockFsTestCases(pathExists,!fileWithContent,funcName, allCases[i]);
				content += generateMockFsTestCases(!pathExists,!fileWithContent,funcName, allCases[i]);
				}
			}
			else
			{
			
				for(var i=0; i<allCases.length; i++){
				content += "subject.{0}({1});\n".format(funcName, allCases[i]);
				}

			}
}
	fs.writeFileSync('test.js', content, "utf8");

}

function allPossibleCases(arr) {
  if (arr.length == 1) {
    return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        result.push(arr[0][j] +","+ allCasesOfRest[i]);
      }
    }

    return result;
  }

}

function generateMockFsTestCases (pathExists,fileWithContent,funcName,args) 
{
	var testCase = "";
	// Build mock file system based on constraints.
	var mergedFS = {};

	if( pathExists )
	{
		for (var attrname in mockFileLibrary.pathExists) { 
			mergedFS[attrname] = mockFileLibrary.pathExists[attrname]; }
	}
	if( fileWithContent )
	{
		for (var attrname in mockFileLibrary.fileWithContent) {
			mergedFS[attrname] = mockFileLibrary.fileWithContent[attrname]; }
	}

	testCase += 
	"mock(" +
		JSON.stringify(mergedFS)
		+
	");\n";

	testCase += "\tsubject.{0}({1});\n".format(funcName, args );
	testCase+="mock.restore();\n";
	return testCase;
}

function constraints(filePath)
{
   var buf = fs.readFileSync(filePath, "utf8");
	var result = esprima.parse(buf, options);
	traverse(result, function (node) 
	{
		if (node.type === 'FunctionDeclaration') 
		{
			var funcName = functionName(node);
			console.log("\n\n\n\n\n\n\nFUNCTION NAME IS:");
			console.log(funcName);
			console.log("Line : {0} Function: {1}".format(node.loc.start.line, funcName ));
			var params = node.params.map(function(p) {return p.name});
			functionConstraints[funcName] = {constraints:[], params: params};
			// Check for expressions using argument.
			traverse(node, function(child)
			{
				if(child.type == 'BinaryExpression' && child.operator == "!="){
					if(child.left.type == 'Identifier' && (params.indexOf( child.left.name ) > -1)){
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])
						var newValue1 = rightHand.replace(/["']/g, "");
						var str = "HelloWorld";
						var newValue2 = newValue2+str;
						newValue1 = '"'+newValue1+'"';
						newValue2 = newValue2.concat(str);
						newValue2 = '"'+newValue2+'"';
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: newValue1,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: newValue2,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));

					}
					if(child.left.type == 'Identifier' && params.indexOf(child.left.name ) == -1)
					{
					var expression = buf.substring(child.range[0], child.range[1]);
					var rightHand = buf.substring(child.right.range[0], child.right.range[1])
					var firstParam = node.params[0].name; 
					var newValue1 = rightHand.replace(/["']/g, "");
					var newValue2 = "HelloWorld"+newValue1; 
					newValue1 = '"'+newValue1+'"'; 
					newValue2 = '"'+newValue2+'"'; 
					functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: firstParam,
								value: newValue1,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
					functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: firstParam,
								value: newValue2,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));

				}
			}
				if( child.type === 'BinaryExpression' && child.operator == "==")
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						// get expression from original source code:
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])
						var newValue1 = rightHand.replace(/["']/g, "");
						var str = "HelloWorld"
						str = str.toString()
						//var newValue2 = "werw"+newValue1
						newValue2 = '"'+newValue2+'"'
						newValue1 = newValue1.toString().concat(str)
						newValue1='"'+newValue1+'"'
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: rightHand,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								value: newValue1,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));

				}
				if(child.left.type == 'Identifier' && params.indexOf(child.left.name ) == -1)
				{
					var expression = buf.substring(child.range[0], child.range[1]);
					var rightHand = buf.substring(child.right.range[0], child.right.range[1])
					var firstParam = node.params[0].name; 
					var newValue1 = rightHand.replace(/["']/g, "");
					var newValue2 = "HelloWorld"+newValue1; 
					newValue1 = '"'+newValue1+'"'; 
					newValue2 = '"'+newValue2+'"'; 
					functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: firstParam,
								value: newValue1,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
					functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: firstParam,
								value: newValue2,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));

				}
				if(child.left.type == "CallExpression" && child.left.callee.type=="MemberExpression")
				{
					if(child.left.callee.property.name=="indexOf"){
						var newValue2 = child.left.arguments[0].value; 
						newValue2 = '"'+newValue2+'"'
						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.callee.object.name,
								value: newValue2,
								funcName: funcName,
								kind: "integer",
								operator : child.operator,
								expression: expression
							}));
						
					}
				}
			}
				if( child.type === 'BinaryExpression' && child.operator == "<")
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						// get expression from original source code:
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])
						var value1 = parseInt(rightHand)-1+""
						var value2 = parseInt(rightHand)+1+""

						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								funcName: funcName,
								kind: "integer",
								value: value1,
								operator : child.operator,
								expression: expression
							}));

						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								funcName: funcName,
								kind: "integer",
								value: value2,
								operator : child.operator,
								expression: expression
							}));
					}
				}
				if (child.type === 'BinaryExpression' && child.operator == ">")
				{
					if( child.left.type == 'Identifier' && params.indexOf( child.left.name ) > -1)
					{
						var expression = buf.substring(child.range[0], child.range[1]);
						var rightHand = buf.substring(child.right.range[0], child.right.range[1])
						var value1 = parseInt(rightHand)-1+""
						var value2 = parseInt(rightHand)+1+""

						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								funcName: funcName,
								kind: "integer",
								value: value1,
								operator : child.operator,
								expression: expression
							}));

						functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: child.left.name,
								funcName: funcName,
								kind: "integer",
								value: value2,
								operator : child.operator,
								expression: expression
							}));

					}

				}
				if( child.type == "CallExpression" && 
					 child.callee.property &&
					 child.callee.property.name =="readFileSync" )
				{
					for( var p =0; p < params.length; p++ )
					{
						if( child.arguments[0].name == params[p] )
						{
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								value:  "'pathContent/fileWithContent'",
								funcName: funcName,
								kind: "fileWithContent",
								operator : child.operator,
								expression: expression
							}));
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								value:  "'pathContent/fileWithoutContent'",
								funcName: funcName,
								kind: "fileWithContent",
								operator : child.operator,
								expression: expression
							}));

						}
					}
				}
				if( child.type == "CallExpression" &&
					 child.callee.property &&
					 child.callee.property.name =="existsSync")
				{
					for( var p =0; p < params.length; p++ )
					{
						if( child.arguments[0].name == params[p] )
						{
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								// A fake path to a file
								value:  "'path/fileDoesnotExists'",
								funcName: funcName,
								kind: "fileExists",
								operator : child.operator,
								expression: expression
							}));
						}
					}
				}
				if( child.type == "CallExpression" &&
					 child.callee.property &&
					 child.callee.property.name =="readdirSync")
				{
					for( var p =0; p < params.length; p++ )
					{
						if( child.arguments[0].name == params[p] )
						{
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								// A fake path to a file
								value:  "'path/fileExists'",
								funcName: funcName,
								kind: "fileExists",
								operator : child.operator,
								expression: expression
							}));
							functionConstraints[funcName].constraints.push( 
							new Constraint(
							{
								ident: params[p],
								// A fake path to a file
								value:  "'path/fileDoesnotExist'",
								funcName: funcName,
								kind: "fileExists",
								operator : child.operator,
								expression: expression
							}));
						}
					}
				}

			});

			console.log( functionConstraints[funcName]);

		}
	});
}
function traverse(object, visitor) 
{
    var key, child;

    visitor.call(null, object);
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}
function traverseWithCancel(object, visitor)
{
    var key, child;
    if( visitor.call(null, object) )
    {
	    for (key in object) {
	        if (object.hasOwnProperty(key)) {
	            child = object[key];
	            if (typeof child === 'object' && child !== null) {
	                traverseWithCancel(child, visitor);
	            }
	        }
	    }
 	 }
}
function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	}
	return "";
}
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
main();
