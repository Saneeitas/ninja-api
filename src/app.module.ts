import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { UsersModule } from './users/users.module';
import { NinjaSchema } from './ninjas/schema/ninja.schema';

@Module({
  imports: [
    NinjasModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/ninjas-app'),
    MongooseModule.forFeature([{ name: 'Ninja', schema: NinjaSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
