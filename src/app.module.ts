import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicsModule } from './musics.module';
import { MusicMonthlyInteractionsModule } from './music-monthly-interactions.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/your-database-name'),
    MusicsModule,
    MusicMonthlyInteractionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
