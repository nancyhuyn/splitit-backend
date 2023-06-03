import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './modules/contact/contact.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { LedgerEntryModule } from './modules/ledgerEntry/ledgerEntry.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nancy',
      password: '',
      database: 'splitit_db',
      autoLoadEntities: true,
      //entities: ['./modules/**/*.entity.ts'], // TODO: Check if this errors
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    ContactModule,
    LedgerEntryModule,
    TransactionModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
