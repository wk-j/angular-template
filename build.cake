#addin "Cake.WebDeploy"
#addin "nuget:?package=Cake.Watch"
#addin "nuget:?package=Cake.UServer"

var version = "0.1.0.0";
var user = EnvironmentVariable("ghu");
var pass = EnvironmentVariable("ghp");
var deployPath = "./deploy";
var distPath = "./dist";

Action<string,string,string> replace = (file, froms, to) => {
    var text = System.IO.File.ReadAllText(file);
    System.IO.File.WriteAllText(file, text.Replace(froms, to));
};

Task("Server").Does(() => {
    var settings = new UServerSettings {
        Port = 8000,
        Path = distPath
    };
    UServer(settings);
});

Task("Watch").Does(() => {
    var settings = new ProcessSettings {
        Arguments = "--watch"
    };
    StartProcess("webpack", settings);
});


Task("Build").Does(() => {
    var settings = new ProcessSettings {
        Arguments = "-p"
    };
    StartProcess("webpack", settings);
});


//#load "config/clone.cake"
//#load "config/deploy.cake"
//#load "config/github.cake"

var target = Argument("target", "default");
RunTarget(target);