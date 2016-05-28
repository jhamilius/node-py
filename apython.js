var PythonShell = require('python-shell');

var options = {
  mode: 'text',
  scriptPath: 'scripts',
  args: [2, 5]
};

PythonShell.run('script.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log(results[0]);
});
	