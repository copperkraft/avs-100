app.factory('coreConstructor', function () {
    var cores = {};
    return {
        processor: function (name, registerCount) {
            if (cores[name]) { //если процессор уже создан, возвращать имеюшийся объект процессора
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
                this.output = []; //TODO вывод должен храниться вне процессора же
                this.locked = false; //TODO добавить использование блокировки процессора в случае ошибки
                this.started = false;
                this.waiting = false;
                this.inputEvents = [];
                this.outputEvents = [];
                this.resetEvents = [];
            }
            ProcessorNode.prototype = {
                reset: function () { //обнуление состояния процессора
                    var i,
                        len;
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
                    this.locked = false;
                    for (i = 0, len = this.resetEvents.length; i < len; i++) {
                        this.resetEvents[i]();
                    }
                },
                execute: function () {
                    var i,
                        len;
                    this.started = true;
                    this.operationsData.instructionSet[this.counter].call(this);
                    if (!this.waiting && !this.locked) {
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
                            this.registers.CF = 1;
                        }
                    }
                }
            };
            return new ProcessorNode(registerCount);
        }
    };
});