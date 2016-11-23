#!/usr/bin/perl

#alex mclean

# it will greet your system to death
# but you go down in a cheerful endless loop

while (1){
	print "Hello World!\n";
	system("$0");
}
