const parseArgs = () => {

    let resultArr = [];

    const args = process.argv;
    for(let i=0; i<args.length; i++) {
        if (args[i].indexOf('--') === 0){
            resultArr.push(`${args[i].substring(2)} is ${args[i+1]}`);
        }
    }
    
    console.log(resultArr.join(', '));
};

parseArgs();