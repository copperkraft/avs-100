app.factory('coreConstructor', function () {
    var cores = {};
    return {
        processor: function (name, registerCount) {
            if (cores[name]) {
                return cores[name];
            }
            function ProcessorNode(registerCount) {
                'use strict';
                var i;
                this.operationsData = {
                    invalidFunctions: {},
                    instructionSet: []
                };
                this.registers = {
                    CF: 0
                };
                for (i = 0; i < registerCount; i++) {
                    this.registers['R' + i] = 0;
                }
                this.counter = 0;
                this.input = null;
                this.output = []; //TODO привести вывод в песочнице и в заданиях к одному виду
                this.started = false;
                this.waiting = false;
                this.inputEvents = [];
                this.outputEvents = [];
            }
            ProcessorNode.prototype = {
                reset: function () {
                    var i;
                    this.registers = {
                        CF: 0
                    };
                    for (i = 0; i < registerCount; i++) {
                        this.registers['R' + i] = 0;
                    }
                    this.counter = 0;
                    this.output = [];
                    this.input = null;
                    this.inputReader = function () {
                        return this.input;
                    };
                    this.started = false;
                    this.waiting = false;
                },
                execute: function () {
                    var i,
                        len;
                    this.started = true;
                    this.operationsData.instructionSet[this.counter].call(this);
                    if (!this.waiting) {
                        this.counter++;
                    }
                    this.check();
                    if (this.operationsData.instructionSet[this.counter].type === 'INP') {
                        for (i = 0, len = this.inputEvents.length; i < len; i++) {
                            this.inputEvents[i]();
                        }
                    }
                },
                check: function () {
                    var i;
                    this.registers.CF = 0;
                    if (this.counter >= this.operationsData.instructionSet.length) {
                        this.counter = this.counter % this.operationsData.instructionSet.length;
                    }
                    for (i = 0; i < registerCount; i++) {
                        if (this.registers['R' + i] < 0) {
                            this.registers['R' + i] = this.registers['R' + i] + 256;
                            this.registers.CF = 1;
                        }
                        if (this.registers['R' + i] > 255) {
                            this.registers['R' + i] = this.registers['R' + i] - 256;
                            this.this.registers.CF = 1;
                        }
                    }
                }
            };
            return new ProcessorNode(registerCount);
        }
    };
});