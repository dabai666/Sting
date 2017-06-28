exports.page=function(req, res){
  res.render('file',{title:'test post file'});
};
var formidable = require("formidable");
function upload(request, response) {
    var form = new formidable.IncomingForm();
    form.uploadDir ="../public";
    form.keepExtensions = true;
    form.parse(request, function(error, fields, files) {
    console.log("id:" + fields.id);
    console.log("name:" + fields.name);
    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.write("id:" + fields.id + "<br>");
    response.write("name:" + fields.name);
    response.end();
    });
}
exports.post=upload;