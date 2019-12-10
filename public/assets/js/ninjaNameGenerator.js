const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

module.exports =  {

    GenerateNinjaName : async (buzzwords, res) => {

        try {
            console.log("GenNinjaName: " + buzzwords);
            const client = await pool.connect();
            //const clientQuery = 'SELECT ninjaname FROM buzzword WHERE buzzword = ';

            let ninjaNames = [];
            console.log("BuzzwordLenght: " + buzzwords.length);
            for (let i = 0; i < buzzwords.length; i++) {
                const result = await client.query(`SELECT ninjaname FROM buzzword WHERE buzzword LIKE '${buzzwords[i]}';`);
                console.log("Result: " + result.fields);
                console.log("Result rows : " + result.rows.length);
                if(result.rows.length){
                    ninjaNames.push(result.rows[0].ninjaname);
                }
                
            }
            console.log("Ninjanames: " + ninjaNames);

            client.release();
            let ninjaName = "";

            ninjaNames.forEach(element => {
                ninjaName += element + " ";
            });
            console.log("Ninjaname: " + ninjaName);
            console.log("Typeof: " + {'ninjaName': ninjaName});
            res.render('ninjified',ninjaName);
        } catch (error) {
            console.log(error);
        }
    }
}