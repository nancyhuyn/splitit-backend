import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { LedgerEntryService } from '../services/ledgerEntry.service';
import { LedgerEntryEntity } from '../entities/ledgerEntry.entity';
import { UpdateLedgerEntryDto } from '../dtos/UpdateLedgerEntry.dto';

@Controller('ledgerentries')
export class LedgerEntryController {
  constructor(private ledgerEntryService: LedgerEntryService) {}

  @Get()
  async getLedgerEntries(): Promise<LedgerEntryEntity[]> {
    return await this.ledgerEntryService.getAll();
  }

  @Get(':uuid')
  async getLedgerEntry(@Param('uuid') id: string): Promise<LedgerEntryEntity> {
    return await this.ledgerEntryService.get(id);
  }

  @Put(':uuid')
  updateLedgerEntry(
    @Param('uuid') id: string,
    @Body() ledgerEntryDetails: UpdateLedgerEntryDto,
  ): Promise<LedgerEntryEntity> {
    return this.ledgerEntryService.update(id, ledgerEntryDetails);
  }

  @Delete(':uuid')
  deleteLedgerEntry(@Param('uuid') id: string) {
    return this.ledgerEntryService.delete(id);
  }
}
