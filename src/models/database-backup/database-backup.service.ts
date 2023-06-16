import {Injectable} from '@nestjs/common';
import {spawn} from "child_process";

@Injectable()
export class DatabaseBackupService {
    createDatabaseBackup = () => {
        const backupFileName = `D:/backups/backup.sql`;
        const encoding = 'UTF8';

        const command = 'pg_dump';
        const args = [
            '-h', process.env.DB_HOST,
            '-p', process.env.DB_PORT,
            '-U', process.env.DB_USER,
            '-d', process.env.DB_NAME,
            '-f', backupFileName,
            `--encoding=${encoding}`
        ];

        return new Promise((resolve, reject) => {
            const childProcess = spawn(command, args, {
                env: {
                    ...process.env,
                    PGPASSWORD: process.env.DB_PASSWORD
                }
            });

            childProcess.on('error', (error) => {
                console.error(`Error creating database backup: ${error.message}`);
                reject({message: error.message});
            });

            childProcess.on('exit', (code) => {
                if (code === 0) {
                    console.log(`Database backup created successfully. File path: ${backupFileName}`);
                    resolve({message: `Database backup created successfully. File path: ${backupFileName}`});
                } else {
                    console.error(`Error creating database backup. Exit code: ${code}`);
                    reject({message: `Database create failed. Exit code: ${code}`});
                }
            });
        });
    }

    restoreDatabaseFromBackup = () => {
        const backupFilePath = 'D:/backups/backup.sql';
        const encoding = 'UTF8';

        const command = 'pg_restore';
        const args = [
            '-h', process.env.DB_HOST,
            '-p', process.env.DB_PORT,
            '-U', process.env.DB_USER,
            '-d', process.env.DB_NAME,
            '--clean', // Optional: Drop existing objects before restoring
            '--no-owner', // Optional: Ignore object ownership during restore
            '--no-acl', // Optional: Ignore access control lists during restore
            backupFilePath,
            ` --encoding=${encoding}`
        ];

        return new Promise((resolve, reject) => {
            const childProcess = spawn(command, args, {
                env: {
                    ...process.env,
                    PGPASSWORD: process.env.DB_PASSWORD
                }
            });

            childProcess.on('error', (error) => {
                console.error(`Error restoring database backup: ${error.message}`);
                reject({message: error.message});
            });

            childProcess.on('exit', (code) => {
                if (code === 0) {
                    console.log(`Database backup restored successfully. File path: ${backupFilePath}`);
                    resolve({message: `Database backup restored successfully. File path: ${backupFilePath}`});
                } else {
                    console.error(`Error restoring database backup. Exit code: ${code}`);
                    reject({message: `Database restore failed. Exit code: ${code}`});
                }
            });
        });
    };
}
