import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('ledgerEntry')
export class LedgerEntryController {
  // constructor(private ledgerEntryService: LedgerEntryService) {}
  // @Get(':uuid')
  // getAllUsers(
  //   @Param('uuid', ParseUUIDPipe) id: string,
  // ): Promise<ContactEntity[]> {
  //   return this.contactService.getUserContacts(id);
  // }
  // @Put(':uuid')
  // async updateUserbyId(
  //   @Body() userDetails: UpdateUserDto,
  //   @Param('uuid', ParseUUIDPipe) id: string,
  // ) {
  //   await this.userService.updateUser(id, userDetails);
  // }
  // @Put(':uuid')
  // async updateUserbyUuid(
  //   @Body() userDetails: UpdateUserDto,
  //   @Param('uuid', ParseUUIDPipe) id: string,
  // ) {
  //   await this.userService.updateUser(id, userDetails);
  // }
  // @Delete(':uuid')
  // async deleteUserByUuid(@Param('uuid', ParseUUIDPipe) id: string) {
  //   await this.userService.deleteUser(id);
  // }
}
