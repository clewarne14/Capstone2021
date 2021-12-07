"use strict";
exports.__esModule = true;
var sqlite3 = require("sqlite3");
var verbose = sqlite3.verbose();
var db = new verbose.Database(":memory:");
db.serialize(function () {
    db.run("CREATE TABLE lorem (info TEXT)");
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();
});
exports["default"] = db;
