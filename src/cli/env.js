const parseEnv = () => {
    const envEntries = Object.entries(process.env);

    let resultArr = [];

    for (const [key, value] of envEntries) {
        if (key.indexOf('RSS_') === 0) {
            resultArr.push(`${key}=${value}`);
        }
    }

    console.log(resultArr.join('; '));
};

//process.env.RSS_test = '111';
//process.env.RSS_test2 = '222';

parseEnv();