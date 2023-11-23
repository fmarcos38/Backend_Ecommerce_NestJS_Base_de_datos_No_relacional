import { registerAs } from "@nestjs/config";


export default registerAs('config', () => {
    return{
        //puedo agrupar variables q pertenezcan a siertos caract
        //por ejem estas son de la DB        
        mysql: {
            mysqlDB: process.env.MYSQL_DB,
            mysqlUser: process.env.MYSQL_USER,
            mysqlPassword: process.env.MYSQL_PASSWORD,
            mysqlPort: parseInt(process.env.MYSQL_PORT, 10),
            mysqlHost: process.env.MYSQL_HOST,
        },
    }    
});