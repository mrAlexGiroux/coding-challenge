const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });


module.exports =  {

    ReturnNinjaName : async (buzzword) =>{

        try {
            const client = await pool.connect()
            const result = await client.query('SELECT * FROM buzzword');


            return this.ReturnNinjaName;
        } catch (error) {
            console.log(error);
        }

    }
}