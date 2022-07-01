//chattriggers module (chattriggers.com) --docs on how to use it on their site

register("command", (...args) => {
    let qu = replaceAll(args.join(''), "x", "*")
    let answer
    try {
        answer = eval( replaceAll(args.join(''), ")(", ")*("))
        ChatLib.chat(answer)
        ChatLib.say("/ac Solve " + replaceAll(qu, "*", "x") +" first for nothing but ego boost!")
    } catch (e) {
        ChatLib.chat("§c" + e)
        return
    }
    let startTime = Date.now();
    let cr = register("chat", (chatter, msg) => {
        if (msg == answer){
            let name =  chatter.replace(/&./g, "").replace(/^\[[^\]]+\] /, "").replace(/ \[[^\]]+\]$/, ""); //thanks Semisol
            let time = Date.now() - startTime
            setTimeout(function(){ChatLib.say("/ac " + name + " answered correctly first, after " + time + "ms :yes:")}, 250)
            cr.unregister()
        }
    }).setChatCriteria("&r${chatter}: ${msg}&r")
}).setName("respond")

//definitely a better way to do this
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}
