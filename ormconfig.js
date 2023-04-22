const dbConfig = {
    synchronize: true,
    // migrations: ['migrations/*.js'],
    // cli: {
    //     migrationsDir: 'migrations'
    // }
};

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'postgres',
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            entities: ['**/*.entity.js'],
            // migrationsRun: true
            // synchronize: true
        });
        break;
    case 'production':
        Object.assign(dbConfig, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            entities: ['**/*.entity.js'],
            ssl: {
                rejectUnauthorized: false
            }
        });
        break;
    default:
        throw new Error('unknown environment')
}

module.exports = dbConfig;