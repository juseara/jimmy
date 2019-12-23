#!/usr/bin/env node


import '../lib/bootstrap';
import server from 'jimmy/cli/server';
import Application from 'jimmy/api/application';
server(new Application())
