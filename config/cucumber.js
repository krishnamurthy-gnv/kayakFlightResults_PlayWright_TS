const {format} = require("path");

module.exports={
    default:{
        formatOptions:{
            snippetInterface: "async-await"
        },
        paths:["src/tests/features/"],
        dryRun: false,
        require:[
            "src/tests/steps/*.ts",
            "src/hooks/hooks.ts"
        ], 
        requireModule:["ts-node/register"]
    }
}