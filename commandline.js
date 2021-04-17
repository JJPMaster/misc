// This code is licensed under the WTPFL, and you therefore are allowed to do what the fuck you want to with it. If you don't like that license, it is licensed under the CC0 Public Domain Dedication. 
if(window.location.href.match('https://en.uncyclopedia.co/wiki/Command_Line')) {
	document.write('\
<title>Command Line - Uncyclopedia, the content-free encyclopedia</title>\
<style>\
body {background-color:black}\
.blink { animation: blink 1s steps(5, start) infinite; -webkit-animation: blink 1s steps(5, start) infinite; } @keyframes blink { to { visibility: hidden; } } @-webkit-keyframes blink {to { visibility: hidden; } } }}\
</style>\
<font color="white">\
<small>Loading...<br/>\
Booting BDSM drive... failed.<br/>\
Launching cruise missile... failed.<br/>\
Accessing pornography... failed.<br/>\
Selling war bonds... failed.<br/>\
Hiring assassin... failed.<br/>\
Learning Russian... failed.<br/>\
Bootstrapping <a href="/wiki/Random-access_memory">RAM</a>... - failed.<br/>\
<a href="/wiki/Download_more_RAM">Downloading more RAM</a>... failed.<br/>\
Booting in command line mode... SUCCEEDED!<br/></small>\
Welcome to Uncyclux® <a href="/wiki/System_of_a_Down">version 7.0</a>, because the Uncyclomedia Foundation was so bored that they decided to become a for-profit software development company.\
<br/>Enter "help" for more details.<br/>\
> <input name="hi" id="userInput" /><button onclick="loadHelp()">Submit</button>\
<p id="demo"></p>\
<div align="right"><img src="https://images.uncyclomedia.co/uncyclopedia/en/9/94/Uncyclux.gif" /></div>\
<script>function loadHelp(){    var userInput = document.getElementById("userInput").value;    if (userInput === "help") {    	document.getElementById("demo").innerHTML = "<b>Commands:</b><br/>logout: Log out of the server <br/>purge: Refresh the cache of the server <br/>dir: See all of the files on your computer <br/>del (filename): Permanently delete a file<br/>help: See this menu again<br/><font color=black>Type \'-hide\' to at the end of this command to show the hidden commands.</font><br/>Type any of these commands in the above box once again." } else if (userInput === "logout") { window.location.href = "https://en.uncyclopedia.co\/wiki\/Special:UserLogout"} else if (userInput === "purge") { location.reload() } else if (userInput === "dir") { document.getElementById("demo").innerHTML = "Files in directory \'only_directory_that_exists:\'<br/><b>CON.TXT</b> - 7MB<br/><b>BANLIST.TXT</b> - 25MB<br/> <b>ADGEN.EXE</b> - 75MB<br/> <b>NUL.TXT</b> - 0MB<br/><b>VERY_IMPORTANT_SYSTEM_FILE.JS</b> - 300MB"} else if (userInput.includes("del")) { document.write("Named file does not exist; deleting VERY_IMPORTANT_SYSTEM_FILE.JS instead...<br/> The file has been deleted. And your system has permanently crashed. Good luck.")} else if (userInput === "crash") { document.write(\'<style> body {background-color:black}</style> <font color=white>Fortunately, your system has <b>crashed!</b><br/> This means that you are no longer able to use it. Thank god.<br/> Exit code: -1<br/> STOP code: USER_WANTED_CRASH\') } else if (userInput === "help -hide") { document.getElementById("demo").innerHTML = "<b>Hidden commands:</b><br/>crash: Permanently crash the server<br/>hack: Pretend to hack something and look <i>so cool</i>.<br/>punish: Punish someone for doing literally anything"} else if (userInput === "hack") { document.getElementById("demo").innerHTML = "The system has decided to hack: <b>The Pentagon.</b> You then realize that that won\'t work, and promptly give up. Ironically, the system does not actually know anything else to hack, so it\'s all futile."} else if (userInput === "punish") { document.getElementById("demo").innerHTML = "The system has decided to punish <a href="/wiki/User:Kev">Kev</a>. Are they not who you wanted to punish? Well too :badeline:!"}}</script>');
}
