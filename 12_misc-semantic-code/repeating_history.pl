!#/usr/bin/perl

#pall thayer, 2009

#do not run, could cause damage.

sub relive {$command = shift; print '$command';}
$bash_history = $ENV { HOME }."/.bash_history";
while(1){
	open(HISTORY, .bash_history);
	while($moment = <HISTORY>){
		relive($moment);
	}
}
