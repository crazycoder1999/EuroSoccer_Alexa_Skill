import urllib
from xml.dom import minidom
from xml.dom.minidom import parse, parseString

url = "utterances_groups.xml";
dom = parse( url );
group = [];
for group in dom.getElementsByTagName('group'):
	print ("");
	intent = group.getElementsByTagName('intent')[0];
	for utterance in group.getElementsByTagName('utterance'):
		print(str (intent.childNodes[0].nodeValue) + " " + str( utterance.childNodes[0].nodeValue ));

#it can generate the list of intents for json, and "slot" based on {type} content.. at least templating it.
