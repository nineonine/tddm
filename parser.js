var fs = require('fs');
var parse = require('csv-parse');
var out = [];

exports.parseFile = function parseFile(filename, cb) {

	var readableStream = fs.createReadStream(__dirname+'/uploads/' + filename);
	var output = [];
	var data = '';
	var chunk;


	readableStream.on('readable', function() {
		while ((chunk=readableStream.read()) != null) {
			data += chunk;

		}
	});

	readableStream.on('end', function() {

		var parser = parse({delimiter: ',', columns: true});

		parser.write(data);

		parser.on('readable', function(){
			while(record = parser.read()){
				output.push(record);
			}
		});


		parser.on('error', function(err){
			console.log(err.message);
		});

		parser.on('finish', function(){
		
			cb(output);
		});

		parser.end();
	});	
};







