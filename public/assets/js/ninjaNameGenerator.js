const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });


module.exports =  {

    ReturnNinjaName : async (buzzwords) =>{

        try {
            const client = await pool.connect()
            const clientQuery = 'SELECT ninjaname FROM buzzword WHERE buzzword LIKE $1';

            let ninjaNames = [];

            for (let i = 0; i < buzzwords.length; i++) {
                const result = await client.query(clientQuery, [buzzwords[i]]);

                if(result.row.length){
                    ninjaNames.push(result.rows[0].ninjaname);
                }
                
            }

            client.release();
            let ninjaName = "";

            ninjaNames.forEach(element => {
                ninjaName.concat(element + " ");
            });

            return ninjaName;
        } catch (error) {
            console.log(error);
        }
    }
}