import {Controller, Post, UseGuards} from '@nestjs/common';
import {DatabaseBackupService} from "./database-backup.service";
import {AdminGuard} from "../../guards/admin.guard";

@Controller('backup')
@UseGuards(AdminGuard)
export class DatabaseBackupController {
    constructor(private databaseBackupService: DatabaseBackupService) {
    }

    @Post('/create')
    createBackup() {
        return this.databaseBackupService.createDatabaseBackup();
    }

    @Post('/restore')
    restoreBackup() {
        return this.databaseBackupService.restoreDatabaseFromBackup();
    }
}
