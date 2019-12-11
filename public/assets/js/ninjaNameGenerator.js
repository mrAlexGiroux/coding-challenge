const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

module.exports =  {
    /**
     * 
     */
    GenerateNinjaName : async (buzzwords, res) => {

        try {

            const client = await pool.connect();

            let ninjaNames = [];

            /**
             * Query for the buzzword's equivalent
             * Put Shadow if the buzzword isn't found
             */
            for (let i = 0; i < buzzwords.length; i++) {
                const result = await client.query(`SELECT ninjaname FROM buzzword WHERE buzzword LIKE '${buzzwords[i]}';`);

                if(result.rows.length){
                    ninjaNames.push(result.rows[0].ninjaname);
                }
                else {
                    ninjaNames.push("Shadow");
                }
                
            }

            client.release();
            let ninjaName = "";

            /**
             * Builds the name
             */
            ninjaNames.forEach(element => {
                ninjaName += element + " ";
            });

            res.render('ninjified',{'ninjaName': ninjaName});
        } catch (error) {
            console.log(error);
        }
    }
}