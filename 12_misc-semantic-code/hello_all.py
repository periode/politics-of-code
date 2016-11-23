#!/usr/bin/python

#alex mclean, 2013

import iptools, httplib

for ip in iptools.IpRangeList('0.0.0.0/0'):
	try:
		print "Greeting " + ip
		cx = httplib.HTTPConnection("%s:80" % ip)
		cx.request("POST", '/', "message=Hello+world!")
	except:
		pass
