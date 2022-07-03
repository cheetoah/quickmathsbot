//chattriggers module (chattriggers.com) --docs on how to use it on their site

/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

register("command", (...args) => {
    let qu = replaceAll(args.join(''), "x", "*")
    let answer
    try {
        answer = eval( replaceAll(args.join(''), ")(", ")*("))
        ChatLib.chat(answer)
        ChatLib.say("/ac :star: Solve " + replaceAll(qu, "*", "x") +" first for cool! :star:")
    } catch (e) {
        ChatLib.chat("§c" + e)
        return
    }
    let startTime = Date.now();
    let cr = register("chat", (chatter, msg) => {
        if (msg == answer){
            let name =  chatter.replace(/&./g, "").replace(/^\[[^\]]+\] /, "").replace(/ \[[^\]]+\]$/, ""); //thanks Semisol
            let time = Date.now() - startTime
            setTimeout(function(){ChatLib.say("/ac :yes: " + name + " answered correctly after " + Math.floor((time / 1000) * 100) / 100 + " seconds!")}, 250)
            cr.unregister()
        }
    }).setChatCriteria("&r${chatter}: ${msg}&r")
}).setName("respond")

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}
/*
register("chat", (question) => {
    let question = replaceAll(question, "x", "*")
    let answer = eval(question)
    ChatLib.chat("§3[§9Quick Math Solver§3] §b" + question + " = " + answer)
    ChatLib.chat("§7Sending in 10ms")
    setTimeout(function(){ChatLib.say("/ac " + answer)}, 10)
}).setChatCriteria("&r&d&lQUICK MATHS! &r&7Solve: &r&e${question}&r")
*/ //uncomment for auto admin quick maths solver

