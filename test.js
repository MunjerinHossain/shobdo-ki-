let fs = require("fs")
//fs.readFileSync(BanglaWordList.js)
var words = []
let text = fs.readFileSync("bl.js").toString().split(" ")
for(var i = 0; i < text.length; i++){
    words.push({[text[i]]:"easy"})
}

try {
    fs.writeFileSync('BanglaWordLists.js', JSON.stringify(words), { mode: 0o755 });
  } catch(err) {
    // An error occurred
    console.error(err);
  }

//export default words;
//console.log(words)
//console.log(words)

