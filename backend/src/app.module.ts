import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
