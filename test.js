var subject = require('./mystery.js')
var mock = require('mock-fs');
subject.inc(-101,77);
subject.inc(-99,77);
subject.inc(-101,"77HelloWorld");
subject.inc(-99,"77HelloWorld");
subject.weird(86,69,41,"strictly");
subject.weird(88,69,41,"strictly");
subject.weird(86,71,41,"strictly");
subject.weird(88,71,41,"strictly");
subject.weird(86,69,43,"strictly");
subject.weird(88,69,43,"strictly");
subject.weird(86,71,43,"strictly");
subject.weird(88,71,43,"strictly");
subject.weird(86,69,41,"strictlyHelloWorld");
subject.weird(88,69,41,"strictlyHelloWorld");
subject.weird(86,71,41,"strictlyHelloWorld");
subject.weird(88,71,41,"strictlyHelloWorld");
subject.weird(86,69,43,"strictlyHelloWorld");
subject.weird(88,69,43,"strictlyHelloWorld");
subject.weird(86,71,43,"strictlyHelloWorld");
subject.weird(88,71,43,"strictlyHelloWorld");
subject.weird(86,69,41,"bob");
subject.weird(88,69,41,"bob");
subject.weird(86,71,41,"bob");
subject.weird(88,71,41,"bob");
subject.weird(86,69,43,"bob");
subject.weird(88,69,43,"bob");
subject.weird(86,71,43,"bob");
subject.weird(88,71,43,"bob");
subject.weird(86,69,41,"stricter");
subject.weird(88,69,41,"stricter");
subject.weird(86,71,41,"stricter");
subject.weird(88,71,41,"stricter");
subject.weird(86,69,43,"stricter");
subject.weird(88,69,43,"stricter");
subject.weird(86,71,43,"stricter");
subject.weird(88,71,43,"stricter");
subject.weird(86,69,41,"undefinedHelloWorldHelloWorld");
subject.weird(88,69,41,"undefinedHelloWorldHelloWorld");
subject.weird(86,71,41,"undefinedHelloWorldHelloWorld");
subject.weird(88,71,41,"undefinedHelloWorldHelloWorld");
subject.weird(86,69,43,"undefinedHelloWorldHelloWorld");
subject.weird(88,69,43,"undefinedHelloWorldHelloWorld");
subject.weird(86,71,43,"undefinedHelloWorldHelloWorld");
subject.weird(88,71,43,"undefinedHelloWorldHelloWorld");
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{},"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('path/fileDoesnotExists','path/fileDoesnotExists');
mock.restore();
mock({"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('path/fileDoesnotExists','path/fileDoesnotExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{}});
	subject.fileTest('path/fileDoesnotExists','path/fileDoesnotExists');
mock.restore();
mock({});
	subject.fileTest('path/fileDoesnotExists','path/fileDoesnotExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{},"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithContent','path/fileDoesnotExists');
mock.restore();
mock({"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithContent','path/fileDoesnotExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{}});
	subject.fileTest('pathContent/fileWithContent','path/fileDoesnotExists');
mock.restore();
mock({});
	subject.fileTest('pathContent/fileWithContent','path/fileDoesnotExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{},"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithoutContent','path/fileDoesnotExists');
mock.restore();
mock({"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithoutContent','path/fileDoesnotExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{}});
	subject.fileTest('pathContent/fileWithoutContent','path/fileDoesnotExists');
mock.restore();
mock({});
	subject.fileTest('pathContent/fileWithoutContent','path/fileDoesnotExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{},"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('path/fileDoesnotExists','path/fileExists');
mock.restore();
mock({"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('path/fileDoesnotExists','path/fileExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{}});
	subject.fileTest('path/fileDoesnotExists','path/fileExists');
mock.restore();
mock({});
	subject.fileTest('path/fileDoesnotExists','path/fileExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{},"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithContent','path/fileExists');
mock.restore();
mock({"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithContent','path/fileExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{}});
	subject.fileTest('pathContent/fileWithContent','path/fileExists');
mock.restore();
mock({});
	subject.fileTest('pathContent/fileWithContent','path/fileExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{},"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithoutContent','path/fileExists');
mock.restore();
mock({"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithoutContent','path/fileExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{}});
	subject.fileTest('pathContent/fileWithoutContent','path/fileExists');
mock.restore();
mock({});
	subject.fileTest('pathContent/fileWithoutContent','path/fileExists');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{},"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('path/fileDoesnotExists','path/fileDoesnotExist');
mock.restore();
mock({"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('path/fileDoesnotExists','path/fileDoesnotExist');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{}});
	subject.fileTest('path/fileDoesnotExists','path/fileDoesnotExist');
mock.restore();
mock({});
	subject.fileTest('path/fileDoesnotExists','path/fileDoesnotExist');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{},"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithContent','path/fileDoesnotExist');
mock.restore();
mock({"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithContent','path/fileDoesnotExist');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{}});
	subject.fileTest('pathContent/fileWithContent','path/fileDoesnotExist');
mock.restore();
mock({});
	subject.fileTest('pathContent/fileWithContent','path/fileDoesnotExist');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{},"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithoutContent','path/fileDoesnotExist');
mock.restore();
mock({"pathContent":{"fileWithContent":"Hello World","fileWithoutContent":""}});
	subject.fileTest('pathContent/fileWithoutContent','path/fileDoesnotExist');
mock.restore();
mock({"path/fileExists":{"fileWithContent":""},"path/fileDoesnotExist":{}});
	subject.fileTest('pathContent/fileWithoutContent','path/fileDoesnotExist');
mock.restore();
mock({});
	subject.fileTest('pathContent/fileWithoutContent','path/fileDoesnotExist');
mock.restore();
subject.normalize("919919");
subject.format("919919","919919919919","919919919919919919919919");
subject.blackListNumber("919");
subject.blackListNumber("HelloWorld919");