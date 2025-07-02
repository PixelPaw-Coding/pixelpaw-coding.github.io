class DevToolsExtension {
    getInfo() {
        return {
            id: 'devtools',
            name: 'Developer Tools',
            color1: '#4C97FF',
            color2: '#3373CC',
            blocks: [
                {
                    opcode: 'getFPS',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'current FPS'
                },
                {
                    opcode: 'getCloneCount',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'clone count'
                },
                {
                    opcode: 'getSpriteCount',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'sprite count'
                },
                {
                    opcode: 'logInfo',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'log [TEXT]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Hello, DevLog!'
                        }
                    }
                },
                {
                    opcode: 'logWarn',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'warn [TEXT]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Warning message'
                        }
                    }
                },
                {
                    opcode: 'logError',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'error [TEXT]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Error occurred!'
                        }
                    }
                },
                {
                    opcode: 'logDebug',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'debug [TEXT]',
                    arguments: {
                        TEXT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Debugging...'
                        }
                    }
                },
                {
                    opcode: 'logClear',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'clear console log'
                },
                {
                    opcode: 'getMemory',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'JS heap memory (MB)'
                },
                {
                    opcode: 'getProjectName',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'project name'
                },
                {
                    opcode: 'getProjectID',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'project ID'
                }
            ]
        };
    }

    getFPS() {
        const runtime = Scratch.vm.runtime;
        return Math.round(runtime._lastReportedFPS || 0);
    }

    getCloneCount() {
        let count = 0;
        const targets = Scratch.vm.runtime.targets;
        for (const target of targets) {
            if (!target.isStage && target.clones) {
                count += target.clones.length;
            }
        }
        return count;
    }

    getSpriteCount() {
        return Scratch.vm.runtime.targets.filter(t => !t.isStage).length;
    }

    logInfo(args) {
        console.log(`[LOG] ${args.TEXT}`);
    }

    logWarn(args) {
        console.warn(`[WARN] ${args.TEXT}`);
    }

    logError(args) {
        console.error(`[ERROR] ${args.TEXT}`);
    }

    logDebug(args) {
        console.debug(`[DEBUG] ${args.TEXT}`);
    }

    logClear() {
        console.clear();
    }

    getMemory() {
        if (performance && performance.memory) {
            return Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
        } else {
            return 'N/A';
        }
    }

    getProjectName() {
        return Scratch.vm && Scratch.vm.runtime && Scratch.vm.runtime.getProjectTitle
            ? Scratch.vm.runtime.getProjectTitle()
            : 'Unknown';
    }

    getProjectID() {
        const id = window.location.href.match(/projects\/(\d+)/);
        return id ? id[1] : 'N/A';
    }
}

Scratch.extensions.register(new DevToolsExtension());
