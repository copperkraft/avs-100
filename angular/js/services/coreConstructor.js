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
                this.input = [];
                this.output = [];
                this.started = false;
                this.waiting = false;
                this.awaitingInput = false;
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
                    this.started = false;
                    this.waiting = false;
                    this.awaitingInput = false;
                },
                execute: function () {
                    this.started = true;
                    this.operationsData.instructionSet[this.counter].call(this);
                    if (!this.waiting) {
                        this.counter++;
                    }
                    this.check();
                    if (this.operationsData.instructionSet[this.counter].type === 'INP') {
                        this.awaitingInput = true;
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