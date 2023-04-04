const fs=require('fs');
const exclude=['.git','.github','README.md','package.json','readme.js',''];
const ROOT_DIR = './';
const index = [];


// REMOTE CONFIGs
const GITHUB_USERNAME = 'SAHIL250499';
const GITHUB_REPO_NAME = 'Java-Programs-Learning-DSA-in-java';
const GITHUB_BRANCH_NAME = 'main';
const GITHUB_REPO_URL = 'https://github.com/' + GITHUB_USERNAME + '/' + GITHUB_REPO_NAME;
const GITHUB_REPO_BLOB_URL = GITHUB_REPO_URL + '/blob/' + GITHUB_BRANCH_NAME+'/';


let count = 0;
let easy = 0, medium = 0, hard = 0;

const getDirectories = (path, exclude = []) => {
  if (exclude)
    return fs.readdirSync(path).filter((item) => !exclude.includes(item));
  else return fs.readdirSync(path);
};

const catDirArray = getDirectories(ROOT_DIR, exclude);

for(let i=0;i<catDirArray.length;i++){
  const item=catDirArray[i];
  const superitem={
        item:item,
        levels:{},
  };
  const levelDirArray=getDirectories(ROOT_DIR+item,exclude);

  for(let j=0;j< levelDirArray.length;j++){
    const level=levelDirArray[j];
<<<<<<< HEAD
    const stats=fs.statSync(ROOT_DIR+item+'/'+level);
    if(stats){
        let files=getDirectories(ROOT_DIR+item+'/'+level,exclude);
        superitem['levels'][level] =files;
    }
    else{
        superitem['levels'][level]=[level];
    }

=======
    const stats = fs.statSync(ROOT_DIR+item+'/'+level);
    if(stats){
    const files=getDirectories(ROOT_DIR+item+'/'+level,exclude);
    }
    else{
    const files=[];
    }
    superitem['levels'][level] =files;
    
>>>>>>> 9bb4f2a1599c0ef169ef639be5b85405d46f0fe1
  }
  index.push(superitem);
}

let Pipe='|';

for(let i=0;i<index.length;i++){
    let item=index[i].item;
    Pipe+=`[${item}](${GITHUB_REPO_BLOB_URL}/# ${item.toLowerCase()}) |`;
}
let content=Pipe+'\n\n----\n';

for(let i=0;i<index.length;i++){
    const item=index[i];
    content += `### [${item.item}](${GITHUB_REPO_BLOB_URL}${item.item})\n`;

    const levels=Object.keys(item.levels);

    for (let j=0;j<levels.length;j++){
        if(item.levels[levels[j]]){
            content+=`- [${levels[j]}](${GITHUB_REPO_BLOB_URL}${item.item}/${levels[j]})\n`;

            if(levels[j]==='Easy'){
                easy+=item.levels[levels[j]].length;
            }
            else if(levels[j] === "Medium"){
                medium+=item.levels[levels[j]].length;
            }
            else{
                hard+=item.levels[levels[j]].length;
            }

            for(let l=0;l<item.levels[levels[j]].length;l++){
                const file=item.levels[levels[j]][l];
                content+=`\t - [${file}](${GITHUB_REPO_BLOB_URL}${item.item}/${levels[j]}/${file})\n`;
                count++;
            }
            content+='\n';

        }
    }

    content+="---\n";

}

let prepend=`Total Problems Solved - ${count}\n\nEasy - ${easy},Medium - ${medium},Hard - ${hard}\n\nCategories\n\n`;




fs.writeFileSync('README.md',prepend+content);