import _ from 'lodash';
import path from 'path';
import express from 'express';
import Promise from 'bluebird';
import LoggerAdapter from 'jimmy/adapters/logger';
import ComponentsAdapter from 'jimmy/adapters/components'

const Logger = LoggerAdapter.createLogger({ name: 'INITIALIZER' });

export default {
    config: {},
    handlers: {},
    responders: {},
    initialize() {
        this.loadConfigs();
        return this.loadAdapters();
    },
    loadConfigs() {
        Logger.info('Loading confings.');

        const defaultConfig = require(path.join(process.cwd(), 'config', 'default')).default;

        const envConfig = require(path.join(process.cwd(), 'config', process.env.NODE_ENV || 'default')).default

        const mergeConfig = { ...defaultConfig, ...envConfig };

        this.config = { ...this.config, ...mergeConfig };

        Logger.info('All confings loaded successfully.');
    },
    loadAdapters() {
        return Promise.bind(this)
            .then(_ => {
                return Logger.info('Loading adapters.')
            })
            .then(_ => {
                Logger.info('Loading logger adapter.')
                return LoggerAdapter.initialize();
            })
            .then(_ => {
                Logger.info('Loading components adapter.');
                return ComponentsAdapter.initialize(this.responders);
            }).then(_ => {
                return Logger.info('All adapters loaded successfully.');
            });
    },
    when(event, handler) {
        if (!this.handlers[event]) {
            this.handlers[event] = []
        }
        this.handlers[event].push(handler);
    },

    invokeHandlers(event) {
        return Promise.each(this.handlers[event] || [], handler => {
            return new Promise(resolve => {
                let result = handler(resolve);

                if (result && result.then) {
                    result.then(resolve, resolve);
                }
            });
        });
    },

    teardown() {
        return invokeHandlers('teardown');
    }
}
